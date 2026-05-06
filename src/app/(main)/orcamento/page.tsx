"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
import { useMounted } from "@/hooks/useMounted";
import {
  DATA_ORCAMENTO_INICIO_ISO,
  despesaFolhaPeriodo,
  diasNoMes,
  integranteContaParaFolha,
  totalDespesaMensalFolha,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Atividade, Equipe, Integrante, Orcamento, RefPgto } from "@/types/database";

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

function ultimoDiaDoMes(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function formatBR(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

function parseISODate(iso: string): { y: number; m: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return { y: Number(m[1]), m: Number(m[2]) };
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
  const [atividadesIs, setAtividadesIs] = useState<Atividade[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dataInicioPeriodo, setDataInicioPeriodo] = useState(DATA_ORCAMENTO_INICIO_ISO);
  const [dataFimPeriodo, setDataFimPeriodo] = useState("2026-12-31");
  const [diasFerias, setDiasFerias] = useState(0);
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
      setEquipes([]);
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
      setAtividadesIs([]);
      setPeriodoInstrucao(null);
      setDataInicioPeriodo(DATA_ORCAMENTO_INICIO_ISO);
      setDataFimPeriodo("2026-12-31");
      return;
    }

    let ativo = true;
    void (async () => {
      const res = await fetch(
        `/api/atividades?instrucaoServicoId=${encodeURIComponent(instrucaoServicoId)}`,
        { credentials: "include" }
      );
      const [dataAtividades, dataEquipes] = await Promise.all([
        res.json() as Promise<{ atividades?: Atividade[] }>,
        fetch("/api/equipe", { credentials: "include" }).then(
          async (resEquipe) => ((await resEquipe.json()) as { equipe?: Equipe[]; ok?: boolean })
        ),
      ]);
      if (!ativo || !res.ok) {
        setAtividadesIs([]);
        setPeriodoInstrucao(null);
        return;
      }
      const atividades = dataAtividades.atividades ?? [];
      setAtividadesIs(atividades);
      setEquipes(dataEquipes.equipe ?? []);
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
  }, [periodoInstrucao]);

  const integrantesConsiderados = useMemo(() => {
    if (!instrucaoServicoId) return integrantes;
    if (atividadesIs.length === 0) return [];

    const ids = new Set<string>();
    const porCodigo = new Map<string, Atividade[]>();
    for (const a of atividadesIs) {
      const codigo = (a.codigo ?? "").trim();
      if (!porCodigo.has(codigo)) porCodigo.set(codigo, []);
      porCodigo.get(codigo)!.push(a);
    }

    for (const [codigo, atividades] of porCodigo) {
      const equipeRows = equipes.filter((e) => (e.codigo ?? "").trim() === codigo);
      const nomesEquipe = new Set(
        equipeRows.map((e) => (e.equipe ?? "").trim().toLowerCase()).filter(Boolean)
      );
      const codigoLc = codigo.toLowerCase();

      for (const i of integrantes) {
        const setor = (i.setor ?? "").trim().toLowerCase();
        if (!setor) continue;
        if (codigo && setor === codigoLc) ids.add(i.id);
        else if (nomesEquipe.has(setor)) ids.add(i.id);
      }

      for (const r of equipeRows) {
        for (const i of integrantes) {
          if (equipeLinhaEhResponsavel(r.equipe ?? "", i.nome ?? "")) ids.add(i.id);
        }
      }

      for (const a of atividades) {
        for (const i of integrantes) {
          if (equipeLinhaEhResponsavel(i.nome ?? "", a.responsavel)) ids.add(i.id);
        }
      }
    }

    return integrantes.filter((i) => ids.has(i.id));
  }, [instrucaoServicoId, atividadesIs, equipes, integrantes]);

  const folha = useMemo(
    () => totalDespesaMensalFolha(integrantesConsiderados, refPgto),
    [integrantesConsiderados, refPgto]
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

  const estimativaPeriodo = useMemo(
    () => despesaFolhaPeriodo(folha.total, dataInicioPeriodo, dataFimPeriodo),
    [folha.total, dataInicioPeriodo, dataFimPeriodo]
  );

  const folhaPorMes = useMemo(() => {
    const pi = parseISODate(dataInicioPeriodo);
    const pf = parseISODate(dataFimPeriodo);
    if (!pi || !pf) return [] as Array<{
      key: string;
      year: number;
      mes: number;
      label: string;
      diasNoMes: number;
      diasPagos: number;
      valor: number;
    }>;
    if (pi.y > pf.y || (pi.y === pf.y && pi.m > pf.m)) return [];

    const meses: Array<{
      key: string;
      year: number;
      mes: number;
      label: string;
      diasNoMes: number;
      diasPagos: number;
      valor: number;
    }> = [];

    let y = pi.y;
    let m = pi.m;
    while (y < pf.y || (y === pf.y && m <= pf.m)) {
      const dim = diasNoMes(y, m);
      const inicioMes = isoDate(y, m, 1);
      const fimMes = isoDate(y, m, dim);
      const inicio = inicioMes < dataInicioPeriodo ? dataInicioPeriodo : inicioMes;
      const fim = fimMes > dataFimPeriodo ? dataFimPeriodo : fimMes;
      const r = despesaFolhaPeriodo(folha.total, inicio, fim);
      meses.push({
        key: `${y}-${m}`,
        year: y,
        mes: m,
        label: `${NOMES_MESES[m - 1] ?? `Mês ${m}`}/${String(y).slice(-2)}`,
        diasNoMes: dim,
        diasPagos: r.erro ? 0 : r.diasPagosContados,
        valor: r.erro ? 0 : r.total,
      });
      m += 1;
      if (m > 12) {
        m = 1;
        y += 1;
      }
    }
    return meses;
  }, [dataInicioPeriodo, dataFimPeriodo, folha.total]);

  const resumoFerias = useMemo(() => {
    const totalBruto = estimativaPeriodo.erro ? 0 : estimativaPeriodo.total;
    const diasPagos = estimativaPeriodo.erro ? 0 : estimativaPeriodo.diasPagosContados;
    const diasFeriasValido = Math.max(0, Math.min(Math.floor(diasFerias || 0), diasPagos));
    const valorDiaMedio = diasPagos > 0 ? totalBruto / diasPagos : 0;
    const reducao = Math.round(valorDiaMedio * diasFeriasValido * 100) / 100;
    const totalFinal = Math.max(0, Math.round((totalBruto - reducao) * 100) / 100);
    return { totalBruto, diasPagos, diasFeriasValido, reducao, totalFinal };
  }, [estimativaPeriodo, diasFerias]);

  const aplicarPreset = useCallback(
    (preset: "mes-atual" | "ano-atual" | "is") => {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth() + 1;
      if (preset === "mes-atual") {
        setDataInicioPeriodo(isoDate(ano, mes, 1));
        setDataFimPeriodo(isoDate(ano, mes, ultimoDiaDoMes(ano, mes)));
        return;
      }
      if (preset === "ano-atual") {
        setDataInicioPeriodo(isoDate(ano, 1, 1));
        setDataFimPeriodo(isoDate(ano, 12, 31));
        return;
      }
      if (preset === "is" && periodoInstrucao) {
        setDataInicioPeriodo(periodoInstrucao.inicio);
        setDataFimPeriodo(periodoInstrucao.fim);
      }
    },
    [periodoInstrucao]
  );

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
    for (const i of integrantesConsiderados) {
      const macro = macroDoSetor(i.setor);
      map.set(macro, (map.get(macro) ?? 0) + 1);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  }, [integrantesConsiderados]);

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
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">ref_pgto</code>) e estimativa de despesa por intervalo de datas.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {!loading && configured && (
        <div className="mb-8 space-y-4">
          <div className="rounded-xl border border-[var(--success)]/25 bg-[var(--success)]/10 px-5 py-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--success)]">
              Despesa mensal (folha integrantes)
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--success)]">
              {formatMoney(folha.total)}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Soma de <code className="rounded bg-[var(--accent-muted)] px-1">ref_pgto</code> de
              {" "}{integrantesConsiderados.filter(integranteContaParaFolha).length} integrante(s)
              {instrucaoServicoId ? " vinculado(s) à IS selecionada" : ""}.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--card)] px-5 py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                Estimativa por período
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => aplicarPreset("mes-atual")}
                  className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)]"
                >
                  Mês atual
                </button>
                <button
                  type="button"
                  onClick={() => aplicarPreset("ano-atual")}
                  className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)]"
                >
                  Ano atual
                </button>
                {periodoInstrucao && (
                  <button
                    type="button"
                    onClick={() => aplicarPreset("is")}
                    className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent-muted)] px-2 py-1 text-[11px] font-medium text-[var(--accent)] hover:brightness-95"
                  >
                    Período da IS
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="block text-xs font-medium text-[var(--muted)]">Data inicial</span>
                <input
                  type="date"
                  value={dataInicioPeriodo}
                  onChange={(e) => setDataInicioPeriodo(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium text-[var(--muted)]">Data final</span>
                <input
                  type="date"
                  value={dataFimPeriodo}
                  onChange={(e) => setDataFimPeriodo(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium text-[var(--muted)]">
                  Dias de férias (todos)
                </span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={diasFerias}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setDiasFerias(Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0);
                  }}
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                />
              </label>
            </div>

            {estimativaPeriodo.erro ? (
              <p className="mt-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
                {estimativaPeriodo.erro}
              </p>
            ) : (
              <div className="mt-4 rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-muted)] px-4 py-4">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  Valor estimado no período
                </p>
                <p className="mt-1 text-3xl font-bold text-[var(--accent)]">
                  {formatMoney(resumoFerias.totalFinal)}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {formatBR(dataInicioPeriodo)} a {formatBR(dataFimPeriodo)} ·{" "}
                  {estimativaPeriodo.diasPagosContados} dia(s) pago(s)
                  {resumoFerias.diasFeriasValido > 0 &&
                    ` · −${resumoFerias.diasFeriasValido} dia(s) de férias`}
                </p>
                {resumoFerias.diasFeriasValido > 0 && (
                  <div className="mt-3 grid gap-2 border-t border-[var(--accent)]/20 pt-3 text-xs sm:grid-cols-3">
                    <div>
                      <p className="text-[var(--muted)]">Bruto</p>
                      <p className="font-semibold text-[var(--foreground)]">
                        {formatMoney(resumoFerias.totalBruto)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--muted)]">
                        Redução por férias ({resumoFerias.diasFeriasValido} dia
                        {resumoFerias.diasFeriasValido === 1 ? "" : "s"})
                      </p>
                      <p className="font-semibold text-[var(--danger)]">
                        −{formatMoney(resumoFerias.reducao)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--muted)]">Final</p>
                      <p className="font-semibold text-[var(--accent)]">
                        {formatMoney(resumoFerias.totalFinal)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!estimativaPeriodo.erro && folhaPorMes.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--card-border)] bg-white">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase tracking-wide text-[var(--muted)]">
                    <tr>
                      <th className="px-3 py-2.5 font-medium">Mês</th>
                      <th className="px-3 py-2.5 text-right font-medium">Dias no mês</th>
                      <th className="px-3 py-2.5 text-right font-medium">Dias pagos</th>
                      <th className="px-3 py-2.5 text-right font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folhaPorMes.map((row) => {
                      const nota =
                        row.mes === 1 ? "7 → fim" : row.mes === 12 ? "1–19" : null;
                      return (
                        <tr
                          key={row.key}
                          className="border-b border-[var(--card-border)]/40 last:border-b-0"
                        >
                          <td className="px-3 py-2">
                            <span className="text-[var(--foreground)]">{row.label}</span>
                            {nota && (
                              <span className="ml-1.5 text-[11px] text-[var(--muted)]">
                                ({nota})
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                            {row.diasNoMes}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                            {row.diasPagos}
                          </td>
                          <td className="px-3 py-2 text-right font-medium tabular-nums text-[var(--success)]">
                            {formatMoney(row.valor)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-[var(--background)]/60 text-xs">
                    <tr>
                      <td className="px-3 py-2 font-medium text-[var(--muted)]">
                        Subtotal bruto
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                        {folhaPorMes.reduce((acc, r) => acc + r.diasNoMes, 0)}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                        {estimativaPeriodo.diasPagosContados}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums text-[var(--foreground)]">
                        {formatMoney(resumoFerias.totalBruto)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <p className="mt-3 text-[11px] leading-snug text-[var(--muted)]">
              Cada dia útil de folha soma{" "}
              <code className="rounded bg-[var(--accent-muted)] px-1">folha ÷ dias do mês</code>.
              Janeiro conta a partir do dia 7 e dezembro até o dia 19; demais meses, integralmente.
              Os dias de férias reduzem o total proporcionalmente:{" "}
              <code className="rounded bg-[var(--accent-muted)] px-1">
                bruto × dias_férias ÷ dias_pagos
              </code>
              .
              {periodoInstrucao
                ? ` IS selecionada: ${formatBR(periodoInstrucao.inicio)} a ${formatBR(periodoInstrucao.fim)}.`
                : ""}
            </p>
          </div>

          {folha.semCorrespondencia.length > 0 && (
            <div className="rounded-lg border border-[var(--warning)]/25 bg-[#f4ead5] px-3 py-2 text-xs text-[#6f4d14]">
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

      {integrantesConsiderados.length > 0 && refPgto.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Detalhe por integrante (mês)</h3>
          <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
            <aside className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Total de pessoas
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--accent)]">
                {integrantesConsiderados.length}
              </p>
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
                  {integrantesConsiderados.map((i) => {
                    const v = integranteContaParaFolha(i)
                      ? valorMensalDoRef(refPgto, i.cargo, i.classe_padrao)
                      : null;
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
