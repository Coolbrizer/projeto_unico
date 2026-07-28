-- Normaliza public.atividades.responsavel removendo o prefixo de matrícula.
--
-- Antes:
--   5030 | SANDRA VERONICA ALVES RODRIGUES
--
-- Depois:
--   SANDRA VERONICA ALVES RODRIGUES
--
-- O script altera somente valores que começam com:
--   número + pipe + nome
--
-- Também aceita variações visuais do pipe: |, │ e ｜.

BEGIN;

-- Prévia das linhas que serão alteradas.
SELECT
  id,
  codigo,
  responsavel AS responsavel_atual,
  NULLIF(
    btrim(regexp_replace(responsavel, '^\s*\d+\s*[|│｜]\s*', '')),
    ''
  ) AS responsavel_normalizado
FROM public.atividades
WHERE responsavel ~ '^\s*\d+\s*[|│｜]\s*'
ORDER BY codigo;

UPDATE public.atividades
SET responsavel = NULLIF(
  btrim(regexp_replace(responsavel, '^\s*\d+\s*[|│｜]\s*', '')),
  ''
)
WHERE responsavel ~ '^\s*\d+\s*[|│｜]\s*';

-- Conferência: deve retornar 0 após a atualização.
SELECT count(*) AS responsaveis_ainda_com_matricula_pipe
FROM public.atividades
WHERE responsavel ~ '^\s*\d+\s*[|│｜]\s*';

COMMIT;
