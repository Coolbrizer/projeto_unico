"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/auth/roles";
import type { Atividade, Integrante } from "@/types/database";

type StatusFaixa = "nao_iniciada" | "em_andamento" | "concluida";

const STATUS_CONFIG: Record<
  StatusFaixa,
  { label: string; cor: string; fundo: string; texto: string }
> = {
  nao_iniciada: {
    label: "Não Iniciada",
    cor: "#ef4444",
    fundo: "bg-red-500/10",
    texto: "text-red-700",
  },
  em_andamento: {
    label: "Em Andamento",
    cor: "#f59e0b",
    fundo: "bg-amber-500/10",
    texto: "text-amber-700",
  },
  concluida: {
    label: "Concluída",
    cor: "#10b981",
    fundo: "bg-emerald-500/10",
    texto: "text-emerald-700",
  },
};

function progressoSeguro(valor: number | null | undefined): number {
  return Math.min(100, Math.max(0, Number(valor ?? 0) || 0));
}

function statusPorProgresso(valor: number | null | undefined): StatusFaixa {
  const progresso = progressoSeguro(valor);
  if (progresso === 0) return "nao_iniciada";
  if (progresso === 100) return "concluida";
  return "em_andamento";
}

function formatarResponsavel(raw: string | null | undefined): string {
  return (raw ?? "").trim() || "Não informado";
}

function PizzaStatus({
  totais,
}: {
  totais: Record<StatusFaixa, number>;
}) {
  const totalGeral = totais.nao_iniciada + totais.em_andamento + totais.concluida;
  const naoIniciadaDeg = totalGeral > 0 ? (totais.nao_iniciada / totalGeral) * 360 : 0;
  const emAndamentoDeg = totalGeral > 0 ? (totais.em_andamento / totalGeral) * 360 : 0;
  const concluidaDeg = totalGeral > 0 ? (totais.concluida / totalGeral) * 360 : 0;
  const style = {
    background: `conic-gradient(
      ${STATUS_CONFIG.nao_iniciada.cor} 0deg ${naoIniciadaDeg}deg,
      ${STATUS_CONFIG.em_andamento.cor} ${naoIniciadaDeg}deg ${naoIniciadaDeg + emAndamentoDeg}deg,
      ${STATUS_CONFIG.concluida.cor} ${naoIniciadaDeg + emAndamentoDeg}deg ${
        naoIniciadaDeg + emAndamentoDeg + concluidaDeg
      }deg
    )`,
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="h-36 w-36 rounded-full border border-[var(--card-border)]"
          style={style}
          aria-label="Distribuição das atividades por status"
        />
        <div className="space-y-2 text-sm">
          {(Object.keys(STATUS_CONFIG) as StatusFaixa[]).map((status) => {
            const qtd = totais[status];
            const perc = totalGeral > 0 ? Math.round((qtd / totalGeral) * 100) : 0;
            const cfg = STATUS_CONFIG[status];
            return (
              <p key={status} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cfg.cor }}
                  aria-hidden
                />
                <span className="text-[var(--muted)]">{cfg.label}:</span>
                <span className="font-medium text-[var(--foreground)]">
                  {qtd} ({perc}%)
                </span>
              </p>
            );
          })}
        </div>
      </div>
      <div className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Total de atividades na IS</p>
        <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">{totalGeral}</p>
      </div>
    </div>
  );
}

