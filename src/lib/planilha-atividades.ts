import { compararCodigoAtividade } from "@/lib/atividade-codigo";
import {
  listarDemaisIntegrantes,
  nomeResponsavelAtividade,
} from "@/lib/prestacao-contas-equipe";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export const COLUNAS_PLANILHA_ATIVIDADES = [
  "Código",
  "Nome da atividade",
  "Responsável",
  "Demais integrantes",
] as const;

export function montarLinhasPlanilhaAtividades(
  atividades: Atividade[],
  integrantes: Integrante[],
  equipes: Equipe[]
): string[][] {
  const ordenadas = [...atividades].sort((a, b) =>
    compararCodigoAtividade(a.codigo ?? "", b.codigo ?? "")
  );

  return [
    [...COLUNAS_PLANILHA_ATIVIDADES],
    ...ordenadas.map((atividade) => [
      (atividade.codigo ?? "").trim(),
      (atividade.descricao ?? "").trim(),
      nomeResponsavelAtividade(atividade, integrantes),
      listarDemaisIntegrantes(atividade, integrantes, equipes).join("\n"),
    ]),
  ];
}

export function nomeArquivoPlanilhaAtividades(rotulo: string, plano: number | null): string {
  const base = rotulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const planoParte = plano !== null ? `-plano-${plano}` : "";
  return `atividades-${base || "instrucao"}${planoParte}.xlsx`;
}
