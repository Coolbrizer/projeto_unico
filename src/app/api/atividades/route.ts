import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { resolverResponsavelId } from "@/lib/responsavel-atividade";
import { calcularStatusExecucao } from "@/lib/status-execucao";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type { Atividade } from "@/types/database";
import { isUuidString } from "@/lib/uuid";
import {
  extrairInstrucaoServicoIdSelecionada,
  extrairPlanoAtividadesSelecionado,
} from "@/lib/instrucao-servico-filtro";

function normalizarProgresso(valor: unknown): number {
  const numero = Number(valor ?? 0);
  if (!Number.isFinite(numero)) return 0;
  const emDegraus = Math.round(numero / 10) * 10;
  return Math.min(100, Math.max(0, emDegraus));
}

function parsePlanoAtividades(valor: unknown): number | null {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || !Number.isInteger(numero) || numero < 1) return null;
  return numero;
}

export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;
  const instrucaoServicoId = extrairInstrucaoServicoIdSelecionada(request);
  const planoAtividades = extrairPlanoAtividadesSelecionado(request);

  let query = supabase.from("atividades").select("*").order("created_at", { ascending: false });
  if (instrucaoServicoId) {
    query = query.eq("instrucao_servico", instrucaoServicoId);
  }
  if (planoAtividades !== null) {
    query = query.eq("plano_atividades", planoAtividades);
  }
  const atividadesResult = await query;

  if (atividadesResult.error) {
    return NextResponse.json({ error: atividadesResult.error.message }, { status: 400 });
  }

  const atividades = ((atividadesResult.data as Atividade[] | null) ?? []).map((atividade) => {
    const progresso = normalizarProgresso(atividade.progresso);
    return {
      ...atividade,
      progresso,
      status_execucao:
        atividade.status_execucao ?? calcularStatusExecucao(atividade.fim, progresso),
    };
  });

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
    plano_atividades?: unknown;
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
  const planoAtividades = parsePlanoAtividades(body.plano_atividades);
  if (planoAtividades === null) {
    return NextResponse.json(
      { error: "Informe um número inteiro válido para o Plano de Atividades." },
      { status: 400 }
    );
  }

  const inicio = normalizarDataParaApi(body.inicio ?? undefined);
  const fim = normalizarDataParaApi(body.fim ?? undefined);
  if (inicio && fim && inicio > fim) {
    return NextResponse.json(
      { error: "A data de início precisa ser anterior ou igual à data de fim." },
      { status: 400 }
    );
  }

  const responsavel = body.responsavel?.trim() || null;
  const { data: integrantes } = await supabase.from("integrantes").select("id, nome");
  const responsavelId = resolverResponsavelId(
    responsavel,
    (integrantes ?? []) as Array<{ id: string; nome: string | null }>
  );

  const { data, error } = await supabase
    .from("atividades")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      descricao: body.descricao?.trim() || null,
      responsavel,
      responsavel_id: responsavelId,
      inicio,
      fim,
      instrucao_servico: instrucaoId,
      progresso,
      plano_atividades: planoAtividades,
      status_execucao: calcularStatusExecucao(fim, progresso),
    })
    .select("*")
    .single();

  if (error) {
    const mensagem =
      error.code === "23514"
        ? "A data de início precisa ser anterior ou igual à data de fim."
        : error.message;
    return NextResponse.json({ error: mensagem }, { status: 400 });
  }

  return NextResponse.json({ ok: true, atividade: data });
}
