-- Plano de Atividades associado a cada atividade.
alter table public.atividades
  add column if not exists plano_atividades smallint;

do $$
begin
  alter table public.atividades
    add constraint atividades_plano_atividades_check
    check (plano_atividades is null or plano_atividades >= 1);
exception
  when duplicate_object then null;
end $$;

update public.atividades
set plano_atividades = 1
where plano_atividades is null
  and btrim(codigo) ~* '^5E-';

comment on column public.atividades.plano_atividades is
  'Número do Plano de Atividades ao qual a atividade pertence.';
