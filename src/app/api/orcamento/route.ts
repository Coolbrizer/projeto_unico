import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getSessionFromCookies } from "@/lib/auth/getSession";

/** Dados agregados para a tela Orçamento (service role, sessão obrigatória). */
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
