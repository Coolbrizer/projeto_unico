import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAdmin } from "@/lib/auth/requireRole";
import { requireAdminMfaIfEnabled } from "@/lib/auth/requireAdminMfa";
import { writeAuditLog } from "@/lib/audit-log";
import { parseVinculo, VINCULO_COLABORADOR } from "@/lib/vinculo-pessoa";

type IntegranteRow = {
  id: string;
  matricula: number | null;
  nome: string | null;
  email: string | null;
  perfil: string | null;
  vinculo: string | null;
  auth_user_id: string | null;
};

const DEFAULT_PASSWORD = "123456";

function emailValido(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const mfa = await requireAdminMfaIfEnabled();
  if (mfa) return mfa;

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await admin
    .from("integrantes")
    .select("id, matricula, nome, email, perfil, vinculo, auth_user_id")
    .order("nome", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Junta must_change_password lendo de auth.users.app_metadata.
  const mcpById = new Map<string, boolean>();
  try {
    let page = 1;
    const perPage = 1000;
    for (;;) {
      const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page, perPage });
      if (listErr) break;
      list.users.forEach((u) => {
        const meta = (u.app_metadata ?? {}) as { must_change_password?: unknown };
        mcpById.set(u.id, meta.must_change_password === true);
      });
      if (list.users.length < perPage) break;
      page += 1;
    }
  } catch {
    // se falhar a listagem, devolve sem a flag: o front exibe "OK".
  }

  const integrantes = ((data ?? []) as IntegranteRow[]).map((row) => ({
    id: row.id,
    matricula: row.matricula,
    nome: row.nome,
    email: row.email,
    perfil: row.perfil,
    vinculo: parseVinculo(row.vinculo),
    must_change_password: row.auth_user_id ? mcpById.get(row.auth_user_id) ?? false : false,
  }));

  return NextResponse.json({ integrantes });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const session = auth.session;

  const mfa = await requireAdminMfaIfEnabled();
  if (mfa) return mfa;

  let body: { nome?: string; email?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome) {
    return NextResponse.json({ error: "Informe o nome." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!emailValido(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido para o login." }, { status: 400 });
  }

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: authCreated, error: authErr } = await admin.auth.admin.createUser({
    email,
    password: DEFAULT_PASSWORD,
    email_confirm: true,
    user_metadata: { nome },
    app_metadata: {
      perfil: "basico",
      must_change_password: true,
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

  const { data, error } = await admin
    .from("integrantes")
    .insert({
      matricula: null,
      nome,
      email,
      perfil: "basico",
      vinculo: VINCULO_COLABORADOR,
      nao_remunerado: true,
      auth_user_id: authCreated.user.id,
    })
    .select("id, matricula, nome, email, perfil, vinculo, created_at")
    .single();

  if (error) {
    await admin.auth.admin.deleteUser(authCreated.user.id);

    if (error.code === "23505" || error.message.includes("duplicate") || error.message.includes("unique")) {
      return NextResponse.json(
        { error: "Já existe cadastro com este e-mail. E-mails devem ser únicos para login." },
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
    metadata: { vinculo: VINCULO_COLABORADOR },
  });

  return NextResponse.json({
    ok: true,
    colaborador: data,
    aviso:
      "Colaborador criado com perfil básico. Senha inicial: 123456 — informe ao usuário para o primeiro login; será pedida a troca de senha.",
  });
}
