import { NextResponse } from "next/server";
import { getSessionAal } from "@/lib/auth/sessionAal";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Quando NEXT_PUBLIC_REQUIRE_ADMIN_MFA=true, exige sessão com AAL2 (MFA
 * verificado). Use depois de requireAdmin() nas rotas /api/admin/*.
 *
 * No painel Supabase: Authentication → Providers → deve permitir MFA/TOTP.
 */
export async function requireAdminMfaIfEnabled(): Promise<NextResponse | null> {
  if (process.env.NEXT_PUBLIC_REQUIRE_ADMIN_MFA !== "true") return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getSession();
    const aal = getSessionAal(data.session ?? undefined);
    if (aal === "aal2") return null;
  } catch {
    return NextResponse.json({ error: "Erro ao validar sessão." }, { status: 500 });
  }

  return NextResponse.json(
    {
      error:
        "Autenticação em dois fatores (MFA) obrigatória para esta operação. Conclua em /configurar-mfa.",
      code: "MFA_REQUIRED",
    },
    { status: 403 }
  );
}
