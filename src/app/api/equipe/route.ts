import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import {
  extrairInstrucaoServicoIdSelecionada,
  extrairPlanoAtividadesSelecionado,
} from "@/lib/instrucao-servico-filtro";

export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;
  const instrucaoServicoId = extrairInstrucaoServicoIdSelecionada(request);
  const planoAtividades = extrairPlanoAtividadesSelecionado(request);

  if (instrucaoServicoId) {
    let atividadesQuery = supabase
      .from("atividades")
      .select("codigo")
      .eq("instrucao_servico", instrucaoServicoId);
    if (planoAtividades !== null) {
      atividadesQuery = atividadesQuery.eq("plano_atividades", planoAtividades);
    }
    const { data: atividades, error: errAt } = await atividadesQuery;

    if (errAt) {
      return NextResponse.json({ error: errAt.message }, { status: 400 });
    }

    const codigos = [
      ...new Set(
        (atividades ?? [])
          .map((a) => (a.codigo ?? "").trim())
          .filter(Boolean)
      ),
    ];

    if (codigos.length === 0) {
      return NextResponse.json({ ok: true, equipe: [] });
    }

    const { data, error } = await supabase
      .from("equipe")
      .select("*")
      .in("codigo", codigos)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, equipe: data ?? [] });
  }

  const { data, error } = await supabase.from("equipe").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, equipe: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let body: { codigo?: string; equipe?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("equipe")
    .insert({
      codigo: (body.codigo ?? "").trim(),
      equipe: (body.equipe ?? "").trim(),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, row: data });
}
