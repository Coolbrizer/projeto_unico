BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-BD15',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico Unico para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD16',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD17',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD18',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD19',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD20',
  'Avaliacao, ajuste e execucao das modificacoes de objetos de banco de dados solicitadas pela versao corrente',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD21',
  'Evolucao do inventario de estatisticas de desempenho dos bancos de dados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD22',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD23',
  'Avaliacao de alternativas para melhoria do desempenho das consultas do BI do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-BD24',
  'Reconfiguracao do banco de dados do BI do Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
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
  '2E-MEL45',
  'Padronizacao de fluxo e rotinas das CCRs: atuacao e distribuicao aos Oficios de administracao com atuacao socioambiental na Amazonia, vinculados a 4ª e 6ª CCRs',
  'CECILIA DA SILVA BORGES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00419048/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132442186',
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
  '2E-INT04',
  'Integracao com a Turma Nacional de Uniformizacao - TNU: especificacao e definicao de fluxo de entrada',
  'RENATA CAVALCANTE SCUTTI',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00426181/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132554922',
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