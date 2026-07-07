import { compararCodigoAtividade } from "@/lib/atividade-codigo";
import {
  integranteCorrespondenteAResponsavel,
  integranteVinculadoAEquipeAtividade,
} from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export type ResultadoVerificacaoIS = {
  atividades: Atividade[];
  pessoasVinculadas: Integrante[];
  pessoasSemAtividade: Integrante[];
};

function ordenarPorNome(integrantes: Integrante[]): Integrante[] {
  return [...integrantes].sort((a, b) =>
    (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
  );
}

/**
 * Verificação de dados da Instrução de Serviço selecionada:
 * - atividades cadastradas nessa IS (já filtradas pelo chamador);
 * - integrantes vinculados a alguma dessas atividades (mesmo critério da coluna
 *   «Equipes / funções»: setor, linha de equipe ou responsável);
 * - integrantes cadastrados no sistema que não aparecem em nenhuma delas.
 */
export function verificarDadosIS(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[]
): ResultadoVerificacaoIS {
  const codigos = new Map<string, Equipe[]>();
  for (const a of atividades) {
    const codigo = (a.codigo ?? "").trim();
    if (!codigo || codigos.has(codigo)) continue;
    codigos.set(
      codigo,
      equipes.filter((e) => (e.codigo ?? "").trim() === codigo)
    );
  }

  const vinculadosIds = new Set<string>();

  for (const [codigo, equipeRows] of codigos) {
    for (const i of integrantes) {
      if (integranteVinculadoAEquipeAtividade(i, codigo, equipeRows)) {
        vinculadosIds.add(i.id);
      }
    }
  }

  for (const a of atividades) {
    const integ = integranteCorrespondenteAResponsavel(integrantes, a.responsavel);
    if (integ) vinculadosIds.add(integ.id);
  }

  const pessoasVinculadas = ordenarPorNome(integrantes.filter((i) => vinculadosIds.has(i.id)));
  const pessoasSemAtividade = ordenarPorNome(
    integrantes.filter((i) => !vinculadosIds.has(i.id))
  );

  const atividadesOrdenadas = [...atividades].sort((a, b) =>
    compararCodigoAtividade(a.codigo ?? "", b.codigo ?? "")
  );

  return {
    atividades: atividadesOrdenadas,
    pessoasVinculadas,
    pessoasSemAtividade,
  };
}
