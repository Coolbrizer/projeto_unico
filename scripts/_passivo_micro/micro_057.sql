BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-MEL84',
  'V4.16 - Preparacao para descontinuidade do ATENA: incremento nos novos gerenciadores das acoes em Envelope',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-MEL85',
  'V4.16 - Preparacao para descontinuidade do SOLR: Ajustes de performance e acessibilidade nos novos Gerenciadores para substituicao e descontinuidade do SOLR nos gerenciadores',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-MEL86',
  'V4.16 - Adaptacoes nos novos gerenciadores de procedimentos e documentos sem a utilizacao da ferramenta Solr, conforme feedback dos usuarios (MVP na 4.15)',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-MEL87',
  'V4.16 - Preparacao para nuvem: implementar nova infraestrutura de aplicacoes em Kubernetes com Tomcat',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-INT04',
  'V4.16 - Pauta de julgamento: Expandir a integracao do Processo Eletronico do Sistema Unico, utilizando a API REST ja desenvolvida para a inclusao automatizada das pautas de julgamento importadas do STF, para possibilitar sua utilizacao com os demais tribunais',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-INT05',
  'V4.16 - Domicilio Judicial Eletronico: Integracao com a nova metodologia de envio de avisos de comunicacao do CNJ',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
  3,
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
  '3E-BD33',
  'Avaliacao, ajuste e execucao das modificacoes de objetos de banco de dados solicitadas pela versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00299258/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/150401432',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL88',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'NATALIA REZENDE JORDAO DANCZURA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00253200/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/149428875',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL90',
  'Revisao da tabela de motivos de finalizacao dos autos judiciais/IPL',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213448/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148609163',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL91',
  'Webinar: Gestao de acessos descentralizada via SNP e PGO',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00212527/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148579701',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL92',
  '9ª Pesquisa do Sistema Unico: analise qualitativa das respostas comentadas',
  'EDUARDO HYPOLITO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00214092/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148624683',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL93',
  'Ambiente de informacoes finalisticas: revisao e ampliacao de conteudo',
  'DENNIS FREIRE VASQUES MARTINS',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00244403/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/149224215',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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