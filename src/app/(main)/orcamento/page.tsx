"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { useMounted } from "@/hooks/useMounted";
import { macroSetorIntegrante } from "@/lib/integrante-setor-macro";
import {
  estadoAPartirDasLinhas,
  linhasAtivas,
  resumoLinhasCenario,
  totaisDoCenario,
} from "@/lib/orcamento-cenarios";
import {
  estadoAPartirDasLinhasFerias,
  linhasFeriasAtivas,
} from "@/lib/orcamento-cenarios-ferias";
import {
  despesaFolhaPeriodo,
  diasNoMes,
  integranteContaParaFolha,
  reducaoFeriasNoPeriodo,
  totalDespesaMensalFolha,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import {
  PERIODO_ORCAMENTO_INICIAL,
  PERIODOS_ORCAMENTO,
  periodoOrcamentoPorId,
  type ExecucaoMensal,
} from "@/lib/orcamento-periodos";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type {
  Integrante,
  Orcamento,
  OrcamentoCenario,
  OrcamentoCenarioFerias,
  RefPgto,
} from "@/types/database";

function textoValor(n: number): string {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseValorInformado(raw: string): number | null | "invalido" {
  const s = raw.trim();
  if (!s) return null;
  const normalizado = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/\s/g, "");
  const n = Number(normalizado);
  if (!Number.isFinite(n) || n < 0) return "invalido";
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number | null) {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function formatDataHora(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function macroDoSetor(setor: string | null | undefined): string {
  if (!(setor ?? "").trim()) return "(sem setor)";
  return macroSetorIntegrante(setor);
}

function isoDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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
  const podeExcluirLancamento = isAdmin(perfil);
  const [rows, setRows] = useState<Orcamento[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [refPgto, setRefPgto] = useState<RefPgto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [periodoId, setPeriodoId] = useState(PERIODO_ORCAMENTO_INICIAL.id);
  const periodoOrcamento = useMemo(
    () => periodoOrcamentoPorId(periodoId) ?? PERIODO_ORCAMENTO_INICIAL,
    [periodoId]
  );
  const dataInicioPeriodo = periodoOrcamento.inicio;
  const dataFimPeriodo = periodoOrcamento.fim;
  const [diasFerias, setDiasFerias] = useState(0);
  const [executadoPorMes, setExecutadoPorMes] = useState<Record<string, number>>({});
  const [rascunhoExecutado, setRascunhoExecutado] = useState<Record<string, string>>({});
  const [salvandoExecucao, setSalvandoExecucao] = useState<string | null>(null);
  const [mesesPorRef, setMesesPorRef] = useState<Record<string, number>>({});
  const [pessoasPorRef, setPessoasPorRef] = useState<Record<string, number>>({});
  const [detalheIntegrantesAberto, setDetalheIntegrantesAberto] = useState(false);
  const [refPgtoAberto, setRefPgtoAberto] = useState(false);
  const [diasFeriasPorIntegrante, setDiasFeriasPorIntegrante] = useState<Record<string, number>>({});
  const [cenariosFerias, setCenariosFerias] = useState<OrcamentoCenarioFerias[]>([]);
  const [nomeCenarioFerias, setNomeCenarioFerias] = useState("");
  const [mostrarSalvarCenarioFerias, setMostrarSalvarCenarioFerias] = useState(false);
  const [salvandoCenarioFerias, setSalvandoCenarioFerias] = useState(false);
  const [cenarios, setCenarios] = useState<OrcamentoCenario[]>([]);
  const [nomeCenario, setNomeCenario] = useState("");
  const [mostrarSalvarCenario, setMostrarSalvarCenario] = useState(false);
  const [salvandoCenario, setSalvandoCenario] = useState(false);

  const loadCenarios = useCallback(async () => {
    const res = await fetch("/api/orcamento/cenarios", { credentials: "include" });
    const data = (await res.json()) as { error?: string; cenarios?: OrcamentoCenario[] };
    if (!res.ok) {
      return;
    }
    setCenarios(data.cenarios ?? []);
  }, []);

  const loadCenariosFerias = useCallback(async () => {
    const res = await fetch("/api/orcamento/cenarios-ferias", { credentials: "include" });
    const data = (await res.json()) as { error?: string; cenarios?: OrcamentoCenarioFerias[] };
    if (!res.ok) return;
    setCenariosFerias(data.cenarios ?? []);
  }, []);

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
    void loadCenarios();
    void loadCenariosFerias();
  }, [load, loadCenarios, loadCenariosFerias]);

  useEffect(() => {
    let ativo = true;
    setExecutadoPorMes({});
    setRascunhoExecutado({});
    void (async () => {
      const res = await fetch(
        `/api/orcamento/execucao?periodoId=${encodeURIComponent(periodoOrcamento.id)}`,
        { credentials: "include" }
      );
      const data = (await res.json()) as { error?: string; execucoes?: ExecucaoMensal[] };
      if (!ativo) return;
      if (!res.ok) {
        setError(data.error ?? "Não foi possível carregar a execução mensal.");
        return;
      }
      const salvos: Record<string, number> = {};
      const rascunho: Record<string, string> = {};
      for (const item of data.execucoes ?? []) {
        const key = `${item.ano}-${item.mes}`;
        const valor = Number(item.valor_executado);
        if (!Number.isFinite(valor)) continue;
        salvos[key] = valor;
        rascunho[key] = textoValor(valor);
      }
      setExecutadoPorMes(salvos);
      setRascunhoExecutado(rascunho);
    })();
    return () => {
      ativo = false;
    };
  }, [periodoOrcamento.id]);

  const integrantesConsiderados = integrantes;

  const folha = useMemo(
    () => totalDespesaMensalFolha(integrantesConsiderados, refPgto),
    [integrantesConsiderados, refPgto]
  );

  const linhasCenarioAtual = useMemo(
    () => linhasAtivas(mesesPorRef, pessoasPorRef),
    [mesesPorRef, pessoasPorRef]
  );

  const totaisCenarioAtual = useMemo(
    () => totaisDoCenario(linhasCenarioAtual, refPgto),
    [linhasCenarioAtual, refPgto]
  );

  const resumoSelecaoAtual = useMemo(
    () => resumoLinhasCenario(linhasCenarioAtual, refPgto),
    [linhasCenarioAtual, refPgto]
  );

  const podeSalvarCenario = linhasCenarioAtual.length > 0;

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

  const linhasFeriasAtual = useMemo(
    () => linhasFeriasAtivas(diasFeriasPorIntegrante),
    [diasFeriasPorIntegrante]
  );

  const podeSalvarCenarioFerias =
    linhasFeriasAtual.length > 0 && !estimativaPeriodo.erro;

  const detalheFeriasIntegrantes = useMemo(() => {
    const diasPagos = estimativaPeriodo.erro ? 0 : estimativaPeriodo.diasPagosContados;
    const porId: Record<string, { despesaPeriodo: number; economia: number }> = {};
    let totalEconomia = 0;
    let economiaSejud = 0;
    let economiaStic = 0;
    for (const i of integrantesConsiderados) {
      if (!integranteContaParaFolha(i)) {
        porId[i.id] = { despesaPeriodo: 0, economia: 0 };
        continue;
      }
      const valorMensal = valorMensalDoRef(refPgto, i.cargo, i.classe_padrao);
      const despesaPeriodo = estimativaPeriodo.erro
        ? 0
        : despesaFolhaPeriodo(valorMensal, dataInicioPeriodo, dataFimPeriodo).total;
      const dias = diasFeriasPorIntegrante[i.id] ?? 0;
      const economia = reducaoFeriasNoPeriodo(despesaPeriodo, dias, diasPagos);
      porId[i.id] = { despesaPeriodo, economia };
      totalEconomia += economia;
      if (macroSetorIntegrante(i.setor) === "STIC") economiaStic += economia;
      else economiaSejud += economia;
    }
    return {
      porId,
      diasPagos,
      totalEconomia: Math.round(totalEconomia * 100) / 100,
      economiaSejud: Math.round(economiaSejud * 100) / 100,
      economiaStic: Math.round(economiaStic * 100) / 100,
    };
  }, [
    integrantesConsiderados,
    refPgto,
    estimativaPeriodo,
    dataInicioPeriodo,
    dataFimPeriodo,
    diasFeriasPorIntegrante,
  ]);

  const resumoFerias = useMemo(() => {
    const totalBruto = estimativaPeriodo.erro ? 0 : estimativaPeriodo.total;
    const diasPagos = estimativaPeriodo.erro ? 0 : estimativaPeriodo.diasPagosContados;
    const diasFeriasValido = Math.max(0, Math.min(Math.floor(diasFerias || 0), diasPagos));
    const valorDiaMedio = diasPagos > 0 ? totalBruto / diasPagos : 0;
    const reducao = Math.round(valorDiaMedio * diasFeriasValido * 100) / 100;
    const totalFinal = Math.max(0, Math.round((totalBruto - reducao) * 100) / 100);
    return { totalBruto, diasPagos, diasFeriasValido, reducao, totalFinal };
  }, [estimativaPeriodo, diasFerias]);

  function valorExecutadoDaLinha(key: string): number | null {
    const rascunho = rascunhoExecutado[key];
    if (rascunho !== undefined) {
      const parsed = parseValorInformado(rascunho);
      if (parsed !== "invalido") return parsed;
    }
    return executadoPorMes[key] ?? null;
  }

  const totaisPeriodo = useMemo(() => {
    let estimado = 0;
    let considerado = 0;
    let mesesExecutados = 0;
    for (const row of folhaPorMes) {
      estimado += row.valor;
      const rascunho = rascunhoExecutado[row.key];
      let executado: number | null = executadoPorMes[row.key] ?? null;
      if (rascunho !== undefined) {
        const parsed = parseValorInformado(rascunho);
        if (parsed !== "invalido") executado = parsed;
      }
      if (executado === null) considerado += row.valor;
      else {
        considerado += executado;
        mesesExecutados += 1;
      }
    }
    estimado = Math.round(estimado * 100) / 100;
    considerado = Math.round(considerado * 100) / 100;
    const saldo = Math.round((periodoOrcamento.valorAprovado - considerado) * 100) / 100;
    return { estimado, considerado, saldo, mesesExecutados };
  }, [folhaPorMes, rascunhoExecutado, executadoPorMes, periodoOrcamento.valorAprovado]);

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

  function carregarCenario(c: OrcamentoCenario) {
    const linhas = Array.isArray(c.linhas) ? c.linhas : [];
    const { mesesPorRef: meses, pessoasPorRef: pessoas } = estadoAPartirDasLinhas(linhas);
    setMesesPorRef(meses);
    setPessoasPorRef(pessoas);
    setMostrarSalvarCenario(false);
    setNomeCenario("");
    setError(null);
  }

  async function salvarCenario(ev: React.FormEvent) {
    ev.preventDefault();
    if (!podeSalvarCenario || !nomeCenario.trim()) return;
    setSalvandoCenario(true);
    setError(null);
    const res = await fetch("/api/orcamento/cenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nome: nomeCenario.trim(),
        linhas: linhasCenarioAtual,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSalvandoCenario(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível salvar o cenário.");
      return;
    }
    setNomeCenario("");
    setMostrarSalvarCenario(false);
    void loadCenarios();
  }

  function carregarCenarioFerias(c: OrcamentoCenarioFerias) {
    const linhas = Array.isArray(c.linhas) ? c.linhas : [];
    setDiasFeriasPorIntegrante(estadoAPartirDasLinhasFerias(linhas));
    setMostrarSalvarCenarioFerias(false);
    setNomeCenarioFerias("");
    setDetalheIntegrantesAberto(true);
    setError(null);
  }

  async function salvarCenarioFerias(ev: React.FormEvent) {
    ev.preventDefault();
    if (!podeSalvarCenarioFerias || !nomeCenarioFerias.trim()) return;
    setSalvandoCenarioFerias(true);
    setError(null);
    const res = await fetch("/api/orcamento/cenarios-ferias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nome: nomeCenarioFerias.trim(),
        data_inicio: dataInicioPeriodo,
        data_fim: dataFimPeriodo,
        linhas: linhasFeriasAtual,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSalvandoCenarioFerias(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível salvar o cenário de férias.");
      return;
    }
    setNomeCenarioFerias("");
    setMostrarSalvarCenarioFerias(false);
    void loadCenariosFerias();
  }

  async function excluirCenarioFerias(id: string, nome: string) {
    const ok = window.confirm(`Excluir o cenário de férias "${nome}"?`);
    if (!ok) return;
    setError(null);
    const res = await fetch(`/api/orcamento/cenarios-ferias/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível excluir o cenário de férias.");
      return;
    }
    void loadCenariosFerias();
  }

  async function excluirCenario(id: string, nome: string) {
    const ok = window.confirm(`Excluir o cenário "${nome}"?`);
    if (!ok) return;
    setError(null);
    const res = await fetch(`/api/orcamento/cenarios/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível excluir o cenário.");
      return;
    }
    void loadCenarios();
  }

  async function removeOrc(id: string) {
    if (!podeExcluirLancamento) return;
    setError(null);
    const res = await fetch(`/api/orcamento/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else void load();
  }

  async function gravarExecucao(key: string, ano: number, mes: number) {
    const parsed = parseValorInformado(rascunhoExecutado[key] ?? "");
    if (parsed === "invalido") {
      setError("Informe o executado com um valor zero ou positivo, ou deixe em branco para usar o estimado.");
      return;
    }
    const atual = executadoPorMes[key] ?? null;
    if (parsed === atual) {
      if (parsed !== null) {
        setRascunhoExecutado((prev) => ({ ...prev, [key]: textoValor(parsed) }));
      }
      return;
    }
    setSalvandoExecucao(key);
    setError(null);
    const res = await fetch("/api/orcamento/execucao", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        periodoId: periodoOrcamento.id,
        ano,
        mes,
        valorExecutado: parsed,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSalvandoExecucao((atualKey) => (atualKey === key ? null : atualKey));
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar o valor executado.");
      return;
    }
    setExecutadoPorMes((prev) => {
      const next = { ...prev };
      if (parsed === null) delete next[key];
      else next[key] = parsed;
      return next;
    });
    setRascunhoExecutado((prev) => ({
      ...prev,
      [key]: parsed === null ? "" : textoValor(parsed),
    }));
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Orçamento</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Folha dos integrantes e acompanhamento do orçamento aprovado por período.
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
              {" "}{integrantesConsiderados.filter(integranteContaParaFolha).length} integrante(s).
            </p>
          </div>

          <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--card)] px-5 py-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  Orçamento do período
                </h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {formatBR(dataInicioPeriodo)} a {formatBR(dataFimPeriodo)}
                  {!estimativaPeriodo.erro &&
                    ` · ${estimativaPeriodo.diasPagosContados} dia(s) pago(s)`}
                </p>
              </div>
              <label className="block min-w-[220px]">
                <span className="block text-xs font-medium text-[var(--muted)]">Período</span>
                <select
                  value={periodoOrcamento.id}
                  onChange={(e) => setPeriodoId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                >
                  {PERIODOS_ORCAMENTO.map((p) => (
                    <option key={p.id} value={p.id}>
                      {formatBR(p.inicio)} a {formatBR(p.fim)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {estimativaPeriodo.erro ? (
              <p className="mt-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
                {estimativaPeriodo.erro}
              </p>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-[var(--card-border)] bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    Orçamento aprovado
                  </p>
                  <p className="mt-1 text-xl font-bold text-[var(--foreground)]">
                    {formatMoney(periodoOrcamento.valorAprovado)}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--card-border)] bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Estimado</p>
                  <p className="mt-1 text-xl font-bold text-[var(--accent)]">
                    {formatMoney(totaisPeriodo.estimado)}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--card-border)] bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    Total do período
                  </p>
                  <p className="mt-1 text-xl font-bold text-[var(--foreground)]">
                    {formatMoney(totaisPeriodo.considerado)}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">
                    {totaisPeriodo.mesesExecutados > 0
                      ? `${totaisPeriodo.mesesExecutados} ${
                          totaisPeriodo.mesesExecutados === 1 ? "mês" : "meses"
                        } com valor executado`
                      : "Ainda sem valor executado"}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--card-border)] bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Saldo</p>
                  <p
                    className={`mt-1 text-xl font-bold ${
                      totaisPeriodo.saldo < 0 ? "text-[var(--danger)]" : "text-[var(--success)]"
                    }`}
                  >
                    {formatMoney(totaisPeriodo.saldo)}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">Aprovado − total do período</p>
                </div>
              </div>
            )}

            <label className="mt-4 block max-w-xs">
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
            {!estimativaPeriodo.erro && resumoFerias.diasFeriasValido > 0 && (
              <p className="mt-2 text-xs text-[var(--muted)]">
                Simulação de férias sobre o estimado: −{formatMoney(resumoFerias.reducao)} (
                {resumoFerias.diasFeriasValido} dia
                {resumoFerias.diasFeriasValido === 1 ? "" : "s"}), ficando{" "}
                <span className="font-medium text-[var(--foreground)]">
                  {formatMoney(resumoFerias.totalFinal)}
                </span>
                . O saldo do período usa o executado informado, ou o estimado de cada mês.
              </p>
            )}

            {!estimativaPeriodo.erro && folhaPorMes.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--card-border)] bg-white">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase tracking-wide text-[var(--muted)]">
                    <tr>
                      <th className="px-3 py-2.5 font-medium">Mês</th>
                      <th className="px-3 py-2.5 text-right font-medium">Dias no mês</th>
                      <th className="px-3 py-2.5 text-right font-medium">Dias pagos</th>
                      <th className="px-3 py-2.5 text-right font-medium">Estimado</th>
                      <th className="px-3 py-2.5 text-right font-medium">Executado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folhaPorMes.map((row) => {
                      const dim = diasNoMes(row.year, row.mes);
                      const inicioMes = isoDate(row.year, row.mes, 1);
                      const fimMes = isoDate(row.year, row.mes, dim);
                      const inicioEfetivo = inicioMes < dataInicioPeriodo ? dataInicioPeriodo : inicioMes;
                      const fimEfetivo = fimMes > dataFimPeriodo ? dataFimPeriodo : fimMes;
                      const diaIni = Number(inicioEfetivo.slice(8, 10));
                      const diaFim = Number(fimEfetivo.slice(8, 10));
                      const nota =
                        row.mes === 1 && diaIni <= 7 && diaFim === dim
                          ? "7 → fim"
                          : row.mes === 12 && diaIni === 1 && diaFim >= 19
                            ? "1–19"
                            : diaIni === 1 && diaFim === dim
                              ? null
                              : diaIni === 1
                                ? `até ${diaFim}`
                                : diaFim === dim
                                  ? `a partir de ${diaIni}`
                                  : `${diaIni}–${diaFim}`;
                      const executado = valorExecutadoDaLinha(row.key);
                      const substituido = executado !== null;
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
                          <td
                            className={`px-3 py-2 text-right font-medium tabular-nums ${
                              substituido
                                ? "text-[var(--muted)] line-through"
                                : "text-[var(--success)]"
                            }`}
                          >
                            {formatMoney(row.valor)}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={rascunhoExecutado[row.key] ?? ""}
                              placeholder="usar estimado"
                              aria-label={`Total executado em ${row.label}`}
                              disabled={salvandoExecucao === row.key}
                              onChange={(e) =>
                                setRascunhoExecutado((prev) => ({
                                  ...prev,
                                  [row.key]: e.target.value,
                                }))
                              }
                              onBlur={() => void gravarExecucao(row.key, row.year, row.mes)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                              }}
                              className="w-36 rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-right text-sm tabular-nums text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2 disabled:opacity-60"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-[var(--background)]/60 text-xs">
                    <tr>
                      <td className="px-3 py-2 font-medium text-[var(--muted)]">
                        Total do período
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                        {folhaPorMes.reduce((acc, r) => acc + r.diasNoMes, 0)}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                        {estimativaPeriodo.diasPagosContados}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums text-[var(--foreground)]">
                        {formatMoney(totaisPeriodo.estimado)}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums text-[var(--success)]">
                        {formatMoney(totaisPeriodo.considerado)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <p className="mt-3 text-[11px] leading-snug text-[var(--muted)]">
              Cada dia útil de folha soma{" "}
              <code className="rounded bg-[var(--accent-muted)] px-1">folha ÷ dias do mês</code>.
              Janeiro conta a partir do dia 7 e dezembro até o dia 19; demais meses, integralmente,
              dentro do período. O valor executado, quando informado, substitui o estimado daquele
              mês no total e no saldo. Deixe o campo em branco para continuar usando o estimado.
              Os dias de férias reduzem só a simulação do estimado:{" "}
              <code className="rounded bg-[var(--accent-muted)] px-1">
                bruto × dias_férias ÷ dias_pagos
              </code>
              .
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

      {cenarios.length > 0 && (
        <section className="mb-4">
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Cenários salvos
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cenarios.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">{c.nome}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    <span className="line-clamp-2 font-medium text-[var(--foreground)]">
                      {resumoLinhasCenario(
                        Array.isArray(c.linhas) ? c.linhas : [],
                        refPgto
                      ) || "—"}
                    </span>
                    {" · "}
                    <span className="font-medium text-[var(--success)]">
                      {formatMoney(Number(c.total_valor))}
                    </span>
                  </p>
                  {(c.linhas_sem_referencia ?? 0) > 0 && (
                    <p className="mt-0.5 text-[11px] text-[#6f4d14]">
                      {c.linhas_sem_referencia} linha(s) sem referência de pagamento atual — entram
                      como R$ 0,00.
                    </p>
                  )}
                  <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                    {formatDataHora(c.created_at)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => carregarCenario(c)}
                    className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] hover:brightness-95"
                  >
                    Carregar
                  </button>
                  <button
                    type="button"
                    onClick={() => void excluirCenario(c.id, c.nome)}
                    className="rounded-md border border-[var(--danger)]/30 px-2.5 py-1 text-xs text-[var(--danger)] hover:bg-[var(--danger)]/10"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-10">
        <button
          type="button"
          onClick={() => setRefPgtoAberto((v) => !v)}
          aria-expanded={refPgtoAberto}
          aria-controls="referencia-pagamento"
          className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-left text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--accent-muted)]/40"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className={`inline-block shrink-0 text-[var(--muted)] transition-transform ${refPgtoAberto ? "rotate-90" : ""}`}
            >
              ▶
            </span>
            <span className="shrink-0">Referência de pagamento (ref_pgto)</span>
            <span className="truncate text-xs font-normal text-[var(--muted)]">
              · {refPgto.length} linha{refPgto.length === 1 ? "" : "s"}
              {totaisCenarioAtual.totalValor > 0
                ? ` · ${formatMoney(totaisCenarioAtual.totalValor)}`
                : ""}
            </span>
          </span>
          <span className="shrink-0 text-xs font-normal text-[var(--muted)]">
            {refPgtoAberto ? "Recolher" : "Expandir"}
          </span>
        </button>
        {refPgtoAberto && (
        <div
          id="referencia-pagamento"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
        >
        <p className="mb-4 text-xs text-[var(--muted)]">
          Dados somente leitura nesta tela. Para incluir ou alterar linhas, use o Supabase (SQL em{" "}
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">supabase/migration_ref_pgto.sql</code> cria a tabela).
          Selecione <strong>Meses</strong> e <strong>Pessoas</strong> para estimar o custo total
          (<code className="rounded bg-[var(--accent-muted)] px-1">valor × meses × pessoas</code>).
          Com ao menos uma linha preenchida, você pode <strong>salvar o cenário</strong> com um nome.
        </p>

        {podeSalvarCenario && (
          <div className="mb-4 rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-muted)]/50 px-4 py-3">
            {!mostrarSalvarCenario ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[var(--muted)]">
                  Seleção atual:{" "}
                  <span className="font-medium text-[var(--foreground)]">{resumoSelecaoAtual}</span>
                  {" · "}
                  <span className="font-semibold text-[var(--success)]">
                    {formatMoney(totaisCenarioAtual.totalValor)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setMostrarSalvarCenario(true)}
                  className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                >
                  Salvar cenário…
                </button>
              </div>
            ) : (
              <form onSubmit={(ev) => void salvarCenario(ev)} className="flex flex-wrap items-end gap-3">
                <div className="min-w-0 flex-1">
                  <label className="block text-xs font-medium text-[var(--muted)]">
                    Nome do cenário
                  </label>
                  <input
                    required
                    autoFocus
                    value={nomeCenario}
                    onChange={(e) => setNomeCenario(e.target.value)}
                    placeholder="Ex.: Equipe SEJUD — 6 meses"
                    className="mt-1 w-full min-w-[200px] rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--accent)]/30 focus:ring-2"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={salvandoCenario || !nomeCenario.trim()}
                    className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
                  >
                    {salvandoCenario ? "A guardar…" : "Guardar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarSalvarCenario(false);
                      setNomeCenario("");
                    }}
                    className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/60"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        {refPgto.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Nenhuma linha em ref_pgto.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Cargo</th>
                  <th className="px-3 py-2.5 font-medium">Classe/Padrão</th>
                  <th className="px-3 py-2.5 text-right font-medium">Valor/mês</th>
                  <th className="px-3 py-2.5 text-center font-medium">Meses</th>
                  <th className="px-3 py-2.5 text-center font-medium">Pessoas</th>
                  <th className="px-3 py-2.5 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {refPorCargo.map(([cargo, itens]) =>
                  itens.map((r, idx) => {
                    const valorMensal = Number(r.valor_mensal) || 0;
                    const meses = mesesPorRef[r.id] ?? 0;
                    const pessoas = pessoasPorRef[r.id] ?? 0;
                    const total = valorMensal * meses * pessoas;
                    return (
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
                          {formatMoney(valorMensal)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <select
                            value={meses}
                            onChange={(e) =>
                              setMesesPorRef((prev) => ({
                                ...prev,
                                [r.id]: Number(e.target.value),
                              }))
                            }
                            className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                            aria-label={`Meses para ${r.classe_padrao || "classe/padrão"}`}
                          >
                            <option value={0}>—</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            type="number"
                            min={0}
                            step={1}
                            value={pessoas || ""}
                            placeholder="—"
                            onChange={(e) => {
                              const raw = e.target.value;
                              const n = Number(raw);
                              setPessoasPorRef((prev) => ({
                                ...prev,
                                [r.id]: raw === "" || !Number.isFinite(n) || n < 0 ? 0 : Math.floor(n),
                              }));
                            }}
                            className="w-16 rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-center text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                            aria-label={`Pessoas para ${r.classe_padrao || "classe/padrão"}`}
                          />
                        </td>
                        <td className="px-3 py-2 text-right font-semibold tabular-nums">
                          {meses > 0 && pessoas > 0 ? (
                            <span className="text-[var(--success)]">{formatMoney(total)}</span>
                          ) : (
                            <span className="text-[var(--muted)]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="border-t-2 border-[var(--card-border)] bg-[var(--background)]/80">
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
                  >
                    Total geral
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs font-semibold tabular-nums text-[var(--muted)]">
                    {refPgto.reduce((acc, r) => acc + (pessoasPorRef[r.id] ?? 0), 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right text-base font-bold tabular-nums text-[var(--success)]">
                    {formatMoney(
                      refPgto.reduce((acc, r) => {
                        const valorMensal = Number(r.valor_mensal) || 0;
                        const meses = mesesPorRef[r.id] ?? 0;
                        const pessoas = pessoasPorRef[r.id] ?? 0;
                        return acc + valorMensal * meses * pessoas;
                      }, 0)
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
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
          {cenariosFerias.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Cenários de férias salvos
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cenariosFerias.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                        {c.nome}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">
                        {formatBR(c.data_inicio)} a {formatBR(c.data_fim)}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">
                        SEJUD{" "}
                        <span className="font-medium text-[var(--success)]">
                          −{formatMoney(Number(c.economia_sejud))}
                        </span>
                        {" · "}
                        STIC{" "}
                        <span className="font-medium text-[var(--success)]">
                          −{formatMoney(Number(c.economia_stic))}
                        </span>
                      </p>
                      {(c.sem_correspondencia ?? 0) > 0 && (
                        <p className="mt-0.5 text-[11px] text-[#6f4d14]">
                          {c.sem_correspondencia} pessoa(s) sem correspondência de cargo/classe —
                          entram como R$ 0,00.
                        </p>
                      )}
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                        {formatDataHora(c.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => carregarCenarioFerias(c)}
                        className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] hover:brightness-95"
                      >
                        Carregar
                      </button>
                      <button
                        type="button"
                        onClick={() => void excluirCenarioFerias(c.id, c.nome)}
                        className="rounded-md border border-[var(--danger)]/30 px-2.5 py-1 text-xs text-[var(--danger)] hover:bg-[var(--danger)]/10"
                      >
                        Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={() => setDetalheIntegrantesAberto((v) => !v)}
            aria-expanded={detalheIntegrantesAberto}
            aria-controls="detalhe-integrantes-mes"
            className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-left text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--accent-muted)]/40"
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`inline-block text-[var(--muted)] transition-transform ${detalheIntegrantesAberto ? "rotate-90" : ""}`}
              >
                ▶
              </span>
              <span>Detalhe por integrante (mês)</span>
              <span className="text-xs font-normal text-[var(--muted)]">
                · {integrantesConsiderados.length} pessoa{integrantesConsiderados.length === 1 ? "" : "s"}
              </span>
            </span>
            <span className="text-xs font-normal text-[var(--muted)]">
              {detalheIntegrantesAberto ? "Recolher" : "Expandir"}
            </span>
          </button>
          {detalheIntegrantesAberto && (
          <div id="detalhe-integrantes-mes" className="space-y-4">
          {podeSalvarCenarioFerias && (
            <div className="rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-muted)]/50 px-4 py-3">
              {!mostrarSalvarCenarioFerias ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-[var(--muted)]">
                    Economia no período:{" "}
                    <span className="font-semibold text-[var(--success)]">
                      −{formatMoney(detalheFeriasIntegrantes.totalEconomia)}
                    </span>
                    {" "}
                    (SEJUD −{formatMoney(detalheFeriasIntegrantes.economiaSejud)} · STIC −
                    {formatMoney(detalheFeriasIntegrantes.economiaStic)})
                  </p>
                  <button
                    type="button"
                    onClick={() => setMostrarSalvarCenarioFerias(true)}
                    className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                  >
                    Salvar cenário de férias…
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(ev) => void salvarCenarioFerias(ev)}
                  className="flex flex-wrap items-end gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <label className="block text-xs font-medium text-[var(--muted)]">
                      Nome do cenário
                    </label>
                    <input
                      required
                      autoFocus
                      value={nomeCenarioFerias}
                      onChange={(e) => setNomeCenarioFerias(e.target.value)}
                      placeholder="Ex.: Férias IS 01/2026"
                      className="mt-1 w-full min-w-[200px] rounded-lg border border-[var(--card-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--accent)]/30 focus:ring-2"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={salvandoCenarioFerias || !nomeCenarioFerias.trim()}
                      className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
                    >
                      {salvandoCenarioFerias ? "A guardar…" : "Guardar"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMostrarSalvarCenarioFerias(false);
                        setNomeCenarioFerias("");
                      }}
                      className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/60"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
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
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-[var(--card-border)] bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-2">Nome</th>
                    <th className="px-3 py-2">Cargo</th>
                    <th className="px-3 py-2">Classe/Padrão</th>
                    <th className="px-3 py-2 text-right">Valor/mês</th>
                    <th className="px-3 py-2">Dias de férias</th>
                  </tr>
                </thead>
                <tbody>
                  {integrantesConsiderados.map((i) => {
                    const contaFolha = integranteContaParaFolha(i);
                    const v = contaFolha
                      ? valorMensalDoRef(refPgto, i.cargo, i.classe_padrao)
                      : null;
                    const diasFerias = diasFeriasPorIntegrante[i.id] ?? 0;
                    const economia = detalheFeriasIntegrantes.porId[i.id]?.economia ?? 0;
                    const maxDias = detalheFeriasIntegrantes.diasPagos;
                    return (
                      <tr key={i.id} className="border-b border-[var(--card-border)]/60">
                        <td className="px-3 py-2">{i.nome}</td>
                        <td className="px-3 py-2 text-[var(--muted)]">{i.cargo || "—"}</td>
                        <td className="px-3 py-2 text-[var(--muted)]">{i.classe_padrao || "—"}</td>
                        <td className="px-3 py-2 text-right font-medium text-[var(--accent)]">
                          {formatMoney(v)}
                        </td>
                        <td className="px-3 py-2">
                          {contaFolha && !estimativaPeriodo.erro ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                max={maxDias > 0 ? maxDias : undefined}
                                step={1}
                                value={diasFerias || ""}
                                placeholder="0"
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  const n = Number(raw);
                                  setDiasFeriasPorIntegrante((prev) => ({
                                    ...prev,
                                    [i.id]:
                                      raw === "" || !Number.isFinite(n) || n < 0
                                        ? 0
                                        : Math.floor(
                                            maxDias > 0 ? Math.min(n, maxDias) : n
                                          ),
                                  }));
                                }}
                                className="w-16 rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-center text-sm outline-none ring-[var(--accent)]/30 focus:ring-2"
                                aria-label={`Dias de férias de ${i.nome ?? "integrante"}`}
                              />
                              {diasFerias > 0 ? (
                                <span className="text-xs font-medium text-[var(--success)]">
                                  −{formatMoney(economia)}
                                </span>
                              ) : (
                                <span className="text-xs text-[var(--muted)]">—</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-[var(--muted)]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-[var(--card-border)] bg-[var(--background)]/80 text-sm">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
                    >
                      Economia SEJUD
                    </td>
                    <td className="px-3 py-2 font-semibold text-[var(--success)]">
                      {detalheFeriasIntegrantes.economiaSejud > 0
                        ? `−${formatMoney(detalheFeriasIntegrantes.economiaSejud)}`
                        : "—"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
                    >
                      Economia STIC
                    </td>
                    <td className="px-3 py-2 font-semibold text-[var(--success)]">
                      {detalheFeriasIntegrantes.economiaStic > 0
                        ? `−${formatMoney(detalheFeriasIntegrantes.economiaStic)}`
                        : "—"}
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--card-border)]/60">
                    <td
                      colSpan={4}
                      className="px-3 py-2.5 text-right text-xs font-bold uppercase tracking-wide text-[var(--foreground)]"
                    >
                      Total economizado (férias)
                    </td>
                    <td className="px-3 py-2.5 text-base font-bold text-[var(--success)]">
                      {detalheFeriasIntegrantes.totalEconomia > 0
                        ? `−${formatMoney(detalheFeriasIntegrantes.totalEconomia)}`
                        : "—"}
                    </td>
                  </tr>
                </tfoot>
              </table>
              {!estimativaPeriodo.erro && detalheFeriasIntegrantes.diasPagos > 0 && (
                <p className="border-t border-[var(--card-border)]/60 px-3 py-2 text-[11px] leading-snug text-[var(--muted)]">
                  A economia usa o período {formatBR(dataInicioPeriodo)} a {formatBR(dataFimPeriodo)}{" "}
                  ({detalheFeriasIntegrantes.diasPagos} dia
                  {detalheFeriasIntegrantes.diasPagos === 1 ? "" : "s"} pago
                  {detalheFeriasIntegrantes.diasPagos === 1 ? "" : "s"}): valor do integrante no
                  período × dias de férias ÷ dias pagos.
                </p>
              )}
            </div>
          </div>
          </div>
          )}
        </section>
      )}
    </div>
  );
}
