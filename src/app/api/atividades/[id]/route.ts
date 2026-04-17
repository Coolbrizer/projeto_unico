import { NextResponse } from "next/server";
import { normalizarDataParaApi } from "@/lib/datas-atividade";
import { createServiceClient } from "@/lib/supabase/service";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { isAdmin } from "@/lib/auth/roles";

type Ctx = { params: Promise<{ id: string }> };

function normalizarProgresso(valor: unknown): number {
  const numero = Number(valor ?? 0);
  if (!Number.isFinite(numero)) return 0;
  const emDegraus = Math.round(numero / 10) * 10;
  return Math.min(100, Math.max(0, emDegraus));
}

function isBlank(valor: string | null | undefined): boolean {
  return !valor || valor.trim() === "";
}

function patchTouchesRelatorio(body: Record<string, unknown>): boolean {
  return (
    "progresso" in body || "etiqueta_relatorio" in body || "link_relatorio" in body
  );
}

function patchTouchesCamposGestor(body: Record<string, unknown>): boolean {
  return (
    "codigo" in body ||
    "descricao" in body ||
    "responsavel" in body ||
    "inicio" in body ||
    "fim" in body
  );
}

export async function PATCH(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const relatorio = patchTouchesRelatorio(body);
  const gestorFields = patchTouchesCamposGestor(body);

  if (!relatorio && !gestorFields) {
    return NextResponse.json({ error: "Nenhum campo para atualizar." }, { status: 400 });
  }

  if (gestorFields) {
    const { response } = await requireGestorOuAdmin();
    if (response) return response;
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const touchedEtiqueta = "etiqueta_relatorio" in body;
  const touchedLink = "link_relatorio" in body;
  const touchedProgresso = "progresso" in body;
  const touchedRelatorioTabela = touchedEtiqueta || touchedLink || touchedProgresso;

  const { data: atividadeRow, error: errAt } = await supabase
    .from("atividades")
    .select("codigo, responsavel")
    .eq("id", id)
    .maybeSingle();
  if (errAt || !atividadeRow) {
    return NextResponse.json({ error: "Atividade não encontrada." }, { status: 404 });
  }

  if (relatorio && !isAdmin(session.role)) {
    const { data: integranteRow, error: errInt } = await supabase
      .from("integrantes")
      .select("nome")
      .eq("id", session.sub)
      .maybeSingle();
    if (errInt || !integranteRow) {
      return NextResponse.json({ error: "Integrante não encontrado." }, { status: 403 });
    }
    const nome = (integranteRow as { nome?: string }).nome;
    const resp = (atividadeRow as { responsavel?: string | null }).responsavel;
    if (!integranteNomeMatchResponsavelAtividade(nome, resp)) {
      return NextResponse.json(
        {
          error:
            "Apenas o responsável pela atividade pode alterar progresso, etiqueta ou link do relatório.",
        },
        { status: 403 }
      );
    }
  }

  const patch: Record<string, string | number | null> = {};
  if ("codigo" in body) patch.codigo = String(body.codigo ?? "").trim();
  if ("descricao" in body) patch.descricao = body.descricao ? String(body.descricao).trim() : null;
  if ("responsavel" in body) patch.responsavel = body.responsavel ? String(body.responsavel).trim() : null;
  if ("inicio" in body) {
    const raw = body.inicio;
    patch.inicio =
      raw === null || raw === undefined || String(raw).trim() === ""
        ? null
        : normalizarDataParaApi(String(raw));
  }
  if ("fim" in body) {
    const raw = body.fim;
    patch.fim =
      raw === null || raw === undefined || String(raw).trim() === ""
        ? null
        : normalizarDataParaApi(String(raw));
  }
  const hasAtividadePatch = Object.keys(patch).length > 0;
  let atividadeAtualizada: Record<string, unknown> | null = null;
  if (hasAtividadePatch) {
    const { data, error } = await supabase
      .from("atividades")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    atividadeAtualizada = data as Record<string, unknown>;
  }

  if (touchedRelatorioTabela) {
    const codigoAtividade = String((atividadeAtualizada?.codigo ?? atividadeRow.codigo) ?? "").trim();
    if (!codigoAtividade) {
      return NextResponse.json(
        { error: "A atividade precisa de código para guardar etiqueta/link do relatório." },
        { status: 400 }
      );
    }

    const etiqueta = touchedEtiqueta
      ? body.etiqueta_relatorio
        ? String(body.etiqueta_relatorio).trim()
        : null
      : undefined;
    const link = touchedLink ? (body.link_relatorio ? String(body.link_relatorio).trim() : null) : undefined;
    const progresso = touchedProgresso ? normalizarProgresso(body.progresso) : undefined;

    const { data: relatorioAtual, error: errRelatorioAtual } = await supabase
      .from("etiqueta_relatorio")
      .select("etiqueta, link, progresso")
      .eq("codigo", codigoAtividade)
      .maybeSingle();
    if (errRelatorioAtual) {
      return NextResponse.json({ error: errRelatorioAtual.message }, { status: 400 });
    }

    const etiquetaFinal = etiqueta !== undefined ? etiqueta : relatorioAtual?.etiqueta ?? null;
    const linkFinal = link !== undefined ? link : relatorioAtual?.link ?? null;
    const progressoFinal =
      progresso !== undefined ? progresso : normalizarProgresso(relatorioAtual?.progresso ?? 0);

    // Regra de negócio: com percentual em 100%, etiqueta e link são obrigatórios.
    if (progressoFinal === 100 && (isBlank(etiquetaFinal) || isBlank(linkFinal))) {
      return NextResponse.json(
        {
          error: "Com percentual de 100%, informe obrigatoriamente a etiqueta e o link do relatório.",
        },
        { status: 400 }
      );
    }

    if (etiqueta === null && link === null && !touchedProgresso) {
      const { error: deleteError } = await supabase
        .from("etiqueta_relatorio")
        .delete()
        .eq("codigo", codigoAtividade);
      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 400 });
      }
    } else {
      const upsertPayload: Record<string, string | number | null> = { codigo: codigoAtividade };
      if (etiqueta !== undefined) upsertPayload.etiqueta = etiqueta;
      if (link !== undefined) upsertPayload.link = link;
      if (progresso !== undefined) upsertPayload.progresso = progresso;
      const { error: upsertError } = await supabase
        .from("etiqueta_relatorio")
        .upsert(upsertPayload, { onConflict: "codigo" });
      if (upsertError) {
        return NextResponse.json({ error: upsertError.message }, { status: 400 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const { response } = await requireGestorOuAdmin();
  if (response) return response;

  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: atividadeRow, error: errAtividade } = await supabase
    .from("atividades")
    .select("codigo")
    .eq("id", id)
    .maybeSingle();
  if (errAtividade || !atividadeRow) {
    return NextResponse.json({ error: "Atividade não encontrada." }, { status: 404 });
  }

  const codigo = String((atividadeRow as { codigo?: string | null }).codigo ?? "").trim();
  if (codigo) {
    const { error: deleteRelatorioError } = await supabase
      .from("etiqueta_relatorio")
      .delete()
      .eq("codigo", codigo);
    if (deleteRelatorioError) {
      return NextResponse.json({ error: deleteRelatorioError.message }, { status: 400 });
    }
  }

  const { error } = await supabase.from("atividades").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
