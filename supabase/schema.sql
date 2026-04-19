-- =============================================================================
-- ESQUEMA BASE (referência para novo ambiente / reprodução).
--
-- O estado completo e atual da BD é composto por ESTE ficheiro +
-- as migrações incrementais em supabase/migration_*.sql e migration_auth_*.sql
-- (por ordem de execução). Em projetos já em produção, NÃO volte a aplicar
-- este script inteiro sem backup — use apenas migrações novas.
--
-- Senhas residem em auth.users (Supabase Auth); não existem colunas de senha em
-- public.integrantes (ver migration_auth_phase7_drop_legacy_columns.sql).
--
-- As políticas abaixo são "anon_all" permissivas; as políticas restringidas por
-- perfil estão em migration_auth_phase5_restrict_rls_main.sql.
-- =============================================================================

-- Execute no SQL Editor do Supabase.
-- ATENÇÃO: o bloco abaixo remove e recria atividades, equipe e integrantes (dados antigos serão perdidos).
-- Orçamento e Documentos são mantidos se já existirem.

create extension if not exists "pgcrypto";

-- Remove estrutura antiga (ajuste se precisar preservar dados: faça backup antes)
drop table if exists public.integrantes cascade;
drop table if exists public.equipe cascade;
drop table if exists public.atividades cascade;

-- Atividades: Código, Descrição, Responsável, Início, Final, relatório (tudo texto)
create table public.atividades (
  id uuid primary key default gen_random_uuid(),
  codigo text not null default '',
  descricao text,
  responsavel text,
  inicio text,
  fim text,
  progresso smallint not null default 0,
  etiqueta_relatorio text,
  link_relatorio text,
  created_at timestamptz not null default now()
);

-- Equipe: Código, Equipe (linhas duplicadas permitidas — sem restrição de unicidade)
create table public.equipe (
  id uuid primary key default gen_random_uuid(),
  codigo text not null default '',
  equipe text not null default '',
  created_at timestamptz not null default now()
);

-- Integrantes: vínculo opcional 1:1 com auth.users; autenticação via Supabase Auth.
create table public.integrantes (
  id uuid primary key default gen_random_uuid(),
  matricula bigint not null,
  nome text not null,
  setor text,
  cargo text,
  classe_padrao text,
  email text,
  auth_user_id uuid unique references auth.users (id) on delete set null,
  perfil text not null default 'basico' check (perfil in ('basico', 'gestor', 'admin')),
  created_at timestamptz not null default now()
);

create unique index if not exists integrantes_email_lower_uniq
  on public.integrantes (lower(btrim(email)))
  where email is not null and btrim(email) <> '';

-- Orçamento e Documentos (criação idempotente se ainda não existirem)
create table if not exists public.orcamento (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  descricao text,
  valor_previsto numeric(14, 2) not null default 0,
  valor_real numeric(14, 2),
  periodo text,
  created_at timestamptz not null default now()
);

create table if not exists public.documentos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  tipo text,
  numero text,
  ano text,
  etiqueta text,
  link text,
  observacoes text,
  created_at timestamptz not null default now()
);

-- Referência de pagamento: valor mensal por combinação cargo + classe/padrão (para cálculo de folha)
create table if not exists public.ref_pgto (
  id uuid primary key default gen_random_uuid(),
  cargo text not null default '',
  classe_padrao text not null default '',
  valor_mensal numeric(14, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.atividades enable row level security;
alter table public.equipe enable row level security;
alter table public.integrantes enable row level security;
alter table public.orcamento enable row level security;
alter table public.documentos enable row level security;
alter table public.ref_pgto enable row level security;

drop policy if exists "atividades_anon_all" on public.atividades;
drop policy if exists "equipe_anon_all" on public.equipe;
drop policy if exists "integrantes_anon_all" on public.integrantes;
drop policy if exists "orcamento_anon_all" on public.orcamento;
drop policy if exists "documentos_anon_all" on public.documentos;

create policy "atividades_anon_all" on public.atividades for all using (true) with check (true);
create policy "equipe_anon_all" on public.equipe for all using (true) with check (true);
create policy "integrantes_anon_all" on public.integrantes for all using (true) with check (true);
create policy "orcamento_anon_all" on public.orcamento for all using (true) with check (true);
create policy "documentos_anon_all" on public.documentos for all using (true) with check (true);
drop policy if exists "ref_pgto_anon_all" on public.ref_pgto;
create policy "ref_pgto_anon_all" on public.ref_pgto for all using (true) with check (true);
