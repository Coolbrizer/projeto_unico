BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-INT03',
  'V4.10 - Evolucoes no Barramento: i) ajustes de usabilidade e na integracao; ii) Realizacao de comunicacao e webinar sobre uso da ferramenta',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00386354/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131888872',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-IA13',
  'TRIA: Realizar acoes de treinamento nos gabinetes de Subprocuradores da Republica para divulgar foco da solucao e sua funcionalidade (16 oficios criminais)',
  'ANA PAULA GAVROS DINYAKO',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00417635/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=132417938',
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
  '2E-IA14',
  'V4.10 - IA para requisicao STJ: implementar solucao de IA para automatizacao parcial das requisicoes no sistema Subjur',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/132392088/true',
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
  '2E-IA15',
  'V 4.10 - Armazenar integras PDF/HTML de pecas processuais utilizadas pela IA - Disponibilizacao de integras HTML da interoperabilidade (MNI): Implementar servico para disponibilizacao das integras ao Sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/132392088/true',
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
  '2E-IA16',
  'V4.10 - Armazenar integras PDF/HTML de pecas processuais utilizadas pela IA - Infraestrutura de IA: Implementar utilizacao HTML''s no servico de infraestrutura de IA',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/132392088/true',
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
  '2E-IA17',
  'IA aplicada aos Recursos Extraordinario e Especial: Especificar solucao para exibicao dos agrupamentos de autos e ampliar a base, com analise de novos processos.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/132392088/true',
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
  '2E-MEL34',
  'Validacao dos dados basicos do Acervo Judicial do MPF',
  'TIAGO CESAR MORONTE',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00413639/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132331737',
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
  '2E-MEL35',
  'Validacao do acervo de procedimentos extrajudiciais ativos no MPF',
  'TIAGO CESAR MORONTE',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00413639/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132331737',
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
  '2E-MEL36',
  'TREINAMENTO: Realizar acoes de treinamento nos gabinetes de Subprocuradores-gerais da Republica com atuacao perante o STJ, focando nas boas praticas de utilizacao do Unico (16 oficios criminais).',
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL37',
  'Unificacao dos servicos disponiveis no catalogo nacional do sistema Unico noSNP.',
  'LIVIA SOUZA PEIXOTO',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00409798/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132477136',
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
  '2E-MEL38',
  'Acompanhamento do cadastro de resultado de julgamento judicial e extrajudicial e analise de melhorias necessarias na aba resultados.',
  'LIVIA SOUZA PEIXOTO',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00409934/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132412896',
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
  '2E-MEL39',
  'V4.10 - Editor de textos - Google Docs: Acompanhamento de uso por parte de gabinetes nas manifestacoes judiciais e adaptacoes necessarias, conforme feedback dos usuarios',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00386354/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131888872',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL40',
  'V4.10 - Reestruturacao do sigilo - documentacao da especificacao para alteracao das regras negociais e definicao da estrategia de implementacao, com foco na Lei nº 13.709/2018 (LGPD).',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00426319/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132556747',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL41',
  'V4.10 - Funcionalidade com visao de agrupamento por providencias (documentos e tarefas feitos a partir das providencias) em Procedimentos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00386354/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131888872',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-MEL42',
  'V4.10 - Proof of Concept (POC) Gerenciadores: Continuidade da POC sobre viabilidade de dispensa do SOLR; Colocar em producao gerenciador minimo (MVP) para testar tempo de resposta e usabilidade de gerenciador simplificado, sem SOLR',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00386354/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131888872',
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
  '2E-MEL43',
  'V4.10 - TRIA: melhorias na apresentacao dos dados de IA no gerenciador, conforme feedback de GABSUBs',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00386354/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/131888872',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-NF04',
  'MPF em Numeros – Desenvolver paineis com informacoes sobre o acervo de processos e procedimentos por oficio - Resolucao CSMPF nº 207/202',
  'DANILO LIMA MACIEL',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00411998/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132294438',
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
  '2E-NF05',
  'Modelagem BI - Especificacao da modelagem de dados relacionada ao historico da situacao de processos judiciais e inqueritos policiais.',
  'DANILO LIMA MACIEL',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416521/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132394054',
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
  '2E-NF06',
  'Definicao do processo de trabalho de criacao e manutencao dos projetos do BiUnico Portal d-1 e Bi Unico Trabalhos d-',
  'DANILO LIMA MACIEL',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00392922/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132003652',
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
  '2E-MEL44',
  'Acompanhamento e aplicacao de melhorias de performance nas consultas ao DW dos Cubos mais demorados do projeto (Elencados via observacao do Platform Analytcs) - Fato 2.10 - Procedimento - Fluxo Setor (Movimentacao) - (FAT_FLUXO_SETOR_EXTRAJUD)',
  'DANILO LIMA MACIEL',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00392500/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/131992777',
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
  '2E-INF03',
  'Migracao das integras para a nova solucao de armazenamento: criacao de buckets, cadastro de usuarios, disponibilizacao de chaves de acesso (S3), migracao dos dados da solucao antiga (SUSE Storage), para a nova solucao implementada provisoriamente com a solucao MinIO.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
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
  '2E-INF04',
  'Implantacao de novos clusters kubernetes com aprimoramento da seguranca (RKE2 + hardening dos ambientes, com vistas aos preceitos DEVSECOPS): avaliacao dos requisitos; preparacao dos ambientes dos novos servidores; definicao e aplicacao das politicas de seguranca; planejamento e implantacao dos clusters de producao.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
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
  '2E-INF05',
  'Avaliacao de alternativas e promocao de melhorias do desempenho das ferramentas de IA do Unico: estudo e elaboracao de modelo para implantacao das ferramentas de IA do Unico.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
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
  '2E-BD13',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - estruturacao da ferramenta para analise de privilegios',
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
  '2E-BD14',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao 4.10',
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

COMMIT;