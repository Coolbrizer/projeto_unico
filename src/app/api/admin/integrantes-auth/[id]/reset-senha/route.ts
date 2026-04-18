import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAdmin } from "@/lib/auth/requireRole";

type Ctx = { params: Promise<{ id: string }> };

const DEFAULT_RESET = "123456";

export async function POST(_request: Request, ctx: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

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

  const { error: pwdErr } = await admin.auth.admin.updateUserById(integrante.auth_user_id, {
    password: DEFAULT_RESET,
  });
  if (pwdErr) {
    return NextResponse.json({ error: pwdErr.message }, { status: 400 });
  }

  // Marca must_change_password=true em integrantes; o trigger propaga ao app_metadata.
  const { error: flagErr } = await admin
    .from("integrantes")
    .update({ must_change_password: true })
    .eq("id", id);

  if (flagErr) {
    return NextResponse.json({ error: flagErr.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    aviso: `Senha redefinida para ${DEFAULT_RESET}. O usuário deverá alterá-la no próximo login.`,
  });
}
