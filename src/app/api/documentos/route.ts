import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";

export async function POST(request: Request) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  let body: { titulo?: string; tipo?: string | null; url?: string | null; observacoes?: string | null };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const titulo = body.titulo?.trim();
  if (!titulo) {
    return NextResponse.json({ error: "Informe o título." }, { status: 400 });
  }

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
      tipo: body.tipo?.trim() || null,
      url: body.url?.trim() || null,
      observacoes: body.observacoes?.trim() || null,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}
