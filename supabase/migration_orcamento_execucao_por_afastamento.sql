-- Distingue o executado calculado pelos afastamentos do valor informado manualmente.
alter table public.orcamento_execucao_mensal
  add column if not exists por_afastamento boolean not null default false;
