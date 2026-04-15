export const TIPOS_DOCUMENTO = [
  "Instrução de Serviço",
  "Portaria PGR/MPF",
  "Portaria SG/MPF",
] as const;

export type TipoDocumento = (typeof TIPOS_DOCUMENTO)[number];
