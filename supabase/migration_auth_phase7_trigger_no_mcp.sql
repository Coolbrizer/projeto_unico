-- ============================================================================
-- Fase 7 (parte 1) — trigger sync_perfil_to_auth sem must_change_password
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- O trigger não precisa mais propagar must_change_password — esse campo agora
-- vive somente em auth.users.app_metadata, gerenciado via Admin API.
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
           'integrante_id', NEW.id
         )
    WHERE id = NEW.auth_user_id;
  END IF;
  RETURN NEW;
END $$;

COMMENT ON FUNCTION public.sync_perfil_to_auth() IS
  'Espelha perfil/integrante_id em auth.users.raw_app_meta_data para acesso via JWT.';

DROP TRIGGER IF EXISTS integrantes_sync_perfil ON public.integrantes;

CREATE TRIGGER integrantes_sync_perfil
AFTER INSERT OR UPDATE OF perfil, auth_user_id ON public.integrantes
FOR EACH ROW EXECUTE FUNCTION public.sync_perfil_to_auth();
