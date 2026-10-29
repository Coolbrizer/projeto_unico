import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { ordenarDocumentosPorReferencia } from "@/lib/documentos-sort";
import { mensagemErroGravacaoDocumento, parseCorpoDocumento } from "@/lib/documentos-validacao";
import type { Documento } from "@/types/database";

/** Supabase pode retornar `link` ou, em bases antigas, `url`. */
function linkDoRegistro(row: Record<string, unknown>): string | null {
  const link = row.link;
  const url = row.url;
  const s = (typeof link === "string" ? link : typeof url === "string" ? url : null) ?? null;
  const t = s?.trim();
  return t ? t : null;
}

function normalizarDocumento(row: Record<string, unknown>): Documento {
  const base = row as unknown as Documento;
  return {
    ...base,
    link: linkDoRegistro(row),
  };
}

function normalizarIsoData(raw: unknown): string | null {
  const s = typeof raw === "string" ? raw.trim().slice(0, 10) : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  return null;
}

function planosDoResumo(raw: unknown): number[] {
  let itens: unknown[] = [];
  if (Array.isArray(raw)) itens = raw;
  else if (typeof raw === "string") {
    const interno = raw.trim().replace(/^\{|\}$/g, "");
    itens = interno ? interno.split(",") : [];
  }
  const numeros = itens
    .map((v) => Number(String(v).trim()))
    .filter((n) => Number.isInteger(n) && n >= 1);
  return [...new Set(numeros)].sort((a, b) => a - b);
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const [docsRes, resumoRes] = await Promise.all([
    supabase.from("documentos").select("*"),
    supabase
      .from("atividades_resumo_por_documento")
      .select("instrucao_servico, periodo_inicio, periodo_fim, planos"),
  ]);

  if (docsRes.error) {
    return NextResponse.json({ error: docsRes.error.message }, { status: 400 });
  }
  if (resumoRes.error) {
    return NextResponse.json({ error: resumoRes.error.message }, { status: 400 });
  }

  const resumoPorInstrucao = new Map<
    string,
    { inicio: string | null; fim: string | null; planos: number[] }
  >();
  for (const row of (resumoRes.data ?? []) as Array<Record<string, unknown>>) {
    const instrucao = typeof row.instrucao_servico === "string" ? row.instrucao_servico : "";
    if (!instrucao) continue;
    resumoPorInstrucao.set(instrucao, {
      inicio: normalizarIsoData(row.periodo_inicio),
      fim: normalizarIsoData(row.periodo_fim),
      planos: planosDoResumo(row.planos),
    });
  }

  const documentos = ordenarDocumentosPorReferencia(
    ((docsRes.data as Record<string, unknown>[]) ?? []).map((row) => {
      const doc = normalizarDocumento(row);
      const resumo = resumoPorInstrucao.get(doc.id);
      const inicioGravado = normalizarIsoData(row.periodo_inicio);
      const fimGravado = normalizarIsoData(row.periodo_fim);
      const periodoOficial =
        inicioGravado && fimGravado && inicioGravado <= fimGravado
          ? { inicio: inicioGravado, fim: fimGravado }
          : null;
      return {
        ...doc,
        periodo_inicio: inicioGravado,
        periodo_fim: fimGravado,
        periodo_inicio_atividades: periodoOficial?.inicio ?? resumo?.inicio ?? null,
        periodo_fim_atividades: periodoOficial?.fim ?? resumo?.fim ?? null,
        planos_atividades: resumo?.planos ?? [],
      } satisfies Documento;
    })
  );

  return NextResponse.json({ ok: true, documentos });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let body: {
    tipo_documento?: string;
    numero?: string;
    ano?: string;
    etiqueta?: string | null;
    link?: string | null;
    periodo_inicio?: string | null;
    periodo_fim?: string | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = parseCorpoDocumento(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { tipo_documento: tipoRaw, numero, ano, etiqueta, link, periodo_inicio, periodo_fim } =
    parsed.data;

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("documentos")
    .insert({
      tipo: tipoRaw,
      numero,
      ano,
      etiqueta,
      link,
      periodo_inicio,
      periodo_fim,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: mensagemErroGravacaoDocumento(error) }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}
