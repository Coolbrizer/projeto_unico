import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parsePerfil } from "@/lib/auth/roles";
import type { SessionPayload } from "@/lib/auth/session";

/**
 * Lê a sessão do usuário autenticado a partir dos cookies do Supabase Auth.
 * Devolve `null` se não houver sessão válida.
 *
 * Importante: usa `auth.getUser()` (e não `auth.getSession()`) para validar
 * o JWT contra o servidor Supabase, evitando confiar em cookies forjados.
 */
export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const meta = (data.user.app_metadata ?? {}) as {
    perfil?: unknown;
    integrante_id?: unknown;
    must_change_password?: unknown;
  };

  const integranteId =
    typeof meta.integrante_id === "string" && meta.integrante_id.trim()
      ? meta.integrante_id
      : data.user.id;

  return {
    sub: integranteId,
    email: (data.user.email ?? "").toLowerCase(),
    mcp: meta.must_change_password === true,
    role: parsePerfil(meta.perfil),
  };
}
