import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAdmin } from "@/lib/auth/requireRole";
import { requireAdminMfaIfEnabled } from "@/lib/auth/requireAdminMfa";

type Ctx = { params: Promise<{ id: string }> };

const DEFAULT_RESET = "123456";

/** Redefinições em massa por admin: limite por IP (por hora). */
const RESET_LIMIT = 40;
const RESET_WINDOW_MS = 3_600_000;

export async function POST(request: Request, ctx: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const mfa = await requireAdminMfaIfEnabled();
  if (mfa) return mfa;

  const ip = clientIp(request);
  const rl = checkRateLimit(`admin:reset-senha:${ip}`, RESET_LIMIT, RESET_WINDOW_MS);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados pedidos de redefinição. Tente mais tarde." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: integrante, error: fetchErr } = await admin
    .from("integrantes")
    .select("id, auth_user_id")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr || !integrante) {
    return NextResponse.json({ error: "Integrante não encontrado." }, { status: 404 });
  }

  if (!integrante.auth_user_id) {
    return NextResponse.json(
      { error: "Integrante ainda não vinculado ao Supabase Auth (rode npm run migrate:auth)." },
      { status: 400 }
    );
  }

  // Lê o app_metadata atual para preservar perfil/integrante_id ao gravar
  // a flag must_change_password=true.
  const { data: authUser, error: getErr } = await admin.auth.admin.getUserById(
    integrante.auth_user_id
  );
  if (getErr || !authUser?.user) {
    return NextResponse.json(
      { error: getErr?.message ?? "Usuário Auth não encontrado." },
      { status: 400 }
    );
  }
  const currentMeta = (authUser.user.app_metadata ?? {}) as Record<string, unknown>;

  const { error: updErr } = await admin.auth.admin.updateUserById(integrante.auth_user_id, {
    password: DEFAULT_RESET,
    app_metadata: { ...currentMeta, must_change_password: true },
  });
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    aviso: `Senha redefinida para ${DEFAULT_RESET}. O usuário deverá alterá-la no próximo login.`,
  });
}
