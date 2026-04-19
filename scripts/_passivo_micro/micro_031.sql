BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-INF06',
  'Integracao da solucao de backup com a nova solucao de armazenamento das integras: avaliacao dos requisitos, preparacao dos ambientes, integracao com a rede SAN, configuracao de storages, disponibilizacao de area de armazenamento para o novo backup, configuracao da ferramenta de backup, agendamento de jobs, testes de copia em backup e testes de restauracao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'no_prazo'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-INF07',
  'Migracao das aplicacoes dos clusters atuais para os novos clusters kubernetes com RKE2, aplicando Pod e Net security policies: avaliacao dos requisitos; preparacao das atividades de migracao (backup dos dados e metadados); aplicacao das politicas de seguranca; instalacao das aplicacoes nos novos clusters; migracao/restore dos dados e metadados; ajustes finais apos as migracoes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'no_prazo'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD25',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Estruturacao da ferramenta para analise de privilegios',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD26',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao 4.1',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD27',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico Unico para a versao 4.1',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD28',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD29',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD30',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD31',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD32',
  'Avaliacao, ajuste e execucao das modificacoes de objetos de banco de dados solicitadas pela versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD33',
  'Evolucao do inventario de estatisticas de desempenho dos bancos de dados',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD34',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
  2,
  'antecedencia'
)
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