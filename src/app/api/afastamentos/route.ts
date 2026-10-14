import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/audit-log";
import {
  PERIODO_AFASTAMENTO_PADRAO,
  competenciasDoPeriodo,
  diasMaximosNoPeriodo,
  isCompetenciaNoPeriodo,
  parseDiasAfastamento,
  podeGerirAfastamentos,
  rotuloPeriodoAfastamento,
  type PeriodoAfastamento,
} from "@/lib/afastamentos";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { extrairInstrucaoServicoIdSelecionada } from "@/lib/instrucao-servico-filtro";
import type { FrequenciaMensal, Integrante, RefPgto } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { VINCULO_INTEGRANTE } from "@/lib/vinculo-pessoa";

async function periodoDaInstrucao(
  supabase: SupabaseClient,
  instrucaoServicoId: string
): Promise<PeriodoAfastamento> {
  if (!instrucaoServicoId) return PERIODO_AFASTAMENTO_PADRAO;
  const { data } = await supabase
    .from("documentos")
    .select("periodo_inicio, periodo_fim")
    .eq("id", instrucaoServicoId)
    .maybeSingle();
  const inicio = typeof data?.periodo_inicio === "string" ? data.periodo_inicio.slice(0, 10) : "";
  const fim = typeof data?.periodo_fim === "string" ? data.periodo_fim.slice(0, 10) : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(inicio) && /^\d{4}-\d{2}-\d{2}$/.test(fim) && inicio <= fim) {
    return { inicio, fim };
  }
  return PERIODO_AFASTAMENTO_PADRAO;
}

export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase, session } = auth;
  const canManageAll = podeGerirAfastamentos(session.role);
  const periodo = await periodoDaInstrucao(
    supabase,
    extrairInstrucaoServicoIdSelecionada(request)
  );
  const competencias = competenciasDoPeriodo(periodo);

  let integrantesQuery = supabase
    .from("integrantes")
    .select("id, matricula, nome, setor, cargo, classe_padrao, email, perfil, nao_remunerado, created_at")
    .eq("vinculo", VINCULO_INTEGRANTE)
    .order("nome", { ascending: true });

  if (!canManageAll) {
    integrantesQuery = integrantesQuery.eq("id", session.sub);
  }

  let frequenciasQuery = supabase
    .from("frequencias_mensais")
    .select("id, integrante_id, competencia, dias_afastamento, informado_por, created_at, updated_at")
    .in(
      "competencia",
      competencias.map((mes) => mes.competencia)
    );

  if (!canManageAll) {
    frequenciasQuery = frequenciasQuery.eq("integrante_id", session.sub);
  }

  const [integrantesRes, frequenciasRes, refPgtoRes] = await Promise.all([
    integrantesQuery,
    frequenciasQuery,
    supabase.from("ref_pgto").select("id, cargo, classe_padrao, valor_mensal, created_at").order("cargo", {
      ascending: true,
    }),
  ]);

  if (integrantesRes.error) {
    return NextResponse.json({ error: integrantesRes.error.message }, { status: 400 });
  }
  if (frequenciasRes.error) {
    return NextResponse.json({ error: frequenciasRes.error.message }, { status: 400 });
  }
  if (refPgtoRes.error) {
    return NextResponse.json({ error: refPgtoRes.error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    periodo: { ...periodo, rotulo: rotuloPeriodoAfastamento(periodo) },
    competencias,
    canManageAll,
    usuarioId: session.sub,
    integrantes: (integrantesRes.data ?? []) as Integrante[],
    frequencias: (frequenciasRes.data ?? []) as FrequenciaMensal[],
    ref_pgto: (refPgtoRes.data ?? []) as RefPgto[],
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

  const periodo = await periodoDaInstrucao(
    supabase,
    extrairInstrucaoServicoIdSelecionada(request)
  );
  const rotulo = rotuloPeriodoAfastamento(periodo);
  const competencia = typeof body.competencia === "string" ? body.competencia.trim() : "";
  if (!isCompetenciaNoPeriodo(competencia, periodo)) {
    return NextResponse.json(
      { error: `Informe um mês dentro do período de ${rotulo}.` },
      { status: 400 }
    );
  }

  const diasAfastamento = parseDiasAfastamento(body.dias_afastamento, competencia, periodo);
  if (diasAfastamento === null) {
    const max = diasMaximosNoPeriodo(competencia, periodo);
    return NextResponse.json(
      {
        error: `Informe uma quantidade inteira de dias de afastamento entre 0 e ${max}. Apenas o período de ${rotulo} é considerado.`,
      },
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
    .eq("vinculo", VINCULO_INTEGRANTE)
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
