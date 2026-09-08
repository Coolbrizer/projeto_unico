/** STIC/CTIC → STIC; demais → SEJUD (setor ou setor macro no texto do setor). */
export function macroSetorIntegrante(setor: string | null | undefined): "STIC" | "SEJUD" {
  const s = (setor ?? "").toUpperCase();
  if (s.includes("STIC") || s.includes("CTIC")) return "STIC";
  return "SEJUD";
}

/** Formato esperado do setor: `micro/macro` (ex.: ACQ/SEJUD). */
export function parseSetorMicroMacro(setor: string | null | undefined): {
  micro: string;
  macro: string;
} {
  const s = (setor ?? "").trim();
  if (!s) return { micro: "—", macro: "(sem setor)" };
  const idx = s.indexOf("/");
  if (idx < 0) return { micro: "—", macro: s };
  const micro = s.slice(0, idx).trim() || "—";
  const macro = s.slice(idx + 1).trim() || "—";
  return { micro, macro };
}

export function rotuloSetorMicroMacro(setor: string | null | undefined): string {
  const { micro, macro } = parseSetorMicroMacro(setor);
  if (micro === "—") return macro;
  if (macro === "—" || macro === "(sem setor)") return micro;
  return `${micro} / ${macro}`;
}
