-- ============================================================================
-- Fase 8 — Alinhar RLS às APIs (gestor + admin) + auditoria por trigger
-- ----------------------------------------------------------------------------
-- 1) integrantes INSERT/UPDATE/DELETE: gestor e admin (alinhado a APIs).
-- 2) atividades DELETE: gestor e admin.
-- 3) audit_row_change() grava audit_log quando auth.uid() existe; com
--    service_role (auth.uid() null) não insere — rotas que usam service_role
--    continuam com writeAuditLog no código onde necessário.
-- ============================================================================

-- RLS ------------------------------------------------------------------------
DROP POLICY IF EXISTS integrantes_insert ON public.integrantes;
DROP POLICY IF EXISTS integrantes_update ON public.integrantes;
DROP POLICY IF EXISTS integrantes_delete ON public.integrantes;
CREATE POLICY integrantes_insert ON public.integrantes
  FOR INSERT TO authenticated
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY integrantes_update ON public.integrantes
  FOR UPDATE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'))
  WITH CHECK (public.jwt_perfil() IN ('gestor','admin'));
CREATE POLICY integrantes_delete ON public.integrantes
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'));

DROP POLICY IF EXISTS atividades_delete ON public.atividades;
CREATE POLICY atividades_delete ON public.atividades
  FOR DELETE TO authenticated
  USING (public.jwt_perfil() IN ('gestor','admin'));

-- Função + triggers ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.audit_row_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  act text;
  aid uuid;
  bef jsonb;
  aft jsonb;
BEGIN
  IF uid IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  SELECT i.id INTO aid FROM public.integrantes i WHERE i.auth_user_id = uid LIMIT 1;

  IF TG_OP = 'INSERT' THEN
    act := 'insert';
    aft := to_jsonb(NEW);
    bef := NULL;
  ELSIF TG_OP = 'UPDATE' THEN
    act := 'update';
    aft := to_jsonb(NEW);
    bef := to_jsonb(OLD);
  ELSE
    act := 'delete';
    aft := NULL;
    bef := to_jsonb(OLD);
  END IF;

  INSERT INTO public.audit_log (
    actor_id,
    actor_email,
    actor_role,
    entity_table,
    entity_id,
    action,
    before_data,
    after_data,
    metadata
  ) VALUES (
    aid,
    (SELECT u.email FROM auth.users u WHERE u.id = uid),
    public.jwt_perfil(),
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    act,
    bef,
    aft,
    jsonb_build_object('source', 'audit_row_change')
  );

  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS audit_atividades ON public.atividades;
CREATE TRIGGER audit_atividades
  AFTER INSERT OR UPDATE OR DELETE ON public.atividades
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_row_change();

DROP TRIGGER IF EXISTS audit_documentos ON public.documentos;
CREATE TRIGGER audit_documentos
  AFTER INSERT OR UPDATE OR DELETE ON public.documentos
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_row_change();

DROP TRIGGER IF EXISTS audit_equipe ON public.equipe;
CREATE TRIGGER audit_equipe
  AFTER INSERT OR UPDATE OR DELETE ON public.equipe
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_row_change();

DROP TRIGGER IF EXISTS audit_orcamento ON public.orcamento;
CREATE TRIGGER audit_orcamento
  AFTER INSERT OR UPDATE OR DELETE ON public.orcamento
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_row_change();

COMMENT ON FUNCTION public.audit_row_change() IS
  'Auditoria AFTER em tabelas mutáveis; ignora quando auth.uid() é null (ex.: service_role).';
