import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { ordenarDocumentosPorReferencia } from "@/lib/documentos-sort";
import { parseCorpoDocumento } from "@/lib/documentos-validacao";
import type { Documento } from "@/types/database";

/** Supabase pode retornar `link` ou, em bases antigas, `url`. */
function linkDoRegistro(row: Record<string, unknown>): string | null {
  const link = row.link;
  const url = row.url;
  const s = (typeof link === "string" ? link : typeof url === "string" ? url : null) ?? null;
  const t = s?.trim();
  return t ? t : null;
}

function normalizarDocumento(row: Record<string, unknown>): Documento {
  const base = row as unknown as Documento;
  return {
    ...base,
    link: linkDoRegistro(row),
  };
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const { data, error } = await supabase.from("documentos").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const documentos = ordenarDocumentosPorReferencia(
    ((data as Record<string, unknown>[]) ?? []).map((row) => normalizarDocumento(row))
  );

  return NextResponse.json({ ok: true, documentos });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let body: {
    tipo_documento?: string;
    numero?: string;
    ano?: string;
    etiqueta?: string | null;
    link?: string | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = parseCorpoDocumento(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { tipo_documento: tipoRaw, numero, ano, etiqueta, link } = parsed.data;

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("documentos")
    .insert({
      tipo: tipoRaw,
      numero: Number(numero),
      ano: Number(ano),
      etiqueta,
      link,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}
