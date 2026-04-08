-- Execute no SQL Editor do Supabase se a tabela atividades já existir sem estas colunas.
alter table public.atividades add column if not exists etiqueta_relatorio text;
alter table public.atividades add column if not exists link_relatorio text;
