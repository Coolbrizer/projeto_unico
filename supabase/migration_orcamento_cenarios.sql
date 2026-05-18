-- Cenários de estimativa (ref_pgto × meses × pessoas) na tela Orçamento.
create table if not exists public.orcamento_cenarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  linhas jsonb not null default '[]'::jsonb,
  total_pessoas integer not null default 0 check (total_pessoas >= 0),
  total_valor numeric(14, 2) not null default 0 check (total_valor >= 0),
  criado_por uuid references public.integrantes(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists orcamento_cenarios_created_at_idx
  on public.orcamento_cenarios (created_at desc);

alter table public.orcamento_cenarios enable row level security;

drop policy if exists orcamento_cenarios_select on public.orcamento_cenarios;
create policy orcamento_cenarios_select on public.orcamento_cenarios
  for select to authenticated using (true);

drop policy if exists orcamento_cenarios_insert on public.orcamento_cenarios;
create policy orcamento_cenarios_insert on public.orcamento_cenarios
  for insert to authenticated with check (true);

drop policy if exists orcamento_cenarios_delete on public.orcamento_cenarios;
create policy orcamento_cenarios_delete on public.orcamento_cenarios
  for delete to authenticated using (true);
