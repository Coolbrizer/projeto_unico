BEGIN;

WITH payload AS (
  SELECT * FROM jsonb_to_recordset($p20_imp$[{"codigo": "4E-BD24", "descricao": "Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Avaliar opcoes para migrar os bancos de dados Oracle Enterprise para a nuvem nos demais provedores de servico em nuvem", "responsavel": "FERNANDO NAUFEL SILVA E SANTOS", "inicio": "18/09/2025", "fim": "10/02/2026", "progresso": 100, "etiqueta_relatorio": "PGR-00069840/2026", "link_relatorio": "https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431", "instrucao_servico": "1911bd51-b129-4152-9652-67e275651093", "etapa": 4, "status_execucao": "no_prazo"}, {"codigo": "4E-BD25", "descricao": "Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC", "responsavel": "ANDREIA CRISTINE HONDA", "inicio": "18/09/2025", "fim": "10/02/2026", "progresso": 100, "etiqueta_relatorio": "PGR-00063430/2026", "link_relatorio": "https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156129891", "instrucao_servico": "1911bd51-b129-4152-9652-67e275651093", "etapa": 4, "status_execucao": "no_prazo"}, {"codigo": "4E-MEL53", "descricao": "V4.18 - ABA PARTES: Especificacao tecnica e negocial das adequacoes na exibicao de dados pessoais de membros e servidores", "responsavel": "MAX LEONARDO DOMINGOS LOPES", "inicio": "18/09/2025", "fim": "10/02/2026", "progresso": 100, "etiqueta_relatorio": "PGR-00060124/2026", "link_relatorio": "https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156052525", "instrucao_servico": "1911bd51-b129-4152-9652-67e275651093", "etapa": 4, "status_execucao": "antecedencia"}, {"codigo": "4E-MEL54", "descricao": "Reestruturacao das regras de sigilo: Revisao e atualizacao da Portaria 590/2021 e analise de outros normativos impactados.", "responsavel": "DENNIS FREIRE VASQUES MARTINS", "inicio": "18/09/2025", "fim": "10/02/2026", "progresso": 100, "etiqueta_relatorio": "PGR-00068142/2026", "link_relatorio": "https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156230543", "instrucao_servico": "1911bd51-b129-4152-9652-67e275651093", "etapa": 4, "status_execucao": "no_prazo"}]$p20_imp$::jsonb)
  AS x(
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
FROM payload
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

COMMIT;
