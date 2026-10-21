import type { OrcamentoCenarioLinha, RefPgto } from "@/types/database";

/** Mês comercial usado para converter o valor mensal da referência em valor diário. */
export const DIAS_MES_REFERENCIA = 30;

export function diasDaLinha(linha: { dias?: number; meses?: number }): number {
  const dias = Number(linha.dias);
  if (Number.isFinite(dias) && dias > 0) return Math.floor(dias);
  const meses = Number(linha.meses);
  if (Number.isFinite(meses) && meses > 0) return Math.floor(meses) * DIAS_MES_REFERENCIA;
  return 0;
}

export function totalLinhaRefPgto(valorMensal: number, dias: number, pessoas: number): number {
  if (dias <= 0 || pessoas <= 0 || valorMensal <= 0) return 0;
  return (valorMensal / DIAS_MES_REFERENCIA) * dias * pessoas;
}

export function linhasAtivas(
  diasPorRef: Record<string, number>,
  pessoasPorRef: Record<string, number>
): OrcamentoCenarioLinha[] {
  const ids = new Set([...Object.keys(diasPorRef), ...Object.keys(pessoasPorRef)]);
  const linhas: OrcamentoCenarioLinha[] = [];
  for (const ref_pgto_id of ids) {
    const dias = diasPorRef[ref_pgto_id] ?? 0;
    const pessoas = pessoasPorRef[ref_pgto_id] ?? 0;
    if (dias > 0 && pessoas > 0) {
      linhas.push({ ref_pgto_id, dias, pessoas });
    }
  }
  return linhas;
}

export function totaisDoCenario(
  linhas: OrcamentoCenarioLinha[],
  refPgto: RefPgto[]
): { totalPessoas: number; totalValor: number; linhasSemReferencia: number } {
  const refMap = new Map(refPgto.map((r) => [r.id, r]));
  let totalPessoas = 0;
  let totalValor = 0;
  let linhasSemReferencia = 0;
  for (const l of linhas) {
    const ref = refMap.get(l.ref_pgto_id);
    if (!ref) linhasSemReferencia += 1;
    const valorMensal = Number(ref?.valor_mensal) || 0;
    totalPessoas += l.pessoas;
    totalValor += totalLinhaRefPgto(valorMensal, diasDaLinha(l), l.pessoas);
  }
  return {
    totalPessoas,
    totalValor: Math.round(totalValor * 100) / 100,
    linhasSemReferencia,
  };
}

const ROTULO_CARGO: Record<string, string> = {
  AN: "analista",
  TC: "técnico",
  CC: "coordenador",
};

function rotuloCargo(cargo: string): string {
  const cod = cargo.trim().toUpperCase();
  return ROTULO_CARGO[cod] ?? (cargo.trim().toLowerCase() || "—");
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
  diasPorRef: Record<string, number>;
  pessoasPorRef: Record<string, number>;
} {
  const diasPorRef: Record<string, number> = {};
  const pessoasPorRef: Record<string, number> = {};
  for (const l of linhas) {
    diasPorRef[l.ref_pgto_id] = diasDaLinha(l);
    pessoasPorRef[l.ref_pgto_id] = l.pessoas;
  }
  return { diasPorRef, pessoasPorRef };
}
