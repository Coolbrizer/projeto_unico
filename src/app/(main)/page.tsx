"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { canEditarAtividadesIntegrantes, isAdmin } from "@/lib/auth/roles";
import { formatarPeriodoAtividade, normalizarDataParaApi } from "@/lib/datas-atividade";
import { integranteNomeMatchResponsavelAtividade } from "@/lib/equipe-page-helpers";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import {
  compararCodigoAtividade,
  parsePartesCodigoAtividade,
  tiposAtividadeDistintos,
} from "@/lib/atividade-codigo";
import { ETAPAS_CODIGO_ATIVIDADE } from "@/lib/atividades-csv-import";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { ordenarDocumentosPorReferencia } from "@/lib/documentos-sort";
import { rotuloDocumentoNumeroAno } from "@/lib/documento-referencia";
import type { Atividade, Documento } from "@/types/database";

const TIPO_IS = TIPOS_DOCUMENTO[0];

function defaultIsId(docs: Documento[]): string {
  const is = docs.filter((d) => d.tipo === TIPO_IS);
  const y = is.find((d) => Number(d.numero) === 1 && Number(d.ano) === 2026);
  if (y) return y.id;
  return is[0]?.id ?? "";
}

function rotuloInstrucaoServico(d: Documento): string {
  return rotuloDocumentoNumeroAno({
    tipo: d.tipo ?? TIPO_IS,
    numero: d.numero,
    ano: d.ano,
  });
}

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
  const { instrucaoServicoId: instrucaoServicoGlobalId } = useInstrucaoServicoSelecionada();
  const podeEditar = canEditarAtividadesIntegrantes(perfil);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [sessionNomeCarregado, setSessionNomeCarregado] = useState(false);
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [documentosIs, setDocumentosIs] = useState<Documento[]>([]);
  const [instrucaoServicoId, setInstrucaoServicoId] = useState("");

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
  const [showImportCsv, setShowImportCsv] = useState(false);
  const [importIsId, setImportIsId] = useState("");
  const [importEtapa, setImportEtapa] = useState("5E");
  const [importArquivo, setImportArquivo] = useState<File | null>(null);
  const [importando, setImportando] = useState(false);

  const showAviso = useCallback((tipo: "sucesso" | "erro", texto: string) => {
    setAviso({ tipo, texto });
    window.setTimeout(() => {
      setAviso((atual) => (atual?.tipo === tipo && atual?.texto === texto ? null : atual));
    }, 3500);
  }, []);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    const filtro = instrucaoServicoGlobalId
      ? `?instrucaoServicoId=${encodeURIComponent(instrucaoServicoGlobalId)}`
      : "";
    const [resAt, resDoc] = await Promise.all([
      fetch(`/api/atividades${filtro}`, { credentials: "include" }),
      fetch("/api/documentos", { credentials: "include" }),
    ]);
    const dataAt = (await resAt.json()) as { error?: string; atividades?: Atividade[] };
    const dataDoc = (await resDoc.json()) as { error?: string; documentos?: Documento[] };
    if (!resAt.ok) {
      setError(dataAt.error ?? "Não foi possível carregar as atividades.");
      setRows([]);
    } else {
      setRows(dataAt.atividades ?? []);
    }
    if (resDoc.ok && dataDoc.documentos) {
      const is = dataDoc.documentos.filter((d) => d.tipo === TIPO_IS);
      setDocumentosIs(ordenarDocumentosPorReferencia(is));
    } else {
      setDocumentosIs([]);
    }
    setLoading(false);
  }, [instrucaoServicoGlobalId]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (showForm && !instrucaoServicoId && documentosIs.length > 0) {
      setInstrucaoServicoId(instrucaoServicoGlobalId || defaultIsId(documentosIs));
    }
  }, [showForm, instrucaoServicoId, documentosIs, instrucaoServicoGlobalId]);

  useEffect(() => {
    if (showImportCsv && !importIsId && documentosIs.length > 0) {
      setImportIsId(instrucaoServicoGlobalId || defaultIsId(documentosIs));
    }
  }, [showImportCsv, importIsId, documentosIs, instrucaoServicoGlobalId]);

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

  const tiposDisponiveis = useMemo(
    () => tiposAtividadeDistintos(rows.map((a) => a.codigo)),
    [rows]
  );

  const docPorId = useMemo(
    () => new Map(documentosIs.map((d) => [d.id, d] as const)),
    [documentosIs]
  );

  const filtradas = useMemo(() => {
    let list = rows.filter((a) => atividadeMatchesBusca(a, busca));
    if (filtroTipo) {
      list = list.filter((a) => {
        const p = parsePartesCodigoAtividade(a.codigo);
        return p.reconhecido && p.tipo === filtroTipo;
      });
    }
    return [...list].sort((a, b) =>
      compararCodigoAtividade(a.codigo ?? "", b.codigo ?? "")
    );
  }, [rows, busca, filtroTipo]);

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
        instrucao_servico: instrucaoServicoId,
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
    setInstrucaoServicoId(defaultIsId(documentosIs));
    setShowForm(false);
    void load();
  }

  async function handleImportCsv(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar || !importArquivo || !importIsId) return;
    setImportando(true);
    setError(null);
    const fd = new FormData();
    fd.append("instrucao_servico", importIsId);
    fd.append("etapa", importEtapa);
    fd.append("arquivo", importArquivo);
    const res = await fetch("/api/atividades/importar-csv", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = (await res.json()) as {
      error?: string;
      atividades?: number;
      equipes?: number;
      codigos?: string[];
      avisos?: string[];
    };
    setImportando(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível importar o CSV.");
      return;
    }
    const nAt = data.atividades ?? 0;
    const nEq = data.equipes ?? 0;
    showAviso(
      "sucesso",
      `${nAt} atividade(s) importada(s)${nEq > 0 ? ` e ${nEq} linha(s) de equipe` : ""}.`
    );
    setShowImportCsv(false);
    setImportArquivo(null);
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
    <div className="mx-auto max-w-7xl">
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
      <div className="min-w-0">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Atividades</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Cada atividade deve estar vinculada a uma Instrução de Serviço cadastrada em Documentos.
          Informe código, descrição, responsável e datas de início e fim (DD/MM/AAAA). O memorando de
          pagamento usa esse período para filtrar por mês. Gestores podem importar várias atividades de
          uma vez por arquivo CSV. Progresso, etiqueta e link do relatório só
          podem ser alterados pelo responsável cadastrado (administradores também podem). A busca cobre
          código, descrição e responsável. A IS não pode ser alterada depois de criada a atividade.
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
        <div className="sm:w-52">
          <label className="block text-xs text-[var(--muted)]">Tipo de atividade</label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          >
            <option value="">Todos os tipos</option>
            {tiposDisponiveis.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {podeEditar && (
          <>
            <button
              type="button"
              onClick={() => {
                setShowImportCsv((v) => {
                  const abrir = !v;
                  if (abrir) {
                    setShowForm(false);
                    setImportIsId(instrucaoServicoGlobalId || defaultIsId(documentosIs));
                  }
                  return abrir;
                });
              }}
              className="rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-muted)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:brightness-95"
            >
              {showImportCsv ? "Fechar importação" : "Importar CSV"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm((v) => {
                  const abrir = !v;
                  if (abrir) {
                    setShowImportCsv(false);
                    setInstrucaoServicoId(defaultIsId(documentosIs));
                  }
                  return abrir;
                });
              }}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
            >
              {showForm ? "Fechar formulário" : "Adicionar"}
            </button>
          </>
        )}
      </div>

      {showImportCsv && podeEditar && (
        <form
          onSubmit={(e) => void handleImportCsv(e)}
          className="mb-10 rounded-xl border border-[var(--accent)]/30 bg-[var(--card)] p-5"
        >
          <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">
            Importar atividades em lote (CSV)
          </h3>
          <p className="mb-4 text-xs leading-snug text-[var(--muted)]">
            O CSV informa apenas o <strong>tipo</strong> do código (BD, INF, DEB, IA, MEL, INT, NF).
            O sistema gera o número crescente conforme a etapa escolhida — ex.: etapa 5E e tipo MEL
            geram <code className="rounded bg-[var(--accent-muted)] px-1">5E-MEL1</code>,{" "}
            <code className="rounded bg-[var(--accent-muted)] px-1">5E-MEL2</code>, …, continuando a
            numeração já existente na IS selecionada. Use <strong>;</strong> como separador (Excel em
            português). Vários membros na coluna equipe: separe com <strong>;</strong>.
          </p>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <a
              href="/modelos/atividades-importacao.csv"
              download="atividades-importacao.csv"
              className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              Baixar modelo CSV
            </a>
            <span className="text-[11px] text-[var(--muted)]">
              Colunas: tipo, descricao, responsavel, equipe, inicio, fim
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">
                Instrução de Serviço <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={importIsId}
                onChange={(e) => setImportIsId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              >
                {documentosIs.length === 0 ? (
                  <option value="">Cadastre uma IS em Documentos</option>
                ) : (
                  documentosIs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {rotuloInstrucaoServico(d)}
                      {d.etiqueta?.trim() ? ` — ${d.etiqueta.trim()}` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">
                Etapa do código <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={importEtapa}
                onChange={(e) => setImportEtapa(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              >
                {ETAPAS_CODIGO_ATIVIDADE.map((e) => (
                  <option key={e} value={e}>
                    {e} (ex.: {e}-MEL1)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">
                Arquivo CSV <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => setImportArquivo(e.target.files?.[0] ?? null)}
                className="mt-1 w-full text-sm text-[var(--foreground)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--accent-muted)] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[var(--accent)]"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={importando || !importArquivo || !importIsId}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {importando ? "A importar…" : "Importar"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowImportCsv(false);
                setImportArquivo(null);
              }}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {showForm && podeEditar && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
        >
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Nova atividade</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">
                Instrução de Serviço <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={instrucaoServicoId}
                onChange={(e) => setInstrucaoServicoId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              >
                {documentosIs.length === 0 ? (
                  <option value="">Cadastre uma IS em Documentos</option>
                ) : (
                  documentosIs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {rotuloInstrucaoServico(d)}
                      {d.etiqueta?.trim() ? ` — ${d.etiqueta.trim()}` : ""}
                    </option>
                  ))
                )}
              </select>
              {documentosIs.length === 0 && (
                <p className="mt-1 text-xs text-amber-800">
                  Não há Instruções de Serviço na base. Aceda a Documentos e registe pelo menos uma (ex.: IS
                  nº 01/2026).
                </p>
              )}
            </div>
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
              disabled={!instrucaoServicoId || documentosIs.length === 0}
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
            {!configured
              ? "Configure o Supabase para ver os dados."
              : rows.length === 0
                ? "Nenhuma atividade ainda."
                : "Nenhum resultado com os critérios atuais (busca ou tipo de atividade)."}
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
                      <span className="font-medium text-[var(--foreground)]">IS: </span>
                      {docPorId.get(a.instrucao_servico)
                        ? rotuloInstrucaoServico(docPorId.get(a.instrucao_servico)!)
                        : "—"}
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
                      className="shrink-0 self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-700 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
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
    </div>
  );
}
