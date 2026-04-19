BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-BD02',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00463720/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=142911672',
  '7726117e-4e31-41a8-8401-2f003935d84e'::uuid,
  3,
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
  '3E-BD03',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00463720/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=142911672',
  '7726117e-4e31-41a8-8401-2f003935d84e'::uuid,
  3,
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
  '3E-BD04',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD05',
  'Analise da viabilidade tecnica para implementacao de protecao da apresentacao de dados sensiveis',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD06',
  'Analise da viabilidade tecnica para implementacao de mascaramento de dados sensiveis no banco de dados',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD07',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD08',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD09',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD10',
  'Avaliacao, ajuste e execucao das modificacoes de objetos de banco de dados solicitadas pela versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00463720/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=142911672',
  '7726117e-4e31-41a8-8401-2f003935d84e'::uuid,
  3,
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
  '3E-BD11',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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
  '3E-BD12',
  'Avaliacao de alternativas para melhoria do desempenho das consultas ao banco de dados do Unico, sob demanda',
  'ANDREIA CRISTINE HONDA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381987/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141220437',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
  3,
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