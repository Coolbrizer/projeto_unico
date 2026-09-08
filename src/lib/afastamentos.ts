export const COMPETENCIAS_AFASTAMENTO = [
  { competencia: "2026-09-01", label: "Setembro", ano: 2026 },
  { competencia: "2026-10-01", label: "Outubro", ano: 2026 },
  { competencia: "2026-11-01", label: "Novembro", ano: 2026 },
  { competencia: "2026-12-01", label: "Dezembro", ano: 2026 },
] as const;

export type CompetenciaAfastamento = (typeof COMPETENCIAS_AFASTAMENTO)[number]["competencia"];

export const LIMIAR_DIAS_AFASTAMENTO = 34;

export function isCompetenciaAfastamento(raw: string): raw is CompetenciaAfastamento {
  return COMPETENCIAS_AFASTAMENTO.some((item) => item.competencia === raw);
}

export function parseDiasAfastamento(raw: unknown): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > 31) return null;
  return n;
}

export function podeGerirAfastamentos(role: string): boolean {
  return role === "gestor" || role === "admin";
}

export function totalDiasAfastamento(valores: Record<string, string | number | undefined>): number {
  return COMPETENCIAS_AFASTAMENTO.reduce((soma, mes) => {
    const n = Number(valores[mes.competencia] ?? 0);
    return soma + (Number.isFinite(n) ? n : 0);
  }, 0);
}
