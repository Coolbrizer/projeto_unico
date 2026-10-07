/** Minúsculas e sem acentos: "Valadão" e "valadao" passam a ser o mesmo texto. */
export function normalizarTextoBusca(valor: string): string {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Cada palavra da busca precisa aparecer em pelo menos um campo.
 * Acentuação não restringe o resultado.
 */
export function camposCorrespondemBusca(
  campos: Array<string | number | null | undefined>,
  raw: string
): boolean {
  const consulta = normalizarTextoBusca(raw).trim();
  if (!consulta) return true;
  const tokens = consulta.split(/\s+/).filter(Boolean);
  const normalizados = campos.map((campo) => normalizarTextoBusca(String(campo ?? "")));
  return tokens.every((token) => normalizados.some((campo) => campo.includes(token)));
}
