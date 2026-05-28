import { macroSetorIntegrante } from "@/lib/integrante-setor-macro";
import {
  despesaFolhaPeriodo,
  integranteContaParaFolha,
  reducaoFeriasNoPeriodo,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import type { Integrante, OrcamentoCenarioFeriasLinha, RefPgto } from "@/types/database";

export function linhasFeriasAtivas(
  diasPorIntegrante: Record<string, number>
): OrcamentoCenarioFeriasLinha[] {
  const linhas: OrcamentoCenarioFeriasLinha[] = [];
  for (const [integrante_id, dias] of Object.entries(diasPorIntegrante)) {
    if (dias > 0) linhas.push({ integrante_id, dias_ferias: dias });
  }
  return linhas;
}

export function estadoAPartirDasLinhasFerias(
  linhas: OrcamentoCenarioFeriasLinha[]
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const l of linhas) {
    map[l.integrante_id] = l.dias_ferias;
  }
  return map;
}

export function totaisCenarioFerias(
  linhas: OrcamentoCenarioFeriasLinha[],
  integrantes: Integrante[],
  refPgto: RefPgto[],
  dataInicioISO: string,
  dataFimISO: string
): {
  totalEconomia: number;
  economiaSejud: number;
  economiaStic: number;
  diasPagos: number;
  erro?: string;
} {
  const diasPagos = despesaFolhaPeriodo(1, dataInicioISO, dataFimISO).diasPagosContados;
  const erro = despesaFolhaPeriodo(1, dataInicioISO, dataFimISO).erro;
  if (erro) {
    return { totalEconomia: 0, economiaSejud: 0, economiaStic: 0, diasPagos: 0, erro };
  }

  const porId = new Map(integrantes.map((i) => [i.id, i]));
  let economiaSejud = 0;
  let economiaStic = 0;

  for (const l of linhas) {
    const i = porId.get(l.integrante_id);
    if (!i || !integranteContaParaFolha(i)) continue;
    const valorMensal = valorMensalDoRef(refPgto, i.cargo, i.classe_padrao);
    const despesaPeriodo = despesaFolhaPeriodo(valorMensal, dataInicioISO, dataFimISO).total;
    const economia = reducaoFeriasNoPeriodo(despesaPeriodo, l.dias_ferias, diasPagos);
    if (macroSetorIntegrante(i.setor) === "STIC") economiaStic += economia;
    else economiaSejud += economia;
  }

  const totalEconomia = Math.round((economiaSejud + economiaStic) * 100) / 100;
  return {
    totalEconomia,
    economiaSejud: Math.round(economiaSejud * 100) / 100,
    economiaStic: Math.round(economiaStic * 100) / 100,
    diasPagos,
  };
}
