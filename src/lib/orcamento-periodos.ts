/** Períodos orçamentários definidos, independentes da instrução de serviço. */
export type PeriodoOrcamento = {
  id: string;
  inicio: string;
  fim: string;
  valorAprovado: number;
};

export const PERIODOS_ORCAMENTO: PeriodoOrcamento[] = [
  {
    id: "2026-06-12_2026-12-18",
    inicio: "2026-06-12",
    fim: "2026-12-18",
    valorAprovado: 1_850_000,
  },
];

export const PERIODO_ORCAMENTO_INICIAL = PERIODOS_ORCAMENTO[0];

export type ExecucaoMensal = {
  ano: number;
  mes: number;
  valor_executado: number;
};

export function periodoOrcamentoPorId(id: string): PeriodoOrcamento | null {
  return PERIODOS_ORCAMENTO.find((p) => p.id === id) ?? null;
}

/** O mês civil cruza o período (mesmo que só em parte). */
export function mesEstaNoPeriodo(periodo: PeriodoOrcamento, ano: number, mes: number): boolean {
  if (mes < 1 || mes > 12) return false;
  const inicioMes = `${ano}-${String(mes).padStart(2, "0")}-01`;
  const ultimo = new Date(ano, mes, 0).getDate();
  const fimMes = `${ano}-${String(mes).padStart(2, "0")}-${String(ultimo).padStart(2, "0")}`;
  return fimMes >= periodo.inicio && inicioMes <= periodo.fim;
}
