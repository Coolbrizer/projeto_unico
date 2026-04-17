import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { createServiceClient } from "@/lib/supabase/service";
import { podeAcessarAuditoria } from "@/lib/auth/auditoria";

export async function GET(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  if (!podeAcessarAuditoria(session)) {
    return NextResponse.json({ error: "Sem permissão para auditoria." }, { status: 403 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const url = new URL(request.url);
  const tabela = url.searchParams.get("tabela")?.trim() ?? "";
  const acao = url.searchParams.get("acao")?.trim() ?? "";
  const ator = url.searchParams.get("ator")?.trim() ?? "";
  const de = url.searchParams.get("de")?.trim() ?? "";
  const ate = url.searchParams.get("ate")?.trim() ?? "";
  const limitRaw = Number(url.searchParams.get("limit") ?? "300");
  const limit = Math.min(1000, Math.max(1, Number.isFinite(limitRaw) ? Math.floor(limitRaw) : 300));

  let query = supabase
    .from("audit_log")
    .select(
      "id, actor_id, actor_email, actor_role, entity_table, entity_id, action, before_data, after_data, metadata, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (tabela) query = query.eq("entity_table", tabela);
  if (acao) query = query.eq("action", acao);
  if (ator) query = query.ilike("actor_email", `%${ator}%`);
  if (de) query = query.gte("created_at", de);
  if (ate) query = query.lte("created_at", ate);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, logs: data ?? [] });
}
