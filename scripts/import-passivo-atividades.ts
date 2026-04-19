/**
 * Importa atividades do passivo (_passivo_rows.json) via RPC import_atividades_passivo_chunk.
 * Requer NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

function loadEnvLocal(): { url: string; serviceKey: string } {
  const envPath = path.join(process.cwd(), ".env.local");
  const txt = fs.readFileSync(envPath, "utf-8");
  const url = txt.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/m)?.[1]?.trim();
  const serviceKey = txt.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m)?.[1]?.trim();
  if (!url || !serviceKey) throw new Error("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY em falta (.env.local)");
  return { url, serviceKey };
}

type RowJson = {
  codigo: string;
  descricao: string;
  responsavel: string;
  inicio: string;
  fim: string;
  progresso: number;
  etiqueta_relatorio: string;
  link_relatorio: string;
  instrucao_servico: string;
  etapa: number;
  status_execucao: string;
};

/** Última ocorrência ganha — evita duplicados no mesmo INSERT (ON CONFLICT não permite). */
function dedupePorIsECodigo(rows: RowJson[]): RowJson[] {
  const map = new Map<string, RowJson>();
  for (const r of rows) {
    const key = `${r.instrucao_servico}|${r.codigo.trim()}`;
    map.set(key, r);
  }
  return [...map.values()];
}

async function main() {
  const { url, serviceKey } = loadEnvLocal();
  const sb = createClient(url, serviceKey);
  const jsonPath = path.join(process.cwd(), "scripts", "_passivo_rows.json");
  const raw: RowJson[] = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const rows = dedupePorIsECodigo(raw);
  if (rows.length !== raw.length) {
    console.warn(`Removidas ${raw.length - rows.length} linhas duplicadas (mesma IS + código); restam ${rows.length}.`);
  }

  const BATCH = 80;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await sb.rpc("import_atividades_passivo_chunk", {
      payload: batch,
    });
    if (error) {
      console.error(`Erro no lote índice ${i}:`, error.message, error.details, error.hint);
      process.exit(1);
    }
    console.log(`OK ${i + 1}–${Math.min(i + BATCH, rows.length)} / ${rows.length}`);
  }

  console.log(`Concluído: ${rows.length} linhas processadas.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
