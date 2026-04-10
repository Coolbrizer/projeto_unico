import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { parsePerfil } from "@/lib/auth/roles";
import { SESSION_COOKIE, signSessionToken, verifySessionToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const session = await verifySessionToken(raw);
  if (!session) {
    return NextResponse.json({ error: "Sessão inválida." }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = (await request.json()) as { currentPassword?: string; newPassword?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const currentPassword = body.currentPassword ?? "";
  const newPassword = body.newPassword ?? "";
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Informe a senha atual e a nova senha." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: row, error: fetchErr } = await supabase
    .from("integrantes")
    .select("id,email,password_hash,perfil")
    .eq("id", session.sub)
    .maybeSingle();

  if (fetchErr || !row?.password_hash) {
    return NextResponse.json({ error: "Não foi possível validar a conta." }, { status: 400 });
  }

  if (!verifyPassword(currentPassword, row.password_hash)) {
    return NextResponse.json({ error: "Senha atual incorreta." }, { status: 400 });
  }

  const newHash = hashPassword(newPassword);

  const { error: upErr } = await supabase
    .from("integrantes")
    .update({ password_hash: newHash, must_change_password: false })
    .eq("id", session.sub);

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const role = parsePerfil(row.perfil as unknown);

  const token = await signSessionToken({
    sub: session.sub,
    email: session.email,
    mcp: false,
    role,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
