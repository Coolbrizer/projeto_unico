-- Resumo por Instrução de Serviço: uma linha por documento, em vez de ler
-- todas as atividades no aplicativo para achar período e planos.
-- security_invoker: vale o RLS de public.atividades de quem consulta.

create or replace view public.atividades_resumo_por_documento
with (security_invoker = true) as
select
  instrucao_servico,
  min(inicio) filter (where inicio is not null and fim is not null) as periodo_inicio,
  max(fim) filter (where inicio is not null and fim is not null) as periodo_fim,
  coalesce(
    array_agg(distinct plano_atividades) filter (
      where plano_atividades is not null and plano_atividades >= 1
    ),
    '{}'::smallint[]
  ) as planos
from public.atividades
group by instrucao_servico;

comment on view public.atividades_resumo_por_documento is
  'Menor início, maior fim e planos distintos das atividades de cada Instrução de Serviço.';

revoke all on public.atividades_resumo_por_documento from public, anon;
grant select on public.atividades_resumo_por_documento to authenticated;
