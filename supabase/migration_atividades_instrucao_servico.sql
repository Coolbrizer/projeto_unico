-- Liga atividades a um documento do tipo Instrução de Serviço (tabela public.documentos).
-- Execute no SQL Editor do Supabase se a coluna ainda não existir.
alter table public.atividades
  add column if not exists instrucao_servico uuid references public.documentos (id) on delete set null;

comment on column public.atividades.instrucao_servico is
  'Id do documento (Instrução de Serviço) para filtro e Prestação de Contas.';
