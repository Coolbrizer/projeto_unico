BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-MEL04',
  'Treinamento - Webinar: Curso basico do sistema Unico para servidores da PR-DF',
  'CAMILA GUIMARAES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00364786/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140815259',
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
  '3E-MEL05',
  'Treinamento: Capacitacao para gestao de acessos em gabinetes de cinco unidades do MPF',
  'ALISON PAULINELLE ROCHA DE SOUZA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00371718/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140979691',
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
  '3E-MEL06',
  'Definicao de regras gerais para gestao e alimentacao de tabelas no sistema Unico',
  'GUSTAVO FERREIRA SOUZA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00354260/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140594631',
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
  '3E-MEL07',
  '8ª Pesquisa do Sistema Unico: comunicar, disponibilizar, processar, analisar e publicar os resultados',
  'EDUARDO HYPOLITO',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381859/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/141217550',
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
  '3E-MEL08',
  'Prospeccao de matrizes de ambientes visando a eleicao para apresentacao do repositorio com base nos requisitos identificados',
  'DENNIS FREIRE VASQUES MARTINS',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00369025/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140920325',
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
  '3E-MEL09',
  'Saneamento de papeis e perfis nos gabinetes dos Subprocuradores com atuacao perante o STJ',
  'GLEIDSON MOREIRA FERNANDES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381558/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/141610021',
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
  '3E-MEL10',
  'Estudo para padronizacao do fluxo dos Acordos de nao persecucao civel',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00301081/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/139579643',
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
  '3E-MEL11',
  'Providencias Administrativas - Implementacao das atividades de Faturamento do Plan-Assiste',
  'JOSE ADILSON DE SOUZA DIAS',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00352203/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140549563',
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
  '3E-MEL12',
  'Treinamento e implantacao da nova ferramenta de atendimento virtual em seis unidades do MPF',
  'GABRIEL DE MENESES BATISTA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00379568/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/141163706',
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
  '3E-MEL13',
  'APTUS Portal da Transparencia: Implementacao da correlacao de providencias e tarefas mapeadas pela SEJUD na consulta de autos extrajudiciais e Revisao das regras negociais para disponibilizacao de expedientes na consulta processual',
  'ALEXANDRE CEZAR DAMASCENO',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00358859/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140709599',
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
  '3E-MEL14',
  'Apresentacao dos paineis no Jira Cloud com estruturacao do backlog para publicidade e tomada de decisao gerencial',
  'LIVIA SOUZA PEIXOTO',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00430064/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/142720140',
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
  '3E-MEL15',
  'Acompanhar e orientar lancamentos de resultados de julgamentos pela 1ª e 2ª instancias em atencao a Portaria CMPF 26/202',
  'LIVIA SOUZA PEIXOTO',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00336516/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140862995',
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