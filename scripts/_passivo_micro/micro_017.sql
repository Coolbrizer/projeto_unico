BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF27',
  'Fase 2 de 2 para testes e atualizacao do ambiente da ferramenta de backup a integracao com o ambiente SDS de armazenamento atual das integras',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF28',
  'Fase 1 de 2 da Atualizacao dos clusters Kubernetes de testes, desenvolvimento e de producao.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF29',
  'Continuidade das provas de conceito de uma solucao a plataforma de armazenamento das integras do Sistema Unico (Suse Enterprise Storage) com suporte do fabricante',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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
  '1E-INF30',
  'Fase 2 de 2 - Implantacao da arquitetura de centralizacao de LOGs dos servidores de aplicacao do sistema Unico para o monitoramento com Prometheus e Grafana',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-INF31',
  'V4.8 - Realizar analise de desempenho dos servidores de aplicacao do Sistema Unico de producao apos a implantacao da V4.8',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2023-03-17',
  '2023-05-31',
  100,
  'PGR-00197420/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/128181955',
  '46872ac5-67df-41f3-a0bb-26684f8f6b20'::uuid,
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

COMMIT;