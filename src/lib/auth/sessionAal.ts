import type { Session } from "@supabase/supabase-js";

/** Nível de garantia da sessão (ex.: `aal2` quando MFA foi verificado). */
export function getSessionAal(session: Session | null | undefined): string | undefined {
  return (session as Session & { aal?: string }).aal;
}
