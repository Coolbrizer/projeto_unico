-- Corrige início e fim em TODAS as linhas de public.atividades.
--
-- ATENÇÃO: este script define o MESMO período para cada atividade.
-- Só execute se isso for intencional (ex.: dados de teste ou período único para todas).
-- Faça backup ou exporte a tabela antes, se tiver datas diferentes por atividade.
--
-- Ajuste as datas abaixo conforme necessário.

UPDATE public.atividades
SET
  inicio = '2026-02-11',
  fim = '2026-06-11';
