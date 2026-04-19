BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '1E-MEL51',
  'Definicao dos requisitos e acompanhamento da implementacao das melhorias propostas para a tabela Orgao de governo - Etapa',
  'CECILIA DA SILVA BORGES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00105775/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126380293',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL52',
  'Proposta de estruturacao da base de conhecimento da Sejud - Etapa',
  'CECILIA DA SILVA BORGES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00078019/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125831984',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL53',
  'Saneamento, registro e catalogacao das demandas de melhorias do sistema Unico, de acordo com os criterios de priorizacao, conforme Portaria PGR/MPF nº 590, de 24 de setembro de 2021 - Etapa',
  'LIVIA SOUZA PEIXOTO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00108018/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126415684',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL54',
  'Normatizacao de papeis e perfis: etapa 3. Implantacao dos perfis nacionais nas Unidades',
  'GLEIDSON MOREIRA FERNANDES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00085799/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125985445',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL55',
  'Providencias administrativas - Etapa 3: Criacao de providencias relacionadas a area de contratacao.',
  'GABRIEL DE MENESES BATISTA',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00084652/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125958473',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL56',
  'Saneamento - Revisao da vinculacao de assunto/tema a grupo tematico/CCR - Etapa',
  'CECILIA DA SILVA BORGES',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00080510/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125873648',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL57',
  '4ª Pesquisa do sistema Unico - analise do resultado e resposta aos participantes - Etapa',
  'EDUARDO HYPOLITO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00109150/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126443207',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL58',
  'Atendimento de SNP - Implementacao de catalogo de servico nacional - Etapa',
  'LIVIA SOUZA PEIXOTO',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00103258/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126324947',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL59',
  'Validacao do acervo de autos judiciais ativos no MPF (autuacoes nao baixadas), pela perspectiva do fluxo processual',
  'TIAGO CESAR MORONTE',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00094134/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126152563',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-MEL60',
  'Levantamento preliminar da situacao das distribuicoes de titular nos autos judiciais',
  'TIAGO CESAR MORONTE',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00100824/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/126273877',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-NF15',
  'Distribuicao Extrato: Homologacao',
  'DANILO LIMA MACIEL',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00073526/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125740950',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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
  '1E-NF16',
  'Manifestacao: Desenvolvimento do ETL(extracao, transformacao, carregamento dos dados oriundos do sistema Unico transacional para o banco do DW de acordo com as regras negociais definidas) e Criacao do DW(Criacao dos objetos no banco de dados do DW para que a carga possa ser armazenada e os objetos do MicroStrategy possam ser mapeados com base nos objetos do banco)',
  'DANILO LIMA MACIEL',
  '2023-01-09',
  '2023-03-17',
  100,
  'PGR-00085944/2023',
  'https://portal.mpf.mp.br/unico/modulo/documento/painel/#/125988034',
  'e1735f3d-9e67-40eb-9071-40ede68c4785'::uuid,
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

COMMIT;