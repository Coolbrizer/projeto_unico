import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parsePerfil } from "@/lib/auth/roles";
import type { SessionPayload } from "@/lib/auth/session";

/**
 * Recupera o cliente Supabase autenticado (com cookies do usuário) e a
 * sessão correspondente em uma única chamada a `auth.getUser()`.
 *
 * Quando usado em rotas API:
 *   const auth = await requireAuthedSupabase();
 *   if (auth.response) return auth.response;
 *   const { supabase, session } = auth;
 *
 * Diferente de `getSessionFromCookies()`, devolve junto o cliente para que
 * a rota possa consultar tabelas com RLS aplicado (sem service_role).
 */
export async function requireAuthedSupabase(): Promise<
  | { supabase: SupabaseClient; session: SessionPayload; response: null }
  | { supabase: null; session: null; response: NextResponse }
> {
  let supabase: SupabaseClient;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return {
      supabase: null,
      session: null,
      response: NextResponse.json(
        { error: "Configuração do Supabase ausente." },
        { status: 500 }
      ),
    };
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      supabase: null,
      session: null,
      response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
    };
  }

  const meta = (data.user.app_metadata ?? {}) as {
    perfil?: unknown;
    integrante_id?: unknown;
    must_change_password?: unknown;
  };

  const integranteId =
    typeof meta.integrante_id === "string" && meta.integrante_id.trim()
      ? meta.integrante_id
      : data.user.id;

  const session: SessionPayload = {
    sub: integranteId,
    email: (data.user.email ?? "").toLowerCase(),
    mcp: meta.must_change_password === true,
    role: parsePerfil(meta.perfil),
  };

  return { supabase, session, response: null };
}
