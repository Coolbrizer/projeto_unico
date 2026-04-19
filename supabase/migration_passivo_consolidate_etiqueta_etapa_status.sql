-- ============================================================================
-- Passivo / relatório: consolidar etiqueta e progresso em public.atividades,
-- remover public.etiqueta_relatorio; etapa e status_execucão para importação.
-- ============================================================================

-- Colunas em atividades (referência já existente: etiqueta_relatorio, link_relatorio, progresso)
ALTER TABLE public.atividades ADD COLUMN IF NOT EXISTS etapa smallint;
ALTER TABLE public.atividades ADD COLUMN IF NOT EXISTS status_execucao text;

DO $$
BEGIN
  ALTER TABLE public.atividades
    ADD CONSTRAINT atividades_etapa_check CHECK (etapa IS NULL OR etapa BETWEEN 1 AND 4);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE public.atividades
    ADD CONSTRAINT atividades_status_execucao_check CHECK (
      status_execucao IS NULL
      OR status_execucao IN ('antecedencia', 'no_prazo', 'atraso')
    );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

COMMENT ON COLUMN public.atividades.etapa IS 'Etapa do projeto (1–4); importação do passivo.';
COMMENT ON COLUMN public.atividades.status_execucao IS
  'Situação face ao prazo: antecedencia | no_prazo | atraso (passivo).';

-- Legado: algumas bases ligavam etiqueta_relatorio a public.etiqueta_relatorio (FK).
ALTER TABLE public.atividades DROP CONSTRAINT IF EXISTS atividades_etiqueta_relatorio_fk;

-- Copiar dados canónicos da tabela auxiliar para as linhas de atividade (por código).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'etiqueta_relatorio'
  ) THEN
    UPDATE public.atividades AS a
    SET
      etiqueta_relatorio = COALESCE(e.etiqueta, a.etiqueta_relatorio),
      link_relatorio = COALESCE(e.link, a.link_relatorio),
      progresso = COALESCE(e.progresso, a.progresso)
    FROM public.etiqueta_relatorio AS e
    WHERE btrim(a.codigo) <> ''
      AND btrim(a.codigo) = btrim(e.codigo);
  END IF;
END $$;

-- Unicidade lógica para importação: mesmo código só uma vez por IS.
CREATE UNIQUE INDEX IF NOT EXISTS atividades_codigo_instrucao_unique
  ON public.atividades (instrucao_servico, (btrim(codigo)))
  WHERE btrim(codigo) <> '';

-- Remover tabela auxiliar (RLS/políticas são removidas em cascata).
DROP TABLE IF EXISTS public.etiqueta_relatorio CASCADE;
