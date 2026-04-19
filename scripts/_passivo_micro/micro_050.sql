BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-INF11',
  'Adequacao nos ambientes da aplicacao on-premises para que tenham caracteristicas compativeis com os ambientes a serem usados em infraestrutura em nuvem publica',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00039787/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144857722',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-INF12',
  'Implantar a aplicacao nos ambientes on-premises utilizando praticas de DevOps com processo automatizado e monitorado, integrando-se aos servicos da nuvem publica para melhoria quanto a escalabilidade e que permita evoluir para o disaster recovery',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00039787/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144857722',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-INF13',
  'Migracao ou replicacao da infraestrutura de outros componentes da aplicacao para o ambiente de nuvem, mantendo a funcionalidade nos ambientes on-premises',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00039787/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144857722',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-INF14',
  'Implementar um sistema de balanceamento de trafego eficiente entre os ambientes on-premises e na nuvem publica',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00039787/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144857722',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-INF15',
  'Testes de Integracao Iniciais e preliminares para garantir a integracao entre ambas as infraestruturas',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00039787/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144857722',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD13',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD14',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD15',
  'Analise da viabilidade tecnica para implementacao de protecao da apresentacao de dados sensiveis',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD16',
  'Analise da viabilidade tecnica para implementacao de mascaramento de dados sensiveis no banco de dados',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD17',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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
  '3E-BD18',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00033203/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144706562',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
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