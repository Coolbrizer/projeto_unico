export const COMPETENCIAS_AFASTAMENTO = [
  { competencia: "2026-06-01", label: "Junho", curto: "Jun", ano: 2026 },
  { competencia: "2026-07-01", label: "Julho", curto: "Jul", ano: 2026 },
  { competencia: "2026-08-01", label: "Agosto", curto: "Ago", ano: 2026 },
  { competencia: "2026-09-01", label: "Setembro", curto: "Set", ano: 2026 },
  { competencia: "2026-10-01", label: "Outubro", curto: "Out", ano: 2026 },
  { competencia: "2026-11-01", label: "Novembro", curto: "Nov", ano: 2026 },
  { competencia: "2026-12-01", label: "Dezembro", curto: "Dez", ano: 2026 },
] as const;

export type CompetenciaAfastamento = (typeof COMPETENCIAS_AFASTAMENTO)[number]["competencia"];

export const LIMIAR_DIAS_AFASTAMENTO = 34;

export type PeriodoAfastamento = { inicio: string; fim: string };

/** Usado só quando a instrução selecionada não tem período gravado. */
export const PERIODO_AFASTAMENTO_PADRAO: PeriodoAfastamento = {
  inicio: "2026-06-12",
  fim: "2026-12-19",
};

export const PERIODO_AFASTAMENTO_INICIO = PERIODO_AFASTAMENTO_PADRAO.inicio;
export const PERIODO_AFASTAMENTO_FIM = PERIODO_AFASTAMENTO_PADRAO.fim;

const NOMES_MES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function rotuloPeriodoAfastamento(periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO): string {
  const inicio = partesData(periodo.inicio);
  const fim = partesData(periodo.fim);
  if (!inicio || !fim) return "";
  const ini = `${inicio.dia} de ${NOMES_MES[inicio.mes - 1]}`;
  const end = `${fim.dia} de ${NOMES_MES[fim.mes - 1]}`;
  if (inicio.ano === fim.ano) return `${ini} até ${end} de ${inicio.ano}`;
  return `${ini} de ${inicio.ano} até ${end} de ${fim.ano}`;
}

export const PERIODO_AFASTAMENTO_ROTULO = rotuloPeriodoAfastamento();

export function isCompetenciaNoPeriodo(
  raw: string,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): boolean {
  const mes = partesData(`${raw.slice(0, 7)}-01`);
  const inicio = partesData(periodo.inicio);
  const fim = partesData(periodo.fim);
  if (!mes || !inicio || !fim) return false;
  const ordem = mes.ano * 12 + mes.mes;
  return ordem >= inicio.ano * 12 + inicio.mes && ordem <= fim.ano * 12 + fim.mes;
}

export function isCompetenciaAfastamento(raw: string): raw is CompetenciaAfastamento {
  return isCompetenciaNoPeriodo(raw);
}

function partesData(ymd: string): { ano: number; mes: number; dia: number } | null {
  const [ano, mes, dia] = ymd.slice(0, 10).split("-").map(Number);
  if (!ano || !mes || !dia) return null;
  return { ano, mes, dia };
}

/** Dias do mês que coincidem com o período informado. */
export function diasMaximosNoPeriodo(
  competencia: string,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): number {
  const mesRef = partesData(competencia.slice(0, 7) + "-01");
  const inicio = partesData(periodo.inicio);
  const fim = partesData(periodo.fim);
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

export function rotuloLimiteMes(
  competencia: string,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): string | null {
  const mesRef = partesData(competencia.slice(0, 7) + "-01");
  const inicio = partesData(periodo.inicio);
  const fim = partesData(periodo.fim);
  if (!mesRef || !inicio || !fim) return null;
  if (
    mesRef.ano === inicio.ano &&
    mesRef.mes === inicio.mes &&
    mesRef.ano === fim.ano &&
    mesRef.mes === fim.mes
  ) {
    return `${inicio.dia}–${fim.dia}`;
  }
  if (mesRef.ano === inicio.ano && mesRef.mes === inicio.mes) {
    const ultimoDia = new Date(mesRef.ano, mesRef.mes, 0).getDate();
    return `${inicio.dia}–${ultimoDia}`;
  }
  if (mesRef.ano === fim.ano && mesRef.mes === fim.mes) {
    return `1–${fim.dia}`;
  }
  return null;
}

export function parseDiasAfastamento(
  raw: unknown,
  competencia: string,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): number | null {
  const n = Number(raw);
  const max = diasMaximosNoPeriodo(competencia, periodo);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > max) return null;
  return n;
}

export function diasConsideradosNoPeriodo(
  competencia: string,
  raw: string | number | undefined,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): number {
  const max = diasMaximosNoPeriodo(competencia, periodo);
  const n = Number(raw ?? 0);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.max(0, Math.floor(n)), max);
}

export function podeGerirAfastamentos(role: string): boolean {
  return role === "gestor" || role === "admin";
}

export function totalDiasAfastamento(
  valores: Record<string, string | number | undefined>,
  competencias: readonly { competencia: string }[] = COMPETENCIAS_AFASTAMENTO,
  periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO
): number {
  return competencias.reduce(
    (soma, mes) => soma + diasConsideradosNoPeriodo(mes.competencia, valores[mes.competencia], periodo),
    0
  );
}

const NOMES_MES_CURTO = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const NOMES_MES_LONGO = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function competenciasDoPeriodo(periodo: PeriodoAfastamento = PERIODO_AFASTAMENTO_PADRAO): Array<{
  competencia: string;
  label: string;
  curto: string;
  ano: number;
}> {
  const inicio = partesData(periodo.inicio);
  const fim = partesData(periodo.fim);
  if (!inicio || !fim) return [];
  const lista: Array<{ competencia: string; label: string; curto: string; ano: number }> = [];
  let ano = inicio.ano;
  let mes = inicio.mes;
  while (ano < fim.ano || (ano === fim.ano && mes <= fim.mes)) {
    lista.push({
      competencia: `${String(ano).padStart(4, "0")}-${String(mes).padStart(2, "0")}-01`,
      label: NOMES_MES_LONGO[mes - 1] ?? `Mês ${mes}`,
      curto: NOMES_MES_CURTO[mes - 1] ?? String(mes),
      ano,
    });
    mes += 1;
    if (mes > 12) {
      mes = 1;
      ano += 1;
    }
  }
  return lista;
}
