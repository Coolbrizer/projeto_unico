import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const patch: Record<string, string | number | null> = {};
  if ("codigo" in body) patch.codigo = String(body.codigo ?? "").trim();
  if ("descricao" in body) patch.descricao = body.descricao ? String(body.descricao).trim() : null;
  if ("responsavel" in body) patch.responsavel = body.responsavel ? String(body.responsavel).trim() : null;
  if ("inicio" in body) {
    const raw = body.inicio;
    patch.inicio =
      raw === null || raw === undefined || String(raw).trim() === ""
        ? null
        : normalizarDataParaApi(String(raw));
  }
  if ("fim" in body) {
    const raw = body.fim;
    patch.fim =
      raw === null || raw === undefined || String(raw).trim() === ""
        ? null
        : normalizarDataParaApi(String(raw));
  }
  if ("progresso" in body) {
    const p = Math.min(100, Math.max(0, Math.floor(Number(body.progresso)) || 0));
    patch.progresso = p;
  }
  if ("etiqueta_relatorio" in body) {
    patch.etiqueta_relatorio = body.etiqueta_relatorio ? String(body.etiqueta_relatorio).trim() : null;
  }
  if ("link_relatorio" in body) {
    patch.link_relatorio = body.link_relatorio ? String(body.link_relatorio).trim() : null;
  }

  const { data, error } = await supabase.from("atividades").update(patch).eq("id", id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, atividade: data });
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

  const { error } = await supabase.from("atividades").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
