import type { Documento } from "@/types/database";

/** Número da referência com pelo menos 2 dígitos (ex.: 4 → "04") quando for inteiro válido. */
export function formatNumeroDocumentoReferencia(numero: number | string | null | undefined): string {
  const n = parseInt(String(numero ?? "").trim(), 10);
  if (Number.isFinite(n) && n >= 0) return String(n).padStart(2, "0");
  return String(numero ?? "").trim();
}

/**
 * Rótulo completo do documento com referência numérica.
 * Ex.: `Instrução de Serviço nº 04/2022`
 */
export function rotuloDocumentoNumeroAno(d: Pick<Documento, "tipo" | "numero" | "ano">): string {
  const anoStr = String(d.ano ?? "").trim();
  const temNumero = d.numero != null && String(d.numero).trim() !== "";
  const temAno = anoStr !== "";
  if (!temNumero || !temAno) {
    const t = (d.tipo ?? "").trim();
    return t || "Documento";
  }
  const tipo = (d.tipo ?? "Documento").trim();
  const numStr = formatNumeroDocumentoReferencia(d.numero);
  return `${tipo} nº ${numStr}/${anoStr}`;
}
