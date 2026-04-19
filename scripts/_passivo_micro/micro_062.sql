BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-MEL14',
  'Providencias Administrativas - mapeamento de fluxo de trabalho da area de regime previdenciario/SGP',
  'JOSE ADILSON DE SOUZA DIAS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328942/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/cadastro/integra/#/150937612',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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
  '4E-MEL15',
  'Estudos para implementacao de IA no Sistema Cidadao',
  'GABRIEL DE MENESES BATISTA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00325973/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/150862149',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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
  '4E-MEL16',
  'Avaliacao e destinacao de documentos arquivisticos no Unico: analise de requisitos para gestao dos documentos avulsos (administrativos)',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00359508/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151607121',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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
  '4E-MEL17',
  'Acompanhar e orientar os lancamentos de resultados de julgamentos e acordos pela 1ª e 2ª instancias com novos parametros para as correicoes ordinarias em 202',
  'LIVIA SOUZA PEIXOTO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328107/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151694572',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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
  '4E-MEL18',
  'Revisar e atualizar Manuais de cadastro de Resultados afetados pela publicacao da Portaria CMPF nº13, de 14 de marco de 202',
  'LIVIA SOUZA PEIXOTO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328107/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151694572',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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
  '4E-MEL19',
  'Validacao da titularidade de Autos Judiciais no Controle de Acervo',
  'TIAGO CESAR MORONTE',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00362508/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151674372',
  '16532f34-d1e6-41ff-bb01-f607e1de0883'::uuid,
  4,
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