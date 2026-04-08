import type { Atividade, Equipe, Integrante } from "@/types/database";

export type GrupoAtividade = {
  codigo: string;
  atividade: Atividade | null;
  equipeRows: Equipe[];
  integrantes: Integrante[];
};

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
    return a.localeCompare(b, "pt-BR");
  });

  const atividadePorCodigo = new Map<string, Atividade>();
  for (const a of atividades) {
    const c = (a.codigo ?? "").trim();
    if (!atividadePorCodigo.has(c)) atividadePorCodigo.set(c, a);
  }

  return ordenados
    .map((codigo) => {
      const equipeRows = equipes.filter((e) => (e.codigo ?? "").trim() === codigo);
      const nomesEquipe = new Set(
        equipeRows.map((e) => (e.equipe ?? "").trim().toLowerCase()).filter(Boolean)
      );
      const codigoLc = codigo.toLowerCase();

      const ints = integrantes.filter((i) => {
        const s = (i.setor ?? "").trim().toLowerCase();
        if (!s) return false;
        if (codigo && s === codigoLc) return true;
        if (nomesEquipe.has(s)) return true;
        return false;
      });

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
