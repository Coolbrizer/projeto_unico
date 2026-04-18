-- ============================================================================
-- Fase 1 da migração para Supabase Auth
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Objetivo: preparar o schema sem mudar comportamento do app.
--   1. Coluna integrantes.auth_user_id (FK opcional para auth.users).
--   2. Funções current_integrante() e current_perfil() utilizáveis em RLS.
-- ============================================================================

ALTER TABLE public.integrantes
  ADD COLUMN IF NOT EXISTS auth_user_id uuid UNIQUE
  REFERENCES auth.users(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.integrantes.auth_user_id IS
  'Vínculo 1:1 com auth.users. Preenchido pelo script de migração (Fase 2).';

CREATE INDEX IF NOT EXISTS integrantes_auth_user_id_idx
  ON public.integrantes(auth_user_id);

CREATE OR REPLACE FUNCTION public.current_integrante()
RETURNS public.integrantes
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.integrantes WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.current_perfil()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT perfil FROM public.integrantes WHERE auth_user_id = auth.uid() LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.current_perfil()    TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.current_integrante() TO authenticated;

COMMENT ON FUNCTION public.current_perfil() IS
  'Retorna o perfil do integrante autenticado via Supabase Auth (basico/gestor/admin).';
COMMENT ON FUNCTION public.current_integrante() IS
  'Retorna a linha completa de integrantes para o usuário autenticado.';
