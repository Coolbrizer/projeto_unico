import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/audit-log";
import {
  COMPETENCIAS_AFASTAMENTO,
  isCompetenciaAfastamento,
  parseDiasAfastamento,
  podeGerirAfastamentos,
} from "@/lib/afastamentos";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type { FrequenciaMensal, Integrante } from "@/types/database";

const COMPETENCIAS = COMPETENCIAS_AFASTAMENTO.map((item) => item.competencia);

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase, session } = auth;
  const canManageAll = podeGerirAfastamentos(session.role);

  let integrantesQuery = supabase
    .from("integrantes")
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, nao_remunerado, created_at")
    .order("nome", { ascending: true });

  if (!canManageAll) {
    integrantesQuery = integrantesQuery.eq("id", session.sub);
  }

  let frequenciasQuery = supabase
    .from("frequencias_mensais")
    .select("id, integrante_id, competencia, dias_afastamento, informado_por, created_at, updated_at")
    .in("competencia", COMPETENCIAS);

  if (!canManageAll) {
    frequenciasQuery = frequenciasQuery.eq("integrante_id", session.sub);
  }

  const [integrantesRes, frequenciasRes] = await Promise.all([integrantesQuery, frequenciasQuery]);

  if (integrantesRes.error) {
    return NextResponse.json({ error: integrantesRes.error.message }, { status: 400 });
  }
  if (frequenciasRes.error) {
    return NextResponse.json({ error: frequenciasRes.error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    competencias: COMPETENCIAS,
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
  const canManageAll = podeGerirAfastamentos(session.role);

  let body: { integrante_id?: unknown; competencia?: unknown; dias_afastamento?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const competencia = typeof body.competencia === "string" ? body.competencia.trim() : "";
  if (!isCompetenciaAfastamento(competencia)) {
    return NextResponse.json(
      { error: "Informe uma competência válida (setembro a dezembro de 2026)." },
      { status: 400 }
    );
  }

  const diasAfastamento = parseDiasAfastamento(body.dias_afastamento);
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
    return NextResponse.json(
      { error: "Sem permissão para informar afastamento de outro usuário." },
      { status: 403 }
    );
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
