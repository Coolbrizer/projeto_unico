BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL81',
  'V4.12 - Reestruturacao do sigilo - unificar telas de atribuir visibilidade',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00143740/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136457263',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL82',
  'V4.12 - Descontinuar tela de procedimentos e documentos em ATENA',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00143740/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136457263',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL83',
  'Validacao da conclusao dos autos judiciais',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00064781/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/135000313',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL84',
  'Validacao da localizacao dos autos judiciais',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00102716/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/135725814',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL85',
  'Identificar os relatorios elaborados a partir de modelagens de dados descontinuadas e que devem ser migrados para as novas modelagens do projeto "BI Unico".',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00138868/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136361545',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL86',
  'Identificar os relatorios vinculados ao projeto "BI Unico" que deverao ser migrados para estrutura de “cubos” de modelagens.',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00139626/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136377472',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL87',
  'Identificar os conjuntos de dados das modelagens do projeto “BI Unico” que necessitam de novos atributos, alteracoes de descricao e reorganizacao em pastas e subpastas.',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00141072/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136409255',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL88',
  'Implementar as alteracoes de descricao e reorganizacao de pastas e subpastas e solicitar a STIC a inclusao de novos atributos nas modelagens do projeto “BI Unico”.',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00141579/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136422115',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL89',
  'Revisar as fontes de dados e elaborar novos relatorios para publicacao do item "Dados da movimentacao processual em cada Unidade" do Portal de Transparencia do MPF.',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00119072/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136014344',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL90',
  'Melhoria de desempenho nos cubos de maior impacto no BI (Fato 1.11 - Judicial - Fluxo Setor (Movimentacao))',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00099808/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/135663600',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-NF12',
  'Criacao do Modelo de banco de dados da Fato Historico da Situacao Judicial',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00108245/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/135819473',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-NF13',
  'Criacao de documentos para o item "Dados da movimentacao processual em cada Unidade" do Portal de Transparencia do MPF',
  'TIAGO CESAR MORONTE',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00111165/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/135874932',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-INF08',
  'Implantacao de ambiente redundante da nova solucao de armazenamento das integras: Testes da solucao de replicacao do MINIO, instalacao e configuracao do sistema operacional nos servidores, instalacao e configuracao da solucao do MINIO, configuracao de bucket do Unico, configuracao de credenciais de acesso, testes de acesso a solucao.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00126632/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136157406',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL91',
  'Turma Nacional de Unificacao - TNU: proposta de normatizacao do fluxo de entrada com registro no Unico.',
  'RENATA CAVALCANTE SCUTTI',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00190811/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137370949?acao=atualizarSetoresComVisibilidade',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-MEL92',
  'Treinamento: funcionalidades do Sistema Unico e ajuste nas rotinas da AJCRIM/STJ',
  'RENATA CAVALCANTE SCUTTI',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00189212/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=137341073',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-DEB07',
  'V4.12 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/2022',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00143740/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136457263',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-INT07',
  'V4.12 - Especificacao de dados a serem atualizados no retorno de processos judiciais via MNI',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00143740/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136457263',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-IA22',
  'V4.12 - IA aplicada a IPLs: aprimoramento do modelo de IA desenvolvido e acrescimo de informacoes nas especificacoes que serao posteriormente implementadas no Sistema Unico, para auxiliar o gabinete na triagem e analise',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00126632/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136157406',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-IA25',
  'Tria: treinamento, avaliacao e implementacao no Unico de modelo de IA para inferencia do sentido da decisao sobre pedido liminar nos processos de habeas corpus do STJ',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00126632/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136157406',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-IA26',
  'Avaliacao do impacto do detalhamento das Classes de Resultado do Tria nos Gabinetes Criminais da PGR',
  'ANA PAULA GAVROS DINYAKO',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00125191/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136132559',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-IA27',
  'Resultado de Julgamento: Criacao de nova versao do modelo de IA, com a adicao de dados rotulados e melhoria na acuracia',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00126632/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=136157406',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-IA28',
  'Classificacao Automatica – estudo junto a unidades do MPF para a metodizacao e criacao de regras de classificacao automatica.',
  'ANA PAULA GAVROS DINYAKO',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00102077/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=135714826',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-BD37',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC',
  'ANDREIA CRISTINE HONDA',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00127270/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136175240',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-BD38',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao 4.11',
  'ANDREIA CRISTINE HONDA',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00127270/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136175240',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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
  '2E-BD39',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico Unico para a versao 4.11',
  'ANDREIA CRISTINE HONDA',
  '2024-01-30',
  '2024-04-08',
  100,
  'PGR-00127270/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136175240',
  'd60e998b-2300-4769-98d7-134cc36bea0d'::uuid,
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