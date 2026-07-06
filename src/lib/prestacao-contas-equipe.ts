import {
  equipeLinhaEhResponsavel,
  integranteCorrespondenteAResponsavel,
  integranteVinculadoAEquipeAtividade,
  nomesPessoaCorrespondem,
} from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

function extrairNomeResponsavel(
  atividade: Atividade,
  integrantes: Integrante[]
): string | null {
  const integ = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
  if (integ?.nome?.trim()) return integ.nome.trim();
  const raw = atividade.responsavel?.trim();
  if (!raw) return null;
  const pipe = raw.lastIndexOf("|");
  return (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim() || null;
}

/**
 * Equipe completa da atividade: integrantes por setor (código, micro/macro ou linha de equipe),
 * integrantes cujo nome casa com linha da tabela `equipe`, linhas de equipe sem integrante
 * correspondente e responsável identificado ao final.
 */
export function textoEquipeParticipantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string {
  const codigo = String(atividade.codigo ?? "").trim();
  const respNome = extrairNomeResponsavel(atividade, integrantes);

  if (!codigo) {
    return respNome ? `Responsável: ${respNome}` : "—";
  }

  const equipeRows = todasEquipes.filter((e) => String(e.codigo ?? "").trim() === codigo);
  const nomesVistos = new Set<string>();
  const membros: string[] = [];

  const addNome = (nome: string) => {
    const n = nome.trim();
    if (!n) return;
    const k = n.toLowerCase();
    if (nomesVistos.has(k)) return;
    nomesVistos.add(k);
    membros.push(n);
  };

  for (const i of integrantes) {
    if (integranteVinculadoAEquipeAtividade(i, codigo, equipeRows)) {
      addNome(i.nome ?? "");
    }
  }

  const integResp = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
  if (integResp) addNome(integResp.nome ?? "");

  for (const r of equipeRows) {
    const line = (r.equipe ?? "").trim();
    if (!line) continue;
    const jaCasaIntegrante = integrantes.some((i) => equipeLinhaEhResponsavel(line, i.nome));
    if (!jaCasaIntegrante) addNome(line);
  }

  const equipeSemResp = membros.filter(
    (n) => !respNome || !nomesPessoaCorrespondem(n, respNome)
  );
  equipeSemResp.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

  const linhas = [...equipeSemResp];
  if (respNome) linhas.push(`Responsável: ${respNome}`);

  if (linhas.length === 0) return "—";
  return linhas.join("\n");
}
