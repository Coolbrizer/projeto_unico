-- ============================================================================
-- atividades.instrucao_servico — vínculo forte com documentos (Instrução de Serviço)
-- Aplicada via MCP em 2026-04-19 como
--   atividades_instrucao_servico_uuid_fk_notnull_trigger
-- ----------------------------------------------------------------------------
-- 1) Converte a coluna de TEXT para UUID (todos os valores existentes já eram
--    UUIDs em formato texto).
-- 2) Adiciona FK para public.documentos(id) com ON DELETE SET NULL.
-- 3) Cria índice em (instrucao_servico).
-- 4) Torna a coluna NOT NULL (regra de negócio: toda atividade pertence a uma
--    Instrução de Serviço).
-- 5) Trigger BEFORE INSERT/UPDATE garante que o documento referenciado é do
--    tipo 'Instrução de Serviço'.
-- ============================================================================

ALTER TABLE public.atividades
  ALTER COLUMN instrucao_servico TYPE uuid USING instrucao_servico::uuid;

ALTER TABLE public.atividades
  DROP CONSTRAINT IF EXISTS atividades_instrucao_servico_fk;
ALTER TABLE public.atividades
  ADD CONSTRAINT atividades_instrucao_servico_fk
    FOREIGN KEY (instrucao_servico)
    REFERENCES public.documentos (id)
    ON DELETE SET NULL
    ON UPDATE RESTRICT;

CREATE INDEX IF NOT EXISTS atividades_instrucao_servico_idx
  ON public.atividades (instrucao_servico);

ALTER TABLE public.atividades
  ALTER COLUMN instrucao_servico SET NOT NULL;

CREATE OR REPLACE FUNCTION public.assert_instrucao_servico()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.instrucao_servico IS NOT NULL THEN
    PERFORM 1
      FROM public.documentos
     WHERE id = NEW.instrucao_servico
       AND tipo = 'Instrução de Serviço';
    IF NOT FOUND THEN
      RAISE EXCEPTION
        'instrucao_servico deve referenciar um documento do tipo Instrução de Serviço.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS atividades_assert_instrucao_servico ON public.atividades;
CREATE TRIGGER atividades_assert_instrucao_servico
  BEFORE INSERT OR UPDATE OF instrucao_servico ON public.atividades
  FOR EACH ROW
  EXECUTE FUNCTION public.assert_instrucao_servico();

COMMENT ON COLUMN public.atividades.instrucao_servico IS
  'FK para documentos.id do tipo Instrução de Serviço (obrigatório).';
COMMENT ON FUNCTION public.assert_instrucao_servico() IS
  'Garante que atividades.instrucao_servico aponta para um documento do tipo Instrução de Serviço.';