export default function MeuPerfilPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const { instrucaoServicoId } = useInstrucaoServicoSelecionada();
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [sessionNomeCarregado, setSessionNomeCarregado] = useState(false);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState("");
  const [buscaPessoa, setBuscaPessoa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusFaixa | "todos">("todos");
  const [busca, setBusca] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [progressoEdit, setProgressoEdit] = useState(0);
  const [etiquetaEdit, setEtiquetaEdit] = useState("");
  const [linkEdit, setLinkEdit] = useState("");
  const [saving, setSaving] = useState(false);
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  const showAviso = useCallback((tipo: "sucesso" | "erro", texto: string) => {
    setAviso({ tipo, texto });
    window.setTimeout(() => {
      setAviso((atual) => (atual?.tipo === tipo && atual?.texto === texto ? null : atual));
    }, 3500);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const filtro = instrucaoServicoId
      ? `?instrucaoServicoId=${encodeURIComponent(instrucaoServicoId)}`
      : "";
    const res = await fetch(`/api/atividades${filtro}`, { credentials: "include" });
    const data = (await res.json()) as { error?: string; atividades?: Atividade[] };
    if (!res.ok) {
      setRows([]);
      setError(data.error ?? "Não foi possível carregar as atividades.");
    } else {
      setRows(data.atividades ?? []);
    }
    setLoading(false);
  }, [instrucaoServicoId]);

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
    if (!isAdmin(perfil)) return;
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/integrantes", { credentials: "include" });
      const data = (await res.json()) as { integrantes?: Integrante[] };
      if (!cancelled && res.ok) {
        const lista = data.integrantes ?? [];
        setIntegrantes(lista);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [perfil]);

  useEffect(() => {
    if (!sessionNomeCarregado || !nomeUsuario) return;
    setPessoaSelecionada((atual) => (atual ? atual : nomeUsuario));
  }, [sessionNomeCarregado, nomeUsuario]);

  const pessoasComAtividades = useMemo(() => {
    const nomesAtividades = Array.from(
      new Set(
        rows
          .map((atividade) => (atividade.responsavel ?? "").trim())
          .filter(Boolean)
      )
    );

    return nomesAtividades
      .map((nomeResponsavel) => {
        const integrante =
          integrantes.find((item) => integranteNomeMatchResponsavelAtividade(item.nome, nomeResponsavel)) ??
          null;
        return {
          valor: integrante?.nome?.trim() || nomeResponsavel,
          label: integrante?.nome?.trim() || nomeResponsavel,
        };
      })
      .filter((item, index, list) => item.valor && list.findIndex((x) => x.valor === item.valor) === index)
      .sort((a, b) => a.label.localeCompare(b.label, "pt-BR", { sensitivity: "base" }));
  }, [rows, integrantes]);

  useEffect(() => {
    if (!isAdmin(perfil)) return;
    setBuscaPessoa((atual) => (atual ? atual : pessoaSelecionada));
  }, [perfil, pessoaSelecionada]);

  useEffect(() => {
    if (!isAdmin(perfil)) return;
    if (!pessoasComAtividades.some((item) => item.valor === pessoaSelecionada)) {
      const proximo = pessoasComAtividades[0]?.valor ?? "";
      setPessoaSelecionada(proximo);
      setBuscaPessoa(proximo);
    }
  }, [perfil, pessoasComAtividades, pessoaSelecionada]);

  const nomePerfilVisualizado = useMemo(() => {
    if (isAdmin(perfil)) {
      return pessoaSelecionada.trim() || nomeUsuario || "";
    }
    return nomeUsuario || "";
  }, [perfil, pessoaSelecionada, nomeUsuario]);

  const minhasAtividades = useMemo(() => {
    if (!nomePerfilVisualizado) return [];
    return rows.filter((atividade) =>
      integranteNomeMatchResponsavelAtividade(nomePerfilVisualizado, atividade.responsavel)
    );
  }, [rows, nomePerfilVisualizado]);

  const atividadesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return minhasAtividades
      .filter((atividade) => {
        if (filtroStatus !== "todos" && statusPorProgresso(atividade.progresso) !== filtroStatus) {
          return false;
        }
        if (!termo) return true;
        const codigo = (atividade.codigo ?? "").toLowerCase();
        const descricao = (atividade.descricao ?? "").toLowerCase();
        const responsavel = (atividade.responsavel ?? "").toLowerCase();
        return [codigo, descricao, responsavel].some((texto) => texto.includes(termo));
      })
      .sort((a, b) => (a.codigo ?? "").localeCompare(b.codigo ?? "", "pt-BR", { sensitivity: "base" }));
  }, [minhasAtividades, filtroStatus, busca]);

  const totaisStatus = useMemo(
    () =>
      minhasAtividades.reduce<Record<StatusFaixa, number>>(
        (acc, atividade) => {
          const status = statusPorProgresso(atividade.progresso);
          acc[status] += 1;
          return acc;
        },
        { nao_iniciada: 0, em_andamento: 0, concluida: 0 }
      ),
    [minhasAtividades]
  );

  const podeEditarAtividade = useCallback(
    (atividade: Atividade) => {
      if (isAdmin(perfil)) return true;
      if (!sessionNomeCarregado || !nomeUsuario) return false;
      return integranteNomeMatchResponsavelAtividade(nomeUsuario, atividade.responsavel);
    },
    [perfil, sessionNomeCarregado, nomeUsuario]
  );

  function toggleEdicao(atividade: Atividade) {
    if (expandedId === atividade.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(atividade.id);
    setProgressoEdit(progressoSeguro(atividade.progresso));
    setEtiquetaEdit(atividade.etiqueta_relatorio ?? "");
    setLinkEdit(atividade.link_relatorio ?? "");
  }

  async function salvarEdicao(atividade: Atividade) {
    if (!podeEditarAtividade(atividade)) return;
    if (progressoEdit === 100 && !etiquetaEdit.trim()) {
      showAviso("erro", "Informe a etiqueta para concluir com 100%.");
      return;
    }
    if (progressoEdit === 100 && !linkEdit.trim()) {
      showAviso("erro", "Informe o link para concluir com 100%.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/atividades/${atividade.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        progresso: progressoEdit,
        etiqueta_relatorio: etiquetaEdit.trim() || null,
        link_relatorio: linkEdit.trim() || null,
      }),
    });
    const data = (await res.json()) as { error?: string };
    setSaving(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível salvar as alterações.");
      return;
    }
    showAviso("sucesso", "Alterações salvas com sucesso.");
    void load();
  }

  return (
    <div className="mx-auto max-w-6xl">
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
        <h2 className="text-2xl font-semibold tracking-tight">Meu perfil</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          A página mostra as atividades em que o perfil selecionado atua como responsável dentro da
          Instrução de Serviço selecionada no topo.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      {!sessionNomeCarregado ? (
        <p className="text-sm text-[var(--muted)]">A identificar seu perfil…</p>
      ) : !nomePerfilVisualizado ? (
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-800">
          Não foi possível identificar o perfil para filtrar as atividades.
        </p>
      ) : (
        <>
          {isAdmin(perfil) && (
            <section className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Perfil visualizado</h3>
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end">
                <div>
                  <label className="block text-xs text-[var(--muted)]">Pessoa</label>
                  <input
                    list="pessoas-com-atividades"
                    value={buscaPessoa}
                    onChange={(e) => {
                      const valor = e.target.value;
                      setBuscaPessoa(valor);
                      const opcaoEncontrada = pessoasComAtividades.find(
                        (item) => item.label.toLowerCase() === valor.trim().toLowerCase()
                      );
                      if (opcaoEncontrada) {
                        setPessoaSelecionada(opcaoEncontrada.valor);
                      }
                    }}
                    onBlur={() => {
                      const opcaoEncontrada = pessoasComAtividades.find(
                        (item) => item.label.toLowerCase() === buscaPessoa.trim().toLowerCase()
                      );
                      const proximo = opcaoEncontrada?.valor ?? pessoaSelecionada;
                      setPessoaSelecionada(proximo);
                      setBuscaPessoa(proximo);
                    }}
                    placeholder="Digite para buscar uma pessoa"
                    className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                  />
                  <datalist id="pessoas-com-atividades">
                    {pessoasComAtividades.map((item) => (
                      <option key={item.valor} value={item.label} />
                    ))}
                  </datalist>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  Visualizando:{" "}
                  <span className="font-medium text-[var(--foreground)]">{nomePerfilVisualizado}</span>
                </p>
              </div>
              {pessoasComAtividades.length === 0 && (
                <p className="mt-3 text-sm text-[var(--muted)]">
                  Nenhuma pessoa com atividade responsável encontrada para a IS selecionada.
                </p>
              )}
            </section>
          )}

          <section className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
            <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Visão geral</h3>
            <PizzaStatus totais={totaisStatus} />
          </section>

          <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="block text-xs text-[var(--muted)]">Buscar na minha lista</label>
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Código, descrição ou responsável"
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                />
              </div>
              <div className="md:w-60">
                <label className="block text-xs text-[var(--muted)]">Status</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value as StatusFaixa | "todos")}
                  className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                >
                  <option value="todos">Todos</option>
                  <option value="nao_iniciada">Não iniciada (0%)</option>
                  <option value="em_andamento">Em andamento (10% a 90%)</option>
                  <option value="concluida">Concluída (100%)</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-[var(--muted)]">Carregando…</p>
            ) : atividadesFiltradas.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                Nenhuma atividade encontrada para a Instrução de Serviço selecionada e filtros atuais.
              </p>
            ) : (
              <ul className="space-y-3">
                {atividadesFiltradas.map((atividade) => {
                  const progresso = progressoSeguro(atividade.progresso);
                  const status = statusPorProgresso(atividade.progresso);
                  const cfg = STATUS_CONFIG[status];
                  const podeEditar = podeEditarAtividade(atividade);
                  return (
                    <li
                      key={atividade.id}
                      className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--background)]"
                    >
                      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[var(--accent)]">
                            {atividade.codigo || "SEM-CODIGO"}
                          </p>
                          {atividade.descricao && (
                            <p className="mt-1 text-sm text-[var(--foreground)]">{atividade.descricao}</p>
                          )}
                          <p className="mt-2 text-xs text-[var(--muted)]">
                            Responsável: {formatarResponsavel(atividade.responsavel)}
                          </p>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                              <span>Progresso</span>
                              <span className="font-medium text-[var(--foreground)]">{progresso}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${progresso}%`, backgroundColor: cfg.cor }}
                              />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-xs ${cfg.fundo} ${cfg.texto}`}>
                              {cfg.label}
                            </span>
                            <Link
                              href={`/?busca=${encodeURIComponent(atividade.codigo || "")}`}
                              className="text-xs text-[var(--accent)] underline"
                            >
                              Abrir na página de atividades
                            </Link>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleEdicao(atividade)}
                          disabled={!podeEditar}
                          className="shrink-0 rounded-lg border border-[var(--card-border)] px-3 py-2 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {expandedId === atividade.id ? "Fechar edição" : "Editar progresso/etiqueta/link"}
                        </button>
                      </div>

                      {expandedId === atividade.id && (
                        <div className="border-t border-[var(--card-border)] px-4 py-4">
                          {!podeEditar ? (
                            <p className="text-sm text-[var(--muted)]">
                              Apenas o gestor da atividade (responsável) ou administrador pode editar.
                            </p>
                          ) : (
                            <>
                              <div className="grid gap-3 md:grid-cols-2">
                                <div className="md:col-span-2">
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
                                </div>
                                <div>
                                  <label className="block text-xs text-[var(--muted)]">Etiqueta</label>
                                  <input
                                    value={etiquetaEdit}
                                    onChange={(e) => setEtiquetaEdit(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-[var(--muted)]">Link</label>
                                  <input
                                    type="url"
                                    value={linkEdit}
                                    onChange={(e) => setLinkEdit(e.target.value)}
                                    placeholder="https://..."
                                    className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => void salvarEdicao(atividade)}
                                className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
                              >
                                {saving ? "Salvando..." : "Salvar alterações"}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
