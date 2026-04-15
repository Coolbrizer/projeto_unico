-- Tabela para guardar etiqueta e link de relatório por código de atividade.
create table if not exists public.etiqueta_relatorio (
  codigo text primary key,
  etiqueta text,
  link text
);

-- Migra dados antigos de atividades (se as colunas ainda existirem).
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'atividades'
      and column_name = 'etiqueta_relatorio'
  ) and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'atividades'
      and column_name = 'link_relatorio'
  ) then
    insert into public.etiqueta_relatorio (codigo, etiqueta, link)
    select
      btrim(codigo),
      nullif(btrim(etiqueta_relatorio), ''),
      nullif(btrim(link_relatorio), '')
    from public.atividades
    where btrim(codigo) <> ''
      and (nullif(btrim(etiqueta_relatorio), '') is not null or nullif(btrim(link_relatorio), '') is not null)
    on conflict (codigo) do update set
      etiqueta = excluded.etiqueta,
      link = excluded.link;
  end if;
end $$;
