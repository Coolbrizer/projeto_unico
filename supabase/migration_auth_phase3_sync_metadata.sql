-- ============================================================================
-- Fase 3 da migração para Supabase Auth
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Objetivo: manter perfil/integrante_id/must_change_password sincronizados em
-- auth.users.raw_app_meta_data, para que essas informações cheguem como claims
-- no JWT e possam ser usadas em RLS sem joins.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.sync_perfil_to_auth()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  IF NEW.auth_user_id IS NOT NULL THEN
    UPDATE auth.users
    SET raw_app_meta_data =
      coalesce(raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object(
           'perfil', NEW.perfil,
           'integrante_id', NEW.id,
           'must_change_password', coalesce(NEW.must_change_password, false)
         )
    WHERE id = NEW.auth_user_id;
  END IF;
  RETURN NEW;
END $$;

COMMENT ON FUNCTION public.sync_perfil_to_auth() IS
  'Espelha perfil/integrante_id/must_change_password em auth.users.raw_app_meta_data para acesso via JWT.';

DROP TRIGGER IF EXISTS integrantes_sync_perfil ON public.integrantes;

CREATE TRIGGER integrantes_sync_perfil
AFTER INSERT OR UPDATE OF perfil, auth_user_id, must_change_password ON public.integrantes
FOR EACH ROW EXECUTE FUNCTION public.sync_perfil_to_auth();

-- Versão "leve" do current_perfil() que lê o claim direto do JWT, sem tocar na tabela.
CREATE OR REPLACE FUNCTION public.jwt_perfil()
RETURNS text
LANGUAGE sql STABLE
AS $$
  SELECT coalesce(
    nullif(
      current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'perfil',
      ''
    ),
    'basico'
  );
$$;

GRANT EXECUTE ON FUNCTION public.jwt_perfil() TO authenticated, anon;

COMMENT ON FUNCTION public.jwt_perfil() IS
  'Lê o perfil direto do JWT (claim app_metadata.perfil). Mais rápido que current_perfil() para uso em RLS.';
