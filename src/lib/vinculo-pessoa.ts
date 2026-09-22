export const VINCULO_INTEGRANTE = "integrante" as const;
export const VINCULO_COLABORADOR = "colaborador" as const;

export type VinculoPessoa = typeof VINCULO_INTEGRANTE | typeof VINCULO_COLABORADOR;

export function parseVinculo(raw: unknown): VinculoPessoa {
  return raw === VINCULO_COLABORADOR ? VINCULO_COLABORADOR : VINCULO_INTEGRANTE;
}

export function vinculoEhColaborador(raw: unknown): boolean {
  return parseVinculo(raw) === VINCULO_COLABORADOR;
}

export function rotuloVinculo(raw: unknown): string {
  return vinculoEhColaborador(raw) ? "Colaborador" : "Integrante";
}
