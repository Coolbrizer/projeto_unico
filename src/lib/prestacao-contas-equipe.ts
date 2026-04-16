import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

function linhaMatriculaNome(matricula: number | null, nome: string): string {
  const m = matricula != null ? String(matricula) : "—";
  const n = nome.trim() || "—";
  return `${m} — ${n}`;
}

/**
 * Lista de participantes (matrícula e nome, uma linha por pessoa), mesmo critério de vínculo
 * à atividade que a tela Equipe (setor = código ou nome de linha em `equipe`), mais o responsável
 * reconhecido no cadastro de integrantes quando não entrou pelo setor.
 */
export function textoEquipeParticipantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string {
  const codigo = String(atividade.codigo ?? "").trim();

  if (!codigo) {
    const integ = integrantes.find((i) =>
      integranteNomeMatchResponsavelAtividade(i.nome, atividade.responsavel)
    );
    if (integ) return linhaMatriculaNome(integ.matricula, integ.nome);
    const raw = atividade.responsavel?.trim();
    if (raw) {
      const pipe = raw.lastIndexOf("|");
      const nome = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim();
      return nome ? linhaMatriculaNome(null, nome) : "—";
    }
    return "—";
  }

  const equipeRows = todasEquipes.filter((e) => String(e.codigo ?? "").trim() === codigo);
  const nomesEquipe = new Set(
    equipeRows.map((e) => (e.equipe ?? "").trim().toLowerCase()).filter(Boolean)
  );
  const codigoLc = codigo.toLowerCase();

  const integrantesDoGrupo = integrantes.filter((i) => {
    const s = (i.setor ?? "").trim().toLowerCase();
    if (!s) return false;
    if (s === codigoLc) return true;
    if (nomesEquipe.has(s)) return true;
    return false;
  });

  const porId = new Map<string, Integrante>();
  for (const i of integrantesDoGrupo) {
    porId.set(i.id, i);
  }

  const integResp = integrantes.find((i) =>
    integranteNomeMatchResponsavelAtividade(i.nome, atividade.responsavel)
  );
  if (integResp && !porId.has(integResp.id)) {
    porId.set(integResp.id, integResp);
  }

  const lista = [...porId.values()];
  if (lista.length === 0 && atividade.responsavel?.trim()) {
    const raw = atividade.responsavel.trim();
    const pipe = raw.lastIndexOf("|");
    const nome = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim();
    return nome ? linhaMatriculaNome(null, nome) : "—";
  }

  lista.sort((a, b) => {
    const aR = integranteNomeMatchResponsavelAtividade(a.nome, atividade.responsavel) ? 0 : 1;
    const bR = integranteNomeMatchResponsavelAtividade(b.nome, atividade.responsavel) ? 0 : 1;
    if (aR !== bR) return aR - bR;
    return (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" });
  });

  return lista.map((i) => linhaMatriculaNome(i.matricula, (i.nome ?? "").trim())).join("\n");
}
