-- Total executado por mês, vinculado ao período orçamentário (não à instrução de serviço).
create table if not exists public.orcamento_execucao_mensal (
  id uuid primary key default gen_random_uuid(),
  periodo_id text not null,
  ano smallint not null,
  mes smallint not null check (mes between 1 and 12),
  valor_executado numeric(14, 2) not null check (valor_executado >= 0),
  updated_at timestamptz not null default now(),
  unique (periodo_id, ano, mes)
);

alter table public.orcamento_execucao_mensal enable row level security;

drop policy if exists orcamento_execucao_mensal_select on public.orcamento_execucao_mensal;
create policy orcamento_execucao_mensal_select on public.orcamento_execucao_mensal
  for select to authenticated
  using (public.jwt_perfil() = 'admin');

drop policy if exists orcamento_execucao_mensal_insert on public.orcamento_execucao_mensal;
create policy orcamento_execucao_mensal_insert on public.orcamento_execucao_mensal
  for insert to authenticated
  with check (public.jwt_perfil() = 'admin');

drop policy if exists orcamento_execucao_mensal_update on public.orcamento_execucao_mensal;
create policy orcamento_execucao_mensal_update on public.orcamento_execucao_mensal
  for update to authenticated
  using (public.jwt_perfil() = 'admin')
  with check (public.jwt_perfil() = 'admin');

drop policy if exists orcamento_execucao_mensal_delete on public.orcamento_execucao_mensal;
create policy orcamento_execucao_mensal_delete on public.orcamento_execucao_mensal
  for delete to authenticated
  using (public.jwt_perfil() = 'admin');
