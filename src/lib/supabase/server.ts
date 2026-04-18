import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Cliente Supabase para uso em Route Handlers e Server Components.
 * Lê e grava cookies de sessão automaticamente (login/logout/refresh).
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  const { url, anonKey } = getPublicSupabaseEnv();
  if (!url || !anonKey) {
    throw new Error(
      "Configuração do Supabase ausente: defina NEXT_PUBLIC_SUPABASE_URL e a chave pública."
    );
  }

  const jar = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list: CookieToSet[]) => {
        try {
          list.forEach((c: CookieToSet) => jar.set(c.name, c.value, c.options));
        } catch {
          // chamado fora de Route Handler / Server Action: ignorar com segurança.
        }
      },
    },
  });
}
