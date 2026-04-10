"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { canEditarEquipe } from "@/lib/auth/roles";
import { formatarPeriodoAtividade } from "@/lib/datas-atividade";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
import { montarGrupos } from "@/lib/equipe-grupos";
import {
  gerarPdfMemorandoPagamento,
  listarIntegrantesMemorandoPagamento,
} from "@/lib/memorando-pagamento";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured, useSupabase } from "@/lib/supabase/client";
import type { Atividade, Equipe, Integrante } from "@/types/database";

type FiltroEquipe = "codigo" | "nome";

const MESES_PT = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export default function EquipePage() {
  const mounted = useMounted();
  const supabase = useSupabase();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarEquipe(perfil);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<FiltroEquipe>("codigo");
  const [mesExtracao, setMesExtracao] = useState("");
  const [anoExtracao, setAnoExtracao] = useState("");

  const anosExtracao = useMemo(() => {
    const central = new Date().getFullYear();
    return Array.from({ length: 17 }, (_, i) => central - 5 + i);
  }, []);

  const [codigo, setCodigo] = useState("");
  const [equipe, setEquipe] = useState("");

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setError(null);
    const [rEq, rAt, rInt] = await Promise.all([
      supabase.from("equipe").select("*").order("created_at", { ascending: false }),
      supabase.from("atividades").select("*").order("created_at", { ascending: false }),
      supabase
        .from("integrantes")
        .select("id, matricula, nome, setor, cargo, classe_padrao, email, created_at")
        .order("nome", { ascending: true }),
    ]);
    if (rEq.error) setError(rEq.error.message);
    else setEquipes((rEq.data as Equipe[]) ?? []);
    if (rAt.error) setError(rAt.error.message);
    else setAtividades((rAt.data as Atividade[]) ?? []);
    if (rInt.error) setError(rInt.error.message);
    else setIntegrantes((rInt.data as Integrante[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const grupos = useMemo(
    () => montarGrupos(equipes, atividades, integrantes),
    [equipes, atividades, integrantes]
  );

  const gruposFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return grupos;
    return grupos.filter((g) => {
      if (filtro === "codigo") {
        return (g.codigo || "").toLowerCase().includes(q);
      }
      const inEquipe = g.equipeRows.some((e) =>
        (e.equipe || "").toLowerCase().includes(q)
      );
      const inInt = g.integrantes.some(
        (i) =>
          (i.nome || "").toLowerCase().includes(q) ||
          (i.setor || "").toLowerCase().includes(q)
      );
      const inAt =
        (g.atividade?.descricao || "").toLowerCase().includes(q) ||
        (g.atividade?.responsavel || "").toLowerCase().includes(q);
      return inEquipe || inInt || inAt;
    });
  }, [grupos, busca, filtro]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar) return;
    setError(null);
    const res = await fetch("/api/equipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ codigo: codigo.trim(), equipe: equipe.trim() }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
      return;
    }
    setCodigo("");
    setEquipe("");
    setShowForm(false);
    void load();
  }

  async function remove(id: string) {
    if (!podeEditar) return;
    setError(null);
    const res = await fetch(`/api/equipe/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else void load();
  }

  function handleMemorandoPagamento() {
    if (!mesExtracao || !anoExtracao) {
      window.alert("Selecione o mês e o ano para extração do relatório");
      return;
    }
    const month = Number(mesExtracao);
    const year = Number(anoExtracao);
    if (!year || !month || month < 1 || month > 12) {
      window.alert("Selecione o mês e o ano para extração do relatório");
      return;
    }
    const resultado = listarIntegrantesMemorandoPagamento(
      equipes,
      atividades,
      integrantes,
      year,
      month
    );
    gerarPdfMemorandoPagamento(resultado, year, month);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Equipe</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Agrupado por código de atividade. Integrantes aparecem quando o setor coincide com o nome da
          equipe ou com o código. O responsável vem do cadastro de Atividades (mesmo código).
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)]/80 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--muted)]">
              Mês <span className="text-amber-400">*</span>
            </label>
            <select
              value={mesExtracao}
              onChange={(e) => setMesExtracao(e.target.value)}
              className="mt-1 min-w-[180px] rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            >
              <option value="">Selecione o mês</option>
              {MESES_PT.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted)]">
              Ano <span className="text-amber-400">*</span>
            </label>
            <select
              value={anoExtracao}
              onChange={(e) => setAnoExtracao(e.target.value)}
              className="mt-1 min-w-[120px] rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            >
              <option value="">Selecione o ano</option>
              {anosExtracao.map((a) => (
                <option key={a} value={String(a)}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleMemorandoPagamento}
          disabled={!supabase || loading}
          className="rounded-lg border border-amber-500/50 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/25 disabled:opacity-50"
        >
          Memorando de Pagamento
        </button>
        <p className="text-xs text-[var(--muted)] sm:max-w-md">
          Lista em PDF com cada nome uma vez: integrantes vinculados às atividades com período que cruza o
          mês (setor alinhado ao código ou às linhas de equipe, nome alinhado a cada linha em Equipes/funções,
          ou ao responsável cadastrado na atividade).
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="block text-xs text-[var(--muted)]">Buscar</label>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite para filtrar…"
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
          />
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-xs text-[var(--muted)]">Filtrar por</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as FiltroEquipe)}
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
          >
            <option value="codigo">Código</option>
            <option value="nome">Nome (equipe, integrante, descrição)</option>
          </select>
        </div>
        {podeEditar && (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            {showForm ? "Fechar formulário" : "Adicionar"}
          </button>
        )}
      </div>

      {showForm && podeEditar && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
        >
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Novo registro de equipe</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-[var(--muted)]">Código (ligar à atividade)</label>
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Equipe</label>
              <input
                value={equipe}
                onChange={(e) => setEquipe(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Visão agrupada</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : gruposFiltrados.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {supabase
              ? grupos.length === 0
                ? "Nenhum dado para agrupar."
                : "Nenhum resultado para a busca."
              : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <div className="space-y-8">
            {gruposFiltrados.map((g) => (
              <div
                key={g.codigo || "__vazio__"}
                className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
              >
                <div className="border-b border-[var(--card-border)] bg-slate-950/40 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                    Código da atividade
                  </p>
                  <p className="mt-1 text-lg font-semibold text-sky-300">
                    {g.codigo ? g.codigo : "(sem código)"}
                  </p>
                  {g.atividade?.descricao && (
                    <p className="mt-2 text-sm text-[var(--foreground)]">{g.atividade.descricao}</p>
                  )}
                  {g.atividade && (
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Período: {formatarPeriodoAtividade(g.atividade)}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 p-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      Equipes / funções
                    </h4>
                    {g.equipeRows.length === 0 ? (
                      <p className="text-sm text-[var(--muted)]">Nenhum registro de equipe.</p>
                    ) : (
                      <ul className="space-y-2">
                        {g.equipeRows.map((r) => {
                          const ehResp = equipeLinhaEhResponsavel(
                            r.equipe ?? "",
                            g.atividade?.responsavel
                          );
                          return (
                            <li
                              key={r.id}
                              className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                                ehResp
                                  ? "border border-emerald-500/45 bg-emerald-500/10 ring-1 ring-emerald-500/25"
                                  : "border border-[var(--card-border)] bg-[var(--background)]/60"
                              }`}
                            >
                              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                                <span className={ehResp ? "font-medium text-emerald-100" : ""}>
                                  {r.equipe || "—"}
                                </span>
                                {ehResp && (
                                  <span className="shrink-0 rounded bg-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                                    Responsável pela atividade
                                  </span>
                                )}
                              </span>
                              {podeEditar && (
                                <button
                                  type="button"
                                  onClick={() => void remove(r.id)}
                                  className="shrink-0 rounded border border-red-500/40 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                                >
                                  Excluir
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      Integrantes (setor alinhado a este código ou à equipe)
                    </h4>
                    {g.integrantes.length === 0 ? (
                      <p className="text-sm text-[var(--muted)]">Nenhum integrante associado.</p>
                    ) : (
                      <ul className="space-y-2">
                        {g.integrantes.map((i) => (
                          <li
                            key={i.id}
                            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)]/60 px-3 py-2 text-sm"
                          >
                            <span className="font-medium text-[var(--foreground)]">{i.nome}</span>
                            <span className="text-[var(--muted)]"> · Mat. {i.matricula}</span>
                            {i.setor && (
                              <p className="mt-0.5 text-xs text-[var(--muted)]">Setor: {i.setor}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
