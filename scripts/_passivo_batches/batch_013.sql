BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL57',
  'Integracao com a Turma Nacional de Unificacao - TNU: implementacao do fluxo de entrada com registro no Unico',
  'RENATA CAVALCANTE SCUTTI',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00032301/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134671128',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL58',
  'Divulgar e monitorar a utilizacao do catalogo nacional do Sistema Unico disponibilizado no SNP e implementar melhorias',
  'LIVIA SOUZA PEIXOTO',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00479089/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/133572261',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL59',
  'Monitorar o preenchimento de resultados do Sistema Unico e avaliar melhorias',
  'LIVIA SOUZA PEIXOTO',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00479132/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/133573191',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL60',
  'V4.11 - Editor de textos - Google Docs: i) Disponibilizar uso em manifestacao judicial para todos os gabinetes; ii) Especificar integracao Google Docs na tela de Documentos e modelos de documentos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL61',
  'V4.11 - Reestruturacao do sigilo - Alteracoes em regras negociais para: i) automatizar sugestao de classificacao de documentos sigilosos, conforme PT SG/MPF nº 454/2018; ii) disponibilizar lista de visibilidade em documentos sigilosos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL62',
  'V4.11 - Reestruturacao do sigilo - Estudo para regulamentacao normativa',
  'GEANE BATISTA DE VASCONCELOS',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00039663/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134498738',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL63',
  'Validacao do cadastro de resultados de julgamento civeis e criminais - 2ª instancia',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00450536/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/133025222',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL64',
  'Validacao dos motivos de finalizacao dos procedimentos extrajudiciais',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020791/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/134120473',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL65',
  'Levantamento de modelos de dados antigos do BI que podem ser descontinuados',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036584/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134450381',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-MEL66',
  'Melhoria de desempenho nos cubos de maior impacto no BI (Fato 1.15 - Judicial - Titularidade Oficio - Fluxo (Movimentacao))',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00028252/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134282887',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-NF08',
  'Adequacao do BI para obter a informacao de primeira entrada e retorno no MPF - Especificacao de regras negociais',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00031474/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134361824',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-NF09',
  'Adequacao do BI para obter a informacao de primeira entrada e retorno no MPF - Desenvolvimento do ETL e Mapeamento',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00030113/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134327395',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-NF10',
  'Adequacao do BI para obter a informacao de primeira entrada e retorno no MPF - Validacao',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036597/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134450707',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-NF11',
  'Desenvolvimento do ETL e Mapeamento de Dado da fato "Historico de autuacao de procedimentos''',
  'TIAGO CESAR MORONTE',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00028526/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134289674',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-DEB05',
  'V4.11 - Implementar autenticacao no Sistema Unico por meio do login Google (novo portal do MPF): substituicao dos antigos provedores de identidade e integracao com o codigo legado',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-DEB06',
  'V4.11 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/202',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-INT05',
  'V4.11 - Disponibilizar Integracao com eProc 6ª Regiao',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-INT06',
  'V4.11 - Saneamento de processos ativos: i) evoluir robo de baixa do MNI para fluxo de processos desarquivados; e ii) promover baixa de processos do STF',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00025270/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/134216568',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-IA18',
  'V4.11 - IA aplicada a IPLs: rotulagem dos dados, treinamento do modelo, avaliacao do modelo, implementacao do servico e especificacao para utilizacao das inferencias da IA pelo Sistema Unico',
  'ANA PAULA GAVROS DINYAKO',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-IA19',
  'V4.11 - IA aplicada a IPLs: alteracao na infraestrutura de IA para processamento dos dados e armazenamento das inferencias',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114054',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-IA20',
  'Aplicacao de IA (POC Serpro) - entendimento do negocio e dos dados',
  'ANA PAULA GAVROS DINYAKO',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-IA21',
  'IA aplicada aos Recursos Extraordinario e Especial: automatizar atualizacao da base de manifestacoes da POC',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/unico-v2/app/modules/extraJudicial/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=134114054',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-INF06',
  'Integracao da solucao de backup com a nova solucao de armazenamento das integras: avaliacao dos requisitos, preparacao dos ambientes, integracao com a rede SAN, configuracao de storages, disponibilizacao de area de armazenamento para o novo backup, configuracao da ferramenta de backup, agendamento de jobs, testes de copia em backup e testes de restauracao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-INF07',
  'Migracao das aplicacoes dos clusters atuais para os novos clusters kubernetes com RKE2, aplicando Pod e Net security policies: avaliacao dos requisitos; preparacao das atividades de migracao (backup dos dados e metadados); aplicacao das politicas de seguranca; instalacao das aplicacoes nos novos clusters; migracao/restore dos dados e metadados; ajustes finais apos as migracoes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00020408/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134114053',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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
  '2E-BD25',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Estruturacao da ferramenta para analise de privilegios',
  'ANDREIA CRISTINE HONDA',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00036481/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134448166',
  'd10a603d-4192-4796-b946-0adcd5e0a99f'::uuid,
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