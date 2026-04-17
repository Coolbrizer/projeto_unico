import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { writeAuditLog } from "@/lib/audit-log";

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

  const { data, error } = await supabase.from("equipe").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, equipe: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;
  const session = auth.session;

  let body: { codigo?: string; equipe?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("equipe")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      equipe: (body.equipe ?? "").trim(),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    supabase,
    action: "insert",
    entityTable: "equipe",
    entityId: String(data.id ?? ""),
    session,
    afterData: data,
  });

  return NextResponse.json({ ok: true, row: data });
}
