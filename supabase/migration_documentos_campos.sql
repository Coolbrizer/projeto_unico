-- Campos adicionais para a tela de Documentos (tipo selecionável, número, ano, etiqueta).
alter table public.documentos add column if not exists numero text;
alter table public.documentos add column if not exists ano text;
alter table public.documentos add column if not exists etiqueta text;
