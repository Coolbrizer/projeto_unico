import { TIPOS_DOCUMENTO, type TipoDocumento } from "@/lib/documentos-constants";

export function isTipoDocumento(v: string): v is TipoDocumento {
  return (TIPOS_DOCUMENTO as readonly string[]).includes(v);
}

export function apenasDigitosValido(s: string): boolean {
  return /^\d+$/.test(s);
}

export type CorpoDocumento = {
  tipo_documento: string;
  numero: string;
  ano: string;
  etiqueta: string | null;
  link: string | null;
};

export function parseCorpoDocumento(body: {
  tipo_documento?: string;
  numero?: string;
  ano?: string;
  etiqueta?: string | null;
  link?: string | null;
}): { ok: true; data: CorpoDocumento } | { ok: false; error: string; status: number } {
  const tipoRaw = body.tipo_documento?.trim() ?? "";
  if (!tipoRaw || !isTipoDocumento(tipoRaw)) {
    return { ok: false, error: "Selecione um tipo de documento válido.", status: 400 };
  }

  const numero = body.numero?.trim() ?? "";
  const ano = body.ano?.trim() ?? "";
  if (!numero || !apenasDigitosValido(numero)) {
    return { ok: false, error: "Informe o número (apenas dígitos).", status: 400 };
  }
  if (!ano || !apenasDigitosValido(ano)) {
    return { ok: false, error: "Informe o ano (apenas dígitos).", status: 400 };
  }

  const etiqueta = body.etiqueta?.trim() || null;
  const link = body.link?.trim() || null;

  return {
    ok: true,
    data: {
      tipo_documento: tipoRaw,
      numero,
      ano,
      etiqueta,
      link,
    },
  };
}
