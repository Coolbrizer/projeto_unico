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
