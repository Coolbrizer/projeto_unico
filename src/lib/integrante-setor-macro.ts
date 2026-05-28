/** STIC/CTIC → STIC; demais → SEJUD (setor ou setor macro no texto do setor). */
export function macroSetorIntegrante(setor: string | null | undefined): "STIC" | "SEJUD" {
  const s = (setor ?? "").toUpperCase();
  if (s.includes("STIC") || s.includes("CTIC")) return "STIC";
  return "SEJUD";
}
