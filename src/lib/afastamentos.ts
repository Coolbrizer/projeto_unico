export const COMPETENCIAS_AFASTAMENTO = [
  { competencia: "2026-06-01", label: "Junho", ano: 2026 },
  { competencia: "2026-07-01", label: "Julho", ano: 2026 },
  { competencia: "2026-08-01", label: "Agosto", ano: 2026 },
  { competencia: "2026-09-01", label: "Setembro", ano: 2026 },
  { competencia: "2026-10-01", label: "Outubro", ano: 2026 },
  { competencia: "2026-11-01", label: "Novembro", ano: 2026 },
  { competencia: "2026-12-01", label: "Dezembro", ano: 2026 },
] as const;

export type CompetenciaAfastamento = (typeof COMPETENCIAS_AFASTAMENTO)[number]["competencia"];

export const LIMIAR_DIAS_AFASTAMENTO = 34;

export const PERIODO_AFASTAMENTO_INICIO = "2026-06-12";
export const PERIODO_AFASTAMENTO_FIM = "2026-12-19";
export const PERIODO_AFASTAMENTO_ROTULO = "12 de junho até 19 de dezembro de 2026";

export function isCompetenciaAfastamento(raw: string): raw is CompetenciaAfastamento {
  return COMPETENCIAS_AFASTAMENTO.some((item) => item.competencia === raw);
}

function partesData(ymd: string): { ano: number; mes: number; dia: number } | null {
  const [ano, mes, dia] = ymd.slice(0, 10).split("-").map(Number);
  if (!ano || !mes || !dia) return null;
  return { ano, mes, dia };
}

/** Dias do mês que coincidem com 12/06 a 19/12/2026. */
export function diasMaximosNoPeriodo(competencia: string): number {
  const mesRef = partesData(competencia.slice(0, 7) + "-01");
  const inicio = partesData(PERIODO_AFASTAMENTO_INICIO);
  const fim = partesData(PERIODO_AFASTAMENTO_FIM);
  if (!mesRef || !inicio || !fim) return 0;

  if (mesRef.ano < inicio.ano || (mesRef.ano === inicio.ano && mesRef.mes < inicio.mes)) return 0;
  if (mesRef.ano > fim.ano || (mesRef.ano === fim.ano && mesRef.mes > fim.mes)) return 0;

  const ultimoDiaMes = new Date(mesRef.ano, mesRef.mes, 0).getDate();
  let diaInicio = 1;
  let diaFim = ultimoDiaMes;
  if (mesRef.ano === inicio.ano && mesRef.mes === inicio.mes) diaInicio = inicio.dia;
  if (mesRef.ano === fim.ano && mesRef.mes === fim.mes) diaFim = Math.min(diaFim, fim.dia);
  if (diaInicio > diaFim) return 0;
  return diaFim - diaInicio + 1;
}

export function rotuloLimiteMes(competencia: string): string | null {
  const mesRef = partesData(competencia.slice(0, 7) + "-01");
  const inicio = partesData(PERIODO_AFASTAMENTO_INICIO);
  const fim = partesData(PERIODO_AFASTAMENTO_FIM);
  if (!mesRef || !inicio || !fim) return null;
  if (mesRef.ano === inicio.ano && mesRef.mes === inicio.mes) {
    return `a partir do dia ${inicio.dia}`;
  }
  if (mesRef.ano === fim.ano && mesRef.mes === fim.mes) {
    return `até o dia ${fim.dia}`;
  }
  return null;
}

export function parseDiasAfastamento(raw: unknown, competencia: string): number | null {
  const n = Number(raw);
  const max = diasMaximosNoPeriodo(competencia);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > max) return null;
  return n;
}

export function diasConsideradosNoPeriodo(
  competencia: string,
  raw: string | number | undefined
): number {
  const max = diasMaximosNoPeriodo(competencia);
  const n = Number(raw ?? 0);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.max(0, Math.floor(n)), max);
}

export function podeGerirAfastamentos(role: string): boolean {
  return role === "gestor" || role === "admin";
}

export function totalDiasAfastamento(valores: Record<string, string | number | undefined>): number {
  return COMPETENCIAS_AFASTAMENTO.reduce(
    (soma, mes) => soma + diasConsideradosNoPeriodo(mes.competencia, valores[mes.competencia]),
    0
  );
}
