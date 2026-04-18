import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const { data, error } = await supabase.from("equipe").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, equipe: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let body: { codigo?: string; equipe?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("equipe")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      equipe: (body.equipe ?? "").trim(),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, row: data });
}
