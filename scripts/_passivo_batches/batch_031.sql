BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-NF06',
  'Desenvolver Painel Nacional para acompanhamento do equilibrio da distribuicao ao longo do tempo',
  'TIAGO CESAR MORONTE',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00032255/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155482638',
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
  '4E-NF07',
  'Desenvolver Painel Nacional para acompanhamento de quantitativos de envios de manifestacoes - MNI - Especificacao de regras negociais para disponibilizacao no BI',
  'TIAGO CESAR MORONTE',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00032284/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155483129',
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
  '4E-NF08',
  'Estudo de fluxo e de viabilidade do desenvolvimento de Paineis interativos para suporte a Agep/STJ e a Tutela Coletiva no monitoramento de processos de carater repetitivo, coletivo ou de relevancia',
  'RENATA CAVALCANTE SCUTTI',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00072763/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156326693',
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
  '4E-INF06',
  'Avaliar solucao "SUSE Virtualization" como solucao de infraestrutura auxiliar de virtualizacao, para suportar ambientes de testes e de observabilidade do Sistema Unico.',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF07',
  'Migrar cluster kubernetes que abriga a solucao SUSE Observability para a infraestrutura auxiliar de virtualizacao (SUSE Virtualization)',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF08',
  'Criar processo de automatizacao para atualizacao recorrente do template de maquina virtual utilizado para criacao dos clusters kubernetes, para aplicacao de patches de seguranca e de correcao de problemas',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF09',
  'Apoiar analise de vulnerabilidades em nos dos clusters kubernetes do sistema Unico com a ferramenta Tenable Cloud',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF10',
  'Definir a configuracao das notificacoes (e-mails, SMS, etc.) para os alertas e configurar elementos graficos/paines de visualizacao na Solucao de Monitoramento da Experiencia de Uso do Sistema Unico - Nivel Gerencial',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF11',
  'Apoiar levantamento da COBAN com alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica e realizacao de testes dentro do contrato de nuvem TC nº 36/202',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-INF12',
  'Apoio ao Planejamento de Continuidade de Servicos de TIC (PCSTIC) para o sistema Unico conduzido pela SUBSEC/STIC',
  'EDSON MACIEL MARQUES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD09',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD10',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD11',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD12',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD13',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD14',
  'Avaliacao de alternativas para melhoria do desempenho das consultas ao banco de dados do Unico, sob demanda',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD15',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00063430/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156129891',
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
  '4E-BD16',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00063430/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156129891',
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
  '4E-BD17',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Levantamento de carga de processamento',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD18',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Identificacao das exigencias de licenciamento do banco de dados Oracle',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD19',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Identificacao das dependencias do sistema Unico com a tecnologia Oracle',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD20',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Avaliar compatibilidade e desempenho de outros produtos disponiveis na AWS com a tecnologia Oracle',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD21',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Avaliar legalidade contratual do TC 64/2023 quanto ao provisionamento de banco de dados na nuvem publica Oracle Cloud',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD22',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Levantar requisitos tecnicos e financeiros para provisionamento de banco de dados Data Guard na nuvem publica da Oracle',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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
  '4E-BD23',
  'Avaliacao de alternativas para migracao do banco de dados do Sistema Unico para a nuvem publica - Provisionar banco Data Guard na nuvem publica da Oracle e avaliar a sincronizacao com o banco primario e o tempo de resposta de uma aplicacao que realize leitura de dados massiva',
  'FERNANDO NAUFEL SILVA E SANTOS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00069840/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156265431',
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