import { NextResponse } from "next/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";
import { linhasAtivas, totaisDoCenario } from "@/lib/orcamento-cenarios";
import type { OrcamentoCenarioLinha, RefPgto } from "@/types/database";

function parseLinhas(raw: unknown): OrcamentoCenarioLinha[] | null {
  if (!Array.isArray(raw)) return null;
  const linhas: OrcamentoCenarioLinha[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const o = item as Record<string, unknown>;
    const ref_pgto_id = typeof o.ref_pgto_id === "string" ? o.ref_pgto_id.trim() : "";
    const meses = Number(o.meses);
    const pessoas = Number(o.pessoas);
    if (!ref_pgto_id || !Number.isFinite(meses) || !Number.isFinite(pessoas)) return null;
    if (meses < 1 || meses > 12 || pessoas < 1) return null;
    linhas.push({
      ref_pgto_id,
      meses: Math.floor(meses),
      pessoas: Math.floor(pessoas),
    });
  }
  return linhas;
}

export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("orcamento_cenarios")
    .select("id, nome, linhas, total_pessoas, total_valor, criado_por, created_at")
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

  let body: { nome?: string; linhas?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome) {
    return NextResponse.json({ error: "Informe um nome para o cenário." }, { status: 400 });
  }

  const linhas = parseLinhas(body.linhas);
  if (!linhas || linhas.length === 0) {
    return NextResponse.json(
      { error: "Selecione ao menos uma linha com meses e pessoas." },
      { status: 400 }
    );
  }

  const { data: refs, error: errRefs } = await supabase.from("ref_pgto").select("id, valor_mensal");
  if (errRefs) {
    return NextResponse.json({ error: errRefs.message }, { status: 400 });
  }

  const refIds = new Set((refs ?? []).map((r) => r.id));
  for (const l of linhas) {
    if (!refIds.has(l.ref_pgto_id)) {
      return NextResponse.json({ error: "Linha com referência de pagamento inválida." }, { status: 400 });
    }
  }

  const { totalPessoas, totalValor } = totaisDoCenario(linhas, (refs ?? []) as RefPgto[]);

  const { data, error } = await supabase
    .from("orcamento_cenarios")
    .insert({
      nome,
      linhas,
      total_pessoas: totalPessoas,
      total_valor: totalValor,
      criado_por: session.sub || null,
    })
    .select("id, nome, linhas, total_pessoas, total_valor, criado_por, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, cenario: data });
}
