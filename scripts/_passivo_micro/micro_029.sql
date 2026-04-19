BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL56',
  'Treinamento - ferramentas do Unico para gabinetes da PGR, com atuacao no STJ e STF',
  'GLEIDSON MOREIRA FERNANDES',
  '2023-10-31',
  '2024-01-29',
  100,
  'PGR-00032221/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/134376891',
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

COMMIT;