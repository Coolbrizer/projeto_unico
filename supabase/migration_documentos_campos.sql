-- Campos adicionais para a tela de Documentos (tipo selecionável, número, ano, etiqueta).
alter table public.documentos add column if not exists numero text;
alter table public.documentos add column if not exists ano text;
alter table public.documentos add column if not exists etiqueta text;

-- URL do documento (nome da coluna no Supabase: link). Migra de `url` legada, se existir.
alter table public.documentos add column if not exists link text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'documentos'
      and column_name = 'url'
  ) then
    update public.documentos
    set link = coalesce(link, url)
    where link is null and url is not null;
  end if;
end $$;
