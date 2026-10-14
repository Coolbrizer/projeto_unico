import { TIPOS_DOCUMENTO, type TipoDocumento } from "@/lib/documentos-constants";
import { normalizarDataParaApi } from "@/lib/datas-atividade";

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
  periodo_inicio: string | null;
  periodo_fim: string | null;
};

function dataInformada(raw: string | null | undefined): { ok: true; iso: string | null } | { ok: false } {
  const texto = raw?.trim() ?? "";
  if (!texto) return { ok: true, iso: null };
  const iso = normalizarDataParaApi(texto);
  if (!iso) return { ok: false };
  return { ok: true, iso };
}

export function parseCorpoDocumento(body: {
  tipo_documento?: string;
  numero?: string;
  ano?: string;
  etiqueta?: string | null;
  link?: string | null;
  periodo_inicio?: string | null;
  periodo_fim?: string | null;
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
  const inicio = dataInformada(body.periodo_inicio);
  const fim = dataInformada(body.periodo_fim);
  if (!inicio.ok || !fim.ok) {
    return { ok: false, error: "Informe o período no formato DD/MM/AAAA.", status: 400 };
  }
  if ((inicio.iso && !fim.iso) || (!inicio.iso && fim.iso)) {
    return {
      ok: false,
      error: "Informe início e fim do período da instrução, ou deixe os dois em branco.",
      status: 400,
    };
  }
  if (inicio.iso && fim.iso && inicio.iso > fim.iso) {
    return {
      ok: false,
      error: "A data inicial do período precisa ser anterior ou igual à data final.",
      status: 400,
    };
  }

  return {
    ok: true,
    data: {
      tipo_documento: tipoRaw,
      numero,
      ano,
      etiqueta,
      link,
      periodo_inicio: inicio.iso,
      periodo_fim: fim.iso,
    },
  };
}

export function mensagemErroGravacaoDocumento(error: { code?: string; message: string }): string {
  if (error.code === "23505" || /documentos_tipo_numero_ano|duplicate key|unique/i.test(error.message)) {
    return "Já existe um documento com este tipo, número e ano.";
  }
  if (error.code === "23514" || /documentos_periodo_ordem/i.test(error.message)) {
    return "A data inicial do período precisa ser anterior ou igual à data final.";
  }
  return error.message;
}
