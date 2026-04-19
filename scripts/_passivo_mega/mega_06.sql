BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '3E-MEL79',
  'Saneamento do acervo extrajudicial ativo',
  'TIAGO CESAR MORONTE',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00128134/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/146786487',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-MEL80',
  'Criterios de requisicao de processos do STJ: validacao da compilacao dos verbetes e atualizacao da respectiva IS',
  'RENATA CAVALCANTE SCUTTI',
  '2025-01-24',
  '2025-05-24',
  100,
  'PGR-00158763/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147406164',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-MEL81',
  'Treinamento de unico para gabinetes do STJ: elaboracao e divulgacao de conteudo sobre usabilidade sistema',
  'RENATA CAVALCANTE SCUTTI',
  '2025-01-24',
  '2025-05-24',
  100,
  'PGR-00158701/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147403486',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA15',
  'TRIA IPL: validacao do modelo de IA existente em relacao aos IPLs nao sigilosos da 1ª, 5ª e 6ª Regiao e avaliacao de viabilidade tecnica no acesso a integras reservadas',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA16',
  'Sistema SUBJUR: verificacao da acuracia e precisao e retreinamento do modelo com dados novos para casos de baixa precisao na indicacao de requisicao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA17',
  'Programa de Acompanhamento Prioritario de Processos e Operacoes - PAP: estudo de negocio e dos dados para implementacao de solucao de automatizacao na identificacao de novos andamentos em autos monitorados e de construcao do boletim STJ diario.',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA18',
  'Resultado de Julgamento: preenchimento do resultado da extracao da IA Generativa para mais de um crime e/ou reu na tabela para exibicao no card de IA do Gerenciador Judicial',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA19',
  'Piloto Representacoes Fiscais Para Fins Penais: ampliacao dos gabinetes participantes, tratamento de declinio de atribuicao e pesquisa no Sistema Unico das NFs identificadas como antecedentes',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA20',
  'Gerenciador "Analise da IA" - PRRs: especificar a solucao e implantar nas PRRs 1 e',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-IA21',
  'Automacao do envio de e-mail para servidores e membros sobre a publicacao em midias oficiais (DMPFe, DOU, BSMPU): Implantacao na PGR, acompanhamento e ajustes do servico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00152410/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=147263490',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF12',
  'Reconstruir as informacoes de documentos no BI para que se adeque corretamente ao tramite digital de expedientes - ETL e Mapeamento',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00106316/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=146325029',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF13',
  'Disponibilizar, nos dados do BI, as informacoes dos oficios do MPF - situacao atual e historico - ETL e Mapeamento',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00106290/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/146324552',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF14',
  'Disponibilizar, nos dados do BI, as informacoes de complementares dos autos judiciais, inqueritos e procedimentos - Modelo de dados, ETL e Mapeamento.',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00106328/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/146325253',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF15',
  'Disponibilizar, nos dados do BI, as informacoes de fundamentacoes juridicas dos autos judiciais, inqueritos e procedimentos - Homologacao',
  'TIAGO CESAR MORONTE',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00127660/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/146777222',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF16',
  'Disponibilizar, nos dados do BI, os dados sobre informacao complementar dos autos judiciais, inqueritos e procedimentos - Homologacao',
  'TIAGO CESAR MORONTE',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00128083/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/146785317',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-NF17',
  'Disponibilizar, nos dados do BI, o tempo de permanencia dos processos/inqueritos e de procedimentos remanescentes, integrado ao fluxo processual - Homologacao',
  'TIAGO CESAR MORONTE',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00128234/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/146788456',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF16',
  'Realizar ajustes e melhorias nos servicos basicos de rede internos (DHCP e DNS) para permitir o provisionamento automatico de novas maquinas virtuais de Kubernetes na infraestrutura local atual (on-premises)',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF17',
  'Configurar servico de DNS em nuvem para receber replica dos registros de DNS existentes no MPF, o que vai permitir seu uso como alternativa para as publicacoes de enderecos internos e externos pela infraestrutura da nuvem',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF18',
  'Criar um modelo de maquina virtual otimizado para permitir o provisionamento automatico de novos componentes de clusters Kubernetes na infraestrutura local atual (on-premises).',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF19',
  'Integrar a ferramenta de gerencia dos clusters Kubernetes (Rancher) a ferramenta de gerencia da plataforma de virtualizacao (vCenter) para permitir provisionamento de novos clusters e escalonamento facilitado dos clusters atuais.',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF20',
  'Replicar o processo de automacao a ser realizado on-premises para o provisionamento e escalonamento automatizado de novos componentes de clusters Kubernetes na infraestrutura de nuvem (EKS), considerando as diferentes arquiteturas.',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-INF21',
  'Definir e implantar controles de utilizacao dos recursos em nuvem para os ambientes EKS de forma a otimizar os custos dos servicos.',
  'EDSON MACIEL MARQUES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158380/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147397536',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD23',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00157986/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147389517',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD24',
  'Evolucao e ajustes das estruturas das bases de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00157986/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147389517',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD25',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD26',
  'Analise da viabilidade tecnica para implementacao de protecao da apresentacao de dados sensiveis',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD27',
  'Analise da viabilidade tecnica para implementacao de mascaramento de dados sensiveis no banco de dados',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD28',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD29',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD30',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD31',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-BD32',
  'Avaliacao de alternativas para melhoria do desempenho das consultas ao banco de dados do Unico, sob demanda',
  'ANDREIA CRISTINE HONDA',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00158204/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147393923',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-MEL82',
  'Webinar para apresentacao de funcionalidades relevantes do sistema Unico',
  'CAMILA GUIMARAES',
  '2025-01-24',
  '2025-04-24',
  100,
  'PGR-00157275/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147374845',
  'c33aab71-fc81-44d3-8f66-02020f5518e2'::uuid,
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
  '3E-MEL83',
  'V4.16 - Desenvolvimento de nova modelagem na infraestrutura a partir do novos conceitos de dados do Sigilo do sistema Unico',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL84',
  'V4.16 - Preparacao para descontinuidade do ATENA: incremento nos novos gerenciadores das acoes em Envelope',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL85',
  'V4.16 - Preparacao para descontinuidade do SOLR: Ajustes de performance e acessibilidade nos novos Gerenciadores para substituicao e descontinuidade do SOLR nos gerenciadores',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL86',
  'V4.16 - Adaptacoes nos novos gerenciadores de procedimentos e documentos sem a utilizacao da ferramenta Solr, conforme feedback dos usuarios (MVP na 4.15)',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL87',
  'V4.16 - Preparacao para nuvem: implementar nova infraestrutura de aplicacoes em Kubernetes com Tomcat',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-INT04',
  'V4.16 - Pauta de julgamento: Expandir a integracao do Processo Eletronico do Sistema Unico, utilizando a API REST ja desenvolvida para a inclusao automatizada das pautas de julgamento importadas do STF, para possibilitar sua utilizacao com os demais tribunais',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-INT05',
  'V4.16 - Domicilio Judicial Eletronico: Integracao com a nova metodologia de envio de avisos de comunicacao do CNJ',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-BD33',
  'Avaliacao, ajuste e execucao das modificacoes de objetos de banco de dados solicitadas pela versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-02-04',
  '2025-06-11',
  100,
  'PGR-00299258/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/150401432',
  '0476a4c4-09f2-4d3d-b1d2-49c905f2e025'::uuid,
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
  '3E-MEL88',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'NATALIA REZENDE JORDAO DANCZURA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00253200/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/149428875',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL90',
  'Revisao da tabela de motivos de finalizacao dos autos judiciais/IPL',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213448/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148609163',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL91',
  'Webinar: Gestao de acessos descentralizada via SNP e PGO',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00212527/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148579701',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL92',
  '9ª Pesquisa do Sistema Unico: analise qualitativa das respostas comentadas',
  'EDUARDO HYPOLITO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00214092/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148624683',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL93',
  'Ambiente de informacoes finalisticas: revisao e ampliacao de conteudo',
  'DENNIS FREIRE VASQUES MARTINS',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00244403/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/149224215',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL94',
  'Proposta de fluxo das atividades do GAECO para fins de afericao de produtividade',
  'CECILIA DA SILVA BORGES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00212510/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148579491',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL95',
  'Atualizacao dos filtros e funcionalidades do campo de pesquisa do Portal da Transparencia, conforme modelo adotado pelo STF',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213830/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=148618268',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL96',
  'Providencias Administrativas - Mapeamento de fluxo de Capacitacao',
  'JOSE ADILSON DE SOUZA DIAS',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00154910/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147326633',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL97',
  'Levantamento, analise e adequacao de respostas automaticas do sistema cidadao e protocolo eletronico',
  'GABRIEL DE MENESES BATISTA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00210059/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/148527033',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL98',
  'Requisitos de gestao arquivistica no Unico para implementacao do Repositorio Digital (RDC-Arq): regras e requisitos para automatizacao do Termo de Avaliacao e Destinacao de Documentos (TADA).',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00203248/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148379553',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '0Revisar e atualizar Informativos de cadastro de Resultados afetados pela publicacao da Portaria CMPF nº 13, de 14 de marco de 2025, assim como material disponivel na FAQ',
  'LIVIA SOUZA PEIXOTO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00194256/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148619644',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '1Manualizacao: Migrar manual de versoes do Unico da WikiMPF para Google Sites',
  'MAX LEONARDO DOMINGOS LOPES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00162216/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/147482360',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '2Validacao dos resultados dos extrajudiciais',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00184484/2025',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/index.html#/147922704',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '3Saneamento do acervo de envelopes nao finalizados',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00213736/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148616001',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA22',
  'ApoIA (Piloto Representacoes Fiscais para Fins Penais): Implementacao de novas funcionalidades no gerenciador e categorizacao dos textos',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA23',
  'Sistema SUBJUR: analise da viabilidade de selecao de trechos relevantes das publicacoes e outros ajustes para melhorar a precisao da requisicao',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA24',
  'Programa de Acompanhamento Prioritario de Processos e Operacoes - PAP: analise e validacao dos requisitos e proposta de cronograma para a implementacao da solucao de IA e/ou RPA',
  'RENATA CAVALCANTE SCUTTI',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA25',
  'Gerenciador ""Analise da IA"" - PRRs: extensao da solucao para as PRRs 2, 3, 5 e 6',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00224817/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148828479',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-IA26',
  'Automacao do envio de e-mail para servidores e membros sobre a publicacao em midias oficiais (DMPFe, DOU, BSMPU): Melhorias no servico na PGR e implementacao nas demais unidades do MPF',
  'ALINE CORREIA GUIMARAES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00204047/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148673369',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF18',
  'Especificar os dados de BI referentes a resultados de julgamento - Modelo de banco de dados',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00219728/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148734546',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF20',
  'Elaborar documentacao do MPF em Numeros, segundo nova estrategia de inventario de paineis de BI do MPF',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00222195/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148779826',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF21',
  'Criar solucao automatizada para o calculo e acompanhamento da atuacao extraordinaria dos membros.',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00222221/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148780433',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF22',
  'Especificar os dados de BI referentes a resultados de julgamento.',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00222240/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148780982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF23',
  'Disponibilizar, nos dados do BI, as informacoes dos oficios do MPF - situacao atual e historico - Homologacao',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00222257/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148781307',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-NF19',
  'Reconstruir as informacoes de documentos no BI para que se adeque corretamente ao tramite digital de expedientes - Homologacao.',
  'TIAGO CESAR MORONTE',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00222266/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148781612',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-INF22',
  'Reavaliar alternativas para um balanceamento de aplicacoes no cenario multi-cluster (Application Load Balancer) para que se possa implementar uma solucao que distribua o trafego de forma rapida, eficiente e dinamica entre os ambientes do sistema Unico existentes on-premises ou nuvem.',
  'EDSON MACIEL MARQUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-INF23',
  'Implementar ferramenta de observabilidade para monitoramento dos clusters Kubernetes, avaliar oportunidades de otimizacao da aplicacao nos novos ambientes Kubernetes e otimizar conforme necessario.',
  'EDSON MACIEL MARQUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-INF24',
  'Migrar todos os ambientes do sistema Unico para os ambientes Kubernetes de forma gradual e definitiva, mantendo a capacidade temporaria de retornar ao ambiente de execucao anterior para eventual estabilizacao, se necessario.',
  'EDSON MACIEL MARQUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-INF25',
  'Elaborar documentacao para as equipes envolvidas na operacao do sistema Unico nos ambientes Kubernetes.',
  'EDSON MACIEL MARQUES',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD34',
  'Inventario dos privilegios de acessos as bases de dados do Sistema Unico - Revogacao dos privilegios de acordo com relatorio e alinhamento com a SUBSC',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226477/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148876368',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD35',
  'Evolucao da seguranca dos bancos de dados do Sistema Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD36',
  'Analise da viabilidade tecnica para implementacao de protecao da apresentacao de dados sensiveis',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD37',
  'Analise da viabilidade tecnica para implementacao de mascaramento de dados sensiveis no banco de dados',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD38',
  'Atualizacoes dos softwares de banco de dados para correcao de vulnerabilidades e de problemas identificados pelo fabricante',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD39',
  'Monitoramento da disponibilidade dos servicos de bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD40',
  'Monitoramento do desempenho dos bancos de dados do ambiente do Unico',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD41',
  'Acoes para mitigar os problemas identificados nas atividades de monitoramento',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD42',
  'Avaliacao de alternativas para melhoria do desempenho das consultas ao banco de dados do Unico, sob demanda',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226689/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148883982',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD43',
  'Suportar as atividades tecnicas de evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226477/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148876368',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-BD44',
  'Evolucao da estrutura dos bancos de dados do Sistema Unico para a versao corrente',
  'ANDREIA CRISTINE HONDA',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00226477/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148876368',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL99',
  'Publicidade do backlog por meio da ferramenta de gestao interna para acompanhamento e tomada de decisao estrategica',
  'LIVIA SOUZA PEIXOTO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00196779/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/148614579',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '3E-MEL10',
  '4Revisao e saneamento do tipos de registros de procedencia vinculados ao BACEN, na tabela de Orgao Publico.',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-04-25',
  '2025-06-11',
  100,
  'PGR-00212762/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documento/visualizador/VisualizadorIntegraConsolidadaView.html#?documento=148584443',
  '44be1bd8-5f90-4188-9ce9-3a9d759846ea'::uuid,
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
  '4E-MEL01',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'NATALIA REZENDE JORDAO DANCZURA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00386719/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152243678',
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
  '4E-MEL03',
  'Revisao das correlacoes entre movimentos do Unico com o PJe Eleitoral',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00367257/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151790896',
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
  '4E-MEL04',
  'Padronizacao das correlacoes entre movimentos do Unico com os sistemas da Justica - Proposta de Informativo para 2ª, 3ª, 4ª, 5ª e 6ª Regioes',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00355977/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151530255',
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
  '4E-MEL05',
  'Webinar - Como preparar PDFs e Videos para envio a Justica: Ferramentas de Separacao, Mesclagem e Degravacao',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00367962/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151808380',
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
  '4E-MEL06',
  'Ambientacao no Sistema Unico: Proposta de curso Teleprencial para Novos Servidores do MPF',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00379103/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152077391',
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
  '4E-MEL07',
  '10ª Pesquisa do Sistema Unico: comunicar, disponibilizar, processar, analisar e publicar resultados',
  'EDUARDO HYPOLITO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00378518/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152057585',
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
  '4E-MEL08',
  'Site de informacoes finalisticas: curadoria da documentacao',
  'DENNIS FREIRE VASQUES MARTINS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00382176/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152131643',
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
  '4E-MEL09',
  'Proposta de reestruturacao do cadastro de oficios no sistema Unico',
  'CECILIA DA SILVA BORGES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00358060/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151580853',
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
  '4E-MEL10',
  'Portal da Transparencia: Adequacao as novas regras negociais de sigilo do sistema Unico e indexacao do campo resumo para os tipos documentais mapeados',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00375678/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/152004402',
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
  '4E-MEL12',
  'Promover o saneamento das Tabelas Unificadas do sistema Unico, comatualizacao de descricoes, hierarquias e itens conforme as TabelasUnificadas do SGT/CNMP',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00359363/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151603019',
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
  '4E-MEL13',
  'Executar o mapeamento e o saneamento dos acessos referentes ao perfil: “Usuario Colaborador Externo” no sistema Unico',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00372543/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151920792',
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
  '4E-MEL14',
  'Providencias Administrativas - mapeamento de fluxo de trabalho da area de regime previdenciario/SGP',
  'JOSE ADILSON DE SOUZA DIAS',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328942/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/cadastro/integra/#/150937612',
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
  '4E-MEL15',
  'Estudos para implementacao de IA no Sistema Cidadao',
  'GABRIEL DE MENESES BATISTA',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00325973/2025',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/150862149',
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
  '4E-MEL16',
  'Avaliacao e destinacao de documentos arquivisticos no Unico: analise de requisitos para gestao dos documentos avulsos (administrativos)',
  'KONRAD AUGUSTO DE ALVARENGA AMARAL',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00359508/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151607121',
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
  '4E-MEL17',
  'Acompanhar e orientar os lancamentos de resultados de julgamentos e acordos pela 1ª e 2ª instancias com novos parametros para as correicoes ordinarias em 202',
  'LIVIA SOUZA PEIXOTO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328107/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151694572',
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
  '4E-MEL18',
  'Revisar e atualizar Manuais de cadastro de Resultados afetados pela publicacao da Portaria CMPF nº13, de 14 de marco de 202',
  'LIVIA SOUZA PEIXOTO',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00328107/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151694572',
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
  '4E-MEL19',
  'Validacao da titularidade de Autos Judiciais no Controle de Acervo',
  'TIAGO CESAR MORONTE',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00362508/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/151674372',
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