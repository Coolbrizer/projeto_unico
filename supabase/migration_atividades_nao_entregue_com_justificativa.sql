-- Atividade não entregue, mas com justificativa (situação considerada normal).
alter table public.atividades
  add column if not exists nao_entregue_com_justificativa boolean not null default false;

comment on column public.atividades.nao_entregue_com_justificativa is
  'Atividade não entregue, mas com justificativa registrada; a situação é considerada normal.';

-- 5E-INF17: não executada, com registro da solicitação de cancelamento e sem pagamento.
update public.atividades
set nao_entregue_com_justificativa = true
where btrim(codigo) = '5E-INF17';
