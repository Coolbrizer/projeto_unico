import type { Documento } from "@/types/database";

function parseIntSeguro(s: string | number | null | undefined): number {
  const n = parseInt(String(s ?? "").trim(), 10);
  return Number.isFinite(n) ? n : -1;
}

function temReferenciaNumerica(d: Pick<Documento, "ano" | "numero">): boolean {
  const ano = String(d.ano ?? "").trim();
  const numero = String(d.numero ?? "").trim();
  return ano !== "" && numero !== "" && parseIntSeguro(ano) >= 0 && parseIntSeguro(numero) >= 0;
}

/**
 * Do mais novo para o mais antigo: ano mais recente primeiro; no mesmo ano, número maior primeiro
 * (ex.: 5/2025 antes de 1/2025).
 * Registros legados (sem número/ano) ficam ao final, por data de cadastro (mais recente primeiro).
 */
export function ordenarDocumentosPorReferencia(documentos: Documento[]): Documento[] {
  return [...documentos].sort((a, b) => {
    const refA = temReferenciaNumerica(a);
    const refB = temReferenciaNumerica(b);
    if (!refA && !refB) {
      return (b.created_at ?? "").localeCompare(a.created_at ?? "");
    }
    if (!refA) return 1;
    if (!refB) return -1;

    const anoA = parseIntSeguro(a.ano);
    const anoB = parseIntSeguro(b.ano);
    if (anoB !== anoA) return anoB - anoA;

    const numA = parseIntSeguro(a.numero);
    const numB = parseIntSeguro(b.numero);
    if (numB !== numA) return numB - numA;

    return (a.tipo ?? "").localeCompare(b.tipo ?? "", "pt-BR", { sensitivity: "base" });
  });
}
