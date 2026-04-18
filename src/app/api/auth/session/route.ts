import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parsePerfil } from "@/lib/auth/roles";

export async function GET() {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ user: null });
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ user: null });
  }

  const meta = (data.user.app_metadata ?? {}) as {
    perfil?: unknown;
    must_change_password?: unknown;
  };
  const userMeta = (data.user.user_metadata ?? {}) as { nome?: unknown };

  return NextResponse.json({
    user: {
      email: (data.user.email ?? "").toLowerCase(),
      mustChangePassword: meta.must_change_password === true,
      perfil: parsePerfil(meta.perfil),
      nome: typeof userMeta.nome === "string" ? userMeta.nome.trim() || null : null,
    },
  });
}
