-- ============================================================================
-- Fase 7 (parte 2) — remoção das colunas legadas em integrantes
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Após a migração para Supabase Auth (Fases 2-6), as colunas password_hash e
-- must_change_password deixaram de ter uso:
--   - senha agora vive em auth.users (gerenciada por bcrypt do GoTrue)
--   - must_change_password agora em auth.users.app_metadata, gerenciado via
--     Admin API.
-- ============================================================================

ALTER TABLE public.integrantes
  DROP COLUMN IF EXISTS password_hash,
  DROP COLUMN IF EXISTS must_change_password;
