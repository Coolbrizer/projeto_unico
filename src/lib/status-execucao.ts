import type { StatusExecucaoAtividade } from "@/types/database";

function hojeIso(agora = new Date()): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(agora);
  const ano = partes.find((p) => p.type === "year")?.value ?? "1970";
  const mes = partes.find((p) => p.type === "month")?.value ?? "01";
  const dia = partes.find((p) => p.type === "day")?.value ?? "01";
  return `${ano}-${mes}-${dia}`;
}

function dataIso(raw: string | null | undefined): string | null {
  const s = raw?.trim().slice(0, 10) ?? "";
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

/** Situação a partir do fim planejado e do progresso. Não usa data de conclusão gravada. */
export function calcularStatusExecucao(
  fim: string | null | undefined,
  progresso: number,
  agora = new Date()
): StatusExecucaoAtividade | null {
  const fimIso = dataIso(fim);
  if (!fimIso) return null;
  const hoje = hojeIso(agora);
  if (progresso >= 100) return hoje < fimIso ? "antecedencia" : "no_prazo";
  if (hoje > fimIso) return "atraso";
  return "no_prazo";
}

export const ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA = "Não entregue, com justificativa";

export function rotuloStatusExecucao(status: StatusExecucaoAtividade | null | undefined): string {
  if (status === "atraso") return "Atraso";
  if (status === "antecedencia") return "Antecedência";
  if (status === "no_prazo") return "No prazo";
  return "";
}
