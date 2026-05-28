"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
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
  DATA_ORCAMENTO_INICIO_ISO,
  despesaFolhaPeriodo,
  diasNoMes,
  integranteContaParaFolha,
  reducaoFeriasNoPeriodo,
  totalDespesaMensalFolha,
  valorMensalDoRef,
} from "@/lib/orcamento-folha";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type {
  Atividade,
  Equipe,
  Integrante,
  Orcamento,
  OrcamentoCenario,
  OrcamentoCenarioFerias,
  RefPgto,
} from "@/types/database";

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
  const [mesesPorRef, setMesesPorRef] = useState<Record<string, number>>({});
  const [pessoasPorRef, setPessoasPorRef] = useState<Record<string, number>>({});
  const [periodoInstrucao, setPeriodoInstrucao] = useState<{ inicio: string; fim: string } | null>(null);
  const [detalheIntegrantesAberto, setDetalheIntegrantesAberto] = useState(false);
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
    void loadCenarios();
    void loadCenariosFerias();
  }, [load, loadCenarios, loadCenariosFerias]);

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
    setDataInicioPeriodo(c.data_inicio);
    setDataFimPeriodo(c.data_fim);
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

      <section className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">
          Referência de pagamento (ref_pgto)
        </h3>
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
