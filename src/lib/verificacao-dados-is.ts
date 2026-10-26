import { compararCodigoAtividade } from "@/lib/atividade-codigo";
import { normalizarTextoBusca } from "@/lib/busca-texto";
import {
  extrairMatriculaLinha,
  extrairNomeExibicaoLinha,
  integranteCorrespondenteAResponsavel,
  integranteVinculadoAEquipeAtividade,
  nomesPessoaCorrespondem,
} from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export type PessoaNaoCadastradaNaIS = {
  nome: string;
  matricula: number | null;
  codigos: string[];
};

export type ResultadoVerificacaoIS = {
  atividades: Atividade[];
  pessoasVinculadas: Integrante[];
  pessoasSemAtividade: Integrante[];
  pessoasNaoCadastradas: PessoaNaoCadastradaNaIS[];
};

function ordenarPorNome(integrantes: Integrante[]): Integrante[] {
  return [...integrantes].sort((a, b) =>
    (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
  );
}

function tokensNome(raw: string): string[] {
  return normalizarTextoBusca(extrairNomeExibicaoLinha(raw)).split(" ").filter(Boolean);
}

/**
 * Nome curto da IS corresponde a um cadastro mais longo.
 * Ex.: "GRAZIELE GONÇALVES" e "KONRAD AMARAL" batem com o nome completo;
 * uma inicial, como "P." em "ERICA GARCIA P. ARROCHELA LOBO", vale como sobrenome abreviado.
 */
function nomeAbreviadoCorresponde(linha: string, cadastro: string): boolean {
  const citados = tokensNome(linha);
  const cadastrados = tokensNome(cadastro);
  if (citados.length < 2 || cadastrados.length < 2) return false;
  if (citados[0] !== cadastrados[0]) return false;

  let indiceCadastro = 1;
  for (let i = 1; i < citados.length; i++) {
    const token = citados[i];
    let achou = false;
    while (indiceCadastro < cadastrados.length) {
      const alvo = cadastrados[indiceCadastro];
      indiceCadastro += 1;
      if (alvo === token || (token.length === 1 && alvo.startsWith(token))) {
        achou = true;
        break;
      }
    }
    if (!achou) return false;
  }
  return true;
}

function pessoaJaCadastrada(texto: string, integrantes: Integrante[]): boolean {
  if (integranteCorrespondenteAResponsavel(integrantes, texto)) return true;
  return integrantes.some((integrante) => nomeAbreviadoCorresponde(texto, integrante.nome ?? ""));
}

function registrarPessoaNaoCadastrada(
  itens: PessoaNaoCadastradaNaIS[],
  raw: string,
  codigo: string,
  integrantes: Integrante[]
) {
  const texto = raw.trim();
  if (!texto) return;
  if (pessoaJaCadastrada(texto, integrantes)) return;

  const nome = extrairNomeExibicaoLinha(texto);
  if (!nome) return;
  const matricula = extrairMatriculaLinha(texto);
  const codigoLimpo = codigo.trim();
  const existente = itens.find(
    (pessoa) =>
      (matricula != null && pessoa.matricula === matricula) ||
      nomesPessoaCorrespondem(pessoa.nome, nome)
  );

  if (existente) {
    if (matricula != null && existente.matricula == null) existente.matricula = matricula;
    if (nome.length > existente.nome.length) existente.nome = nome;
    if (codigoLimpo && !existente.codigos.includes(codigoLimpo)) existente.codigos.push(codigoLimpo);
    return;
  }

  itens.push({
    nome,
    matricula,
    codigos: codigoLimpo ? [codigoLimpo] : [],
  });
}

/**
 * Pessoas citadas na IS (linha de equipe ou responsável) que não correspondem
 * a nenhum integrante do cadastro, nem por matrícula nem por nome.
 */
export function listarPessoasNaoCadastradasNaIS(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[]
): PessoaNaoCadastradaNaIS[] {
  const itens: PessoaNaoCadastradaNaIS[] = [];

  for (const equipe of equipes) {
    const codigo = equipe.codigo ?? "";
    for (const linha of String(equipe.equipe ?? "").split(/\r?\n/)) {
      registrarPessoaNaoCadastrada(itens, linha, codigo, integrantes);
    }
  }

  for (const atividade of atividades) {
    registrarPessoaNaoCadastrada(itens, atividade.responsavel ?? "", atividade.codigo ?? "", integrantes);
  }

  for (const pessoa of itens) {
    pessoa.codigos.sort((a, b) => compararCodigoAtividade(a, b));
  }

  return itens.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));
}

/**
 * Verificação de dados da Instrução de Serviço selecionada:
 * - atividades cadastradas nessa IS (já filtradas pelo chamador);
 * - integrantes vinculados a alguma dessas atividades (mesmo critério da coluna
 *   «Equipes / funções»: setor, linha de equipe ou responsável);
 * - integrantes cadastrados no sistema que não aparecem em nenhuma delas;
 * - pessoas citadas na IS que não existem no cadastro.
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
    pessoasNaoCadastradas: listarPessoasNaoCadastradasNaIS(equipes, atividades, integrantes),
  };
}
