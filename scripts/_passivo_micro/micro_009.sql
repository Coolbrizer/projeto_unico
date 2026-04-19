BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-MEL48',
  'V4.6 - Gestao de temporalidade em procedimentos extrajudiciais',
  'MAX LEONARDO DOMINGOS LOPES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00007836/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/124709336',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-DEB04',
  'V4.6 - Acoes para mitigar vulnerabilidade de seguranca - 3ª etapa da alteracao na spring e hibernate - Afericao de estabilidade',
  'MAX LEONARDO DOMINGOS LOPES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00007836/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/124709336',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-DEB05',
  'V4.6 - API do Unico 2ª etapa - mitigador de vulnerabilidade - sistema Radar SPPEA',
  'MAX LEONARDO DOMINGOS LOPES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00007836/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/124709336',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-DEB06',
  'V4.6 - Acoes para mitigar vulnerabilidade de seguranca - Continuacao da substituicao parcial de libs que apresentam vulnerabilidade critica e alta, conforme Indice de Debito Tecnico (IDT) do Sistema Unico',
  'MAX LEONARDO DOMINGOS LOPES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00007836/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/124709336',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INT04',
  'V4.6 - Integracao SEEU - implementacao em producao',
  'MAX LEONARDO DOMINGOS LOPES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00007836/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/124709336',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-IA08',
  'V4.6 - TRIA: Infraestrutura de IA para integrar o modelo de classificacao das decisoes e pareceres ao STJ com o Unico. Melhorar a acuracia do modelo de IA para classificacao dos pareceres do MPF em HC',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-IA09',
  'V4.6 - Resultado de Julgamento com um reu: Infraestrutura de IA para integrar o modelo de resultado de julgamento de um reu com o Unico. Melhorar a acuracia do modelo de IA para reconhecer o resultado de sentenca com um reu.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF13',
  'V4.6 - Implantar as diversas versoes desenvolvidas nos diferentes ambientes servidores de aplicacao do Sistema Unico (testes, pre-prod, prod, iter e treina)',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF14',
  'Fase 2 de 2 do tratamento dos pontos de melhoria identificados sobre as rotinas de backup e de restauracao das copias de seguranca dos dados e dos servidores de aplicacao do sistema Unico.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-17',
  '2022-11-04',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453243',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF15',
  'Fase 1 de 2 da Atualizacao dos clusters da plataforma de administracao (Rancher) dos clusters Kubernetes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-03',
  '2022-10-28',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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
  '1E-INF16',
  'Fase 2 de 2 da analise das alternativas encontradas na etapa anterior de solucao a plataforma de armazenamento das integras do Sistema Unico (Suse Enterprise Storage) com suporte do fabricante',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-31',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
  '784f62e0-a513-4d4a-ad2a-db5dbe25fad3'::uuid,
  1,
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