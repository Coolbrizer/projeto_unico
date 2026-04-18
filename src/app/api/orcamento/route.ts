import { NextResponse } from "next/server";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";

/** Dados agregados para a tela Orçamento. */
export async function GET() {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  const { supabase } = auth;

  const [o, i, r] = await Promise.all([
    supabase.from("orcamento").select("*").order("created_at", { ascending: false }),
    supabase
      .from("integrantes")
      .select("id, matricula, nome, setor, cargo, classe_padrao, email, created_at")
      .order("nome", { ascending: true }),
    supabase.from("ref_pgto").select("*").order("cargo", { ascending: true }),
  ]);

  if (o.error) return NextResponse.json({ error: o.error.message }, { status: 400 });
  if (i.error) return NextResponse.json({ error: i.error.message }, { status: 400 });
  if (r.error) return NextResponse.json({ error: r.error.message }, { status: 400 });

  return NextResponse.json({
    ok: true,
    orcamento: o.data ?? [],
    integrantes: i.data ?? [],
    ref_pgto: r.data ?? [],
  });
}
