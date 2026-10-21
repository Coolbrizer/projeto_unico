import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/roles";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import {
  mesEstaNoPeriodo,
  periodoOrcamentoPorId,
  type ExecucaoMensal,
} from "@/lib/orcamento-periodos";

function periodoDaQuery(request: Request) {
  const periodoId = new URL(request.url).searchParams.get("periodoId")?.trim() ?? "";
  const periodo = periodoOrcamentoPorId(periodoId);
  if (!periodo) return null;
  return periodo;
}

export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  if (!isAdmin(auth.session.role)) {
    return NextResponse.json({ error: "Acesso restrito." }, { status: 403 });
  }

  const periodo = periodoDaQuery(request);
  if (!periodo) {
    return NextResponse.json({ error: "Período orçamentário inválido." }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("orcamento_execucao_mensal")
    .select("ano, mes, valor_executado, por_afastamento")
    .eq("periodo_id", periodo.id)
    .order("ano", { ascending: true })
    .order("mes", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const execucoes: ExecucaoMensal[] = (data ?? []).map((row) => ({
    ano: Number(row.ano),
    mes: Number(row.mes),
    valor_executado: Number(row.valor_executado),
    por_afastamento: row.por_afastamento === true,
  }));

  return NextResponse.json({ ok: true, execucoes });
}

export async function PUT(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  if (!isAdmin(auth.session.role)) {
    return NextResponse.json({ error: "Acesso restrito." }, { status: 403 });
  }

  let body: {
    periodoId?: string;
    ano?: number;
    mes?: number;
    valorExecutado?: number | null;
    porAfastamento?: boolean;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const periodo = periodoOrcamentoPorId((body.periodoId ?? "").trim());
  const ano = Number(body.ano);
  const mes = Number(body.mes);
  if (!periodo || !Number.isInteger(ano) || !Number.isInteger(mes) || !mesEstaNoPeriodo(periodo, ano, mes)) {
    return NextResponse.json({ error: "Mês fora do período orçamentário." }, { status: 400 });
  }

  if (body.valorExecutado === null) {
    const { error } = await auth.supabase
      .from("orcamento_execucao_mensal")
      .delete()
      .eq("periodo_id", periodo.id)
      .eq("ano", ano)
      .eq("mes", mes);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, valor_executado: null });
  }

  const valor = Number(body.valorExecutado);
  if (!Number.isFinite(valor) || valor < 0 || valor > 9_999_999_999_999.99) {
    return NextResponse.json({ error: "Informe um valor executado válido." }, { status: 400 });
  }
  const valorExecutado = Math.round(valor * 100) / 100;

  const { error } = await auth.supabase.from("orcamento_execucao_mensal").upsert(
    {
      periodo_id: periodo.id,
      ano,
      mes,
      valor_executado: valorExecutado,
      por_afastamento: body.porAfastamento === true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "periodo_id,ano,mes" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true, valor_executado: valorExecutado });
}
