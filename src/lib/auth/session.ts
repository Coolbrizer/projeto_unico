import type { Perfil } from "@/lib/auth/roles";

/**
 * Forma da sessão usada por toda a aplicação.
 *
 * - `sub`: id da linha em `public.integrantes` (NÃO é o `auth.users.id`).
 *   Vem de `app_metadata.integrante_id`, mantido pelo trigger
 *   `integrantes_sync_perfil`.
 * - `email`: e-mail do usuário em `auth.users`.
 * - `mcp` (must change password): vem de `app_metadata.must_change_password`,
 *   gerenciado via Admin API (Supabase Auth).
 * - `role`: vem de `app_metadata.perfil`.
 */
export type SessionPayload = {
  sub: string;
  email: string;
  mcp: boolean;
  role: Perfil;
};
