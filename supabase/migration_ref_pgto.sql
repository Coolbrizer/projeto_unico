-- Execute no SQL Editor do Supabase se o projeto já existir sem esta tabela.
create table if not exists public.ref_pgto (
  id uuid primary key default gen_random_uuid(),
  cargo text not null default '',
  classe_padrao text not null default '',
  valor_mensal numeric(14, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ref_pgto enable row level security;

drop policy if exists "ref_pgto_anon_all" on public.ref_pgto;
create policy "ref_pgto_anon_all" on public.ref_pgto for all using (true) with check (true);
