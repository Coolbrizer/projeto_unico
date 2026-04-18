-- ============================================================================
-- Fase 5 (parte 3) — REVOKE de privilégios sensíveis em integrantes
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Mesmo com RLS, a policy de SELECT em integrantes hoje permite que qualquer
-- authenticated leia todas as colunas. Removemos o privilégio de coluna em
-- password_hash para garantir que ele nunca saia em uma SELECT *.
--
-- Também removemos UPDATE direto em colunas sensíveis (perfil, auth_user_id,
-- must_change_password) — alterações nessas colunas devem passar SEMPRE pelo
-- backend (service_role).
-- ============================================================================

REVOKE SELECT (password_hash) ON public.integrantes FROM anon, authenticated;

REVOKE UPDATE (perfil) ON public.integrantes FROM anon, authenticated;

REVOKE UPDATE (must_change_password, auth_user_id) ON public.integrantes FROM anon, authenticated;
