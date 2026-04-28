"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { useMounted } from "@/hooks/useMounted";
import {
  DATA_ORCAMENTO_INICIO_ISO,
  despesaFolhaPeriodo,
  diasNoMes,
  totalDespesaMensalFolha,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Atividade, Integrante, Orcamento, RefPgto } from "@/types/database";

function formatMoney(n: number | null) {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function macroDoSetor(setor: string | null | undefined): string {
  const s = (setor ?? "").trim();
  if (!s) return "(sem setor)";
  const idx = s.indexOf("/");
  if (idx < 0) return s.toUpperCase();
  const macro = s.slice(idx + 1).trim();
  return (macro || "(sem setor)").toUpperCase();
}

function toISODateOnly(raw: string | null | undefined): string | null {
  const s = (raw ?? "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

function isoDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function OrcamentoPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const { instrucaoServicoId } = useInstrucaoServicoSelecionada();
  const podeExcluirLancamento = isAdmin(perfil);
  const [rows, setRows] = useState<Orcamento[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [refPgto, setRefPgto] = useState<RefPgto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [anoSelecionado, setAnoSelecionado] = useState(() =>
    Math.max(new Date().getFullYear(), 2026)
  );
  const [dataInicioPeriodo, setDataInicioPeriodo] = useState(DATA_ORCAMENTO_INICIO_ISO);
  const [dataFimPeriodo, setDataFimPeriodo] = useState("2026-12-31");
  const [periodoInstrucao, setPeriodoInstrucao] = useState<{ inicio: string; fim: string } | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/orcamento", { credentials: "include" });
    const data = (await res.json()) as {
      error?: string;
      orcamento?: Orcamento[];
      integrantes?: Integrante[];
      ref_pgto?: RefPgto[];
    };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar o orçamento.");
      setRows([]);
      setIntegrantes([]);
      setRefPgto([]);
    } else {
      setRows(data.orcamento ?? []);
      setIntegrantes(data.integrantes ?? []);
      setRefPgto(data.ref_pgto ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!instrucaoServicoId) {
      setPeriodoInstrucao(null);
      return;
    }

    let ativo = true;
    void (async () => {
      const res = await fetch(
        `/api/atividades?instrucaoServicoId=${encodeURIComponent(instrucaoServicoId)}`,
        { credentials: "include" }
      );
      const data = (await res.json()) as { atividades?: Atividade[] };
      if (!ativo || !res.ok) {
        setPeriodoInstrucao(null);
        return;
      }
      const atividades = data.atividades ?? [];
      const inicios = atividades.map((a) => toISODateOnly(a.inicio)).filter(Boolean) as string[];
      const fins = atividades.map((a) => toISODateOnly(a.fim)).filter(Boolean) as string[];
      if (inicios.length === 0 || fins.length === 0) {
        setPeriodoInstrucao(null);
        return;
      }
      inicios.sort();
      fins.sort();
      const inicio = inicios[0];
      const fim = fins[fins.length - 1];
      if (!inicio || !fim || inicio > fim) {
        setPeriodoInstrucao(null);
        return;
      }
      setPeriodoInstrucao({ inicio, fim });
    })();
    return () => {
      ativo = false;
    };
  }, [instrucaoServicoId]);

  useEffect(() => {
    if (!periodoInstrucao) return;
    setDataInicioPeriodo(periodoInstrucao.inicio);
    setDataFimPeriodo(periodoInstrucao.fim);
    setAnoSelecionado(Number(periodoInstrucao.inicio.slice(0, 4)));
  }, [periodoInstrucao]);

  const limiteInicioPeriodo = useMemo(() => {
    if (periodoInstrucao) return periodoInstrucao.inicio;
    return DATA_ORCAMENTO_INICIO_ISO;
  }, [periodoInstrucao]);

  const limiteFimPeriodo = useMemo(() => {
    if (!periodoInstrucao) return "";
    return periodoInstrucao.fim;
  }, [periodoInstrucao, limiteInicioPeriodo]);

  const minDataFimPeriodo =
    dataInicioPeriodo > limiteInicioPeriodo ? dataInicioPeriodo : limiteInicioPeriodo;

  useEffect(() => {
    if (dataInicioPeriodo < limiteInicioPeriodo) {
      setDataInicioPeriodo(limiteInicioPeriodo);
      return;
    }
    if (limiteFimPeriodo && dataInicioPeriodo > limiteFimPeriodo) {
      setDataInicioPeriodo(limiteFimPeriodo);
      return;
    }
    if (dataFimPeriodo < minDataFimPeriodo) {
      setDataFimPeriodo(minDataFimPeriodo);
      return;
    }
    if (limiteFimPeriodo && dataFimPeriodo > limiteFimPeriodo) {
      setDataFimPeriodo(limiteFimPeriodo);
    }
  }, [
    dataFimPeriodo,
    dataInicioPeriodo,
    limiteFimPeriodo,
    limiteInicioPeriodo,
    minDataFimPeriodo,
  ]);

  const folha = useMemo(
    () => totalDespesaMensalFolha(integrantes, refPgto),
    [integrantes, refPgto]
  );

  const refPorCargo = useMemo(() => {
    const map = new Map<string, RefPgto[]>();
    for (const r of refPgto) {
      const key = (r.cargo ?? "").trim() || "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) =>
        (a.classe_padrao ?? "").localeCompare(b.classe_padrao ?? "", "pt-BR", { numeric: true })
      );
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  }, [refPgto]);

  const folhaPorMesAno = useMemo(() => {
    let totalAno = 0;
    const meses = Array.from({ length: 12 }, (_, idx) => {
      const mes = idx + 1;
      const dim = diasNoMes(anoSelecionado, mes);
      const inicioMes = isoDate(anoSelecionado, mes, 1);
      const fimMes = isoDate(anoSelecionado, mes, dim);
      const inicioEfetivo = periodoInstrucao
        ? (periodoInstrucao.inicio > inicioMes ? periodoInstrucao.inicio : inicioMes)
        : inicioMes;
      const fimEfetivo = periodoInstrucao
        ? (periodoInstrucao.fim < fimMes ? periodoInstrucao.fim : fimMes)
        : fimMes;
      if (inicioEfetivo > fimEfetivo) {
        return {
          mes,
          nomeMes: NOMES_MESES[idx] ?? `Mês ${mes}`,
          diasConsiderados: 0,
          valor: 0,
        };
      }
      const estimativaMes = despesaFolhaPeriodo(folha.total, inicioEfetivo, fimEfetivo);
      totalAno += estimativaMes.total;
      return {
        mes,
        nomeMes: NOMES_MESES[idx] ?? `Mês ${mes}`,
        diasConsiderados: estimativaMes.diasPagosContados,
        valor: estimativaMes.total,
      };
    });
    return { meses, totalAno };
  }, [anoSelecionado, folha.total, periodoInstrucao]);

  const estimativaPeriodo = useMemo(
    () => despesaFolhaPeriodo(folha.total, dataInicioPeriodo, dataFimPeriodo),
    [folha.total, dataInicioPeriodo, dataFimPeriodo]
  );

  const anosDisponiveis = useMemo(() => {
    const primeiroAno = periodoInstrucao
      ? Number(periodoInstrucao.inicio.slice(0, 4))
      : 2026;
    const ultimoAno = periodoInstrucao
      ? Number(periodoInstrucao.fim.slice(0, 4))
      : Math.max(2036, new Date().getFullYear() + 5);
    return Array.from(
      { length: Math.max(1, ultimoAno - primeiroAno + 1) },
      (_, i) => primeiroAno + i
    );
  }, [periodoInstrucao]);

  useEffect(() => {
    if (!anosDisponiveis.includes(anoSelecionado)) {
      setAnoSelecionado(anosDisponiveis[0] ?? 2026);
    }
  }, [anoSelecionado, anosDisponiveis]);

  const totais = useMemo(() => {
    let prev = 0;
    let real = 0;
    let anyReal = false;
    for (const r of rows) {
      prev += Number(r.valor_previsto) || 0;
      if (r.valor_real != null) {
        anyReal = true;
        real += Number(r.valor_real) || 0;
      }
    }
    return { prev, real, anyReal };
  }, [rows]);

  const totalIntegrantesPorMacro = useMemo(() => {
    const map = new Map<string, number>();
    for (const i of integrantes) {
      const macro = macroDoSetor(i.setor);
      map.set(macro, (map.get(macro) ?? 0) + 1);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  }, [integrantes]);

  async function removeOrc(id: string) {
    if (!podeExcluirLancamento) return;
    setError(null);
    const res = await fetch(`/api/orcamento/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Orçamento</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Despesa da folha (integrantes ×{" "}
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">ref_pgto</code>), mês a mês no ano civil (janeiro e dezembro proporcionais), estimativa por intervalo de datas e, se houver, lançamentos por categoria.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {!loading && configured && (
        <div className="mb-8 rounded-xl border border-[var(--success)]/25 bg-[var(--success)]/10 px-4 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--success)]">
            Despesa mensal (folha integrantes)
          </p>
          <p className="mt-2 text-2xl font-bold text-[var(--success)]">{formatMoney(folha.total)}</p>

          <div className="mt-5 border-t border-[var(--success)]/20 pt-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
                <div className="shrink-0">
                  <p className="text-xs font-medium text-[var(--success)]">Despesa da folha por mês</p>
                  <label className="mt-2 block text-xs text-[var(--muted)]">Ano civil</label>
                  <select
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                    className="mt-1 rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                  >
                    {anosDisponiveis.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0 flex-1 sm:min-w-[260px]">
                  <label className="block text-xs font-medium text-[var(--success)]">
                    Estimativa no período
                  </label>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">
                    {periodoInstrucao
                      ? `IS selecionada: ${periodoInstrucao.inicio.split("-").reverse().join("/")} a ${periodoInstrucao.fim.split("-").reverse().join("/")}.`
                      : "Sem IS selecionada, o período inicial padrão é 12/06/2026."}{" "}
                    Cada dia válido soma uma fração da folha de mês cheio conforme as regras de calendário.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[var(--muted)]">Data inicial</span>
                      <input
                        type="date"
                        min={limiteInicioPeriodo}
                        max={limiteFimPeriodo || undefined}
                        value={dataInicioPeriodo}
                        onChange={(e) => {
                          const v = e.target.value;
                          setDataInicioPeriodo(v);
                          if (v > dataFimPeriodo) setDataFimPeriodo(v);
                        }}
                        className="rounded-lg border border-[var(--card-border)] bg-white px-2 py-1.5 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                      />
                    </div>
                    <span className="hidden text-[var(--muted)] sm:mb-1 sm:block" aria-hidden>
                      —
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[var(--muted)]">Data final</span>
                      <input
                        type="date"
                        min={minDataFimPeriodo}
                        max={limiteFimPeriodo || undefined}
                        value={dataFimPeriodo}
                        onChange={(e) => setDataFimPeriodo(e.target.value)}
                        className="rounded-lg border border-[var(--card-border)] bg-white px-2 py-1.5 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                      />
                    </div>
                  </div>
                  {estimativaPeriodo.erro && (
                    <p className="mt-2 text-xs text-[var(--danger)]">{estimativaPeriodo.erro}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg border border-[var(--success)]/20 bg-white/65 px-3 py-2 sm:min-w-[200px]">
                  <p className="text-xs text-[var(--muted)]">Total no ano ({anoSelecionado})</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--success)]">
                    {formatMoney(folhaPorMesAno.totalAno)}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--accent)]/25 bg-white/65 px-3 py-2 sm:min-w-[200px]">
                  <p className="text-xs text-[var(--muted)]">Estimativa no período</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--accent)]">
                    {estimativaPeriodo.erro ? "—" : formatMoney(estimativaPeriodo.total)}
                  </p>
                  {!estimativaPeriodo.erro && (
                    <p className="mt-1 text-[11px] text-[var(--muted)]">
                      Dias pagos contados: {estimativaPeriodo.diasPagosContados}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--success)]/20 bg-white/65">
              <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                <thead className="border-b border-[var(--success)]/20 bg-white/90 text-xs uppercase tracking-wide text-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Mês</th>
                    <th className="px-3 py-2.5 text-right font-medium">Dias no mês</th>
                    <th className="px-3 py-2.5 text-right font-medium">Dias pagos</th>
                    <th className="px-3 py-2.5 text-right font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {folhaPorMesAno.meses.map((row) => {
                    const dim = diasNoMes(anoSelecionado, row.mes);
                    const nota =
                      row.mes === 1
                        ? "7 → fim"
                        : row.mes === 12
                            ? "1–19"
                            : null;
                    return (
                      <tr
                        key={row.mes}
                        className="border-b border-[var(--card-border)]/40 last:border-b-0"
                      >
                        <td className="px-3 py-2">
                          <span className="text-[var(--foreground)]">{row.nomeMes}</span>
                          {nota && (
                            <span className="ml-1.5 text-[11px] text-[var(--muted)]">({nota})</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">{dim}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                          {row.diasConsiderados}
                        </td>
                        <td className="px-3 py-2 text-right font-medium tabular-nums text-[var(--success)]">
                          {formatMoney(row.valor)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-[var(--foreground)]">
            A referência <strong>ref_pgto</strong> é o valor de mês inteiro por integrante. Janeiro considera
            apenas a partir do dia 7 e dezembro, do dia 1 ao 19. Demais meses usam o mês
            completo. A estimativa por período soma, dia a dia, apenas os dias cobertos (proporção{" "}
            <code className="rounded bg-[var(--accent-muted)] px-1">folha ÷ dias do mês</code> por dia válido). Ajuste
            dados no Supabase ou na tela de integrantes.
          </p>
          {folha.semCorrespondencia.length > 0 && (
            <div className="mt-3 rounded-lg border border-[var(--warning)]/25 bg-[#f4ead5] px-3 py-2 text-xs text-[#6f4d14]">
              <p className="font-medium text-[#6f4d14]">
                {folha.semCorrespondencia.length} integrante(s) com cargo/classe sem linha em ref_pgto:
              </p>
              <ul className="mt-1 list-inside list-disc text-[#7c5a20]">
                {folha.semCorrespondencia.slice(0, 8).map((x) => (
                  <li key={x.id}>
                    {x.nome} — {x.cargo || "—"} / {x.classe_padrao || "—"}
                  </li>
                ))}
                {folha.semCorrespondencia.length > 8 && (
                  <li>… e mais {folha.semCorrespondencia.length - 8}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <section className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">
          Referência de pagamento (ref_pgto)
        </h3>
        <p className="mb-4 text-xs text-[var(--muted)]">
          Dados somente leitura nesta tela. Para incluir ou alterar linhas, use o Supabase (SQL em{" "}
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">supabase/migration_ref_pgto.sql</code> cria a tabela).
        </p>
        {refPgto.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Nenhuma linha em ref_pgto.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
            <table className="w-full min-w-[360px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Cargo</th>
                  <th className="px-3 py-2.5 font-medium">Classe/Padrão</th>
                  <th className="px-3 py-2.5 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {refPorCargo.map(([cargo, itens]) =>
                  itens.map((r, idx) => (
                    <tr
                      key={r.id}
                      className="border-b border-[var(--card-border)]/50 last:border-b-0"
                    >
                      {idx === 0 ? (
                        <td
                          rowSpan={itens.length}
                          className="align-middle border-r border-[var(--card-border)]/40 px-3 py-2 font-medium text-[var(--foreground)]"
                        >
                          {cargo}
                        </td>
                      ) : null}
                      <td className="px-3 py-2 text-[var(--muted)]">{r.classe_padrao || "—"}</td>
                      <td className="px-3 py-2 text-right font-medium tabular-nums text-[var(--accent)]">
                        {formatMoney(Number(r.valor_mensal))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {rows.length > 0 && (
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)]">Total previsto (lançamentos)</p>
            <p className="mt-1 text-xl font-semibold">{formatMoney(totais.prev)}</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)]">Total real (somatório informado)</p>
            <p className="mt-1 text-xl font-semibold">
              {totais.anyReal ? formatMoney(totais.real) : "—"}
            </p>
          </div>
        </div>
      )}

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista de lançamentos</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured ? "Nenhum lançamento ainda." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{r.categoria}</p>
                  {r.descricao && (
                    <p className="mt-1 text-sm text-[var(--muted)]">{r.descricao}</p>
                  )}
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Previsto {formatMoney(Number(r.valor_previsto))}
                    {" · "}
                    Real {r.valor_real != null ? formatMoney(Number(r.valor_real)) : "—"}
                    {r.periodo && ` · ${r.periodo}`}
                  </p>
                </div>
                {podeExcluirLancamento && (
                  <button
                    type="button"
                    onClick={() => void removeOrc(r.id)}
                    className="self-start rounded-lg border border-[var(--danger)]/30 bg-white/70 px-2 py-1.5 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger)]/10 sm:self-center disabled:opacity-50"
                  >
                    Excluir
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {integrantes.length > 0 && refPgto.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Detalhe por integrante (mês)</h3>
          <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
            <aside className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Total de pessoas
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--accent)]">{integrantes.length}</p>
              <div className="mt-3 border-t border-[var(--card-border)]/70 pt-2">
                <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                  Por setor macro
                </p>
                <ul className="mt-1 space-y-0.5 text-xs text-[var(--muted)]">
                  {totalIntegrantesPorMacro.map(([macro, total]) => (
                    <li key={macro} className="flex items-center justify-between gap-2">
                      <span className="truncate">{macro}</span>
                      <span className="font-medium tabular-nums text-[var(--foreground)]">{total}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[var(--card-border)] bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-2">Nome</th>
                    <th className="px-3 py-2">Cargo</th>
                    <th className="px-3 py-2">Classe/Padrão</th>
                    <th className="px-3 py-2 text-right">Valor/mês</th>
                  </tr>
                </thead>
                <tbody>
                  {integrantes.map((i) => {
                    const v = valorMensalDoRef(refPgto, i.cargo, i.classe_padrao);
                    return (
                      <tr key={i.id} className="border-b border-[var(--card-border)]/60">
                        <td className="px-3 py-2">{i.nome}</td>
                        <td className="px-3 py-2 text-[var(--muted)]">{i.cargo || "—"}</td>
                        <td className="px-3 py-2 text-[var(--muted)]">{i.classe_padrao || "—"}</td>
                        <td className="px-3 py-2 text-right font-medium text-[var(--accent)]">
                          {formatMoney(v)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
