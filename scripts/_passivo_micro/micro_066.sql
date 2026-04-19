BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-MEL32',
  'Estudo para identificar campos no sistema Unico aptos a afericao de produtividade',
  'CECILIA DA SILVA BORGES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00048089/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155791735',
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
  '4E-MEL33',
  'Webinar - Apresentacao da funcionalidade de criacao de Portaria de substituicao diretamente no Unico via API do SISAM',
  'ALEXANDRE CEZAR DAMASCENO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00056958/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155964255',
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
  '4E-MEL34',
  'Direto ao Ponto - Elaborar trilha de conhecimento voltada para o modulo Extrajudicial - Servidores de Gabinete',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00046397/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155783602',
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
  '4E-MEL35',
  'Direto ao Ponto - Elaborar trilha de conhecimento voltada para o modulo Judicial - Servidores de Gabinete',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00076344/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156404442',
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
  '4E-MEL36',
  'Direto ao Ponto - Elaborar trilha de conhecimento voltada para o Modulo Administrativo',
  'GLEIDSON MOREIRA FERNANDES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00079643/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156460533',
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
  '4E-MEL37',
  'Webinar para apresentacao de funcionalidades relevantes do sistema Unico',
  'CAMILA GUIMARAES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00056213/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155951446',
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
  '4E-MEL38',
  'Padronizacao do fluxo do Termo de Ajustamento de Conduta celebrado no curso de acao judicial',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00056193/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155951020',
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
  '4E-MEL39',
  'Proposta e implementacao de Fluxo de Cadastramento de Entidades e afins - Portaria PGR/MPF nº 1.097/202',
  'LIVIA SOUZA PEIXOTO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00484485/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156216895',
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
  '4E-MEL40',
  'Acompanhar e orientar os lancamentos de resultados de julgamentos e acordos pela 1ª e 2ª instancias com novos parametros para as correicoes ordinarias em 202',
  'LIVIA SOUZA PEIXOTO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00481854/2025',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155481616',
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
  '4E-MEL41',
  'Estudo preliminar para a evolucao do Projeto Resultados a fim de abranger os resultados criminais dos Tribunais Superiores REsp (STJ) e RE (STF)',
  'LIVIA SOUZA PEIXOTO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00051077/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155891707',
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
  '4E-MEL42',
  'Tratamento de Expedientes ''A receber'' ou em Setores Indevidos',
  'TIAGO CESAR MORONTE',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00044727/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155753098',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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
  '4E-MEL43',
  'Providencias Administrativas - mapeamento de fluxo de trabalho de areas da Secretaria de Gestao de Pessoas para criacao e implementacao de providencias e respectivas tarefas',
  'JOSE ADILSON DE SOUZA DIAS',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00040950/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155688606',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
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

COMMIT;