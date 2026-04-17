/**
 * Padrão esperado de código (ex.: 4E-NF10, 4E-MEL01): etapa (NdE) + tipo alfabético + número sequencial.
 */

export type PartesCodigoAtividade = {
  etapa: string | null;
  tipo: string;
  numero: number;
  reconhecido: boolean;
};

/** Trecho após "4E-" etc.: aceita "NF10", "MEL01", "MEL-01". */
function parseRestoAposEtapa(rest: string): { tipo: string; numero: number } | null {
  const s = rest.trim();
  if (!s) return null;

  const comHifen = s.match(/^([A-Za-zÀ-ÿ]+)-(\d+)$/);
  if (comHifen) {
    return { tipo: comHifen[1].toUpperCase(), numero: Number(comHifen[2]) };
  }

  const colado = s.match(/^([A-Za-zÀ-ÿ]+)(\d+)$/);
  if (colado) {
    return { tipo: colado[1].toUpperCase(), numero: Number(colado[2]) };
  }

  return null;
}

export function parsePartesCodigoAtividade(codigo: string | null | undefined): PartesCodigoAtividade {
  const c = String(codigo ?? "").trim();
  if (!c) {
    return { etapa: null, tipo: "", numero: 0, reconhecido: false };
  }

  const comEtapa = c.match(/^(\d+E)-(.*)$/i);
  const resto = comEtapa ? comEtapa[2].trim() : c;
  const etapa = comEtapa ? comEtapa[1].toUpperCase() : null;

  const parsed = parseRestoAposEtapa(resto);
  if (parsed) {
    return { etapa, tipo: parsed.tipo, numero: parsed.numero, reconhecido: true };
  }

  return { etapa, tipo: c.toUpperCase(), numero: 0, reconhecido: false };
}

/** 1º tipo (A–Z); 2º número crescente; desempate etapa e código completo. */
export function compararCodigoAtividade(a: string, b: string): number {
  const pa = parsePartesCodigoAtividade(a);
  const pb = parsePartesCodigoAtividade(b);

  const pri = (p: PartesCodigoAtividade) => (p.reconhecido ? 0 : 1);
  if (pri(pa) !== pri(pb)) return pri(pa) - pri(pb);

  if (pa.reconhecido && pb.reconhecido) {
    const cmpTipo = pa.tipo.localeCompare(pb.tipo, "pt-BR", { sensitivity: "base" });
    if (cmpTipo !== 0) return cmpTipo;
    if (pa.numero !== pb.numero) return pa.numero - pb.numero;
    const ea = pa.etapa ?? "";
    const eb = pb.etapa ?? "";
    if (ea !== eb) return ea.localeCompare(eb, "pt-BR", { sensitivity: "base" });
  }

  return a.trim().localeCompare(b.trim(), "pt-BR", { sensitivity: "base", numeric: true });
}

export function tiposAtividadeDistintos(codigos: Iterable<string | null | undefined>): string[] {
  const s = new Set<string>();
  for (const raw of codigos) {
    const p = parsePartesCodigoAtividade(raw);
    if (p.reconhecido && p.tipo) s.add(p.tipo);
  }
  return Array.from(s).sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}
