-- Perfis: basico | gestor | admin
alter table public.integrantes
  add column if not exists perfil text not null default 'basico';

alter table public.integrantes
  drop constraint if exists integrantes_perfil_check;

alter table public.integrantes
  add constraint integrantes_perfil_check check (perfil in ('basico', 'gestor', 'admin'));

comment on column public.integrantes.perfil is 'basico: consulta; gestor: + atividades/integrantes; admin: + orçamento e gestão de senhas';

update public.integrantes
set perfil = 'admin'
where lower(btrim(email)) = 'alexandredamasceno@mpf.mp.br';
