import type { Perfil } from "@/lib/auth/roles";

/**
 * Nome do cookie da sessão antiga (JWT caseiro).
 * Mantido apenas para que o logout possa limpá-lo durante a transição.
 */
export const LEGACY_SESSION_COOKIE = "app_session";

/**
 * Forma da sessão usada por toda a aplicação.
 *
 * - `sub`: id da linha em `public.integrantes` (NÃO é o `auth.users.id`).
 *   É preenchido a partir de `app_metadata.integrante_id`, que o trigger
 *   `integrantes_sync_perfil` mantém atualizado.
 * - `email`: e-mail do usuário em `auth.users`.
 * - `mcp` (must change password): vem de `app_metadata.must_change_password`.
 * - `role`: vem de `app_metadata.perfil`.
 */
export type SessionPayload = {
  sub: string;
  email: string;
  mcp: boolean;
  role: Perfil;
};
