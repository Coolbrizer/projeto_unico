import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { parseCorpoDocumento } from "@/lib/documentos-validacao";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

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
  const titulo = `${tipoRaw} nº ${numero}/${ano}`;

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("documentos")
    .update({
      titulo,
      tipo: tipoRaw,
      numero,
      ano,
      etiqueta,
      link,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { error } = await supabase.from("documentos").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
