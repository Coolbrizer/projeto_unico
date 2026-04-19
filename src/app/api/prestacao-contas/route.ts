import { NextResponse } from "next/server";
import { integranteCorrespondenteAResponsavel } from "@/lib/equipe-page-helpers";
import { textoEquipeParticipantes } from "@/lib/prestacao-contas-equipe";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Atividade, Documento, Equipe, Integrante } from "@/types/database";
import { UUID_REGEX } from "@/lib/uuid";

function normalizarProgresso(valor: unknown): number {
  const numero = Number(valor ?? 0);
  if (!Number.isFinite(numero)) return 0;
  const emDegraus = Math.round(numero / 10) * 10;
  return Math.min(100, Math.max(0, emDegraus));
}

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

export async function GET(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  const url = new URL(request.url);
  const documentoId = url.searchParams.get("documentoId")?.trim() ?? "";
  if (!documentoId || !UUID_REGEX.test(documentoId)) {
    return NextResponse.json({ error: "Informe documentoId (UUID) válido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const [docResult, atividadesResult, integrantesResult, equipeResult] = await Promise.all([
    supabase.from("documentos").select("*").eq("id", documentoId).maybeSingle(),
    supabase
      .from("atividades")
      .select("*")
      .eq("instrucao_servico", documentoId)
      .order("codigo", { ascending: true }),
    supabase.from("integrantes").select("id, matricula, nome, setor"),
    supabase.from("equipe").select("id, codigo, equipe"),
  ]);

  if (docResult.error) {
    return NextResponse.json({ error: docResult.error.message }, { status: 400 });
  }
  if (!docResult.data) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  const documento = normalizarDocumento(docResult.data as Record<string, unknown>);

  if (atividadesResult.error) {
    return NextResponse.json({ error: atividadesResult.error.message }, { status: 400 });
  }
  if (integrantesResult.error) {
    return NextResponse.json({ error: integrantesResult.error.message }, { status: 400 });
  }
  if (equipeResult.error) {
    return NextResponse.json({ error: equipeResult.error.message }, { status: 400 });
  }

  const integrantes = (integrantesResult.data as Integrante[]) ?? [];
  const todasEquipes = (equipeResult.data as Equipe[]) ?? [];
  const atividadesRaw = (atividadesResult.data as Atividade[]) ?? [];

  const linhas = atividadesRaw.map((atividade) => {
    const progresso = normalizarProgresso(atividade.progresso);
    const integ = integranteCorrespondenteAResponsavel(integrantes, atividade.responsavel);
    const equipe = textoEquipeParticipantes(atividade, integrantes, todasEquipes);

    return {
      id: atividade.id,
      codigo: atividade.codigo,
      atividade: atividade.descricao ?? null,
      equipe,
      setor_responsavel: integ?.setor ?? null,
      progresso,
      etiqueta_relatorio: atividade.etiqueta_relatorio ?? null,
      link_relatorio: atividade.link_relatorio ?? null,
    };
  });

  return NextResponse.json({ ok: true, documento, linhas });
}
