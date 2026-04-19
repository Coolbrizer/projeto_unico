BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-DEB01',
  'V4.14 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/2022',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00438216/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/142379951',
  '7726117e-4e31-41a8-8401-2f003935d84e'::uuid,
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
  '3E-INT01',
  'V4.14 - Pauta de Julgamento: preparar infra do processo eletronico para que tenha a importacao de pauta padronizada via MNI, conforme operacao em producao com o STF',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-06-06',
  '2024-10-30',
  100,
  'PGR-00438216/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/142379951',
  '7726117e-4e31-41a8-8401-2f003935d84e'::uuid,
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
  '3E-IA01',
  'POC RFFP: Desenvolvimento dos prompts de acordo com o fluxo do processo, submissao da amostra e avaliacao dos resultados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00366685/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140863593',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-IA02',
  'ATHOS MPF: uso de IA para identificar a utilizacao impropria do habeas corpus nos gabinetes de Subprocurador da Republica',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00366685/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140863593',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-IA03',
  'ATHOS MPF: uso de IA para agrupar autos judiciais com prioridade de tramitacao na SNPD',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00366685/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140863593',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-IA04',
  'ATHOS MPF: Desenvolvimento da aplicacao web: Modulo Menu Principal e Tabelas Basicas, Revisao da especificacao de requisitos, preparacao do ambiente de desenvolvimento na nova tecnologia front-end (Angular)',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00366685/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140863593',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-IA05',
  'Automacao do envio de e-mail para servidores e membros sobre a publicacao em midias oficiais (DMPFe, DOU, BSMPU): Especificacao dos requisitos, criacao e avaliacao do modelo de IA',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00366685/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140863593',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-IA06',
  'Classificacao Automatica: orientacao a unidades para construcao de modelo das regras locais no sistema Unico (6 COJUDs e 2 PREs)',
  'ANA PAULA GAVROS DINYAKO',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00374150/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/141174861',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-NF01',
  'Requisitos de gestao arquivistica no Unico para implementacao do Repositorio Digital (RDC-Arq): Proposta de normatizacao da Politica de Preservacao Digital do MPF.',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00364034/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/140794387',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-NF02',
  'Disponibilizar, nos dados do BI, a informacao historica da situacao dos processosjudiciais e inqueritos policiais do MPF para acompanhamento do acervo ao longo dotempo - Desenvolvimento do ETL e mapeamento no MicroStrategy',
  'RUBEM SOARES DA COSTA',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00298705/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=139526909',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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
  '3E-INF01',
  'Acoes de melhorias prioritarias que visam minimizar janelas de recuperacao de desastres utilizando recursos em nuvem publica',
  'EDSON MACIEL MARQUES',
  '2024-06-06',
  '2024-09-12',
  100,
  'PGR-00381006/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/141200933',
  '60ab5c25-849d-4d43-a11f-6aaf74043245'::uuid,
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