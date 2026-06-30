import { parsePartesCodigoAtividade } from "@/lib/atividade-codigo";
import { normalizarDataParaApi } from "@/lib/datas-atividade";

export const TIPOS_CODIGO_ATIVIDADE = ["BD", "INF", "DEB", "IA", "MEL", "INT", "NF"] as const;
export const ETAPAS_CODIGO_ATIVIDADE = ["1E", "2E", "3E", "4E", "5E"] as const;

export type LinhaCsvAtividade = {
  tipo: string;
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

function detectarDelimitador(linha: string): ";" | "," {
  const sc = (linha.match(/;/g) ?? []).length;
  const cc = (linha.match(/,/g) ?? []).length;
  return sc >= cc ? ";" : ",";
}

/** Parser CSV simples (suporta campos entre aspas). */
export function parseCsvLinhas(texto: string): string[][] {
  const raw = texto.replace(/^\uFEFF/, "");
  const linhas = raw.split(/\r?\n/).filter((l) => l.trim());
  if (linhas.length === 0) return [];

  const delim = detectarDelimitador(linhas[0]);
  const out: string[][] = [];

  for (const linha of linhas) {
    const campos: string[] = [];
    let cur = "";
    let emAspas = false;
    for (let i = 0; i < linha.length; i++) {
      const ch = linha[i];
      if (ch === '"') {
        if (emAspas && linha[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          emAspas = !emAspas;
        }
      } else if (ch === delim && !emAspas) {
        campos.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    campos.push(cur.trim());
    out.push(campos);
  }
  return out;
}

export function extrairTipoCodigo(raw: string): string | null {
  const t = raw.trim().toUpperCase();
  if (!t) return null;

  const comEtapa = t.match(/^(\d+E)-(.*)$/);
  const resto = comEtapa ? comEtapa[2] : t;
  const etapaFake = comEtapa ? comEtapa[1] : "5E";
  const parsed = parsePartesCodigoAtividade(`${etapaFake}-${resto}`);
  if (parsed.reconhecido && parsed.tipo) {
    return parsed.tipo.toUpperCase();
  }

  if ((TIPOS_CODIGO_ATIVIDADE as readonly string[]).includes(t)) return t;
  return null;
}

function splitEquipe(raw: string | null | undefined): string[] {
  const s = (raw ?? "").trim();
  if (!s) return [];
  return s
    .split(/[;|]/)
    .map((x) => x.trim())
    .filter(Boolean);
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
    const tipo = extrairTipoCodigo(tipoRaw);
    if (!tipo) {
      erros.push(`Linha ${linhaNum}: tipo inválido "${tipoRaw}". Use BD, INF, DEB, IA, MEL, INT ou NF.`);
      continue;
    }
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

/** Gera códigos crescentes por tipo (ex.: 5E-MEL1, 5E-MEL2) a partir dos já existentes na IS. */
export function atribuirCodigosAtividades(
  etapa: string,
  linhas: LinhaCsvAtividade[],
  codigosExistentes: string[]
): LinhaCsvAtividadeComCodigo[] {
  const etapaNorm = etapa.trim().toUpperCase();
  const maxPorTipo = new Map<string, number>();

  for (const cod of codigosExistentes) {
    const p = parsePartesCodigoAtividade(cod);
    if (!p.reconhecido || !p.tipo) continue;
    if ((p.etapa ?? "").toUpperCase() !== etapaNorm) continue;
    maxPorTipo.set(p.tipo, Math.max(maxPorTipo.get(p.tipo) ?? 0, p.numero));
  }

  return linhas.map((l) => {
    const tipo = l.tipo.toUpperCase();
    const next = (maxPorTipo.get(tipo) ?? 0) + 1;
    maxPorTipo.set(tipo, next);
    return {
      ...l,
      codigo: `${etapaNorm}-${tipo}${next}`,
    };
  });
}
