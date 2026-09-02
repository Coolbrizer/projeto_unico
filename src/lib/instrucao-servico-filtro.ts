import { isUuidString } from "@/lib/uuid";

export const INSTRUCAO_SERVICO_COOKIE = "instrucao_servico_selecionada";
export const PLANO_ATIVIDADES_COOKIE = "plano_atividades_selecionado";

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

export function parsePlanoAtividades(raw: string | null | undefined): number | null {
  const valor = raw?.trim() ?? "";
  if (!valor) return null;
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 1) return null;
  return numero;
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

export function extrairPlanoAtividadesDeCookieHeader(cookieHeader: string | null): number | null {
  if (!cookieHeader) return null;
  const pares = cookieHeader.split(";");
  for (const par of pares) {
    const [nome, ...rest] = par.split("=");
    if (nome?.trim() !== PLANO_ATIVIDADES_COOKIE) continue;
    return parsePlanoAtividades(decodificarCookie(rest.join("=").trim()));
  }
  return null;
}

export function extrairInstrucaoServicoIdSelecionada(request: Request): string {
  const url = new URL(request.url);
  const porQuery = parseInstrucaoServicoId(url.searchParams.get("instrucaoServicoId"));
  if (porQuery) return porQuery;
  return extrairInstrucaoServicoIdDeCookieHeader(request.headers.get("cookie"));
}

export function extrairPlanoAtividadesSelecionado(request: Request): number | null {
  const url = new URL(request.url);
  const porQuery = parsePlanoAtividades(url.searchParams.get("planoAtividades"));
  if (porQuery !== null) return porQuery;
  return extrairPlanoAtividadesDeCookieHeader(request.headers.get("cookie"));
}
