-- Tabela para guardar etiqueta e link de relatório por código de atividade.
create table if not exists public.etiqueta_relatorio (
  codigo text primary key,
  etiqueta text,
  link text,
  progresso smallint not null default 0,
  constraint etiqueta_relatorio_progresso_0_100 check (progresso between 0 and 100),
  constraint etiqueta_relatorio_progresso_dez_dez check (progresso % 10 = 0)
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
    insert into public.etiqueta_relatorio (codigo, etiqueta, link, progresso)
    select
      btrim(codigo),
      nullif(btrim(etiqueta_relatorio), ''),
      nullif(btrim(link_relatorio), ''),
      least(100, greatest(0, round(coalesce(progresso, 0)::numeric / 10) * 10))::smallint
    from public.atividades
    where btrim(codigo) <> ''
      and (
        nullif(btrim(etiqueta_relatorio), '') is not null
        or nullif(btrim(link_relatorio), '') is not null
        or coalesce(progresso, 0) <> 0
      )
    on conflict (codigo) do update set
      etiqueta = excluded.etiqueta,
      link = excluded.link,
      progresso = excluded.progresso;
  end if;
end $$;

-- Caso a tabela já exista sem a coluna progresso.
alter table public.etiqueta_relatorio
  add column if not exists progresso smallint not null default 0;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'etiqueta_relatorio_progresso_0_100'
  ) then
    alter table public.etiqueta_relatorio
      add constraint etiqueta_relatorio_progresso_0_100 check (progresso between 0 and 100);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'etiqueta_relatorio_progresso_dez_dez'
  ) then
    alter table public.etiqueta_relatorio
      add constraint etiqueta_relatorio_progresso_dez_dez check (progresso % 10 = 0);
  end if;
end $$;
