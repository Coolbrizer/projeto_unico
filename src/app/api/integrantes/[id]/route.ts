import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { parsePerfil, type Perfil } from "@/lib/auth/roles";
import { writeAuditLog } from "@/lib/audit-log";

type Ctx = { params: Promise<{ id: string }> };

function parseMatricula(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  const n = Number(t);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

export async function PATCH(request: Request, ctx: Ctx) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;
  const session = auth.session;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let body: {
    matricula?: string;
    nome?: string;
    setor?: string | null;
    cargo?: string | null;
    classe_padrao?: string | null;
    email?: string;
    perfil?: unknown;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome) {
    return NextResponse.json({ error: "Informe o nome." }, { status: 400 });
  }

  const emailRaw = body.email?.trim();
  if (!emailRaw) {
    return NextResponse.json(
      { error: "Informe o e-mail para permitir o login (mesmo cadastro usado na entrada)." },
      { status: 400 }
    );
  }

  const email = emailRaw.toLowerCase();
  const m = parseMatricula(body.matricula ?? "");
  if (m === null) {
    return NextResponse.json({ error: "Informe uma matrícula numérica inteira válida." }, { status: 400 });
  }

  let perfilNovo: Perfil | undefined;
  if (session.role === "admin" && body.perfil !== undefined) {
    perfilNovo = parsePerfil(body.perfil);
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: before, error: errBefore } = await supabase
    .from("integrantes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (errBefore) {
    return NextResponse.json({ error: errBefore.message }, { status: 400 });
  }
  if (!before) {
    return NextResponse.json({ error: "Integrante não encontrado." }, { status: 404 });
  }

  const patch: Record<string, string | number | null> = {
    matricula: m,
    nome,
    setor: body.setor?.trim() || null,
    cargo: body.cargo?.trim() || null,
    classe_padrao: body.classe_padrao?.trim() || null,
    email,
  };
  if (perfilNovo !== undefined) {
    patch.perfil = perfilNovo;
  }

  const { data, error } = await supabase
    .from("integrantes")
    .update(patch)
    .eq("id", id)
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, created_at")
    .single();

  if (error) {
    if (error.code === "23505" || error.message.includes("duplicate") || error.message.includes("unique")) {
      return NextResponse.json(
        { error: "Já existe integrante com este e-mail. E-mails devem ser únicos para login." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    supabase,
    action: "update",
    entityTable: "integrantes",
    entityId: id,
    session,
    beforeData: before,
    afterData: data,
  });

  return NextResponse.json({ ok: true, integrante: data });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;
  const session = auth.session;

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

  const { data: before } = await supabase.from("integrantes").select("*").eq("id", id).maybeSingle();
  const { error } = await supabase.from("integrantes").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    supabase,
    action: "delete",
    entityTable: "integrantes",
    entityId: id,
    session,
    beforeData: before,
  });

  return NextResponse.json({ ok: true });
}
