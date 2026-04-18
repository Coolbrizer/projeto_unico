import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Cria um cliente Supabase específico para o middleware. Diferente do server
 * client de Route Handlers, aqui precisamos espelhar os cookies tanto no
 * `request` (para que próximas leituras na mesma execução enxerguem) quanto
 * na `response` (para o browser).
 */
export function createSupabaseMiddlewareClient(request: NextRequest): {
  supabase: SupabaseClient;
  response: NextResponse;
} {
  const response = NextResponse.next({ request });
  const { url, anonKey } = getPublicSupabaseEnv();

  if (!url || !anonKey) {
    return { supabase: null as unknown as SupabaseClient, response };
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list: CookieToSet[]) => {
        list.forEach(({ name, value, options }: CookieToSet) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  return { supabase, response };
}
