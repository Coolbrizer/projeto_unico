import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { hashPassword } from "@/lib/auth/password";
import { parsePerfil, type Perfil } from "@/lib/auth/roles";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { writeAuditLog } from "@/lib/audit-log";

const DEFAULT_PASSWORD = "123456";

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

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const password_hash = hashPassword(DEFAULT_PASSWORD);
  const must_change_password = true;

  const { data, error } = await supabase
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
    })
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
