import type { OrcamentoCenarioLinha, RefPgto } from "@/types/database";

export function linhasAtivas(
  mesesPorRef: Record<string, number>,
  pessoasPorRef: Record<string, number>
): OrcamentoCenarioLinha[] {
  const ids = new Set([...Object.keys(mesesPorRef), ...Object.keys(pessoasPorRef)]);
  const linhas: OrcamentoCenarioLinha[] = [];
  for (const ref_pgto_id of ids) {
    const meses = mesesPorRef[ref_pgto_id] ?? 0;
    const pessoas = pessoasPorRef[ref_pgto_id] ?? 0;
    if (meses > 0 && pessoas > 0) {
      linhas.push({ ref_pgto_id, meses, pessoas });
    }
  }
  return linhas;
}

export function totaisDoCenario(
  linhas: OrcamentoCenarioLinha[],
  refPgto: RefPgto[]
): { totalPessoas: number; totalValor: number } {
  const refMap = new Map(refPgto.map((r) => [r.id, r]));
  let totalPessoas = 0;
  let totalValor = 0;
  for (const l of linhas) {
    const ref = refMap.get(l.ref_pgto_id);
    const valorMensal = Number(ref?.valor_mensal) || 0;
    totalPessoas += l.pessoas;
    totalValor += valorMensal * l.meses * l.pessoas;
  }
  return {
    totalPessoas,
    totalValor: Math.round(totalValor * 100) / 100,
  };
}

/** Ex.: "AN · C-12 (×2), TC · C-11 (×1)" */
export function resumoLinhasCenario(
  linhas: OrcamentoCenarioLinha[],
  refPgto: RefPgto[]
): string {
  const refMap = new Map(refPgto.map((r) => [r.id, r]));
  return linhas
    .map((l) => {
      const ref = refMap.get(l.ref_pgto_id);
      const cargo = (ref?.cargo ?? "").trim() || "—";
      const classe = (ref?.classe_padrao ?? "").trim() || "—";
      return `${cargo} · ${classe} (×${l.pessoas})`;
    })
    .join(", ");
}

export function estadoAPartirDasLinhas(linhas: OrcamentoCenarioLinha[]): {
  mesesPorRef: Record<string, number>;
  pessoasPorRef: Record<string, number>;
} {
  const mesesPorRef: Record<string, number> = {};
  const pessoasPorRef: Record<string, number> = {};
  for (const l of linhas) {
    mesesPorRef[l.ref_pgto_id] = l.meses;
    pessoasPorRef[l.ref_pgto_id] = l.pessoas;
  }
  return { mesesPorRef, pessoasPorRef };
}
