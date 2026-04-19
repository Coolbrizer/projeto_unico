BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-MEL20',
  'V4.17 - REESTRUTURACAO SIGILO - Implementar conceito de Tipo de Sigilo e Nivel de Restricao no sistema Unico',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-MEL21',
  'V4.17 - REESTRUTURACAO SIGILO -Adaptacoes nas telas do modulo Judicial',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-MEL22',
  'V4.17 - RESTRUTURACAO SIGILO - Implementar Tipo de Sigilo "Reservado" da LAI em expedientes administrativos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-MEL23',
  'V4.17 - RESTRUTURACAO SIGILO - Adaptacoes nas telas do modulo Procedimentos',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-DEB02',
  'V4.17 - Migrar codigo do sistema Unico para o Java 2',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-INT01',
  'V4.17 - Evolucoes na Integracao com o DJE/CNJ',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-INT02',
  'V4.17 - REESTRUTURACAO SIGILO: Adaptacao no MNI e no aviso de comunicacao das intimacoes',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00370315/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151862049',
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
  '4E-NF02',
  'Adequar os dados do BI as novas regras de sigilo negociais implementadas no sistema Unico - Especificacao',
  'TIAGO CESAR MORONTE',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00336178/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151095469',
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
  '4E-INF01',
  'Avaliacao do desempenho do Sistema Unico apos a disponibilizacao da Versao 4.16 (em Kubernetes)',
  'EDSON MACIEL MARQUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-INF02',
  'Verificacao e ajustes na Infraestrutura do Sistema Unico apos a disponibilizacao da Versao 4.1',
  'EDSON MACIEL MARQUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-INF03',
  'Verificacao e ajustes na Infraestrutura do Sistema Unico apos a disponibilizacao da Versao 4.17 (em JAVA 21)',
  'EDSON MACIEL MARQUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-INF04',
  'Levantamento de Requisitos e de Arquitetura para a Solucao de Monitoramento da Experiencia de Uso do Sistema Unico - Nivel Gerencial',
  'EDSON MACIEL MARQUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-INF05',
  'Instalacao e configuracao inicial do ambiente da Solucao de Monitoramento da Experiencia de Uso do Sistema Unico - Nivel Gerencial',
  'EDSON MACIEL MARQUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD01',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD02',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD03',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD04',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD05',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD06',
  'Avaliacao de alternativas para melhoria do desempenho das consultas ao banco de dados do Unico, sob demanda',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378119/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152050400',
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
  '4E-BD07',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00376613/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152014175',
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
  '4E-BD08',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00376613/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152014175',
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
  '4E-IA01',
  'ApoIA Eleitoral: entendimento do negocio/dados, deteccao dos documentos de interesse e engenharia de prompts',
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
  '4E-IA02',
  'ApoIA RFFP - Adaptacoes no processamento de IA e preparacao da aplicacao para integracao com o Sistema Unico',
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
  '4E-IA03',
  'Estudo de cenarios para implementacao de IA no sistema Unico',
  'SILVIO MEIRELES SOARES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00391147/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152351091',
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

COMMIT;