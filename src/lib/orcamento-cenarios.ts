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

const ROTULO_CARGO: Record<string, string> = {
  AN: "analista",
  TC: "técnico",
  CC: "coordenador",
};

function rotuloCargo(cargo: string): string {
  const cod = cargo.trim().toUpperCase();
  return ROTULO_CARGO[cod] ?? cargo.trim().toLowerCase() || "—";
}

/** Ex.: "analista (×3), técnico (×2)" */
export function resumoLinhasCenario(
  linhas: OrcamentoCenarioLinha[],
  refPgto: RefPgto[]
): string {
  const refMap = new Map(refPgto.map((r) => [r.id, r]));
  const porCargo = new Map<string, number>();
  for (const l of linhas) {
    const ref = refMap.get(l.ref_pgto_id);
    const rotulo = rotuloCargo(ref?.cargo ?? "");
    porCargo.set(rotulo, (porCargo.get(rotulo) ?? 0) + l.pessoas);
  }
  return [...porCargo.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "pt-BR"))
    .map(([rotulo, qtd]) => `${rotulo} (×${qtd})`)
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
