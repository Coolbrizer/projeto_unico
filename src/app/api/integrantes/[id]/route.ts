import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { writeAuditLog } from "@/lib/audit-log";

type Ctx = { params: Promise<{ id: string }> };

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
