import type { Integrante, RefPgto } from "@/types/database";

function norm(s: string | null | undefined): string {
  return (s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Valor mensal na tabela ref_pgto para o par cargo + classe/padrão (texto comparado normalizado). */
export function valorMensalDoRef(
  refs: RefPgto[],
  cargo: string | null,
  classePadrao: string | null
): number {
  const c = norm(cargo);
  const cl = norm(classePadrao);
  const row = refs.find((r) => norm(r.cargo) === c && norm(r.classe_padrao) === cl);
  return row ? Number(row.valor_mensal) : 0;
}

export function totalDespesaMensalFolha(integrantes: Integrante[], refs: RefPgto[]) {
  let total = 0;
  const semCorrespondencia: Integrante[] = [];
  for (const i of integrantes) {
    const v = valorMensalDoRef(refs, i.cargo, i.classe_padrao);
    total += v;
    const temCargoOuClasse = Boolean(
      (i.cargo && i.cargo.trim()) || (i.classe_padrao && i.classe_padrao.trim())
    );
    if (temCargoOuClasse && v === 0) semCorrespondencia.push(i);
  }
  return { total, semCorrespondencia };
}
