import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/audit-log";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type { FrequenciaMensal, Integrante } from "@/types/database";

function competenciaAtual(): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const ano = partes.find((p) => p.type === "year")?.value ?? String(new Date().getFullYear());
  const mes = partes.find((p) => p.type === "month")?.value ?? String(new Date().getMonth() + 1).padStart(2, "0");
  return `${ano}-${mes}-01`;
}

function podeGerirTodos(role: string): boolean {
  return role === "gestor" || role === "admin";
}

function parseDias(raw: unknown): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > 31) return null;
  return n;
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase, session } = auth;
  const competencia = competenciaAtual();
  const canManageAll = podeGerirTodos(session.role);

  let integrantesQuery = supabase
    .from("integrantes")
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, nao_remunerado, created_at")
    .order("nome", { ascending: true });

  if (!canManageAll) {
    integrantesQuery = integrantesQuery.eq("id", session.sub);
  }

  const [integrantesRes, frequenciasRes] = await Promise.all([
    integrantesQuery,
    supabase
      .from("frequencias_mensais")
      .select("id, integrante_id, competencia, dias_afastamento, informado_por, created_at, updated_at")
      .eq("competencia", competencia),
  ]);

  if (integrantesRes.error) {
    return NextResponse.json({ error: integrantesRes.error.message }, { status: 400 });
  }
  if (frequenciasRes.error) {
    return NextResponse.json({ error: frequenciasRes.error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    competencia,
    canManageAll,
    usuarioId: session.sub,
    integrantes: (integrantesRes.data ?? []) as Integrante[],
    frequencias: (frequenciasRes.data ?? []) as FrequenciaMensal[],
  });
}

export async function POST(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase, session } = auth;
  const competencia = competenciaAtual();
  const canManageAll = podeGerirTodos(session.role);

  let body: { integrante_id?: unknown; dias_afastamento?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const diasAfastamento = parseDias(body.dias_afastamento);
  if (diasAfastamento === null) {
    return NextResponse.json(
      { error: "Informe uma quantidade inteira de dias de afastamento entre 0 e 31." },
      { status: 400 }
    );
  }

  const alvoInformado = typeof body.integrante_id === "string" ? body.integrante_id.trim() : "";
  const integranteId = canManageAll ? alvoInformado : session.sub;
  if (!integranteId) {
    return NextResponse.json({ error: "Informe o integrante." }, { status: 400 });
  }

  if (!canManageAll && integranteId !== session.sub) {
    return NextResponse.json({ error: "Sem permissão para informar frequência de outro usuário." }, { status: 403 });
  }

  const { data: integrante, error: integranteError } = await supabase
    .from("integrantes")
    .select("id")
    .eq("id", integranteId)
    .maybeSingle();

  if (integranteError) {
    return NextResponse.json({ error: integranteError.message }, { status: 400 });
  }
  if (!integrante) {
    return NextResponse.json({ error: "Integrante não encontrado." }, { status: 404 });
  }

  const { data: beforeData } = await supabase
    .from("frequencias_mensais")
    .select("id, integrante_id, competencia, dias_afastamento, informado_por, created_at, updated_at")
    .eq("integrante_id", integranteId)
    .eq("competencia", competencia)
    .maybeSingle();

  const { data, error } = await supabase
    .from("frequencias_mensais")
    .upsert(
      {
        integrante_id: integranteId,
        competencia,
        dias_afastamento: diasAfastamento,
        informado_por: session.sub || null,
      },
      { onConflict: "integrante_id,competencia" }
    )
    .select("id, integrante_id, competencia, dias_afastamento, informado_por, created_at, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    supabase,
    action: beforeData ? "update" : "insert",
    entityTable: "frequencias_mensais",
    entityId: String(data.id ?? ""),
    session,
    beforeData,
    afterData: data,
  });

  return NextResponse.json({ ok: true, frequencia: data as FrequenciaMensal });
}
