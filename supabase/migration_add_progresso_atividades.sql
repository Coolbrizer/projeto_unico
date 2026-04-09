-- Adiciona progresso (0–100) às atividades.
alter table public.atividades
  add column if not exists progresso smallint not null default 0;

-- Garante limite do campo no banco (evita valores inválidos)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'atividades_progresso_0_100'
  ) then
    alter table public.atividades
      add constraint atividades_progresso_0_100 check (progresso between 0 and 100);
  end if;
end $$;

