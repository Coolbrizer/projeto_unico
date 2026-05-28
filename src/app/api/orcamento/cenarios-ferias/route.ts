import { NextResponse } from "next/server";
import { totaisCenarioFerias } from "@/lib/orcamento-cenarios-ferias";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type {
  Integrante,
  OrcamentoCenarioFeriasLinha,
  RefPgto,
} from "@/types/database";

function parseLinhas(raw: unknown): OrcamentoCenarioFeriasLinha[] | null {
  if (!Array.isArray(raw)) return null;
  const linhas: OrcamentoCenarioFeriasLinha[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const o = item as Record<string, unknown>;
    const integrante_id = typeof o.integrante_id === "string" ? o.integrante_id.trim() : "";
    const dias = Number(o.dias_ferias);
    if (!integrante_id || !Number.isFinite(dias)) return null;
    if (dias < 1) continue;
    linhas.push({ integrante_id, dias_ferias: Math.floor(dias) });
  }
  return linhas;
}

function parseDataISO(raw: unknown): string | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("orcamento_cenarios_ferias")
    .select(
      "id, nome, data_inicio, data_fim, linhas, total_economia, economia_sejud, economia_stic, criado_por, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, cenarios: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase, session } = auth;

  let body: {
    nome?: string;
    data_inicio?: string;
    data_fim?: string;
    linhas?: unknown;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome) {
    return NextResponse.json({ error: "Informe um nome para o cenário." }, { status: 400 });
  }

  const dataInicio = parseDataISO(body.data_inicio);
  const dataFim = parseDataISO(body.data_fim);
  if (!dataInicio || !dataFim) {
    return NextResponse.json({ error: "Informe o período (data inicial e final)." }, { status: 400 });
  }

  const linhas = parseLinhas(body.linhas);
  if (!linhas || linhas.length === 0) {
    return NextResponse.json(
      { error: "Informe dias de férias para ao menos um integrante." },
      { status: 400 }
    );
  }

  const [resInt, resRef] = await Promise.all([
    supabase
      .from("integrantes")
      .select("id, matricula, nome, setor, cargo, classe_padrao, nao_remunerado"),
    supabase.from("ref_pgto").select("id, cargo, classe_padrao, valor_mensal"),
  ]);

  if (resInt.error) {
    return NextResponse.json({ error: resInt.error.message }, { status: 400 });
  }
  if (resRef.error) {
    return NextResponse.json({ error: resRef.error.message }, { status: 400 });
  }

  const integrantes = (resInt.data ?? []) as Integrante[];
  const refPgto = (resRef.data ?? []) as RefPgto[];
  const ids = new Set(integrantes.map((i) => i.id));
  for (const l of linhas) {
    if (!ids.has(l.integrante_id)) {
      return NextResponse.json({ error: "Integrante inválido no cenário." }, { status: 400 });
    }
  }

  const totais = totaisCenarioFerias(linhas, integrantes, refPgto, dataInicio, dataFim);
  if (totais.erro) {
    return NextResponse.json({ error: totais.erro }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("orcamento_cenarios_ferias")
    .insert({
      nome,
      data_inicio: dataInicio,
      data_fim: dataFim,
      linhas,
      total_economia: totais.totalEconomia,
      economia_sejud: totais.economiaSejud,
      economia_stic: totais.economiaStic,
      criado_por: session.sub || null,
    })
    .select(
      "id, nome, data_inicio, data_fim, linhas, total_economia, economia_sejud, economia_stic, criado_por, created_at"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, cenario: data });
}
