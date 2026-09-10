import type { GrupoAtividade } from "@/lib/equipe-grupos";
import type { Integrante } from "@/types/database";

/** Matrícula no início da linha: `27601 | NOME`, `27601- NOME`, `27601 NOME`. */
const PREFIXO_MATRICULA_RESPONSAVEL = /^\s*(\d+)\s*[|│｜\-–—:]?\s*/;
const SEPARADORES_INICIO_NOME = /^[|│｜\-–—•·.,:;]+\s*/;

function normalizeNomeComparacao(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function removerPrefixosMatriculaEPontuacao(raw: string): string {
  let t = raw.replace(/\u200b/g, "").trim();
  if (!t) return "";

  const pipe = Math.max(t.lastIndexOf("|"), t.lastIndexOf("│"), t.lastIndexOf("｜"));
  if (pipe >= 0) t = t.slice(pipe + 1).trim();

  let anterior = "";
  while (t && t !== anterior) {
    anterior = t;
    t = t.replace(PREFIXO_MATRICULA_RESPONSAVEL, "").replace(SEPARADORES_INICIO_NOME, "").trim();
  }
  return t;
}

function extrairNomeParaComparacao(raw: string): string {
  return normalizarNomeSomenteLetras(raw);
}

/**
 * Nome só com letras (incluindo acentos) e espaços.
 * Remove matrícula, hífen/pipe iniciais e quaisquer números ou sinais.
 */
export function normalizarNomeSomenteLetras(raw: string): string {
  const base = removerPrefixosMatriculaEPontuacao(raw);
  if (!base) return "";
  return base
    .replace(/[^\p{L}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Nome para exibição a partir de linha de equipe (ex.: `5692 | JOAQUIM …` ou `27601- ISAC …`). */
export function extrairNomeExibicaoLinha(raw: string): string {
  return normalizarNomeSomenteLetras(raw);
}

/** Compara nomes ignorando acentos; aceita prefixo de 3 tokens (ex.: mesmo nome com sobrenome divergente). */
export function nomesPessoaCorrespondem(a: string, b: string): boolean {
  const na = normalizeNomeComparacao(extrairNomeParaComparacao(a));
  const nb = normalizeNomeComparacao(extrairNomeParaComparacao(b));
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;

  const ta = na.split(" ").filter(Boolean);
  const tb = nb.split(" ").filter(Boolean);
  const prefixLen = Math.min(3, ta.length, tb.length);
  if (prefixLen >= 3 && ta.slice(0, prefixLen).join(" ") === tb.slice(0, prefixLen).join(" ")) {
    return true;
  }
  return false;
}

/** Compara nome na tabela equipe com o texto de responsável (ex.: "20256 | ANDREIA …"). */
export function equipeLinhaEhResponsavel(
  nomeEquipe: string,
  responsavelAtividade: string | null | undefined
): boolean {
  if (!responsavelAtividade?.trim() || !nomeEquipe?.trim()) return false;
  return nomesPessoaCorrespondem(nomeEquipe, responsavelAtividade);
}

/** Nome do integrante (cadastro) corresponde ao texto do responsável na atividade. */
export function integranteNomeMatchResponsavelAtividade(
  nomeIntegrante: string | null | undefined,
  responsavelAtividade: string | null | undefined
): boolean {
  return equipeLinhaEhResponsavel((nomeIntegrante ?? "").trim(), responsavelAtividade);
}

export function integranteJaVinculadoAoGrupo(g: GrupoAtividade, i: Integrante): boolean {
  if (g.integrantes.some((x) => x.id === i.id)) return true;
  const nomeLc = (i.nome ?? "").trim().toLowerCase();
  if (!nomeLc) return false;
  for (const r of g.equipeRows) {
    const eq = (r.equipe ?? "").trim().toLowerCase();
    if (eq === nomeLc) return true;
    if (nomesPessoaCorrespondem(r.equipe ?? "", i.nome ?? "")) return true;
  }
  if (
    g.atividade?.responsavel &&
    integranteNomeMatchResponsavelAtividade(i.nome, g.atividade.responsavel)
  ) {
    return true;
  }
  return false;
}

export function integranteCorrespondenteAResponsavel(
  integrantes: Integrante[],
  responsavel: string | null | undefined
): Integrante | null {
  if (!responsavel?.trim()) return null;
  const raw = responsavel.trim();
  const mat = raw.match(PREFIXO_MATRICULA_RESPONSAVEL);
  if (mat) {
    const n = Number(mat[1]);
    if (Number.isFinite(n)) {
      const porMatricula = integrantes.find((i) => Number(i.matricula) === n);
      if (porMatricula) return porMatricula;
    }
  }
  for (const i of integrantes) {
    if (integranteNomeMatchResponsavelAtividade(i.nome, responsavel)) return i;
  }
  return null;
}

/** Integrante ligado à atividade via setor (código, micro/macro ou linha de equipe) ou nome na linha de equipe. */
export function integranteVinculadoAEquipeAtividade(
  integrante: Integrante,
  codigo: string,
  equipeRows: { equipe?: string | null }[]
): boolean {
  const s = (integrante.setor ?? "").trim().toLowerCase();
  const codigoLc = codigo.trim().toLowerCase();

  if (s && codigoLc && s === codigoLc) return true;

  const barra = s.indexOf("/");
  const micro = barra >= 0 ? s.slice(0, barra).trim() : s;
  const macro = barra >= 0 ? s.slice(barra + 1).trim() : "";

  for (const r of equipeRows) {
    const line = (r.equipe ?? "").trim();
    if (!line) continue;
    const lineLc = line.toLowerCase();

    if (s && (lineLc === s || lineLc === micro || (macro && lineLc === macro))) return true;

    if (equipeLinhaEhResponsavel(line, integrante.nome)) return true;
  }

  return false;
}

/** Inclui o responsável na lista de membros se ainda não estiver (importação CSV). */
export function equipeMembrosIncluindoResponsavel(
  membros: string[],
  responsavel: string | null | undefined
): string[] {
  const resp = responsavel?.trim();
  if (!resp) return membros;
  if (membros.some((m) => nomesPessoaCorrespondem(m, resp))) return membros;
  return [resp, ...membros];
}

/** Responsável da atividade sem linha correspondente na tabela equipe. */
export function responsavelAusenteNasLinhasEquipe(
  equipeRows: { equipe?: string | null }[],
  responsavel: string | null | undefined
): string | null {
  const resp = responsavel?.trim();
  if (!resp) return null;
  const naEquipe = equipeRows.some((r) => equipeLinhaEhResponsavel(r.equipe ?? "", resp));
  return naEquipe ? null : resp;
}
