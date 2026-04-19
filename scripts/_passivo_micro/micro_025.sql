BEGIN;

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

COMMIT;