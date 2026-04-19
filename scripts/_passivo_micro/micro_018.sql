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

COMMIT;