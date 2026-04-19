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

COMMIT;