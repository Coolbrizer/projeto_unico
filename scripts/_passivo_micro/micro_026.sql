BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL44',
  'Acompanhamento e aplicacao de melhorias de performance nas consultas ao DW dos Cubos mais demorados do projeto (Elencados via observacao do Platform Analytcs) - Fato 2.10 - Procedimento - Fluxo Setor (Movimentacao) - (FAT_FLUXO_SETOR_EXTRAJUD)',
  'DANILO LIMA MACIEL',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00392500/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/131992777',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-INF03',
  'Migracao das integras para a nova solucao de armazenamento: criacao de buckets, cadastro de usuarios, disponibilizacao de chaves de acesso (S3), migracao dos dados da solucao antiga (SUSE Storage), para a nova solucao implementada provisoriamente com a solucao MinIO.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-INF04',
  'Implantacao de novos clusters kubernetes com aprimoramento da seguranca (RKE2 + hardening dos ambientes, com vistas aos preceitos DEVSECOPS): avaliacao dos requisitos; preparacao dos ambientes dos novos servidores; definicao e aplicacao das politicas de seguranca; planejamento e implantacao dos clusters de producao.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-INF05',
  'Avaliacao de alternativas e promocao de melhorias do desempenho das ferramentas de IA do Unico: estudo e elaboracao de modelo para implantacao das ferramentas de IA do Unico.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00416411/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/132392088',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-BD13',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - estruturacao da ferramenta para analise de privilegios',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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
  '2E-BD14',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao 4.10',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-08-22',
  '2023-10-30',
  100,
  'PGR-00415149/2023',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/132360014',
  'c07fed56-dd76-4436-b53b-023b4e9d7679'::uuid,
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