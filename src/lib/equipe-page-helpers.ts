import type { Integrante } from "@/types/database";

/** Compara nome na tabela equipe com o texto de responsável (ex.: "20256 | ANDREIA …"). */
export function equipeLinhaEhResponsavel(
  nomeEquipe: string,
  responsavelAtividade: string | null | undefined
): boolean {
  if (!responsavelAtividade?.trim() || !nomeEquipe?.trim()) return false;
  const eq = nomeEquipe.trim().toLowerCase();
  const raw = responsavelAtividade.trim();
  const pipe = raw.lastIndexOf("|");
  const nomeDoResp = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim().toLowerCase();
  if (eq === nomeDoResp) return true;
  if (eq === raw.toLowerCase()) return true;
  return nomeDoResp.includes(eq) || eq.includes(nomeDoResp);
}

/** Nome do integrante (cadastro) corresponde ao texto do responsável na atividade. */
export function integranteNomeMatchResponsavelAtividade(
  nomeIntegrante: string | null | undefined,
  responsavelAtividade: string | null | undefined
): boolean {
  return equipeLinhaEhResponsavel((nomeIntegrante ?? "").trim(), responsavelAtividade);
}

/** ASCII `|`, pipe fullwidth (｜) e barra vertical (│) usados em cópias de planilhas. */
const PREFIXO_MATRICULA_RESPONSAVEL = /^\s*(\d+)\s*[|│｜]\s*/;

/**
 * Encontra o integrante do responsável pela atividade.
 * Prioridade: matrícula no início (ex.: "21734 | TIAGO CESAR MORONTE"), depois o mesmo critério de nome já usado na UI.
 */
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
