import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { TIPOS_DOCUMENTO, type TipoDocumento } from "@/lib/documentos-constants";

function isTipoDocumento(v: string): v is TipoDocumento {
  return (TIPOS_DOCUMENTO as readonly string[]).includes(v);
}

function apenasDigitos(s: string): boolean {
  return /^\d+$/.test(s);
}

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("documentos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documentos: data ?? [] });
}

export async function POST(request: Request) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

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

  const tipoRaw = body.tipo_documento?.trim() ?? "";
  if (!tipoRaw || !isTipoDocumento(tipoRaw)) {
    return NextResponse.json({ error: "Selecione um tipo de documento válido." }, { status: 400 });
  }

  const numero = body.numero?.trim() ?? "";
  const ano = body.ano?.trim() ?? "";
  if (!numero || !apenasDigitos(numero)) {
    return NextResponse.json({ error: "Informe o número (apenas dígitos)." }, { status: 400 });
  }
  if (!ano || !apenasDigitos(ano)) {
    return NextResponse.json({ error: "Informe o ano (apenas dígitos)." }, { status: 400 });
  }

  const etiqueta = body.etiqueta?.trim() || null;
  const link = body.link?.trim() || null;

  const titulo = `${tipoRaw} nº ${numero}/${ano}`;

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("documentos")
    .insert({
      titulo,
      tipo: tipoRaw,
      numero,
      ano,
      etiqueta,
      url: link,
      observacoes: null,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}
