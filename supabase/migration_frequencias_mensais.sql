-- Frequência mensal: dias de afastamento informados por integrante.
create table if not exists public.frequencias_mensais (
  id uuid primary key default gen_random_uuid(),
  integrante_id uuid not null references public.integrantes(id) on delete cascade,
  competencia date not null,
  dias_afastamento integer not null default 0 check (dias_afastamento >= 0 and dias_afastamento <= 31),
  informado_por uuid references public.integrantes(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint frequencias_mensais_competencia_primeiro_dia
    check (competencia = date_trunc('month', competencia)::date),
  constraint frequencias_mensais_integrante_competencia_key
    unique (integrante_id, competencia)
);

create index if not exists frequencias_mensais_competencia_idx
  on public.frequencias_mensais (competencia);

create index if not exists frequencias_mensais_integrante_idx
  on public.frequencias_mensais (integrante_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists frequencias_mensais_set_updated_at on public.frequencias_mensais;
create trigger frequencias_mensais_set_updated_at
  before update on public.frequencias_mensais
  for each row execute function public.set_updated_at();

alter table public.frequencias_mensais enable row level security;

drop policy if exists frequencias_mensais_select on public.frequencias_mensais;
create policy frequencias_mensais_select on public.frequencias_mensais
  for select to authenticated
  using (
    public.jwt_perfil() in ('gestor', 'admin')
    or integrante_id = nullif(auth.jwt() -> 'app_metadata' ->> 'integrante_id', '')::uuid
  );

drop policy if exists frequencias_mensais_insert on public.frequencias_mensais;
create policy frequencias_mensais_insert on public.frequencias_mensais
  for insert to authenticated
  with check (
    public.jwt_perfil() in ('gestor', 'admin')
    or integrante_id = nullif(auth.jwt() -> 'app_metadata' ->> 'integrante_id', '')::uuid
  );

drop policy if exists frequencias_mensais_update on public.frequencias_mensais;
create policy frequencias_mensais_update on public.frequencias_mensais
  for update to authenticated
  using (
    public.jwt_perfil() in ('gestor', 'admin')
    or integrante_id = nullif(auth.jwt() -> 'app_metadata' ->> 'integrante_id', '')::uuid
  )
  with check (
    public.jwt_perfil() in ('gestor', 'admin')
    or integrante_id = nullif(auth.jwt() -> 'app_metadata' ->> 'integrante_id', '')::uuid
  );
