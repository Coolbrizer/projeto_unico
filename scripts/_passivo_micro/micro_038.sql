BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL10',
  '9 V4.13 - Reestruturacao do sigilo - MVP de versionamento de integras para possibilitar protecao de dados',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-MEL11',
  '0V4.13 - Alteracao na API Unico para evolucao na integracao com o SISAM',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-MEL11',
  '1Validacao dos dados basicos do Acervo Extrajudicial do MPF',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00157779/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136741457',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '2Levantamento preliminar da situacao das distribuicoes nos procedimentos extrajudiciais',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00201377/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137549137',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '3Validacao dos expedientes a receber (area administrativa)',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00157764/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136741252',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '4Migrar os principais relatorios das modelagens de dados descontinuadas para novas modelagens',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218670/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137879337',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '5Inclusao de atributos indicados na atividade "Uniformizar os atributos dos modelos de dados ativos"',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00223254/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137966625',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '6Proposta de novos criterios de urgencia aplicados aos processos judiciais do STJ , no sistema Unico',
  'RENATA CAVALCANTE SCUTTI',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00185113/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=137981630',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-NF14',
  'Homologar a modelagem de dados relacionados ao historico de autuacao de procedimentos',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218764/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137880122',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-NF15',
  'MPF em Numeros - Desenvolver paineis com informacoes sobre a evolucao do fluxo e acervo de processos no MPF',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218771/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137880278',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-DEB08',
  'V4.13 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/202',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-INT08',
  'V4.13 - Implementar aproveitamento de dados no Retorno de processos judiciais via MNI para os campos: Orgao julgador, Orgao gerador do numero e Relator',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2025',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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