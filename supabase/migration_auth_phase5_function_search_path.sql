-- ============================================================================
-- Fase 5 (parte 5) — fixa search_path nas funções restantes
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Resolve o advisor 0011 (function_search_path_mutable) em:
--   - public.jwt_perfil()
--   - public.set_updated_at()
-- ============================================================================

CREATE OR REPLACE FUNCTION public.jwt_perfil()
RETURNS text
LANGUAGE sql STABLE
SET search_path = public
AS $$
  SELECT coalesce(
    nullif(
      current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'perfil',
      ''
    ),
    'basico'
  );
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
