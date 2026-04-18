-- ============================================================================
-- Fase 5 (parte 4) — privilégios de coluna em integrantes (correção)
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- O REVOKE por coluna não teve efeito porque os roles anon/authenticated têm
-- GRANT no nível da tabela. A solução correta é revogar no nível da tabela e
-- re-conceder somente nas colunas seguras.
-- ============================================================================

REVOKE SELECT, INSERT, UPDATE, DELETE ON public.integrantes FROM anon, authenticated;

-- SELECT: tudo menos password_hash
GRANT SELECT (
  id, matricula, nome, setor, cargo, classe_padrao, email,
  must_change_password, perfil, created_at, updated_at, auth_user_id
) ON public.integrantes TO authenticated;

-- INSERT/UPDATE/DELETE: nenhum. Toda mudança em integrantes precisa passar
-- pelo backend (service_role) ou pelas APIs admin server-side.
