import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import type { Atividade } from "@/types/database";
import { isUuidString } from "@/lib/uuid";

type EtiquetaRelatorioRow = {
  codigo: string;
  etiqueta: string | null;
  link: string | null;
  progresso: number | null;
};

function chaveCodigo(codigo: string | null | undefined): string {
  return String(codigo ?? "").trim();
}

function normalizarProgresso(valor: unknown): number {
  const numero = Number(valor ?? 0);
  if (!Number.isFinite(numero)) return 0;
  const emDegraus = Math.round(numero / 10) * 10;
  return Math.min(100, Math.max(0, emDegraus));
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const [atividadesResult, relatorioResult] = await Promise.all([
    supabase.from("atividades").select("*").order("created_at", { ascending: false }),
    supabase.from("etiqueta_relatorio").select("codigo, etiqueta, link, progresso"),
  ]);

  if (atividadesResult.error) {
    return NextResponse.json({ error: atividadesResult.error.message }, { status: 400 });
  }

  const relatorioPorCodigo = new Map<string, EtiquetaRelatorioRow>();
  if (!relatorioResult.error) {
    ((relatorioResult.data as EtiquetaRelatorioRow[] | null) ?? []).forEach((row) => {
      relatorioPorCodigo.set(chaveCodigo(row.codigo), row);
    });
  }

  const atividades = ((atividadesResult.data as Atividade[] | null) ?? []).map((atividade) => {
    const relatorio = relatorioPorCodigo.get(chaveCodigo(atividade.codigo));
    return {
      ...atividade,
      etiqueta_relatorio: relatorio?.etiqueta ?? null,
      link_relatorio: relatorio?.link ?? null,
      progresso: normalizarProgresso(relatorio?.progresso ?? atividade.progresso),
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
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const codigo = String(data.codigo ?? "").trim();
  if (codigo) {
    const { error: relatorioError } = await supabase
      .from("etiqueta_relatorio")
      .upsert({ codigo, progresso }, { onConflict: "codigo" });
    if (relatorioError) {
      return NextResponse.json({ error: relatorioError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true, atividade: data });
}
