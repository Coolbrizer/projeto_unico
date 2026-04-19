BEGIN;

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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-NF01',
  'MPF em Numeros – desenvolver novos paineis de informacoes sobre fluxo de processos por titularidade e responsabilidade. Disponibilizar paineis com informacoes sobre o fluxo de processos por titularidade e responsabilidade',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300902/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130334987',
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
  '2E-NF02',
  'Adequacao do BI para obter a informacao de primeira entrada no MPF e retorno no MPF de acordo com os requisitos da CEST',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00321113/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/139907739',
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
  '2E-NF03',
  'Criacao de carga (ETL) para exclusao de registros inativos da STG_MARCOS_TEMPORAIS (murchacao da tabela)',
  'DANILO LIMA MACIEL',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00279787/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/129972999',
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
  '2E-IA01',
  'Inventario das entregas de IA: coleta de feedback dos usuarios e formalizacao de sugestoes de melhoria',
  'ANA PAULA GAVROS DINYAKO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00303717/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=130384490',
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
  '2E-IA02',
  'Monitorar, difundir e ampliar a utilizacao da classificacao automatica com sugestao de minuta de manifestacao (estudo estatistico da utilizacao; avaliacao de viabilidade PRRJ; implantacao PRRs 2, 3, 4 e 5).',
  'ANA PAULA GAVROS DINYAKO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00306478/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=130442495',
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
  '2E-IA03',
  'TRIA: Realizar acoes de treinamento nos gabinetes de Subprocuradores da Republica para divulgar foco da solucao e sua funcionalidade (16 oficios criminais)',
  'ANA PAULA GAVROS DINYAKO',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00300486/2023',
  'https://portal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=130326269',
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
  '2E-IA04',
  'V4.9 - IA para requisicao STJ: Avaliacao da acuracia e especificacao da automatizacao parcial das requisicoes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA05',
  'V4.9 - Armazenar integras PDF/HTML de pecas processuais utilizadas pela IA - Disponibilizacao de integras HTML da interoperabilidade (MNI): Especificacao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA06',
  'V4.9 - Armazenar integras PDF/HTML de pecas processuais utilizadas pela IA - Infraestrutura de IA: Armazenamento PDFs',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA07',
  'V4.9 - TRIA - melhorias do Gerenciador e Aviso na apresentacao dos dados de IA: Especificacao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA08',
  'IA aplicada aos Recursos Extraordinario e Especial: Entendimento do negocio e dos dados e apresentacao grafica dos agrupamentos',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA09',
  'Internalizacao do Athos: Estudo de caso com pareceres padronizados/nao padronizados da SNPD',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA10',
  'Painel acuracia modelo IA TRIA: Automacao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-IA11',
  'Painel de acuracia modelo IA TRIA: Criacao da base amostral e avaliacao pelo negocial - curadoria',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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
  '2E-INF01',
  'Implantacao da nova solucao de armazenamento das integras: levantamento de requisitos especificos; preparacao dos servidores fisicos; instalacao e configuracao inicial',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-06-01',
  '2023-08-21',
  100,
  'PGR-00305642/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/130418668',
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

COMMIT;