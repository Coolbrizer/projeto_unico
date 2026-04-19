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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF17',
  'Preparacao e ativacao dos servidores de aplicacao do sistema Unico para o monitoramento com Prometheus e Grafana',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-03',
  '2022-11-11',
  100,
  'PGR-00462204/2022',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=123453265',
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
  '1E-INF18',
  'V4.6 - Realizar analise de desempenho dos servidores de aplicacao do Sistema Unico de producao apos a implantacao da V4.6.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-24',
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
  '1E-INF19',
  'Fase 1 de 3 da Atualizacao da infraestrutura de distribuicao e balanceamento de acesso aos servidores de aplicacao do Sistema Unico',
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-BD15',
  'Modelos de dados ajustados de acordo com as necessidades negociais para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-01',
  '2022-12-19',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
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
  '1E-BD16',
  'Scripts de banco de dados gerados e versionados para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-10',
  '2022-11-10',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
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
  '1E-BD17',
  'Banco de dados de desenvolvimento atualizado com ajustes apontados durante o desenvolvimento, homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-12',
  '2022-11-10',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
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
  '1E-BD18',
  'Bancos de dados de homologacao atualizados com ajustes apontados durante a homologacao e disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-10',
  '2022-11-21',
  100,
  'PGR-00462204/2022',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/123453265',
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
  '1E-BD19',
  'Bancos de dados de producao e treinamento atualizados com ajustes apontados durante a disponibilizacao em producao da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-21',
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
  '1E-BD20',
  'Bancos de dados de desenvolvimento, homologacao, treinamento e producao monitorados durante atividades da versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-10-03',
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
  '1E-BD21',
  'Alteracoes de banco de dados atraves de scripts ajustados apos analise e sugestoes de melhorias para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2022-11-07',
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
  '1E-MEL49',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados - Etapa',
  'ERICA GARCIA PEREIRA ARROCHELA LOBO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00092183/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126117025',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL50',
  'Informativos da Sejud: execucao das atualizacoes - Etapa',
  'ANA PAULA GAVROS DINYAKO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00104606/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126355096',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL51',
  'Definicao dos requisitos e acompanhamento da implementacao das melhorias propostas para a tabela Orgao de governo - Etapa',
  'CECILIA DA SILVA BORGES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00105775/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126380293',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL52',
  'Proposta de estruturacao da base de conhecimento da Sejud - Etapa',
  'CECILIA DA SILVA BORGES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00078019/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125831984',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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

COMMIT;