BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-MEL94',
  'Proposta de fluxo das atividades do GAECO para fins de afericao de produtividade',
  'CECILIA DA SILVA BORGES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00212510/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148579491',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL95',
  'Atualizacao dos filtros e funcionalidades do campo de pesquisa do Portal da Transparencia, conforme modelo adotado pelo STF',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213830/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=148618268',
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
  '3E-MEL96',
  'Providencias Administrativas - Mapeamento de fluxo de Capacitacao',
  'JOSE ADILSON DE SOUZA DIAS',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00154910/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147326633',
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
  '3E-MEL97',
  'Levantamento, analise e adequacao de respostas automaticas do sistema cidadao e protocolo eletronico',
  'GABRIEL DE MENESES BATISTA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00210059/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/148527033',
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
  '3E-MEL98',
  'Requisitos de gestao arquivistica no Unico para implementacao do Repositorio Digital (RDC-Arq): regras e requisitos para automatizacao do Termo de Avaliacao e Destinacao de Documentos (TADA).',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00203248/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148379553',
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
  '3E-MEL10',
  '0Revisar e atualizar Informativos de cadastro de Resultados afetados pela publicacao da Portaria CMPF nº 13, de 14 de marco de 2025, assim como material disponivel na FAQ',
  'LIVIA SOUZA PEIXOTO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00194256/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148619644',
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
  '3E-MEL10',
  '1Manualizacao: Migrar manual de versoes do Unico da WikiMPF para Google Sites',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '2Validacao dos resultados dos extrajudiciais',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00184484/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/index.html#/147922704',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '3Saneamento do acervo de envelopes nao finalizados',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213736/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148616001',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA22',
  'ApoIA (Piloto Representacoes Fiscais para Fins Penais): Implementacao de novas funcionalidades no gerenciador e categorizacao dos textos',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA23',
  'Sistema SUBJUR: analise da viabilidade de selecao de trechos relevantes das publicacoes e outros ajustes para melhorar a precisao da requisicao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
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
  '3E-IA24',
  'Programa de Acompanhamento Prioritario de Processos e Operacoes - PAP: analise e validacao dos requisitos e proposta de cronograma para a implementacao da solucao de IA e/ou RPA',
  'RENATA CAVALCANTE SCUTTI',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
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