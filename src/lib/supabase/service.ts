import { createClient } from "@supabase/supabase-js";

/** Cliente com service role — só em rotas/API no servidor (nunca no browser). */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY e NEXT_PUBLIC_SUPABASE_URL são necessários no servidor.");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
