-- ============================================================================
-- Fase 5 (parte 2) — políticas em tabelas auxiliares
-- Aplicada via MCP em 2026-04-18
-- ----------------------------------------------------------------------------
-- audit_log:           leitura só admin; insert pelo service_role (que bypassa)
-- etiqueta_relatorio:  leitura para todos authenticated; escrita gestor/admin
-- integrantes_temporario: sem policy (somente service_role acessa)
-- ============================================================================

-- AUDIT_LOG ------------------------------------------------------------------
CREATE POLICY audit_log_select_admin ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- ETIQUETA_RELATORIO ---------------------------------------------------------
CREATE POLICY etiqueta_relatorio_select ON public.etiqueta_relatorio
  FOR SELECT TO authenticated USING (true);
CREATE POLICY etiqueta_relatorio_insert ON public.etiqueta_relatorio
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY etiqueta_relatorio_update ON public.etiqueta_relatorio
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'))
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY etiqueta_relatorio_delete ON public.etiqueta_relatorio
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() = 'admin');

-- INTEGRANTES_TEMPORARIO -----------------------------------------------------
COMMENT ON TABLE public.integrantes_temporario IS
  'Tabela de staging para importação de integrantes. Sem RLS policy: acessível apenas via service_role.';
