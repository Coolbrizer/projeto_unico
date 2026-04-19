BEGIN;

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

COMMIT;