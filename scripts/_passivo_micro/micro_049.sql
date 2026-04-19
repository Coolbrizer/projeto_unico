BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-NF06',
  'Disponibilizar, nos dados do BI, as informacoes de fundamentacoes juridicas dos autos judiciais, inqueritos e procedimentos - ETL e Mapeamento',
  'ANDREIA CRISTINE HONDA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00396911/2024',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=141547976',
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
  '3E-NF07',
  'Disponibilizar, nos dados do BI, a informacao sobre o historico da situacao dos processos judiciais e inqueritos policiais do MPF para acompanhamento do acervo ao longo do tempo - Homologacao',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00029016/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/144605803',
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
  '3E-NF08',
  'Disponibilizar, nos dados do BI, as informacoes de fundamentacoes juridicas dos autos judiciais, inqueritos e procedimentos - Especificacao',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00002569/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/143993769',
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
  '3E-NF09',
  'Disponibilizar, nos dados do BI, o tempo de permanencia dos processos/inqueritos e de procedimentos remanescentes, integrado ao fluxo processual - Especificacao',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00029027/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/144606208',
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
  '3E-NF10',
  'Disponibilizar, nos dados do BI, as informacoes dos oficios do MPF - situacao atual e historico - Especificacao',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00029040/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/144606728',
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
  '3E-NF11',
  'Disponibilizar, nos dados do BI, os dados sobre informacao complementar dos autos judiciais, inqueritos e procedimentos - Especificacao',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00029050/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/144606885',
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
  '3E-INF06',
  'Elaboracao do Plano de Modernizacao da Infraestrutura da Aplicacao para a nova arquitetura da infraestrutura da aplicacao considerando a capacidade de manter ambientes on-premises e em nuvem publica, com seus mecanismos de protecao',
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
  '3E-INF07',
  'Estabelecer politicas de seguranca e conformidade para garantir a consistencia dos dados em casos de processos de failover (operacao somente em recurso de nuvem publica) e failback (retorno da operacao em recursos on-premises)',
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
  '3E-INF08',
  'Avaliar alternativas relacionadas ao banco de dados da aplicacao para verificar a melhor estrategia para disponibilidade do banco de dados da aplicacao na nuvem publica, considerando aspectos de desempenho e seguranca, integridade e consistencia dos dados em relacao ao banco de dados on-premises',
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
  '3E-INF09',
  'Validacao do plano de modernizacao e das politicas de seguranca pelo servico contratado de consultoria do Gartner',
  'EDSON MACIEL MARQUES',
  '2024-09-13',
  '2025-01-23',
  0,
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
  '3E-INF10',
  'Implementacao de praticas de seguranca como controle de acesso a gerencia dos recursos em nuvem e a criptografia de dados, firewalls e outros para proteger os dados e garantir a conformidade com as regulamentacoes',
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

COMMIT;