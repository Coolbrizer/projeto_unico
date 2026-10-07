import {
  extrairNomeExibicaoLinha,
  integranteCorrespondenteAResponsavel,
  integranteVinculadoAEquipeAtividade,
  normalizarNomeSomenteLetras,
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
  if (integ?.nome?.trim()) {
    return normalizarNomeSomenteLetras(integ.nome) || null;
  }
  const raw = atividade.responsavel?.trim();
  if (!raw) return null;
  return extrairNomeExibicaoLinha(raw) || null;
}

function ordenarNomes(nomes: string[]): string[] {
  return [...nomes].sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}

/** Nome do responsável, sem matrícula nem pontuação, quando for possível identificá-lo. */
export function nomeResponsavelAtividade(
  atividade: Atividade,
  integrantes: Integrante[]
): string {
  return extrairNomeResponsavel(atividade, integrantes) ?? atividade.responsavel?.trim() ?? "";
}

/**
 * Participantes da atividade (responsável + equipe), no mesmo espírito da coluna
 * «Equipes / funções» da tela Equipe.
 */
export function listarNomesParticipantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string[] {
  const codigo = String(atividade.codigo ?? "").trim();
  const equipeRows = codigo
    ? todasEquipes.filter((e) => codigosAtividadeIguais(String(e.codigo ?? ""), codigo))
    : [];

  const nomes: string[] = [];

  const jaListado = (nome: string) => nomes.some((n) => nomesPessoaCorrespondem(n, nome));

  const addNome = (raw: string) => {
    const nome = normalizarNomeSomenteLetras(raw);
    if (!nome || jaListado(nome)) return;
    nomes.push(nome);
  };

  for (const i of integrantes) {
    if (integranteVinculadoAEquipeAtividade(i, codigo, equipeRows)) {
      addNome(i.nome ?? "");
    }
  }

  for (const r of equipeRows) {
    for (const linha of String(r.equipe ?? "").split(/\r?\n/)) {
      addNome(linha);
    }
  }

  const respNome = nomeResponsavelAtividade(atividade, integrantes);
  if (respNome) addNome(respNome);

  return ordenarNomes(nomes);
}

/** Integrantes da atividade, sem o responsável. */
export function listarDemaisIntegrantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string[] {
  const respNome = nomeResponsavelAtividade(atividade, integrantes);
  const respOriginal = atividade.responsavel ?? "";
  return listarNomesParticipantes(atividade, integrantes, todasEquipes).filter(
    (nome) => !nomesPessoaCorrespondem(nome, respNome) && !nomesPessoaCorrespondem(nome, respOriginal)
  );
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
  const nomes = listarNomesParticipantes(atividade, integrantes, todasEquipes);
  if (nomes.length === 0) return "—";
  return nomes.join("\n");
}
