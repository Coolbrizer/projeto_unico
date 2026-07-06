import {
  extrairNomeExibicaoLinha,
  integranteCorrespondenteAResponsavel,
  integranteVinculadoAEquipeAtividade,
  nomesPessoaCorrespondem,
} from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

function codigosAtividadeIguais(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function extrairNomeResponsavel(
  atividade: Atividade,
  integrantes: Integrante[]
): string | null {
  const integ = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
  if (integ?.nome?.trim()) return integ.nome.trim();
  const raw = atividade.responsavel?.trim();
  if (!raw) return null;
  return extrairNomeExibicaoLinha(raw) || null;
}

/**
 * Todos os participantes da atividade (responsável + equipe), um nome por linha,
 * no mesmo espírito da coluna «Equipes / funções» da tela Equipe.
 */
export function textoEquipeParticipantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string {
  const codigo = String(atividade.codigo ?? "").trim();
  const equipeRows = codigo
    ? todasEquipes.filter((e) => codigosAtividadeIguais(String(e.codigo ?? ""), codigo))
    : [];

  const nomes: string[] = [];

  const jaListado = (nome: string) =>
    nomes.some((n) => nomesPessoaCorrespondem(n, nome));

  const addNome = (raw: string) => {
    const nome = extrairNomeExibicaoLinha(raw) || raw.trim();
    if (!nome || jaListado(nome)) return;
    nomes.push(nome);
  };

  for (const r of equipeRows) {
    addNome(r.equipe ?? "");
  }

  for (const i of integrantes) {
    if (integranteVinculadoAEquipeAtividade(i, codigo, equipeRows)) {
      addNome(i.nome ?? "");
    }
  }

  const respNome = extrairNomeResponsavel(atividade, integrantes);
  if (respNome) addNome(respNome);
  else if (atividade.responsavel?.trim()) addNome(atividade.responsavel);

  if (nomes.length === 0) return "—";

  nomes.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  return nomes.join("\n");
}
