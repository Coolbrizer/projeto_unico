import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { hashPassword } from "@/lib/auth/password";
import { parsePerfil, type Perfil } from "@/lib/auth/roles";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { writeAuditLog } from "@/lib/audit-log";

const DEFAULT_PASSWORD = "123456";

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("integrantes")
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, created_at")
    .order("matricula", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, integrantes: data ?? [] });
}

function parseMatricula(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  const n = Number(t);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;
  const session = auth.session;

  let body: {
    matricula?: string;
    nome?: string;
    setor?: string;
    cargo?: string;
    classe_padrao?: string;
    email?: string;
    perfil?: unknown;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  let perfilNovo: Perfil = "basico";
  if (session.role === "admin" && body.perfil !== undefined) {
    perfilNovo = parsePerfil(body.perfil);
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

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const must_change_password = true;
  const password_hash = hashPassword(DEFAULT_PASSWORD);

  // 1) Criar primeiro em auth.users (Admin API).
  const { data: authCreated, error: authErr } = await admin.auth.admin.createUser({
    email,
    password: DEFAULT_PASSWORD,
    email_confirm: true,
    user_metadata: { nome },
    app_metadata: {
      perfil: perfilNovo,
      must_change_password,
    },
  });

  if (authErr || !authCreated.user) {
    if (authErr?.message?.toLowerCase().includes("already")) {
      return NextResponse.json(
        { error: "Já existe usuário no Supabase Auth com este e-mail." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: authErr?.message ?? "Falha ao criar usuário no Supabase Auth." },
      { status: 400 }
    );
  }

  // 2) Inserir na tabela integrantes vinculando ao auth.users via auth_user_id.
  //    O trigger integrantes_sync_perfil propaga perfil/must_change_password
  //    para auth.users.app_metadata automaticamente.
  const { data, error } = await admin
    .from("integrantes")
    .insert({
      matricula: m,
      nome,
      setor: body.setor?.trim() || null,
      cargo: body.cargo?.trim() || null,
      classe_padrao: body.classe_padrao?.trim() || null,
      email,
      password_hash,
      must_change_password,
      perfil: perfilNovo,
      auth_user_id: authCreated.user.id,
    })
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, created_at")
    .single();

  if (error) {
    // Rollback: remove o usuário criado em auth.users para manter coerência.
    await admin.auth.admin.deleteUser(authCreated.user.id);

    if (error.code === "23505" || error.message.includes("duplicate") || error.message.includes("unique")) {
      return NextResponse.json(
        { error: "Já existe integrante com este e-mail. E-mails devem ser únicos para login." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    supabase: admin,
    action: "insert",
    entityTable: "integrantes",
    entityId: String(data.id ?? ""),
    session,
    afterData: data,
  });

  return NextResponse.json({
    ok: true,
    integrante: data,
    aviso:
      "Integrante criado. Senha inicial: 123456 — informe ao usuário para o primeiro login; será pedida a troca de senha.",
  });
}
