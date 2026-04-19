BEGIN;

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-IA05',
  'Solucao automatizada para acompanhamento de processos prioritarios do STJ: desenvolvimento do primeiro subproduto - "Modulo de Processos"',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA06',
  'CorregedorIA: Desenvolvimento de solucao de Inteligencia Artificial aplicada aos Paineis de BI da CMPF na analise das manifestacoes JEF/CL da correicao de 20',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA07',
  'Orquestrador IA: atualizacao tecnologica para Java 21, incluindo as bibliotecas dependentes e adequacao as novas regras negociais de sigilo implementadas no sistema Unico',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA08',
  'Orquestrador IA: diagnostico, prospeccao e planejamento para saneamento de debitos tecnicos dos servicos de IA',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-IA09',
  'Otimizacao do Fluxo Documental no Repositorio Institucional com a automatizacao de Metadados: Analise de Requisitos para Consulta de Dados',
  'SANDRA VERONICA ALVES RODRIGUES',
  '2025-06-12',
  '2025-09-17',
  100,
  'PGR-00354176/2025',
  'https://unico.mpf.mp.br/unico/unico-v2/app/modules/documentos/DocumentosView.html#/alterar/expedido/151502673',
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
  '4E-MEL25',
  'Planejar, monitorar, controlar e gerir o andamento das tarefas e entrega de resultados',
  'NATALIA REZENDE JORDAO DANCZURA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00029239/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155410770',
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
  '4E-MEL26',
  'Estudo para desenvolvimento de solucao de automacao para lancamentos de suspensao de conclusao no sistema Unico',
  'CECILIA DA SILVA BORGES',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00048200/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155793314',
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
  '4E-MEL27',
  'Precatorios FUNDEB - Informativo para Expedicao de Recomendacoes, Termo de Ajustamento de Conduta e Ajuizamento de Acao Civil Publica',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00055938/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155945518',
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
  '4E-MEL28',
  'Implementacao de autenticacao de acesso ao Portal da Transparencia, via gov.br, para consulta processual restrita',
  'ALEXANDRE CEZAR DAMASCENO',
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
  '4E-MEL29',
  'Estudo para padronizacao do cadastro de peticoes iniciais, com levantamento das limitacoes no peticionamento de iniciais via MNI em cada regiao judiciaria',
  'BRUNA PATRICIA DE SOUZA DA ROCHA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00050713/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/?continue#/155830668',
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
  '4E-MEL30',
  '10ª Pesquisa do Sistema Unico: analise qualitativa das respostas comentadas',
  'EDUARDO HYPOLITO',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00096053/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/156838901',
  '1911bd51-b129-4152-9652-67e275651093'::uuid,
  4,
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

INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  '4E-MEL44',
  'Estudos para atualizacao do manual de normas e procedimentos da Sala de Atendimento ao Cidadao',
  'GABRIEL DE MENESES BATISTA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00046229/2026',
  'https://unico-beta.mpf.mp.br/unico/modulo/documento/painel/#/155779290',
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
  '4E-MEL45',
  'Temporalidade de assuntos do CNMP: saneamento/atualizacao para procedimentos extrajudiciais e implementacao para documentos e PGEAS',
  'FERNANDA ROSA DE VASCONCELOS OLIVEIRA',
  '2025-09-18',
  '2026-02-10',
  100,
  'PGR-00026638/2026',
  'https://unico.mpf.mp.br/unico/modulo/documento/painel/#/155346767',
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