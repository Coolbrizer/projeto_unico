-- RPC para importar lotes do passivo (PDF) com ON CONFLICT no índice (instrucao_servico, btrim(codigo)).
-- Chamada: import_atividades_passivo_chunk(payload jsonb) via service_role.

CREATE OR REPLACE FUNCTION public.import_atividades_passivo_chunk(payload jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  WITH src AS (
    SELECT * FROM jsonb_to_recordset(payload) AS x(
      codigo text,
      descricao text,
      responsavel text,
      inicio text,
      fim text,
      progresso integer,
      etiqueta_relatorio text,
      link_relatorio text,
      instrucao_servico text,
      etapa integer,
      status_execucao text
    )
  )
  INSERT INTO public.atividades (
    codigo, descricao, responsavel, inicio, fim, progresso,
    etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
  )
  SELECT
    codigo,
    descricao,
    responsavel,
    to_date(inicio, 'DD/MM/YYYY'),
    to_date(fim, 'DD/MM/YYYY'),
    progresso,
    etiqueta_relatorio,
    link_relatorio,
    instrucao_servico::uuid,
    etapa,
    status_execucao
  FROM src
  ON CONFLICT (instrucao_servico, (btrim(codigo))) WHERE (btrim(codigo) <> '')
  DO UPDATE SET
    descricao = EXCLUDED.descricao,
    responsavel = EXCLUDED.responsavel,
    inicio = EXCLUDED.inicio,
    fim = EXCLUDED.fim,
    progresso = EXCLUDED.progresso,
    etiqueta_relatorio = EXCLUDED.etiqueta_relatorio,
    link_relatorio = EXCLUDED.link_relatorio,
    etapa = EXCLUDED.etapa,
    status_execucao = EXCLUDED.status_execucao;
END;
$$;

REVOKE ALL ON FUNCTION public.import_atividades_passivo_chunk(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.import_atividades_passivo_chunk(jsonb) TO service_role;
