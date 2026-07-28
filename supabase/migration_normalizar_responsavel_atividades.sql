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
--
-- Atenção: commit/deploy da aplicação não executa este SQL no banco.
-- Execute este arquivo no SQL Editor do Supabase, ou aplique via ferramenta
-- de migração do banco.

BEGIN;

-- Prévia das linhas que serão alteradas.
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

UPDATE public.atividades
SET responsavel = NULLIF(
  btrim(regexp_replace(responsavel, '^\s*[0-9]+\s*[|│｜]\s*', '')),
  ''
)
WHERE responsavel ~ '^\s*[0-9]+\s*[|│｜]\s*';

-- Conferência: deve retornar 0 após a atualização.
SELECT count(*) AS responsaveis_ainda_com_matricula_pipe
FROM public.atividades
WHERE responsavel ~ '^\s*[0-9]+\s*[|│｜]\s*';

COMMIT;
