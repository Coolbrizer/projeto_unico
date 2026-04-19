BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-MEL40',
  'APTUS Portal da Transparencia: Atualizacao da tecnologia do Aptus Portal da Transparencia',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00006952/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144119666',
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
  '3E-MEL41',
  'Providencias Administrativas - Mapeamento de fluxo para definicao de providencias especificas para a SGP',
  'JOSE ADILSON DE SOUZA DIAS',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00012565/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144247646',
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
  '3E-MEL42',
  'Treinamento e implantacao da nova ferramenta de atendimento virtual nas unidades remanescentes',
  'GABRIEL DE MENESES BATISTA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00018920/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/144385066',
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
  '3E-MEL43',
  'Adequacao do relatorio de pesquisa de satisfacao do cidadao: mapeamento da tabela de assuntos para identificacao do prazos de prestacao dos servicos previstos na LAI',
  'GABRIEL DE MENESES BATISTA',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00014216/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/144280931',
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
  '3E-MEL44',
  'Requisitos de gestao arquivistica no Unico para implementacao do Repositorio Digital (RDC-Arq): Definicao de criterios e melhorias na tabela de tipos de documento',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00023708/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144500630',
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
  '3E-MEL45',
  'Acompanhar e orientar lancamentos de resultados de julgamentos e acordos pela 1ª e 2ª instancias em atencao a atualizacao da Portaria CMPF 26/2024',
  'LIVIA SOUZA PEIXOTO',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00489352/2024',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144738124',
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
  '3E-MEL46',
  'Revisao e validacao de minuta de portaria para regulamentar acordos celebrados pelo MPF',
  'RAFAEL ASSIS DE MATOS',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00062492/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/145364271',
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
  '3E-MEL47',
  'Manualizacao: Migrar manual de versoes do Unico da WikiMPF para Google Sites',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00438216/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/142379951',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
  3,
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
  '3E-MEL48',
  'Validacao dos resultados de julgamento civeis de 1a instancia',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00349498/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/index.html#/140481902',
  'b757b7b9-c974-4d5f-9aa3-6bfac538c2ba'::uuid,
  3,
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
  '3E-MEL49',
  'Criacao da Central da Qualidade do Sistema Unico',
  'TIAGO CESAR MORONTE',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00012734/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/144250091',
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
  '3E-MEL50',
  'Criterios de requisicao de processos do STJ: revisao e compilacao dos verbetes aplicados na analise das publicacoes do STJ',
  'RENATA CAVALCANTE SCUTTI',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00037719/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=144809266',
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
  '3E-MEL51',
  'Webinar sobre o sistema Unico para gabinetes de Subprocuradores-gerais da Republica',
  'RENATA CAVALCANTE SCUTTI',
  '2024-09-13',
  '2025-01-23',
  100,
  'PGR-00036793/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/144785856',
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