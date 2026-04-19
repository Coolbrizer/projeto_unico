BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-IA10',
  'ApoIA Eleitoral: Implementacao do fluxo processamento para Prestacao de Contas originarias e adaptacao do ApoIA para exibicao dos dados extraidos e da minuta gerada',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA11',
  'ApoIA RFFP: acompanhamento e ajustes para integracao com Gerenciador Extrajudicial do Sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA12',
  'Avaliacao de Minutas Produzidas por IA Generativa a partir de Dados do Sistema Unico',
  'SILVIO MEIRELES SOARES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA13',
  'ApoIA RFFP:ampliacao para todos os gabinetes criminais',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA14',
  'ApoIA RFFP: Implementacao de analise para correlacao de registros de antecedentes para responsaveis por pessoas juridicas',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA15',
  'Sistema SUBJUR:Implementacao dos criterios preparatorios para a automacao no processamento de IA das requisicoes de processos judiciais do STJ',
  'RENATA CAVALCANTE SCUTTI',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA16',
  'Solucao automatizada para acompanhamento de processos prioritarios do STJ: Modulos de Andamentos, de Termos de Busca e de Boletim',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA17',
  'Radar de temas sensiveis: avaliar obtencao de acesso ao Codex/CNJ e estudo inicial da viabilidade de ferramenta de pesquisa inteligente',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA18',
  'Tria REsp: Entendimento do negocio e dos dados e coleta de amostra para identificacao de processos repetitivos',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA19',
  'Tria HC: avaliacao da acuracia e retreinamento dos modelos de parecer e decisao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA20',
  'Tria: implementacao de processamento paralelo das filas pelo orquestrador de IA e balanceamento de servicos de inferencia nos servidores',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029802/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155421391',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-IA21',
  'Otimizacao do Fluxo Documental no Repositorio Institucional com a automatizacao de Metadados: homologacao, ajustes e entrada em producao da submissao automatica de documentos e definicao dos requisitos para a consolidacao de dados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00067608/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156219432',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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