import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) {
    return NextResponse.json({ user: null });
  }
  const session = await verifySessionToken(raw);
  if (!session) {
    return NextResponse.json({ user: null });
  }

  let nome: string | null = null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("integrantes")
      .select("nome")
      .eq("id", session.sub)
      .maybeSingle();
    nome = (data as { nome?: string } | null)?.nome?.trim() ?? null;
  } catch {
    // sem service client ou falha na leitura: segue sem nome
  }

  return NextResponse.json({
    user: {
      email: session.email,
      mustChangePassword: session.mcp,
      perfil: session.role,
      nome,
    },
  });
}
