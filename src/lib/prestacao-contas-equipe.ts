import { equipeLinhaEhResponsavel, integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

/**
 * Texto para a coluna “Responsável”: responsável da atividade + integrantes e linhas de equipe
 * vinculados ao mesmo código (mesma lógica de agrupamento da tela Equipe), excluindo duplicatas do responsável.
 */
export function textoResponsavelEquipe(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string {
  const codigo = String(atividade.codigo ?? "").trim();
  const resp = atividade.responsavel?.trim();

  if (!codigo) {
    return resp || "—";
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

  const partes: string[] = [];
  if (resp) {
    partes.push(`Responsável: ${resp}`);
  }

  const outrosIntegrantes = integrantesDoGrupo
    .filter((i) => !integranteNomeMatchResponsavelAtividade(i.nome, atividade.responsavel))
    .map((i) => (i.nome ?? "").trim())
    .filter(Boolean);

  const vistos = new Set<string>();
  const nomesUnicos: string[] = [];
  for (const n of outrosIntegrantes) {
    const k = n.toLowerCase();
    if (!vistos.has(k)) {
      vistos.add(k);
      nomesUnicos.push(n);
    }
  }

  if (nomesUnicos.length) {
    partes.push(`Integrantes: ${nomesUnicos.join(", ")}`);
  }

  const linhasEquipe = equipeRows
    .filter((r) => !equipeLinhaEhResponsavel(r.equipe ?? "", atividade.responsavel))
    .map((r) => (r.equipe ?? "").trim())
    .filter(Boolean);

  const uniqEquipe = [...new Set(linhasEquipe)];
  if (uniqEquipe.length) {
    partes.push(`Equipes/funções: ${uniqEquipe.join("; ")}`);
  }

  return partes.length ? partes.join("\n") : "—";
}
