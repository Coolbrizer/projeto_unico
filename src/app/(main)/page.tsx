"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { usePerfil } from "@/components/AppShell";
import { canEditarAtividadesIntegrantes, isAdmin } from "@/lib/auth/roles";
import { formatarPeriodoAtividade, normalizarDataParaApi } from "@/lib/datas-atividade";
import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Atividade } from "@/types/database";

/** Busca em código, descrição e responsável: cada palavra deve aparecer em algum desses campos. */
function atividadeMatchesBusca(a: Atividade, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  const codigo = (a.codigo ?? "").toLowerCase();
  const desc = (a.descricao ?? "").toLowerCase();
  const resp = (a.responsavel ?? "").toLowerCase();
  const campos = [codigo, desc, resp];
  return tokens.every((tok) => campos.some((c) => c.includes(tok)));
}

export default function AtividadesPage() {
  const searchParams = useSearchParams();
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarAtividadesIntegrantes(perfil);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [sessionNomeCarregado, setSessionNomeCarregado] = useState(false);
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");

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
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  const showAviso = useCallback((tipo: "sucesso" | "erro", texto: string) => {
    setAviso({ tipo, texto });
    window.setTimeout(() => {
      setAviso((atual) => (atual?.tipo === tipo && atual?.texto === texto ? null : atual));
    }, 3500);
  }, []);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/atividades", { credentials: "include" });
    const data = (await res.json()) as { error?: string; atividades?: Atividade[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar as atividades.");
    } else {
      setRows(data.atividades ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = (await res.json()) as { user?: { nome?: string | null } | null };
        if (!cancelled) setNomeUsuario(data.user?.nome?.trim() ?? null);
      } finally {
        if (!cancelled) setSessionNomeCarregado(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const buscaInicial = searchParams.get("busca");
    if (buscaInicial) {
      setBusca(buscaInicial);
    }
  }, [searchParams]);

  const podeEditarRelatorio = useCallback(
    (a: Atividade) => {
      if (isAdmin(perfil)) return true;
      if (!sessionNomeCarregado) return false;
      if (!nomeUsuario) return false;
      return integranteNomeMatchResponsavelAtividade(nomeUsuario, a.responsavel);
    },
    [perfil, nomeUsuario, sessionNomeCarregado]
  );

  const filtradas = useMemo(
    () => rows.filter((a) => atividadeMatchesBusca(a, busca)),
    [rows, busca]
  );

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

  async function saveRelatorio(a: Atividade) {
    if (!podeEditarRelatorio(a)) return;
    const etiqueta = relatorioEtiqueta.trim();
    const link = relatorioLink.trim();
    if (progressoEdit === 100 && !etiqueta) {
      showAviso("erro", "Progresso não salvo. Informe etiqueta");
      return;
    }
    if (progressoEdit === 100 && !link) {
      showAviso("erro", "Progresso não salvo. Informe link");
      return;
    }
    setSavingRelatorio(true);
    setError(null);
    const res = await fetch(`/api/atividades/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        etiqueta_relatorio: etiqueta || null,
        link_relatorio: link || null,
        progresso: progressoEdit,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSavingRelatorio(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
    } else {
      showAviso("sucesso", "Progresso salvo com sucesso");
      void load();
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      {aviso && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg border px-4 py-2 text-sm shadow-lg ${
            aviso.tipo === "sucesso"
              ? "border-emerald-300 bg-emerald-100 text-emerald-800"
              : "border-red-300 bg-red-100 text-red-800"
          }`}
        >
          {aviso.texto}
        </div>
      )}
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Atividades</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Código, descrição, responsável e datas de início e fim (formato DD/MM/AAAA). O memorando de
          pagamento usa esse período para filtrar por mês. Progresso, etiqueta e link do relatório só
          podem ser alterados pelo responsável cadastrado (administradores também podem). A busca cobre
          código, descrição e responsável.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="block text-xs text-[var(--muted)]">Buscar</label>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Código, descrição ou responsável (várias palavras refinam a busca)"
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
        </div>
        {podeEditar && (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
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
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Responsável</label>
              <input
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
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
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
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
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">
                Progresso: <span className="font-medium text-[var(--accent)]">{progressoNovo}%</span>
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
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-[var(--accent)]/70"
                  style={{ width: `${progressoNovo}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
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
            {configured
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
                    className="min-w-0 flex-1 rounded-lg text-left outline-none ring-[var(--accent)]/40 focus-visible:ring-2"
                  >
                    <p className="font-medium">
                      {a.codigo ? <span className="text-[var(--accent)]">{a.codigo}</span> : "—"}
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
                        <span className="font-medium text-[var(--accent)]">
                          {Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0))}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]/70"
                          style={{
                            width: `${Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0))}%`,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-[var(--accent-hover)]/90">
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
                      className="self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-700 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
                    >
                      Excluir
                    </button>
                  )}
                </div>
                {expandedId === a.id && (
                  <div className="border-t border-[var(--card-border)] bg-[var(--background)]/50 px-4 py-4">
                    <p className="mb-3 text-xs font-medium text-[var(--muted)]">Relatório</p>
                    {!sessionNomeCarregado && !isAdmin(perfil) ? (
                      <p className="text-sm text-[var(--muted)]">A verificar permissões…</p>
                    ) : !podeEditarRelatorio(a) ? (
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-[var(--muted)]">Progresso: </span>
                          <span className="font-medium text-[var(--accent)]">
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
                              className="text-[var(--accent-hover)] underline"
                            >
                              {a.link_relatorio}
                            </a>
                          </p>
                        )}
                        <p className="text-xs text-[var(--muted)]">
                          Apenas o responsável pela atividade pode editar estes campos.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">
                              Progresso:{" "}
                              <span className="font-medium text-[var(--accent)]">{progressoEdit}%</span>
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
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                              <div
                                className="h-full rounded-full bg-[var(--accent)]/70"
                                style={{ width: `${progressoEdit}%` }}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">Etiqueta do Relatório</label>
                            <input
                              value={relatorioEtiqueta}
                              onChange={(e) => setRelatorioEtiqueta(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--muted)]">Link do Relatório</label>
                            <input
                              type="url"
                              value={relatorioLink}
                              onChange={(e) => setRelatorioLink(e.target.value)}
                              placeholder="https://…"
                              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={savingRelatorio}
                          onClick={() => void saveRelatorio(a)}
                          className="mt-3 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
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
