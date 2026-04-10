"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { usePerfil } from "@/components/AppShell";
import { canEditarAtividadesIntegrantes } from "@/lib/auth/roles";
import { formatarPeriodoAtividade, normalizarDataParaApi } from "@/lib/datas-atividade";
import { useIsSupabaseConfigured, useSupabase } from "@/lib/supabase/client";
import type { Atividade } from "@/types/database";

type FiltroAtividade = "codigo" | "descricao" | "responsavel";

export default function AtividadesPage() {
  const mounted = useMounted();
  const supabase = useSupabase();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarAtividadesIntegrantes(perfil);
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<FiltroAtividade>("codigo");

  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [progressoNovo, setProgressoNovo] = useState(0);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [relatorioEtiqueta, setRelatorioEtiqueta] = useState("");
  const [relatorioLink, setRelatorioLink] = useState("");
  const [savingRelatorio, setSavingRelatorio] = useState(false);
  const [progressoEdit, setProgressoEdit] = useState(0);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setError(null);
    const { data, error: err } = await supabase
      .from("atividades")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setRows((data as Atividade[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((a) => {
      let texto = "";
      if (filtro === "codigo") texto = a.codigo ?? "";
      else if (filtro === "descricao") texto = a.descricao ?? "";
      else texto = a.responsavel ?? "";
      return texto.toLowerCase().includes(q);
    });
  }, [rows, busca, filtro]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar) return;
    setError(null);
    const res = await fetch("/api/atividades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        codigo: codigo.trim(),
        descricao: descricao.trim() || null,
        responsavel: responsavel.trim() || null,
        inicio: normalizarDataParaApi(inicio) ?? null,
        fim: normalizarDataParaApi(fim) ?? null,
        progresso: progressoNovo,
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
      return;
    }
    setCodigo("");
    setDescricao("");
    setResponsavel("");
    setInicio("");
    setFim("");
    setProgressoNovo(0);
    setShowForm(false);
    void load();
  }

  async function remove(id: string) {
    if (!podeEditar) return;
    setError(null);
    const res = await fetch(`/api/atividades/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível excluir.");
      return;
    }
    if (expandedId === id) {
      setExpandedId(null);
    }
    void load();
  }

  function handleToggleRelatorio(a: Atividade) {
    if (expandedId === a.id) {
      setExpandedId(null);
    } else {
      setExpandedId(a.id);
      setRelatorioEtiqueta(a.etiqueta_relatorio ?? "");
      setRelatorioLink(a.link_relatorio ?? "");
      setProgressoEdit(Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0)));
    }
  }

  async function saveRelatorio(id: string) {
    if (!podeEditar) return;
    setSavingRelatorio(true);
    setError(null);
    const res = await fetch(`/api/atividades/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        etiqueta_relatorio: relatorioEtiqueta.trim() || null,
        link_relatorio: relatorioLink.trim() || null,
        progresso: progressoEdit,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSavingRelatorio(false);
    if (!res.ok) setError(data.error ?? "Não foi possível guardar.");
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Atividades</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Código, descrição, responsável e datas de início e fim (formato DD/MM/AAAA). O memorando de
          pagamento usa esse período para filtrar por mês.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

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
            onChange={(e) => setFiltro(e.target.value as FiltroAtividade)}
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
          >
            <option value="codigo">Código</option>
            <option value="descricao">Nome / descrição</option>
            <option value="responsavel">Responsável</option>
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
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Nova atividade</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-[var(--muted)]">Código</label>
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Responsável</label>
              <input
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Início</label>
              <input
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                placeholder="DD/MM/AAAA"
                inputMode="numeric"
                autoComplete="off"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Final</label>
              <input
                value={fim}
                onChange={(e) => setFim(e.target.value)}
                placeholder="DD/MM/AAAA"
                inputMode="numeric"
                autoComplete="off"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">
                Progresso: <span className="font-medium text-sky-300">{progressoNovo}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={progressoNovo}
                onChange={(e) => setProgressoNovo(Number(e.target.value))}
                className="mt-2 w-full"
              />
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-sky-500/70"
                  style={{ width: `${progressoNovo}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
            >
              Guardar atividade
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
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : filtradas.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {supabase
              ? rows.length === 0
                ? "Nenhuma atividade ainda."
                : "Nenhum resultado para a busca."
              : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {filtradas.map((a) => (
              <li
                key={a.id}
                className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
              >
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleRelatorio(a)}
                    className="min-w-0 flex-1 rounded-lg text-left outline-none ring-sky-500/50 focus-visible:ring-2"
                  >
                    <p className="font-medium">
                      {a.codigo ? <span className="text-sky-300">{a.codigo}</span> : "—"}
                      {a.descricao && (
                        <span className="font-normal text-[var(--foreground)]">
                          {" "}
                          — {a.descricao}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      Responsável: {a.responsavel || "—"}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Período: {formatarPeriodoAtividade(a)}
                    </p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                        <span>Progresso</span>
                        <span className="font-medium text-sky-300">
                          {Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0))}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-sky-500/70"
                          style={{
                            width: `${Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0))}%`,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-sky-400/90">
                      {expandedId === a.id ? "Clique para fechar o relatório" : "Clique para ver o relatório"}
                    </p>
                  </button>
                  {podeEditar && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        void remove(a.id);
                      }}
                      className="self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-300 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
                    >
                      Excluir
                    </button>
                  )}
                </div>
                {expandedId === a.id && (
                  <div className="border-t border-[var(--card-border)] bg-[var(--background)]/50 px-4 py-4">
                    <p className="mb-3 text-xs font-medium text-[var(--muted)]">Relatório</p>
                    {!podeEditar ? (
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-[var(--muted)]">Progresso: </span>
                          <span className="font-medium text-sky-300">
                            {Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0))}%
                          </span>
                        </p>
                        {a.etiqueta_relatorio && (
                          <p>
                            <span className="text-[var(--muted)]">Etiqueta: </span>
                            {a.etiqueta_relatorio}
                          </p>
                        )}
                        {a.link_relatorio && (
                          <p>
                            <span className="text-[var(--muted)]">Link: </span>
                            <a
                              href={a.link_relatorio}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sky-400 underline"
                            >
                              {a.link_relatorio}
                            </a>
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">
                              Progresso:{" "}
                              <span className="font-medium text-sky-300">{progressoEdit}%</span>
                            </label>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={10}
                              value={progressoEdit}
                              onChange={(e) => setProgressoEdit(Number(e.target.value))}
                              className="mt-2 w-full"
                            />
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-sky-500/70"
                                style={{ width: `${progressoEdit}%` }}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">Etiqueta do Relatório</label>
                            <input
                              value={relatorioEtiqueta}
                              onChange={(e) => setRelatorioEtiqueta(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">Link do Relatório</label>
                            <input
                              type="url"
                              value={relatorioLink}
                              onChange={(e) => setRelatorioLink(e.target.value)}
                              placeholder="https://…"
                              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={savingRelatorio}
                          onClick={() => void saveRelatorio(a.id)}
                          className="mt-3 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
                        >
                          {savingRelatorio ? "A guardar…" : "Guardar relatório"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
