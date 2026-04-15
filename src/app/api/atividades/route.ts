import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { createServiceClient } from "@/lib/supabase/service";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import type { Atividade } from "@/types/database";

type EtiquetaRelatorioRow = {
  codigo: string;
  etiqueta: string | null;
  link: string | null;
};

function chaveCodigo(codigo: string | null | undefined): string {
  return String(codigo ?? "").trim();
}

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

  const [atividadesResult, relatorioResult] = await Promise.all([
    supabase.from("atividades").select("*").order("created_at", { ascending: false }),
    supabase.from("etiqueta_relatorio").select("codigo, etiqueta, link"),
  ]);

  if (atividadesResult.error) {
    return NextResponse.json({ error: atividadesResult.error.message }, { status: 400 });
  }
  if (relatorioResult.error) {
    return NextResponse.json({ error: relatorioResult.error.message }, { status: 400 });
  }

  const relatorioPorCodigo = new Map<string, EtiquetaRelatorioRow>();
  ((relatorioResult.data as EtiquetaRelatorioRow[] | null) ?? []).forEach((row) => {
    relatorioPorCodigo.set(chaveCodigo(row.codigo), row);
  });

  const atividades = ((atividadesResult.data as Atividade[] | null) ?? []).map((atividade) => {
    const relatorio = relatorioPorCodigo.get(chaveCodigo(atividade.codigo));
    return {
      ...atividade,
      etiqueta_relatorio: relatorio?.etiqueta ?? null,
      link_relatorio: relatorio?.link ?? null,
    };
  });

  return NextResponse.json({ ok: true, atividades });
}

export async function POST(request: Request) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  let body: {
    codigo?: string;
    descricao?: string | null;
    responsavel?: string | null;
    inicio?: string | null;
    fim?: string | null;
    progresso?: number;
  };
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

  const progresso = Math.min(100, Math.max(0, Math.floor(Number(body.progresso ?? 0)) || 0));

  const { data, error } = await supabase
    .from("atividades")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      descricao: body.descricao?.trim() || null,
      responsavel: body.responsavel?.trim() || null,
      inicio: normalizarDataParaApi(body.inicio ?? undefined),
      fim: normalizarDataParaApi(body.fim ?? undefined),
      progresso,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, atividade: data });
}
