-- Integrantes sem vínculo com folha/remuneração (sem impacto no orçamento).
alter table public.integrantes
  add column if not exists nao_remunerado boolean not null default false;

comment on column public.integrantes.nao_remunerado is
  'Se true: integrante não entra nos cálculos de folha/ref_pgto (orçamento).';

-- Privilégio de leitura na nova coluna (SELECT por coluna em integrantes).
GRANT SELECT (nao_remunerado) ON public.integrantes TO authenticated;
