import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type { Atividade } from "@/types/database";
import { isUuidString } from "@/lib/uuid";
import { extrairInstrucaoServicoIdSelecionada } from "@/lib/instrucao-servico-filtro";

function normalizarProgresso(valor: unknown): number {
  const numero = Number(valor ?? 0);
  if (!Number.isFinite(numero)) return 0;
  const emDegraus = Math.round(numero / 10) * 10;
  return Math.min(100, Math.max(0, emDegraus));
}

export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;
  const instrucaoServicoId = extrairInstrucaoServicoIdSelecionada(request);

  let query = supabase.from("atividades").select("*").order("created_at", { ascending: false });
  if (instrucaoServicoId) {
    query = query.eq("instrucao_servico", instrucaoServicoId);
  }
  const atividadesResult = await query;

  if (atividadesResult.error) {
    return NextResponse.json({ error: atividadesResult.error.message }, { status: 400 });
  }

  const atividades = ((atividadesResult.data as Atividade[] | null) ?? []).map((atividade) => ({
    ...atividade,
    progresso: normalizarProgresso(atividade.progresso),
  }));

  return NextResponse.json({ ok: true, atividades });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let body: {
    codigo?: string;
    descricao?: string | null;
    responsavel?: string | null;
    inicio?: string | null;
    fim?: string | null;
    progresso?: number;
    instrucao_servico?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const instrucaoId = body.instrucao_servico?.trim() ?? "";
  if (!instrucaoId || !isUuidString(instrucaoId)) {
    return NextResponse.json(
      { error: "Selecione uma Instrução de Serviço válida (campo obrigatório)." },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const progresso = normalizarProgresso(body.progresso);

  const { data, error } = await supabase
    .from("atividades")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      descricao: body.descricao?.trim() || null,
      responsavel: body.responsavel?.trim() || null,
      inicio: normalizarDataParaApi(body.inicio ?? undefined),
      fim: normalizarDataParaApi(body.fim ?? undefined),
      instrucao_servico: instrucaoId,
      progresso,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, atividade: data });
}
