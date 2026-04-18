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

  // Se o e-mail mudou e há vínculo com auth.users, sincroniza primeiro lá.
  // Se falhar, abortamos o update do integrante para evitar inconsistência.
  const beforeRow = before as { email?: string | null; auth_user_id?: string | null };
  const emailMudou = (beforeRow.email ?? "").toLowerCase() !== email;
  if (emailMudou && beforeRow.auth_user_id) {
    const { error: authErr } = await supabase.auth.admin.updateUserById(
      beforeRow.auth_user_id,
      { email, email_confirm: true }
    );
    if (authErr) {
      if (authErr.message.toLowerCase().includes("already")) {
        return NextResponse.json(
          { error: "Já existe usuário no Supabase Auth com este e-mail." },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: authErr.message }, { status: 400 });
    }
  }

  const { data, error } = await supabase
    .from("integrantes")
    .update(patch)
    .eq("id", id)
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, created_at")
    .single();

  if (error) {
    // Rollback do email no auth.users se já tinha sido alterado.
    if (emailMudou && beforeRow.auth_user_id && beforeRow.email) {
      await supabase.auth.admin.updateUserById(beforeRow.auth_user_id, {
        email: beforeRow.email,
        email_confirm: true,
      });
    }
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

  // Remove o usuário correspondente em auth.users (se houver vínculo).
  // Falhas aqui são apenas logadas — o registro principal já foi removido.
  const beforeRow = before as { auth_user_id?: string | null } | null;
  if (beforeRow?.auth_user_id) {
    const { error: authErr } = await supabase.auth.admin.deleteUser(beforeRow.auth_user_id);
    if (authErr) {
      console.error("Falha ao remover usuário do Supabase Auth:", authErr.message);
    }
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
