import {
  PERIODO_AFASTAMENTO_FIM,
  PERIODO_AFASTAMENTO_INICIO,
  diasConsideradosNoPeriodo,
} from "@/lib/afastamentos";
import {
  despesaFolhaPeriodo,
  integranteContaParaFolha,
  reducaoFeriasNoPeriodo,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import type { Integrante, RefPgto } from "@/types/database";

const NOMES_MESES = [
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

function isoDate(ano: number, mes: number, dia: number): string {
  return `${String(ano).padStart(4, "0")}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

function parseIso(iso: string): { ano: number; mes: number; dia: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  return { ano: Number(m[1]), mes: Number(m[2]), dia: Number(m[3]) };
}

export type MesPeriodoAfastamento = {
  competencia: string;
  label: string;
  ano: number;
  mes: number;
  inicioISO: string;
  fimISO: string;
};

export type MesFolhaAfastamento = MesPeriodoAfastamento & {
  diasPagos: number;
  gasto: number;
  abatimento: number;
  liquido: number;
};

export function mesesPeriodoAfastamento(): MesPeriodoAfastamento[] {
  const inicio = parseIso(PERIODO_AFASTAMENTO_INICIO);
  const fim = parseIso(PERIODO_AFASTAMENTO_FIM);
  if (!inicio || !fim) return [];

  const meses: MesPeriodoAfastamento[] = [];
  let ano = inicio.ano;
  let mes = inicio.mes;
  while (ano < fim.ano || (ano === fim.ano && mes <= fim.mes)) {
    const ultimoDia = new Date(ano, mes, 0).getDate();
    const diaInicio = ano === inicio.ano && mes === inicio.mes ? inicio.dia : 1;
    const diaFim = ano === fim.ano && mes === fim.mes ? fim.dia : ultimoDia;
    meses.push({
      competencia: isoDate(ano, mes, 1),
      label: NOMES_MESES[mes - 1] ?? `Mês ${mes}`,
      ano,
      mes,
      inicioISO: isoDate(ano, mes, diaInicio),
      fimISO: isoDate(ano, mes, diaFim),
    });
    mes += 1;
    if (mes > 12) {
      mes = 1;
      ano += 1;
    }
  }
  return meses;
}

export type ResumoFolhaAfastamentos = {
  gastoMensalCheio: number;
  gastoPeriodo: number;
  abatimentoPeriodo: number;
  liquidoPeriodo: number;
  pessoasNaFolha: number;
  semCorrespondencia: number;
  meses: MesFolhaAfastamento[];
};

export function resumoFolhaAfastamentos(
  integrantes: Integrante[],
  refs: RefPgto[],
  valores: Record<string, Record<string, string | number | undefined>>
): ResumoFolhaAfastamentos {
  const meses: MesFolhaAfastamento[] = mesesPeriodoAfastamento().map((mes) => ({
    ...mes,
    diasPagos: despesaFolhaPeriodo(1, mes.inicioISO, mes.fimISO).diasPagosContados,
    gasto: 0,
    abatimento: 0,
    liquido: 0,
  }));

  let pessoasNaFolha = 0;
  let semCorrespondencia = 0;
  let gastoMensalCheio = 0;

  for (const integrante of integrantes) {
    if (!integranteContaParaFolha(integrante)) continue;
    pessoasNaFolha += 1;
    const valorMensal = valorMensalDoRef(refs, integrante.cargo, integrante.classe_padrao);
    gastoMensalCheio += valorMensal;
    const temCargoOuClasse = Boolean(
      integrante.cargo?.trim() || integrante.classe_padrao?.trim()
    );
    if (temCargoOuClasse && valorMensal === 0) semCorrespondencia += 1;

    for (const mes of meses) {
      const gastoPessoa = despesaFolhaPeriodo(valorMensal, mes.inicioISO, mes.fimISO).total;
      const diasAfastamento = diasConsideradosNoPeriodo(
        mes.competencia,
        valores[integrante.id]?.[mes.competencia]
      );
      const abatimentoPessoa = reducaoFeriasNoPeriodo(
        gastoPessoa,
        diasAfastamento,
        mes.diasPagos
      );
      mes.gasto += gastoPessoa;
      mes.abatimento += abatimentoPessoa;
    }
  }

  for (const mes of meses) {
    mes.gasto = Math.round(mes.gasto * 100) / 100;
    mes.abatimento = Math.round(mes.abatimento * 100) / 100;
    mes.liquido = Math.round((mes.gasto - mes.abatimento) * 100) / 100;
  }

  const gastoPeriodo = Math.round(meses.reduce((soma, mes) => soma + mes.gasto, 0) * 100) / 100;
  const abatimentoPeriodo =
    Math.round(meses.reduce((soma, mes) => soma + mes.abatimento, 0) * 100) / 100;

  return {
    gastoMensalCheio: Math.round(gastoMensalCheio * 100) / 100,
    gastoPeriodo,
    abatimentoPeriodo,
    liquidoPeriodo: Math.round((gastoPeriodo - abatimentoPeriodo) * 100) / 100,
    pessoasNaFolha,
    semCorrespondencia,
    meses,
  };
}
