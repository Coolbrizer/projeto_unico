BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD09',
  'Evolucao do inventario de estatisticas de desempenho dos bancos de dados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-BD10',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-BD11',
  'Avaliacao de alternativas para melhoria do desempenho das consultas do BI do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-BD12',
  'Reconfiguracao do banco de dados do BI do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-MEL24',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'ERICA GARCIA PEREIRA ARROCHELA LOBO',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00414533/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132349282',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL25',
  'Saneamento das providencias extrajudiciais de autuacao e conversao',
  'GUSTAVO FERREIRA SOUZA',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00388701/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132393038',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL26',
  'Treinamento - Webinar: apresentacao de novas funcionalidades da Versao 4.1',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00414440/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132347921',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL27',
  'Estruturacao da base de conhecimento: migracao da Wiki para a intranet e ajustes de conteudo',
  'CAMILA GUIMARAES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416225/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132556953',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL28',
  'Padronizacao de fluxo e rotinas das Cojuds: Acordo de Nao Persecucao Penal',
  'CECILIA DA SILVA BORGES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415600/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132374210',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL29',
  'Normatizacao de papeis e perfis: homologacao das novas funcionalidades do Autoriza para concessao/revogacao de acessos e acompanhemento da execucao do cronograma nas Procuradorias da Republica.',
  'GLEIDSON MOREIRA FERNANDES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00411276/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132274458',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL30',
  'Providencias administrativas: mapeamento de providencias especificas para a SPOC',
  'ALEXANDRE CEZAR DAMASCENO',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00377694/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131698496',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL31',
  'Catalogo de servico da SEJUD: revisao das atividades da SUBDOC',
  'CAROLINE MARIA GUIMARAES BEASLEY',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00424275/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132518160',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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