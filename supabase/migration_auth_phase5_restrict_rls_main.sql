-- ============================================================================
-- Fase 5 da migração para Supabase Auth
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- Objetivo: substituir as políticas `*_anon_all` (USING true / WITH CHECK true
-- para o role public) por políticas baseadas em `auth.uid()` + perfil lido do
-- JWT via `public.jwt_perfil()`.
--
-- Matriz de acesso adotada:
--   atividades / documentos / equipe:
--     SELECT  -> qualquer authenticated
--     INSERT/UPDATE -> gestor, admin
--     DELETE -> admin
--   integrantes:
--     SELECT  -> qualquer authenticated
--     INSERT/UPDATE/DELETE -> admin
--   orcamento:
--     TUDO -> apenas admin
--   ref_pgto:
--     SELECT  -> qualquer authenticated
--     INSERT/UPDATE/DELETE -> admin
--
-- IMPORTANTE: as API routes da app continuam usando `service_role`, que
-- bypassa RLS. As políticas abaixo só fecham o acesso direto via anon key
-- ou via cliente browser autenticado.
-- ============================================================================

-- ATIVIDADES -----------------------------------------------------------------
DROP POLICY IF EXISTS atividades_anon_all ON public.atividades;
CREATE POLICY atividades_select ON public.atividades
  FOR SELECT TO authenticated USING (true);
CREATE POLICY atividades_insert ON public.atividades
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY atividades_update ON public.atividades
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'))
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY atividades_delete ON public.atividades
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- DOCUMENTOS -----------------------------------------------------------------
DROP POLICY IF EXISTS documentos_anon_all ON public.documentos;
CREATE POLICY documentos_select ON public.documentos
  FOR SELECT TO authenticated USING (true);
CREATE POLICY documentos_insert ON public.documentos
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY documentos_update ON public.documentos
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'))
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY documentos_delete ON public.documentos
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- EQUIPE ---------------------------------------------------------------------
DROP POLICY IF EXISTS equipe_anon_all ON public.equipe;
CREATE POLICY equipe_select ON public.equipe
  FOR SELECT TO authenticated USING (true);
CREATE POLICY equipe_insert ON public.equipe
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY equipe_update ON public.equipe
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'))
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY equipe_delete ON public.equipe
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- INTEGRANTES ----------------------------------------------------------------
DROP POLICY IF EXISTS integrantes_anon_all ON public.integrantes;
CREATE POLICY integrantes_select ON public.integrantes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY integrantes_insert ON public.integrantes
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY integrantes_update ON public.integrantes
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() = 'admin')
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY integrantes_delete ON public.integrantes
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- ORCAMENTO ------------------------------------------------------------------
DROP POLICY IF EXISTS orcamento_anon_all ON public.orcamento;
CREATE POLICY orcamento_select ON public.orcamento
  FOR SELECT TO authenticated
  USING (public.jwt_perfil() = 'admin');
CREATE POLICY orcamento_insert ON public.orcamento
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY orcamento_update ON public.orcamento
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() = 'admin')
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY orcamento_delete ON public.orcamento
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- REF_PGTO -------------------------------------------------------------------
DROP POLICY IF EXISTS ref_pgto_anon_all ON public.ref_pgto;
CREATE POLICY ref_pgto_select ON public.ref_pgto
  FOR SELECT TO authenticated USING (true);
CREATE POLICY ref_pgto_insert ON public.ref_pgto
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY ref_pgto_update ON public.ref_pgto
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() = 'admin')
  WITH CHECK (public.jwt_perfil() = 'admin');
CREATE POLICY ref_pgto_delete ON public.ref_pgto
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');
