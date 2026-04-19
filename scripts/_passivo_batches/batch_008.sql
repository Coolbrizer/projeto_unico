BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF32',
  'Fase 2 de 3 da Atualizacao da infraestrutura de distribuicao e balanceamento deacesso aos servidores de aplicacao do Sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-INF33',
  'V4.8 - Implantacao do Gravitee 3.0 em substituicao a atual versao 1.0 de forma a permitir controles mais eficientes para gerenciar as APIs de servicos que ja sao usados pelo unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD29',
  'Modelos de dados ajustados de acordo com as necessidades negociais para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-04-28',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD30',
  'Scripts de banco de dados gerados e versionados para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-27',
  '2023-05-12',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD31',
  'Banco de dados de desenvolvimento atualizado com ajustes apontados durante o desenvolvimento, homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-29',
  '2023-05-12',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD32',
  'Bancos de dados de homologacao atualizados com ajustes apontados durante a homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-05-08',
  '2023-05-19',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD33',
  'Bancos de dados de producao e treinamento atualizados com ajustes apontados durante a disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-05-18',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD34',
  'Bancos de dados de desenvolvimento, homologacao, treinamento e producao monitorados durante atividades da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-BD35',
  'Alteracoes de banco de dados atraves de scripts ajustados apos analise e sugestoes de melhorias para a versao 4.8',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-04-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '2E-MEL01',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'ERICA GARCIA PEREIRA ARROCHELA LOBO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00303215/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130375932',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL03',
  'Treinamento- Webinar: novas telas de recuperacao de documento, de procedimento e judicial',
  'GLEIDSON MOREIRA FERNANDES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00278541/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/129940581',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL04',
  'Estruturacao da base de conhecimento: selecao e alimentacao do conteudo',
  'CAMILA GUIMARAES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300558/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131004885',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL05',
  'Estudo para reestruturacao e padronizacao da tabela Orgao Publico',
  'GUSTAVO FERREIRA SOUZA',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00289522/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130489221',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL06',
  'Normatizacao de papeis e perfis:capacitacao para o uso de ferramentas automatizadas de concessao/revogacao de acessos e elaboracao de cronograma de implantacao.',
  'GLEIDSON MOREIRA FERNANDES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00272910/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/129810621',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL07',
  'Providencias administrativas: pregao eletronico',
  'GABRIEL DE MENESES BATISTA',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00301533/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130343498',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL08',
  'Catalogo de servico da SEJUD: revisao e diagramacao',
  'EDUARDO HYPOLITO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00298053/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130288088',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL09',
  'Saneamento do formulario de denuncias do SAC: validacao da proposta e registro do DOD',
  'GABRIEL DE MENESES BATISTA',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00287315/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130066242',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL10',
  'Treinamento - Webinar: Distribuicao Regionalizada',
  'CECILIA DA SILVA BORGES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00293325/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130182681',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  'Validacao dos principais paineis de Acervo Judicial do MPF',
  'TIAGO CESAR MORONTE',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300907/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130335085',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL12',
  'Validacao dos principais paineis de Distribuicao de Titular de Autos Judiciais do MPF',
  'TIAGO CESAR MORONTE',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300907/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130335085',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL13',
  'TREINAMENTO: Realizar acoes de treinamento nos gabinetes de Subprocuradores-gerais da Republica com foco na demonstracao de boas praticas de utilizacao do Unico e esclarecimento de duvidas quanto ao uso do sistema face a atuacao perante o STJ (16 oficios criminais).',
  'RENATA CAVALCANTE SCUTTI',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300486/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=130326269',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL14',
  'Catalogacao e sistematizacao de demandas de backlog e publicidade de demandas atendidas conforme diretriz e criterios de priorizacao da Portaria 590/202',
  'LIVIA SOUZA PEIXOTO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00282750/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/129989382',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL15',
  'Monitoramento, treinamento e acompanhamento da utilizacao do catalogo nacional do sistema Unico no SNP',
  'LIVIA SOUZA PEIXOTO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300307/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130321844',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL16',
  'Instruir, acompanhar e monitorar o preenchimento de resultados de julgamento processuais e de acordos extrajudiciais',
  'LIVIA SOUZA PEIXOTO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00301600/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130344821',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL17',
  'Sistema Extractus - Gestao negocial relativa ao sistema Unico: reorganizacao do fluxo e dos grupos de atendimento; analise da demanda reprimida de pedidos (SNPs)',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300728/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130332007',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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

COMMIT;