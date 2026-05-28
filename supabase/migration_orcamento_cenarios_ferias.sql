-- Cenários de férias por integrante (tela Orçamento → detalhe por integrante).
create table if not exists public.orcamento_cenarios_ferias (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  data_inicio date not null,
  data_fim date not null,
  linhas jsonb not null default '[]'::jsonb,
  total_economia numeric(14, 2) not null default 0 check (total_economia >= 0),
  economia_sejud numeric(14, 2) not null default 0 check (economia_sejud >= 0),
  economia_stic numeric(14, 2) not null default 0 check (economia_stic >= 0),
  criado_por uuid references public.integrantes(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists orcamento_cenarios_ferias_created_at_idx
  on public.orcamento_cenarios_ferias (created_at desc);

alter table public.orcamento_cenarios_ferias enable row level security;

drop policy if exists orcamento_cenarios_ferias_select on public.orcamento_cenarios_ferias;
create policy orcamento_cenarios_ferias_select on public.orcamento_cenarios_ferias
  for select to authenticated using (true);

drop policy if exists orcamento_cenarios_ferias_insert on public.orcamento_cenarios_ferias;
create policy orcamento_cenarios_ferias_insert on public.orcamento_cenarios_ferias
  for insert to authenticated with check (true);

drop policy if exists orcamento_cenarios_ferias_delete on public.orcamento_cenarios_ferias;
create policy orcamento_cenarios_ferias_delete on public.orcamento_cenarios_ferias
  for delete to authenticated using (true);
