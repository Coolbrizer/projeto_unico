BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL17',
  'Sistema Extractus - Gestao negocial relativa ao sistema Unico: reorganizacao do fluxo e dos grupos de atendimento; analise da demanda reprimida de pedidos (SNPs)',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300728/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130332007',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL18',
  'Acompanhamento e aplicacao de melhorias de performance nas consultas ao DW dos Cubos mais demorados do projeto (Elencados via observacao do Platform Analitsc) – Fato - 1.13 Judicial - Responsabilidade Oficio – Fluxo (FAT_FLUXO_JUD_RES_OFICIO_Q)',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00282525/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/129986104',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL19',
  'V4.9 - Proof of Concept (POC) Editor de texto Google Docs: tratativas com representante Google e MVP de integracao do Google Docs na tela de manifestacoes judiciais',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL20',
  'V4.9 - Reestruturacao do sigilo - documentacao da especificacao para alteracao das regras negociais e definicao da estrategia de implementacao',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00295585/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130228755',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL21',
  'V4.9 - Descontinuidade das telas de recuperacao de expedientes em tecnologia antiga (ATENA): (i) acoes de comunicacao; (ii) ajustes com base em feedback dos usuarios; (iii) ocultar botao tela antiga',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL22',
  'V4.9 - Proof of Concept (POC) Gerenciadores: i) para dispensar o uso do SOLR com consultas diretas no banco de dados Oracle; ii) especificacao da implementacao no caso de POC positiva',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-MEL23',
  'V4.9 - Incluir dados de oficio para autor, coautor e coassinante nas manifestacoes (produtividade GAECO e demais oficios especiais)',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-DEB01',
  'V4.9 - Acoes para mitigar vulnerabilidade de seguranca - Continuacao da substituicao parcial de libs que apresentam vulnerabilidade critica e alta, conforme Indice de Debito Tecnico (IDT) do Sistema Unico',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-DEB02',
  'V4.9 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/2022',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-INT01',
  'V4.9 - Robo de monitoramento STJ - Utilizar nova API desenvolvida pelo STJ para descoberta e acompanhamento de processos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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
  '2E-INT02',
  'V4.9 - Implementacao de assinatura conjunta - por mais de um membro do MPF - em manifestacoes judiciais (assinatura e envio para o Judiciario)',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300497/2023',
  'https://portal-desenv.mpf.mp.br/unico/modulo/documento/painel/#/130326447',
  'a479192e-0f6a-45b4-a38b-253492518191'::uuid,
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