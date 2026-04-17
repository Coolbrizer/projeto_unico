import {
  equipeLinhaEhResponsavel,
  integranteCorrespondenteAResponsavel,
  integranteNomeMatchResponsavelAtividade,
} from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

/**
 * Nomes ligados à atividade: integrantes por setor (código ou linha de equipe no setor),
 * integrantes cujo nome casa com cada linha da tabela `equipe`, responsável reconhecido,
 * e textos de `equipe` sem integrante correspondente (como na coluna Equipes/funções).
 * Um nome por linha, ordenados alfabeticamente.
 */
export function textoEquipeParticipantes(
  atividade: Atividade,
  integrantes: Integrante[],
  todasEquipes: Equipe[]
): string {
  const codigo = String(atividade.codigo ?? "").trim();

  if (!codigo) {
    const integ = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
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

  const porId = new Map<string, Integrante>();

  const integrantesPorSetor = integrantes.filter((i) => {
    const s = (i.setor ?? "").trim().toLowerCase();
    if (!s) return false;
    if (s === codigoLc) return true;
    if (nomesEquipe.has(s)) return true;
    return false;
  });
  for (const i of integrantesPorSetor) {
    porId.set(i.id, i);
  }

  const linhasSemIntegrante: string[] = [];
  for (const r of equipeRows) {
    const line = (r.equipe ?? "").trim();
    if (!line) continue;
    let encontrou = false;
    for (const i of integrantes) {
      if (equipeLinhaEhResponsavel(line, i.nome)) {
        porId.set(i.id, i);
        encontrou = true;
      }
    }
    if (!encontrou) {
      linhasSemIntegrante.push(line);
    }
  }

  const integResp = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
  if (integResp && !porId.has(integResp.id)) {
    porId.set(integResp.id, integResp);
  }

  const nomesDeIntegrantes = [...porId.values()]
    .map((i) => (i.nome ?? "").trim())
    .filter(Boolean);

  const todos = [...nomesDeIntegrantes, ...linhasSemIntegrante];
  const vistos = new Set<string>();
  const unicos: string[] = [];
  for (const n of todos) {
    const k = n.toLowerCase();
    if (!vistos.has(k)) {
      vistos.add(k);
      unicos.push(n);
    }
  }

  if (unicos.length === 0 && atividade.responsavel?.trim()) {
    const raw = atividade.responsavel.trim();
    const pipe = raw.lastIndexOf("|");
    const nome = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim();
    return nome || "—";
  }

  unicos.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  return unicos.join("\n");
}
