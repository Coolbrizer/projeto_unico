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

/** Primeiro dia em que a folha passa a contar para o orçamento (inclusivo). */
export const DATA_ORCAMENTO_INICIO_ISO = "2026-06-12";

function ymdNum(y: number, m: number, d: number): number {
  return y * 10000 + m * 100 + d;
}

const CORTE_ORCAMENTO = ymdNum(2026, 6, 12);

/** Proporção só com regras de calendário (jan/jun/dez), sem corte de vigência. */
function fatorRegrasCalendario(year: number, month: number): number {
  const dim = diasNoMes(year, month);
  if (month === 1) return (dim - 6) / dim;
  if (month === 6) return (dim - 11) / dim;
  if (month === 12) return 19 / dim;
  return 1;
}

/** Proporção da folha de “mês cheio” aplicável ao mês civil (meses parciais proporcionais). */
export function fatorProporcaoFolhaMes(year: number, month: number): number {
  const dim = diasNoMes(year, month);
  if (ymdNum(year, month, dim) < CORTE_ORCAMENTO) return 0;
  return fatorRegrasCalendario(year, month);
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
  if (ymdNum(year, month, dim) < CORTE_ORCAMENTO) return 0;
  if (month === 1) return dim - 6;
  if (month === 6) return dim - 11;
  if (month === 12) return 19;
  return dim;
}

/** Dia civil conta para folha naquele mês (alinhado a `fatorProporcaoFolhaMes`). */
export function diaContaPagamentoFolha(year: number, month: number, day: number): boolean {
  const dim = diasNoMes(year, month);
  if (day < 1 || day > dim) return false;
  if (ymdNum(year, month, day) < CORTE_ORCAMENTO) return false;
  if (month === 1) return day >= 7;
  if (month === 6) return day >= 12;
  if (month === 12) return day <= 19;
  return true;
}

function parseISODateLocal(iso: string): { y: number; m: number; d: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || !Number.isFinite(y)) return null;
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return { y, m: mo, d };
}

/**
 * Estimativa da folha no intervalo [início, fim], somando para cada dia “pago”
 * `folhaTotalMesCheio / diasNoMes` (mesmas regras de jan/jun/dez que o breakdown anual).
 */
export function despesaFolhaPeriodo(
  folhaTotalMesCheio: number,
  inicioISO: string,
  fimISO: string
): { total: number; diasPagosContados: number; erro?: string } {
  const pi = parseISODateLocal(inicioISO);
  const pf = parseISODateLocal(fimISO);
  if (!pi || !pf) return { total: 0, diasPagosContados: 0, erro: "Informe datas válidas." };
  const t0 = new Date(pi.y, pi.m - 1, pi.d);
  const t1 = new Date(pf.y, pf.m - 1, pf.d);
  if (t1 < t0)
    return {
      total: 0,
      diasPagosContados: 0,
      erro: "A data final deve ser igual ou posterior à inicial.",
    };

  let total = 0;
  let diasPagosContados = 0;
  const cursor = new Date(t0);
  while (cursor <= t1) {
    const y = cursor.getFullYear();
    const mo = cursor.getMonth() + 1;
    const d = cursor.getDate();
    if (diaContaPagamentoFolha(y, mo, d)) {
      total += folhaTotalMesCheio / diasNoMes(y, mo);
      diasPagosContados += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return { total: Math.round(total * 100) / 100, diasPagosContados };
}

/** Doze meses do ano civil com valores proporcionais em janeiro, junho e dezembro. */
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
