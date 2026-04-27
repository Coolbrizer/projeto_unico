import type { Integrante, RefPgto } from "@/types/database";

function norm(s: string | null | undefined): string {
  return (s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Valor mensal na tabela ref_pgto para o par cargo + classe/padrão (texto comparado normalizado). */
export function valorMensalDoRef(
  refs: RefPgto[],
  cargo: string | null,
  classePadrao: string | null
): number {
  const c = norm(cargo);
  const cl = norm(classePadrao);
  const row = refs.find((r) => norm(r.cargo) === c && norm(r.classe_padrao) === cl);
  return row ? Number(row.valor_mensal) : 0;
}

export function totalDespesaMensalFolha(integrantes: Integrante[], refs: RefPgto[]) {
  let total = 0;
  const semCorrespondencia: Integrante[] = [];
  for (const i of integrantes) {
    const v = valorMensalDoRef(refs, i.cargo, i.classe_padrao);
    total += v;
    const temCargoOuClasse = Boolean(
      (i.cargo && i.cargo.trim()) || (i.classe_padrao && i.classe_padrao.trim())
    );
    if (temCargoOuClasse && v === 0) semCorrespondencia.push(i);
  }
  return { total, semCorrespondencia };
}

/** `month` no intervalo 1–12 (janeiro = 1). */
export function diasNoMes(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Proporção da folha de “mês cheio” aplicável ao mês civil (junho/dezembro proporcionais). */
export function fatorProporcaoFolhaMes(year: number, month: number): number {
  const dim = diasNoMes(year, month);
  if (month === 6) return (dim - 11) / dim;
  if (month === 12) return 19 / dim;
  return 1;
}

export type MesFolhaBreakdown = {
  mes: number;
  nomeMes: string;
  fator: number;
  diasConsiderados: number;
  valor: number;
};

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

function diasPagosNoMes(year: number, month: number): number {
  const dim = diasNoMes(year, month);
  if (month === 6) return dim - 11;
  if (month === 12) return 19;
  return dim;
}

/** Doze meses do ano civil com valores proporcionais em junho e dezembro. */
export function breakdownDespesaFolhaAno(year: number, folhaTotalMesCheio: number): {
  meses: MesFolhaBreakdown[];
  totalAno: number;
} {
  let totalAno = 0;
  const meses: MesFolhaBreakdown[] = [];
  for (let m = 1; m <= 12; m++) {
    const fator = fatorProporcaoFolhaMes(year, m);
    const valor = folhaTotalMesCheio * fator;
    totalAno += valor;
    meses.push({
      mes: m,
      nomeMes: NOMES_MESES[m - 1] ?? `Mês ${m}`,
      fator,
      diasConsiderados: diasPagosNoMes(year, m),
      valor,
    });
  }
  return { meses, totalAno };
}
