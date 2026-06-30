import { parsePartesCodigoAtividade } from "@/lib/atividade-codigo";
import { normalizarDataParaApi } from "@/lib/datas-atividade";

export const TIPOS_CODIGO_ATIVIDADE = ["BD", "INF", "DEB", "IA", "MEL", "INT", "NF"] as const;
export const ETAPAS_CODIGO_ATIVIDADE = ["1E", "2E", "3E", "4E", "5E"] as const;

export type LinhaCsvAtividade = {
  tipo: string;
  etapa: string | null;
  descricao: string;
  responsavel: string | null;
  equipeMembros: string[];
  inicio: string | null;
  fim: string | null;
  linha: number;
};

export type LinhaCsvAtividadeComCodigo = LinhaCsvAtividade & { codigo: string };

function normalizarHeader(h: string): string {
  return h
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectarDelimitador(primeiraLinha: string): ";" | "," {
  const sc = (primeiraLinha.match(/;/g) ?? []).length;
  const cc = (primeiraLinha.match(/,/g) ?? []).length;
  return sc >= cc ? ";" : ",";
}

/** Parser CSV (campos entre aspas, inclusive multilinha — exportação Sheets/Excel). */
export function parseCsvLinhas(texto: string): string[][] {
  const raw = texto.replace(/^\uFEFF/, "");
  if (!raw.trim()) return [];

  const delim = detectarDelimitador(raw.split(/\r?\n/)[0] ?? "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (inQuotes) {
      if (ch === '"') {
        if (raw[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === delim) {
      row.push(field.trim());
      field = "";
    } else if (ch === "\r") {
      // ignorado; quebra de linha vem com \n
    } else if (ch === "\n") {
      row.push(field.trim());
      field = "";
      if (row.some((c) => c.length > 0)) {
        rows.push(row);
      }
      row = [];
    } else {
      field += ch;
    }
  }

  row.push(field.trim());
  if (row.some((c) => c.length > 0)) {
    rows.push(row);
  }

  return rows;
}

export function extrairTipoEtapaCodigo(
  raw: string
): { tipo: string; etapa: string | null } | null {
  const t = raw.trim().toUpperCase();
  if (!t) return null;

  const comEtapa = t.match(/^(\d+E)-(.*)$/);
  if (comEtapa) {
    const etapa = comEtapa[1];
    const resto = comEtapa[2].trim();
    if ((TIPOS_CODIGO_ATIVIDADE as readonly string[]).includes(resto)) {
      return { tipo: resto, etapa };
    }
    const parsed = parsePartesCodigoAtividade(`${etapa}-${resto}`);
    if (parsed.reconhecido && parsed.tipo) {
      return { tipo: parsed.tipo.toUpperCase(), etapa };
    }
  }

  const parsed = parsePartesCodigoAtividade(t);
  if (parsed.reconhecido && parsed.tipo) {
    return { tipo: parsed.tipo.toUpperCase(), etapa: parsed.etapa };
  }

  if ((TIPOS_CODIGO_ATIVIDADE as readonly string[]).includes(t)) {
    return { tipo: t, etapa: null };
  }

  return null;
}

/** @deprecated Use extrairTipoEtapaCodigo */
export function extrairTipoCodigo(raw: string): string | null {
  return extrairTipoEtapaCodigo(raw)?.tipo ?? null;
}

/** Uma pessoa por linha (planilha) ou várias na mesma linha separadas por ; */
export function splitEquipe(raw: string | null | undefined): string[] {
  const s = (raw ?? "").trim();
  if (!s) return [];

  if (/\r?\n/.test(s)) {
    return s
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (s.includes(";")) {
    return s
      .split(/;/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [s];
}

export function parseAtividadesCsv(texto: string): {
  linhas: LinhaCsvAtividade[];
  erros: string[];
} {
  const tabela = parseCsvLinhas(texto);
  const erros: string[] = [];
  if (tabela.length < 2) {
    return { linhas: [], erros: ["O CSV precisa de cabeçalho e ao menos uma linha de dados."] };
  }

  const headers = tabela[0].map((h) => normalizarHeader(h));
  const idxTipo = headers.findIndex((h) => h === "tipo" || h === "codigo" || h === "codigo tipo");
  const idxDesc = headers.findIndex((h) => h === "descricao");
  const idxResp = headers.findIndex((h) => h === "responsavel");
  const idxEquipe = headers.findIndex((h) => h === "equipe");
  const idxInicio = headers.findIndex((h) => h === "inicio");
  const idxFim = headers.findIndex((h) => h === "fim");

  if (idxTipo < 0) {
    return {
      linhas: [],
      erros: ['Coluna obrigatória "tipo" (ou "codigo") não encontrada no cabeçalho.'],
    };
  }
  if (idxDesc < 0) {
    return { linhas: [], erros: ['Coluna obrigatória "descricao" não encontrada no cabeçalho.'] };
  }

  const linhas: LinhaCsvAtividade[] = [];

  for (let r = 1; r < tabela.length; r++) {
    const row = tabela[r];
    const linhaNum = r + 1;
    if (row.every((c) => !c.trim())) continue;

    const tipoRaw = row[idxTipo] ?? "";
    const parsedTipo = extrairTipoEtapaCodigo(tipoRaw);
    if (!parsedTipo) {
      erros.push(
        `Linha ${linhaNum}: tipo inválido "${tipoRaw}". Use DEB, 5E-DEB, MEL, 5E-MEL, etc.`
      );
      continue;
    }
    const { tipo, etapa } = parsedTipo;
    if (!(TIPOS_CODIGO_ATIVIDADE as readonly string[]).includes(tipo)) {
      erros.push(`Linha ${linhaNum}: tipo "${tipo}" não permitido.`);
      continue;
    }

    const descricao = (row[idxDesc] ?? "").trim();
    if (!descricao) {
      erros.push(`Linha ${linhaNum}: descrição vazia.`);
      continue;
    }

    const inicioRaw = idxInicio >= 0 ? row[idxInicio] : "";
    const fimRaw = idxFim >= 0 ? row[idxFim] : "";
    const inicio = inicioRaw?.trim() ? normalizarDataParaApi(inicioRaw) : null;
    const fim = fimRaw?.trim() ? normalizarDataParaApi(fimRaw) : null;
    if (inicioRaw?.trim() && !inicio) {
      erros.push(`Linha ${linhaNum}: data de início inválida "${inicioRaw}". Use DD/MM/AAAA.`);
      continue;
    }
    if (fimRaw?.trim() && !fim) {
      erros.push(`Linha ${linhaNum}: data final inválida "${fimRaw}". Use DD/MM/AAAA.`);
      continue;
    }

    linhas.push({
      tipo,
      etapa,
      descricao,
      responsavel: idxResp >= 0 ? (row[idxResp] ?? "").trim() || null : null,
      equipeMembros: idxEquipe >= 0 ? splitEquipe(row[idxEquipe]) : [],
      inicio,
      fim,
      linha: linhaNum,
    });
  }

  return { linhas, erros };
}

/** Gera códigos crescentes por tipo e etapa (ex.: 5E-MEL1, 5E-MEL2). */
export function atribuirCodigosAtividades(
  etapaPadrao: string,
  linhas: LinhaCsvAtividade[],
  codigosExistentes: string[]
): LinhaCsvAtividadeComCodigo[] {
  const etapaDefault = etapaPadrao.trim().toUpperCase();
  const maxPorChave = new Map<string, number>();

  for (const cod of codigosExistentes) {
    const p = parsePartesCodigoAtividade(cod);
    if (!p.reconhecido || !p.tipo || !p.etapa) continue;
    const chave = `${p.etapa.toUpperCase()}-${p.tipo}`;
    maxPorChave.set(chave, Math.max(maxPorChave.get(chave) ?? 0, p.numero));
  }

  return linhas.map((l) => {
    const etapaNorm = (l.etapa ?? etapaDefault).toUpperCase();
    const tipo = l.tipo.toUpperCase();
    const chave = `${etapaNorm}-${tipo}`;
    const next = (maxPorChave.get(chave) ?? 0) + 1;
    maxPorChave.set(chave, next);
    return {
      ...l,
      etapa: etapaNorm,
      codigo: `${etapaNorm}-${tipo}${next}`,
    };
  });
}
