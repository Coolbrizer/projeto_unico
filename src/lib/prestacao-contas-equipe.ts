import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

/**
 * Nomes dos integrantes que participam da atividade (critério da tela Equipe), um por linha,
 * ordenados alfabeticamente, sem indicar responsável nem matrícula.
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
    if (integ) return (integ.nome ?? "").trim();
    const raw = atividade.responsavel?.trim();
    if (raw) {
      const pipe = raw.lastIndexOf("|");
      const nome = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim();
      return nome || "—";
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
    return nome || "—";
  }

  lista.sort((a, b) =>
    (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
  );

  return lista
    .map((i) => (i.nome ?? "").trim())
    .filter(Boolean)
    .join("\n");
}
