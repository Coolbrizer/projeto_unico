-- Período oficial da instrução, vínculo do responsável e travas de consistência.

alter table public.documentos
  add column if not exists periodo_inicio date,
  add column if not exists periodo_fim date;

update public.documentos d
set
  periodo_inicio = r.periodo_inicio,
  periodo_fim = r.periodo_fim
from public.atividades_resumo_por_documento r
where r.instrucao_servico = d.id
  and d.periodo_inicio is null
  and d.periodo_fim is null
  and r.periodo_inicio is not null
  and r.periodo_fim is not null;

alter table public.documentos
  drop constraint if exists documentos_periodo_ordem_check;
alter table public.documentos
  add constraint documentos_periodo_ordem_check
  check (
    periodo_inicio is null
    or periodo_fim is null
    or periodo_inicio <= periodo_fim
  );

create unique index if not exists documentos_tipo_numero_ano_uniq
  on public.documentos (tipo, numero, ano)
  where tipo is not null and numero is not null and ano is not null;

alter table public.atividades
  drop constraint if exists atividades_periodo_ordem_check;
alter table public.atividades
  add constraint atividades_periodo_ordem_check
  check (inicio is null or fim is null or inicio <= fim);

alter table public.atividades
  add column if not exists responsavel_id uuid references public.integrantes (id) on delete set null;

create index if not exists atividades_responsavel_id_idx
  on public.atividades (responsavel_id);

-- Liga o responsável quando o nome depois da matrícula coincide com um único integrante.
update public.atividades a
set responsavel_id = m.integrante_id
from (
  select n.atividade_id, min(i.id::text)::uuid as integrante_id
  from (
    select
      id as atividade_id,
      upper(btrim(regexp_replace(responsavel, '^.*\|', ''))) as nome
    from public.atividades
    where responsavel is not null and btrim(responsavel) <> ''
  ) n
  join public.integrantes i
    on upper(btrim(i.nome)) = n.nome
   and n.nome <> ''
  group by n.atividade_id
  having count(*) = 1
) m
where a.id = m.atividade_id
  and a.responsavel_id is null;
