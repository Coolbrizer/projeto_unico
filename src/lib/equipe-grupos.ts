import { compararCodigoAtividade } from "@/lib/atividade-codigo";
import { integranteVinculadoAEquipeAtividade } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export type GrupoAtividade = {
  codigo: string;
  atividade: Atividade | null;
  equipeRows: Equipe[];
  integrantes: Integrante[];
};

/** Código, equipes, integrantes (nome, setor, matrícula) e dados da atividade: cada palavra deve aparecer em algum desses campos. */
export function grupoAtividadeMatchesBusca(g: GrupoAtividade, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  const codigo = (g.codigo ?? "").toLowerCase();
  const atDesc = (g.atividade?.descricao ?? "").toLowerCase();
  const atResp = (g.atividade?.responsavel ?? "").toLowerCase();
  const campos: string[] = [codigo, atDesc, atResp];
  for (const e of g.equipeRows) {
    campos.push((e.equipe ?? "").toLowerCase());
  }
  for (const i of g.integrantes) {
    campos.push((i.nome ?? "").toLowerCase());
    campos.push((i.setor ?? "").toLowerCase());
    campos.push(String(i.matricula).toLowerCase());
  }
  return tokens.every((tok) => campos.some((c) => c.includes(tok)));
}

export function montarGrupos(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[]
): GrupoAtividade[] {
  const codigos = new Set<string>();
  for (const e of equipes) codigos.add((e.codigo ?? "").trim());
  for (const a of atividades) codigos.add((a.codigo ?? "").trim());

  const ordenados = Array.from(codigos).sort((a, b) => {
    if (a === "" && b === "") return 0;
    if (a === "") return 1;
    if (b === "") return -1;
    return compararCodigoAtividade(a, b);
  });

  const atividadePorCodigo = new Map<string, Atividade>();
  for (const a of atividades) {
    const c = (a.codigo ?? "").trim();
    if (!atividadePorCodigo.has(c)) atividadePorCodigo.set(c, a);
  }

  return ordenados
    .map((codigo) => {
      const equipeRows = equipes.filter((e) => (e.codigo ?? "").trim() === codigo);

      const ints = integrantes.filter((i) =>
        integranteVinculadoAEquipeAtividade(i, codigo, equipeRows)
      );

      return {
        codigo,
        atividade: atividadePorCodigo.get(codigo) ?? null,
        equipeRows,
        integrantes: ints,
      };
    })
    .filter(
      (g) =>
        g.equipeRows.length > 0 || g.atividade !== null || g.integrantes.length > 0
    );
}
