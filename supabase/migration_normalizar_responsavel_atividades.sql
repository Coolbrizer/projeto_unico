-- Normaliza campos de nomes removendo o prefixo de matrícula.
--
-- Antes:
--   5030 | SANDRA VERONICA ALVES RODRIGUES
--   10274 ODILAIR DE OLIVEIRA LEÃO
--
-- Depois:
--   SANDRA VERONICA ALVES RODRIGUES
--   ODILAIR DE OLIVEIRA LEÃO
--
-- Em public.atividades.responsavel, altera somente valores que começam com:
--   número + pipe + nome
--
-- Em public.equipe.equipe, altera valores que começam com:
--   número + pipe + nome
--   número + nome
--
-- Também aceita variações visuais do pipe: |, │ e ｜.
--
-- Atenção: commit/deploy da aplicação não executa este SQL no banco.
-- Execute este arquivo no SQL Editor do Supabase, ou aplique via ferramenta
-- de migração do banco.

BEGIN;

-- Prévia das linhas que serão alteradas em atividades.responsavel.
SELECT
  id,
  codigo,
  responsavel AS responsavel_atual,
  NULLIF(
    btrim(regexp_replace(responsavel, '^\s*[0-9]+\s*[|│｜]\s*', '')),
    ''
  ) AS responsavel_normalizado
FROM public.atividades
WHERE responsavel ~ '^\s*[0-9]+\s*[|│｜]\s*'
ORDER BY codigo;

-- Prévia das linhas que serão alteradas em equipe.equipe.
SELECT
  id,
  codigo,
  equipe AS equipe_atual,
  NULLIF(
    btrim(regexp_replace(equipe, '^\s*[0-9]+\s*([|│｜]\s*)?', '')),
    ''
  ) AS equipe_normalizada
FROM public.equipe
WHERE equipe ~ '^\s*[0-9]+(\s*[|│｜])?\s+'
ORDER BY codigo;

UPDATE public.atividades
SET responsavel = NULLIF(
  btrim(regexp_replace(responsavel, '^\s*[0-9]+\s*[|│｜]\s*', '')),
  ''
)
WHERE responsavel ~ '^\s*[0-9]+\s*[|│｜]\s*';

UPDATE public.equipe
SET equipe = NULLIF(
  btrim(regexp_replace(equipe, '^\s*[0-9]+\s*([|│｜]\s*)?', '')),
  ''
)
WHERE equipe ~ '^\s*[0-9]+(\s*[|│｜])?\s+';

-- Conferência: deve retornar 0 após a atualização.
SELECT count(*) AS responsaveis_ainda_com_matricula_pipe
FROM public.atividades
WHERE responsavel ~ '^\s*[0-9]+\s*[|│｜]\s*';

-- Conferência: deve retornar 0 após a atualização.
SELECT count(*) AS equipes_ainda_com_matricula
FROM public.equipe
WHERE equipe ~ '^\s*[0-9]+(\s*[|│｜])?\s+';

COMMIT;
