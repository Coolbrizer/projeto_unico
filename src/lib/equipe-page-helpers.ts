import type { GrupoAtividade } from "@/lib/equipe-grupos";
import type { Integrante } from "@/types/database";

/** ASCII `|`, pipe fullwidth (｜) e barra vertical (│) usados em cópias de planilhas. */
const PREFIXO_MATRICULA_RESPONSAVEL = /^\s*(\d+)\s*[|│｜]\s*/;

function normalizeNomeComparacao(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function extrairNomeParaComparacao(raw: string): string {
  const t = raw.trim();
  const pipe = t.lastIndexOf("|");
  return (pipe >= 0 ? t.slice(pipe + 1) : t).trim();
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
