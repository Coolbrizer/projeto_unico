import { normalizarNomeSomenteLetras } from "@/lib/equipe-page-helpers";

export function resolverResponsavelId(
  responsavel: string | null | undefined,
  integrantes: Array<{ id: string; nome: string | null | undefined }>
): string | null {
  const alvo = normalizarNomeSomenteLetras(responsavel ?? "");
  if (!alvo) return null;
  const iguais = integrantes.filter(
    (i) => normalizarNomeSomenteLetras(i.nome ?? "") === alvo
  );
  return iguais.length === 1 ? iguais[0].id : null;
}
