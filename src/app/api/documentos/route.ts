import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { ordenarDocumentosPorReferencia } from "@/lib/documentos-sort";
import { parseCorpoDocumento } from "@/lib/documentos-validacao";
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
  const s = typeof raw === "string" ? raw.trim() : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  return null;
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const [docsRes, atvRes] = await Promise.all([
    supabase.from("documentos").select("*"),
    supabase.from("atividades").select("instrucao_servico, inicio, fim"),
  ]);

  if (docsRes.error) {
    return NextResponse.json({ error: docsRes.error.message }, { status: 400 });
  }
  if (atvRes.error) {
    return NextResponse.json({ error: atvRes.error.message }, { status: 400 });
  }

  const periodoPorInstrucao = new Map<string, { inicio: string; fim: string }>();
  for (const a of (atvRes.data ?? []) as Array<Record<string, unknown>>) {
    const instrucao = typeof a.instrucao_servico === "string" ? a.instrucao_servico : "";
    if (!instrucao) continue;
    const ini = normalizarIsoData(a.inicio);
    const fim = normalizarIsoData(a.fim);
    if (!ini || !fim) continue;
    const atual = periodoPorInstrucao.get(instrucao);
    if (!atual) {
      periodoPorInstrucao.set(instrucao, { inicio: ini, fim });
      continue;
    }
    periodoPorInstrucao.set(instrucao, {
      inicio: ini < atual.inicio ? ini : atual.inicio,
      fim: fim > atual.fim ? fim : atual.fim,
    });
  }

  const documentos = ordenarDocumentosPorReferencia(
    ((docsRes.data as Record<string, unknown>[]) ?? []).map((row) => {
      const doc = normalizarDocumento(row);
      const periodo = periodoPorInstrucao.get(doc.id);
      return {
        ...doc,
        periodo_inicio_atividades: periodo?.inicio ?? null,
        periodo_fim_atividades: periodo?.fim ?? null,
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

  const { tipo_documento: tipoRaw, numero, ano, etiqueta, link } = parsed.data;

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
      numero: Number(numero),
      ano: Number(ano),
      etiqueta,
      link,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, documento: data });
}
