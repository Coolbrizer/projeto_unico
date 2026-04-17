-- Tabela de auditoria para registrar alterações de dados sem impactar o fluxo principal.
create extension if not exists "pgcrypto";

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.integrantes(id) on delete set null,
  actor_email text,
  actor_role text,
  entity_table text not null,
  entity_id text,
  action text not null check (action in ('insert', 'update', 'delete', 'upsert', 'auth')),
  before_data jsonb,
  after_data jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_created_at_idx on public.audit_log (created_at desc);
create index if not exists audit_log_entity_idx on public.audit_log (entity_table, entity_id, created_at desc);
create index if not exists audit_log_actor_idx on public.audit_log (actor_id, created_at desc);

alter table public.audit_log enable row level security;
