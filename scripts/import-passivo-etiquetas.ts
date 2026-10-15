/**
 * Carga única: passivo_etiquetas.csv
 * Localiza a atividade pelo código (em qualquer instrução de serviço),
 * grava etiqueta_relatorio e link_relatorio e define progresso em 100%.
 *
 * Uso: npx tsx scripts/import-passivo-etiquetas.ts
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

function loadEnvLocal(): { url: string; serviceKey: string } {
  const envPath = path.join(process.cwd(), ".env.local");
  const txt = fs.readFileSync(envPath, "utf-8");
  const url = txt.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/m)?.[1]?.trim();
  const serviceKey = txt.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m)?.[1]?.trim();
  if (!url || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY em falta (.env.local)");
  }
  return { url, serviceKey };
}

type CsvRow = { codigo: string; etiqueta: string; relatorio: string };

function parseCsv(filePath: string): { rows: CsvRow[]; duplicados: string[] } {
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
  const header = lines[0]?.toLowerCase();
  if (!header?.startsWith("codigo,etiqueta,relatorio")) {
    throw new Error(`Cabeçalho inesperado: ${lines[0]}`);
  }

  const map = new Map<string, CsvRow>();
  const duplicados: string[] = [];
  for (const line of lines.slice(1)) {
    const first = line.indexOf(",");
    const second = line.indexOf(",", first + 1);
    if (first < 0 || second < 0) throw new Error(`Linha inválida: ${line}`);
    const codigo = line.slice(0, first).trim();
    const etiqueta = line.slice(first + 1, second).trim();
    const relatorio = line.slice(second + 1).trim();
    if (!codigo) throw new Error(`Código vazio: ${line}`);
    if (map.has(codigo)) duplicados.push(codigo);
    map.set(codigo, { codigo, etiqueta, relatorio });
  }
  return { rows: [...map.values()], duplicados };
}

function hojeIso(agora = new Date()): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(agora);
  const ano = partes.find((p) => p.type === "year")?.value ?? "1970";
  const mes = partes.find((p) => p.type === "month")?.value ?? "01";
  const dia = partes.find((p) => p.type === "day")?.value ?? "01";
  return `${ano}-${mes}-${dia}`;
}

function statusExecucao(fim: string | null, progresso: number, hoje: string): string | null {
  const fimIso = fim?.trim().slice(0, 10) ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fimIso)) return null;
  if (progresso >= 100) return hoje < fimIso ? "antecedencia" : "no_prazo";
  if (hoje > fimIso) return "atraso";
  return "no_prazo";
}

type Atividade = { id: string; codigo: string; fim: string | null };

function criarCliente(url: string, serviceKey: string) {
  return createClient(url, serviceKey);
}

async function fetchAtividades(
  sb: ReturnType<typeof criarCliente>,
  codigos: string[]
): Promise<Atividade[]> {
  const out: Atividade[] = [];
  const CHUNK = 80;
  const PAGE = 1000;
  for (let i = 0; i < codigos.length; i += CHUNK) {
    const slice = codigos.slice(i, i + CHUNK);
    let from = 0;
    while (true) {
      const { data, error } = await sb
        .from("atividades")
        .select("id, codigo, fim")
        .in("codigo", slice)
        .range(from, from + PAGE - 1);
      if (error) throw new Error(error.message);
      const page = (data ?? []) as Atividade[];
      out.push(...page);
      if (page.length < PAGE) break;
      from += PAGE;
    }
  }
  return out;
}

async function main() {
  const csvPath = path.join(process.cwd(), "passivo_etiquetas.csv");
  const { rows, duplicados } = parseCsv(csvPath);
  const incompletas = rows.filter((r) => !r.etiqueta || !r.relatorio);
  const validas = rows.filter((r) => r.etiqueta && r.relatorio);

  const { url, serviceKey } = loadEnvLocal();
  const sb = criarCliente(url, serviceKey);
  const atividades = await fetchAtividades(
    sb,
    validas.map((r) => r.codigo)
  );

  const porCodigo = new Map<string, Atividade[]>();
  for (const a of atividades) {
    const key = (a.codigo ?? "").trim();
    const list = porCodigo.get(key) ?? [];
    list.push(a);
    porCodigo.set(key, list);
  }

  const codigosCsv = new Set(validas.map((r) => r.codigo));
  const semMatchExato = validas.filter((r) => !porCodigo.has(r.codigo));
  const porCompacto = new Map<string, CsvRow>();
  for (const row of semMatchExato) {
    const alt = row.codigo.replace(/\s+/g, "");
    if (alt === row.codigo || codigosCsv.has(alt) || porCompacto.has(alt)) continue;
    porCompacto.set(alt, row);
  }
  if (porCompacto.size > 0) {
    const extras = await fetchAtividades(sb, [...porCompacto.keys()]);
    for (const a of extras) {
      const key = (a.codigo ?? "").trim();
      const row = porCompacto.get(key);
      if (!row) continue;
      const list = porCodigo.get(row.codigo) ?? [];
      list.push(a);
      porCodigo.set(row.codigo, list);
    }
  }

  const naoEncontrados = validas.filter((r) => !porCodigo.has(r.codigo)).map((r) => r.codigo);
  const hoje = hojeIso();

  type Update = { id: string; codigo: string; etiqueta: string; relatorio: string; status: string | null };
  const updates: Update[] = [];
  for (const row of validas) {
    for (const at of porCodigo.get(row.codigo) ?? []) {
      updates.push({
        id: at.id,
        codigo: row.codigo,
        etiqueta: row.etiqueta,
        relatorio: row.relatorio,
        status: statusExecucao(at.fim, 100, hoje),
      });
    }
  }

  console.log(`CSV: ${rows.length} códigos (${duplicados.length} repetidos no arquivo, última linha vale).`);
  console.log(`Incompletas (sem etiqueta ou relatório): ${incompletas.length}`);
  console.log(`Atividades localizadas: ${updates.length} em ${validas.length - naoEncontrados.length} códigos.`);
  console.log(`Códigos não encontrados: ${naoEncontrados.length}`);
  if (naoEncontrados.length) console.log(naoEncontrados.join(", "));

  const CONC = 20;
  let ok = 0;
  for (let i = 0; i < updates.length; i += CONC) {
    const batch = updates.slice(i, i + CONC);
    const results = await Promise.all(
      batch.map(async (u) => {
        const { error } = await sb
          .from("atividades")
          .update({
            etiqueta_relatorio: u.etiqueta,
            link_relatorio: u.relatorio,
            progresso: 100,
            status_execucao: u.status,
          })
          .eq("id", u.id);
        if (error) return `${u.codigo}: ${error.message}`;
        return null;
      })
    );
    const falhas = results.filter(Boolean);
    if (falhas.length) {
      console.error(falhas.join("\n"));
      process.exit(1);
    }
    ok += batch.length;
    console.log(`OK ${ok} / ${updates.length}`);
  }

  console.log(`Concluído: ${ok} atividades atualizadas (etiqueta, relatório, progresso 100%).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
