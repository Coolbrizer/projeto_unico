import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/roles";
import { requireAuthedSupabase } from "@/lib/auth/requireAuthedSupabase";

/** Dias de afastamento de todos os integrantes em um mês, como na aba Afastamentos. */
export async function GET(request: Request) {
  const auth = await requireAuthedSupabase();
  if (auth.response) return auth.response;
  if (!isAdmin(auth.session.role)) {
    return NextResponse.json({ error: "Acesso restrito." }, { status: 403 });
  }

  const url = new URL(request.url);
  const ano = Number(url.searchParams.get("ano"));
  const mes = Number(url.searchParams.get("mes"));
  if (!Number.isInteger(ano) || !Number.isInteger(mes) || mes < 1 || mes > 12 || ano < 2000) {
    return NextResponse.json({ error: "Mês inválido." }, { status: 400 });
  }

  const competencia = `${String(ano).padStart(4, "0")}-${String(mes).padStart(2, "0")}-01`;
  const { data, error } = await auth.supabase
    .from("frequencias_mensais")
    .select("integrante_id, dias_afastamento")
    .eq("competencia", competencia);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    ok: true,
    competencia,
    dias: (data ?? []).map((row) => ({
      integrante_id: String(row.integrante_id),
      dias_afastamento: Number(row.dias_afastamento) || 0,
    })),
  });
}
