BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '2E-MEL11',
  '0V4.13 - Alteracao na API Unico para evolucao na integracao com o SISAM',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-MEL11',
  '1Validacao dos dados basicos do Acervo Extrajudicial do MPF',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00157779/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136741457',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
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
  '2E-MEL11',
  '2Levantamento preliminar da situacao das distribuicoes nos procedimentos extrajudiciais',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00201377/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137549137',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
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
  '2E-MEL11',
  '3Validacao dos expedientes a receber (area administrativa)',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00157764/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/136741252',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
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
  '2E-MEL11',
  '4Migrar os principais relatorios das modelagens de dados descontinuadas para novas modelagens',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218670/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137879337',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '5Inclusao de atributos indicados na atividade "Uniformizar os atributos dos modelos de dados ativos"',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00223254/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137966625',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-MEL11',
  '6Proposta de novos criterios de urgencia aplicados aos processos judiciais do STJ , no sistema Unico',
  'RENATA CAVALCANTE SCUTTI',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00185113/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=137981630',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-NF14',
  'Homologar a modelagem de dados relacionados ao historico de autuacao de procedimentos',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218764/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137880122',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-NF15',
  'MPF em Numeros - Desenvolver paineis com informacoes sobre a evolucao do fluxo e acervo de processos no MPF',
  'TIAGO CESAR MORONTE',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00218771/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137880278',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-DEB08',
  'V4.13 - Acoes para reducao do Indice de Debito Tecnico (IDT) do Sistema Unico, conforme Instrucao de Servico Conjunta Sejud/Stic nº 3/202',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-INT08',
  'V4.13 - Implementar aproveitamento de dados no Retorno de processos judiciais via MNI para os campos: Orgao julgador, Orgao gerador do numero e Relator',
  'MAX LEONARDO DOMINGOS LOPES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229402/2025',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138035376',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
  2,
  'atraso'
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
  '2E-IA29',
  'V4.13 - IA aplicada a IPLs: Acompanhar e divulgar a solucao para exibir os resultados da inferencia de IA no Gerenciador Judicial do sistema Unico',
  'ANA PAULA GAVROS DINYAKO',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00198965/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=137495537',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-IA30',
  'V4.13 - IA aplicada a IPLs: Implementacao na infraestrutura para uniformizar a obtencao das informacoes do MNI (E-proc) e IA (Pje) no Gerenciador Judicial do sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00198965/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137495537',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-IA31',
  'TRIA-HC: inclusao de novos rotulos detalhados no Gerenciador Judicial do sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00198965/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137495537',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-IA32',
  'Classificacao Automatica: elaboracao de relatorios analiticos e sinteticos no BI ou Extractus das regras ativas registradas no sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00198965/2024',
  'https://novoportal.mpf.mp.br/unico/modulo/documento/painel/#/137495537',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-IA33',
  'Classificacao Automatica: proposta de Informativo e inclusao das correlacoes das principais classes x area de atuacao/forma de atuacao',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00209655/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/137716091',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-IA34',
  'Classificacao Automatica: orientacao a unidades para construcao de modelo das regras locais no sistema Unico',
  'ANA PAULA GAVROS DINYAKO',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00209655/2024',
  'https://portal-preprod.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=137716091',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-INF11',
  'Acompanhamento e aplicacao de melhorias de performance nas consultas ao DW dos Cubos mais demorados do projeto',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00156850/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/136719401',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-INF12',
  'Atualizacao da versao do MicroStrategy para versao 2021.12 no ambiente Windows',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00207414/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137674878',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-INF13',
  'Desativacao de mapeamentos e cargas de fatos descontinuadas indicadas na atividade “Desativacao das Fatos Descontinuadas”',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00214534/2024',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/137803570',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-INF14',
  'Integracao e sincronismo dos ambientes principal e de replica das integras do Unico',
  'EDSON MACIEL MARQUES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229763/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138042512',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-INF15',
  'Alteracao da ferramenta de Integracao do ciclo de CI do desenvolvimento do Unico com o deployment automatizado nos ambientes de infraestrutura; e - Definicao e implantacao do processo do ciclo de vida dos servidores de aplicacao do Unico',
  'EDSON MACIEL MARQUES',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00229763/2024',
  'https://portal-preprod.mpf.mp.br/unico/modulo/documento/painel/#/138042512',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-BD49',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00227040/2024',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/138006005',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-BD50',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00227040/2024',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/138006005',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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
  '2E-BD51',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2024-04-09',
  '2024-05-31',
  100,
  'PGR-00227040/2024',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/138006005',
  '04fc2826-3be7-4424-a135-8800d8febbef'::uuid,
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