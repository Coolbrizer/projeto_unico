import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { hashPassword } from "@/lib/auth/password";
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

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const password_hash = hashPassword(DEFAULT_RESET);

  const { error } = await supabase
    .from("integrantes")
    .update({ password_hash, must_change_password: true })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    aviso: `Senha redefinida para ${DEFAULT_RESET}. O usuário deverá alterá-la no próximo login.`,
  });
}
