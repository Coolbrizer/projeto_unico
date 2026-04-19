BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-IA04',
  'Estudos sobre acuracia da IA nos processos geridos pelo sistema SUBJUR, para definir criterios objetivos na automatizacao das requisicoes de processos judiciais do STJ',
  'RENATA CAVALCANTE SCUTTI',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00375200/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152057004',
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
  '4E-IA05',
  'Solucao automatizada para acompanhamento de processos prioritarios do STJ: desenvolvimento do primeiro subproduto - "Modulo de Processos"',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA06',
  'CorregedorIA: Desenvolvimento de solucao de Inteligencia Artificial aplicada aos Paineis de BI da CMPF na analise das manifestacoes JEF/CL da correicao de 20',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA07',
  'Orquestrador IA: atualizacao tecnologica para Java 21, incluindo as bibliotecas dependentes e adequacao as novas regras negociais de sigilo implementadas no sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA08',
  'Orquestrador IA: diagnostico, prospeccao e planejamento para saneamento de debitos tecnicos dos servicos de IA',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA09',
  'Otimizacao do Fluxo Documental no Repositorio Institucional com a automatizacao de Metadados: Analise de Requisitos para Consulta de Dados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-MEL25',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'NATALIA REZENDE JORDAO DANCZURA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029239/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155410770',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL26',
  'Estudo para desenvolvimento de solucao de automacao para lancamentos de suspensao de conclusao no sistema Unico',
  'CECILIA DA SILVA BORGES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00048200/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155793314',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL27',
  'Precatorios FUNDEB - Informativo para Expedicao de Recomendacoes, Termo de Ajustamento de Conduta e Ajuizamento de Acao Civil Publica',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00055938/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155945518',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL28',
  'Implementacao de autenticacao de acesso ao Portal da Transparencia, via gov.br, para consulta processual restrita',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL29',
  'Estudo para padronizacao do cadastro de peticoes iniciais, com levantamento das limitacoes no peticionamento de iniciais via MNI em cada regiao judiciaria',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00050713/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/?continue#/155830668',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL30',
  '10ª Pesquisa do Sistema Unico: analise qualitativa das respostas comentadas',
  'EDUARDO HYPOLITO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00096053/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156838901',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
  4,
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

COMMIT;