import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyPassword } from "@/lib/auth/password";
import { SESSION_COOKIE, signSessionToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const emailRaw = body.email?.trim();
  const password = body.password ?? "";
  if (!emailRaw || !password) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  const email = emailRaw.toLowerCase();

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json(
      { error: "Servidor sem SUPABASE_SERVICE_ROLE_KEY. Configure no .env.local e na Vercel." },
      { status: 500 }
    );
  }

  const { data: row, error } = await supabase
    .from("integrantes")
    .select("id,email,nome,password_hash,must_change_password")
    .eq("email", email)
    .maybeSingle();

  if (error || !row) {
    return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
  }

  if (!row.password_hash) {
    return NextResponse.json(
      { error: "Esta conta ainda não tem senha. Execute a migration SQL ou contacte o administrador." },
      { status: 401 }
    );
  }

  if (!verifyPassword(password, row.password_hash)) {
    return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
  }

  const mustChange = row.must_change_password !== false;

  let token: string;
  try {
    token = await signSessionToken({
      sub: row.id,
      email: row.email ?? email,
      mcp: mustChange,
    });
  } catch {
    return NextResponse.json(
      { error: "AUTH_SECRET inválido ou ausente. Defina uma variável com pelo menos 16 caracteres." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({
    ok: true,
    mustChangePassword: mustChange,
    nome: row.nome,
  });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
