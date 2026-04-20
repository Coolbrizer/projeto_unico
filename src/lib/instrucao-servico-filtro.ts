import { isUuidString } from "@/lib/uuid";

export const INSTRUCAO_SERVICO_COOKIE = "instrucao_servico_selecionada";

function decodificarCookie(valor: string): string {
  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}

export function parseInstrucaoServicoId(raw: string | null | undefined): string {
  const valor = raw?.trim() ?? "";
  return isUuidString(valor) ? valor : "";
}

export function extrairInstrucaoServicoIdDeCookieHeader(cookieHeader: string | null): string {
  if (!cookieHeader) return "";
  const pares = cookieHeader.split(";");
  for (const par of pares) {
    const [nome, ...rest] = par.split("=");
    if (nome?.trim() !== INSTRUCAO_SERVICO_COOKIE) continue;
    return parseInstrucaoServicoId(decodificarCookie(rest.join("=").trim()));
  }
  return "";
}

export function extrairInstrucaoServicoIdSelecionada(request: Request): string {
  const url = new URL(request.url);
  const porQuery = parseInstrucaoServicoId(url.searchParams.get("instrucaoServicoId"));
  if (porQuery) return porQuery;
  return extrairInstrucaoServicoIdDeCookieHeader(request.headers.get("cookie"));
}
