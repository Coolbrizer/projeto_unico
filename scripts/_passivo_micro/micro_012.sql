BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-MEL61',
  'V4.7 - Assinatura em manifestacoes e documentos - 1E-: alteracao na tarja de documentos e realizacao de prova de Conceito (POC) no envio de manifestacao via MNI',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-MEL62',
  'V4.7 - Reestruturacao do sigilo. Especificacao tecnica - 1E-',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00050889/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126531354',
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
  '1E-MEL63',
  'V4.7 - Novo leiaute e acoes para tabela de Orgao de Governo',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-MEL64',
  'V4.7 - Integracao login do GOVbr no Peticionamento Eletronico - Etapa',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-DEB07',
  'V4.7 - Acoes para mitigar vulnerabilidade de seguranca - Continuacao da substituicao parcial de libs, conforme Indice de Debito Tecnico (IDT) do Sistema Unico',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-DEB08',
  'V4.7 - Maior estabilidade - migrar servidores para esquema LongHorn - armazenamento distribuido nativo da nuvem para Kubernetes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00089714/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126066294',
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
  '1E-IA10',
  'V4.7 - IA para requisicao de processos judiciais do STJ de interesse do MPF – 1º Etapa (Entendimento do negocio e dos dados)',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00089714/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126066294',
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
  '1E-IA11',
  'V4.7 - Automatizar os pareceres de nao intervencao na SNPD utilizando a classificacao automatica para auxiliar na criacao de modelos de manifestacoes',
  'ANA PAULA GAVROS DINYAKO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00103680/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126354549',
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
  '1E-IA12',
  'V 4.7 - Melhorias de infraestrutura e monitoramento da acuracia dos servicos de IA para o resultado de julgamento em acoes penais',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00089714/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126066294',
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
  '1E-INT05',
  'V4.7 - Integracao com PJe 2x/TRF',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-INT06',
  'V4.7 - Integracao com processos sigilosos de nivel 3, 4 e 5 do Eproc/TRF',
  'MAX LEONARDO DOMINGOS LOPES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109404/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126448374',
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
  '1E-BD22',
  'Modelos de dados ajustados de acordo com as necessidades negociais para a versao 4.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00089714/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126066294',
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