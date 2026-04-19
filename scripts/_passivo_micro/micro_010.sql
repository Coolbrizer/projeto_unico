BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF17',
  'Preparacao e ativacao dos servidores de aplicacao do sistema Unico para o monitoramento com Prometheus e Grafana',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-03',
  '2022-11-11',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF18',
  'V4.6 - Realizar analise de desempenho dos servidores de aplicacao do Sistema Unico de producao apos a implantacao da V4.6.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-24',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF19',
  'Fase 1 de 3 da Atualizacao da infraestrutura de distribuicao e balanceamento de acesso aos servidores de aplicacao do Sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-31',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD15',
  'Modelos de dados ajustados de acordo com as necessidades negociais para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD16',
  'Scripts de banco de dados gerados e versionados para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-10',
  '2022-11-10',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD17',
  'Banco de dados de desenvolvimento atualizado com ajustes apontados durante o desenvolvimento, homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-12',
  '2022-11-10',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD18',
  'Bancos de dados de homologacao atualizados com ajustes apontados durante a homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-10',
  '2022-11-21',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD19',
  'Bancos de dados de producao e treinamento atualizados com ajustes apontados durante a disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-21',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD20',
  'Bancos de dados de desenvolvimento, homologacao, treinamento e producao monitorados durante atividades da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-03',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-BD21',
  'Alteracoes de banco de dados atraves de scripts ajustados apos analise e sugestoes de melhorias para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-07',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-MEL49',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados - Etapa',
  'ERICA GARCIA PEREIRA ARROCHELA LOBO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00092183/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126117025',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
  1,
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
  '1E-MEL50',
  'Informativos da Sejud: execucao das atualizacoes - Etapa',
  'ANA PAULA GAVROS DINYAKO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00104606/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126355096',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
  1,
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

COMMIT;