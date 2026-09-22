-- Colaboradores: acesso ao sistema sem serem integrantes do projeto.
alter table public.integrantes
  add column if not exists vinculo text not null default 'integrante';

alter table public.integrantes
  drop constraint if exists integrantes_vinculo_check;

alter table public.integrantes
  add constraint integrantes_vinculo_check
  check (vinculo = any (array['integrante'::text, 'colaborador'::text]));

comment on column public.integrantes.vinculo is
  'integrante: membro do projeto (equipe/folha). colaborador: acesso ao sistema no perfil básico, sem integrar o projeto.';

-- Colaboradores não têm matrícula funcional.
alter table public.integrantes
  alter column matricula drop not null;

alter table public.integrantes
  drop constraint if exists integrantes_matricula_obrigatoria_check;

alter table public.integrantes
  add constraint integrantes_matricula_obrigatoria_check
  check (vinculo <> 'integrante' or matricula is not null);

grant select (vinculo) on public.integrantes to authenticated;
