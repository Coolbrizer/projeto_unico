import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { parsePerfil } from "@/lib/auth/roles";
import { requireAdmin } from "@/lib/auth/requireRole";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let body: { perfil?: unknown };
  try {
    body = (await request.json()) as { perfil?: unknown };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (body.perfil === undefined) {
    return NextResponse.json({ error: "Informe perfil." }, { status: 400 });
  }

  const perfil = parsePerfil(body.perfil);

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("integrantes")
    .update({ perfil })
    .eq("id", id)
    .select("id, matricula, nome, email, perfil, must_change_password")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, integrante: data });
}
