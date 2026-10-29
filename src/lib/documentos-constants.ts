export const TIPOS_DOCUMENTO = [
  "Instrução de Serviço",
  "Portaria PGR/MPF",
  "Portaria SG/MPF",
  "PGEA",
  "Memorandos",
] as const;

export type TipoDocumento = (typeof TIPOS_DOCUMENTO)[number];

/** Nestes tipos, só etiqueta e link são obrigatórios. */
const TIPOS_SO_ETIQUETA_E_LINK = ["PGEA", "Memorandos"] as const satisfies readonly TipoDocumento[];

export function tipoDocumentoSoEtiquetaELink(tipo: string): boolean {
  return (TIPOS_SO_ETIQUETA_E_LINK as readonly string[]).includes(tipo);
}
