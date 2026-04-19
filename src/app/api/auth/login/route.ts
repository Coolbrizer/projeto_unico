import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** ~30 tentativas por IP e minuto (ajuste conforme necessidade). */
const LOGIN_LIMIT = 30;
const LOGIN_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = checkRateLimit(`auth:login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados pedidos de login. Aguarde e tente novamente." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json(
      { error: "Configuração do Supabase ausente. Verifique NEXT_PUBLIC_SUPABASE_URL e a chave pública." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user) {
    return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
  }

  const meta = (data.user.app_metadata ?? {}) as {
    must_change_password?: unknown;
  };
  const mustChange = meta.must_change_password === true;

  const userMeta = (data.user.user_metadata ?? {}) as { nome?: unknown };
  const nome = typeof userMeta.nome === "string" ? userMeta.nome : null;

  return NextResponse.json({
    ok: true,
    mustChangePassword: mustChange,
    nome,
  });
}
