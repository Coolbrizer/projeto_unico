"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { canEditarAtividadesIntegrantes, isAdmin } from "@/lib/auth/roles";
import {
  formatarPeriodoAtividade,
  formatDataParaExibicao,
  normalizarDataParaApi,
} from "@/lib/datas-atividade";
import { camposCorrespondemBusca } from "@/lib/busca-texto";
import { ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA, rotuloStatusExecucao } from "@/lib/status-execucao";
import {
  montarLinhasPlanilhaAtividades,
  nomeArquivoPlanilhaAtividades,
} from "@/lib/planilha-atividades";
import { baixarPlanilhaXlsx } from "@/lib/planilha-xlsx";
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
import type { Atividade, Documento, Equipe, Integrante } from "@/types/database";

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

/** Busca em código, descrição, responsável e plano: cada palavra deve aparecer em algum desses campos. Acentuação não restringe. */
function atividadeMatchesBusca(a: Atividade, raw: string): boolean {
  const plano = a.plano_atividades ? `plano ${a.plano_atividades}` : "";
  return camposCorrespondemBusca([a.codigo, a.descricao, a.responsavel, plano], raw);
}

function formatarPlanoAtividades(valor: number | null | undefined): string {
  return valor ? `Plano de Atividades nº ${valor}` : "Plano de Atividades não informado";
}

type TamanhoPagina = 10 | 25 | 50 | "all";

const OPCOES_TAMANHO_PAGINA: { value: TamanhoPagina; label: string }[] = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: "all", label: "Tudo" },
];

function PaginacaoControles({
  total,
  paginaAtual,
  setPaginaAtual,
  tamanhoPagina,
  setTamanhoPagina,
  posicao,
}: {
  total: number;
  paginaAtual: number;
  setPaginaAtual: (n: number) => void;
  tamanhoPagina: TamanhoPagina;
  setTamanhoPagina: (n: TamanhoPagina) => void;
  posicao: "topo" | "base";
}) {
  const isAll = tamanhoPagina === "all";
  const tamanho = isAll ? Math.max(total, 1) : tamanhoPagina;
  const totalPaginas = isAll ? 1 : Math.max(1, Math.ceil(total / tamanho));
  const inicio = total === 0 ? 0 : (paginaAtual - 1) * tamanho + 1;
  const fim = isAll ? total : Math.min(total, paginaAtual * tamanho);
  const labelId = `atividades-pagsize-${posicao}`;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)]/70 px-3 py-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <label htmlFor={labelId}>Itens por página</label>
        <select
          id={labelId}
          value={String(tamanhoPagina)}
          onChange={(e) => {
            const v = e.target.value;
            setTamanhoPagina(v === "all" ? "all" : (Number(v) as TamanhoPagina));
            setPaginaAtual(1);
          }}
          className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
        >
          {OPCOES_TAMANHO_PAGINA.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="text-[var(--muted)]">
          {total === 0 ? "0 atividade(s)" : `${inicio}–${fim} de ${total} atividade(s)`}
        </span>
      </div>
      {!isAll && totalPaginas > 1 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
            disabled={paginaAtual <= 1}
            className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Anterior
          </button>
          <span className="text-xs tabular-nums text-[var(--muted)]">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            type="button"
            onClick={() => setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))}
            disabled={paginaAtual >= totalPaginas}
            className="rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}

function dataParaCampoFormulario(value: string | null | undefined): string {
  const texto = formatDataParaExibicao(value);
  return texto === "—" ? "" : texto;
}

export default function AtividadesPage() {
  const searchParams = useSearchParams();
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const {
    instrucaoServicoId: instrucaoServicoGlobalId,
    planoAtividades: planoAtividadesGlobal,
  } = useInstrucaoServicoSelecionada();
  const podeEditar = canEditarAtividadesIntegrantes(perfil);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [sessionNomeCarregado, setSessionNomeCarregado] = useState(false);
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [tamanhoPagina, setTamanhoPagina] = useState<TamanhoPagina>(10);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const listaRef = useRef<HTMLDivElement | null>(null);
  const [documentosIs, setDocumentosIs] = useState<Documento[]>([]);
  const [instrucaoServicoId, setInstrucaoServicoId] = useState("");

  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [progressoNovo, setProgressoNovo] = useState(0);
  const [planoAtividadesNovo, setPlanoAtividadesNovo] = useState("2");
  const [naoEntregueComJustificativa, setNaoEntregueComJustificativa] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [relatorioEtiqueta, setRelatorioEtiqueta] = useState("");
  const [relatorioLink, setRelatorioLink] = useState("");
  const [savingRelatorio, setSavingRelatorio] = useState(false);
  const [progressoEdit, setProgressoEdit] = useState(0);
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [showImportCsv, setShowImportCsv] = useState(false);
  const [importIsId, setImportIsId] = useState("");
  const [importEtapa, setImportEtapa] = useState("5E");
  const [importPlanoAtividades, setImportPlanoAtividades] = useState("2");
  const [importArquivo, setImportArquivo] = useState<File | null>(null);
  const [importando, setImportando] = useState(false);
  const [exportando, setExportando] = useState(false);

  const showAviso = useCallback((tipo: "sucesso" | "erro", texto: string) => {
    setAviso({ tipo, texto });
    window.setTimeout(() => {
      setAviso((atual) => (atual?.tipo === tipo && atual?.texto === texto ? null : atual));
    }, 3500);
  }, []);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    const params = new URLSearchParams();
    if (instrucaoServicoGlobalId) params.set("instrucaoServicoId", instrucaoServicoGlobalId);
    if (planoAtividadesGlobal !== null) {
      params.set("planoAtividades", String(planoAtividadesGlobal));
    }
    const filtro = params.size > 0 ? `?${params.toString()}` : "";
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
  }, [instrucaoServicoGlobalId, planoAtividadesGlobal]);

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

  const totalPaginas = useMemo(() => {
    if (tamanhoPagina === "all") return 1;
    return Math.max(1, Math.ceil(filtradas.length / tamanhoPagina));
  }, [filtradas.length, tamanhoPagina]);

  const atividadesPagina = useMemo(() => {
    if (tamanhoPagina === "all") return filtradas;
    const inicio = (paginaAtual - 1) * tamanhoPagina;
    return filtradas.slice(inicio, inicio + tamanhoPagina);
  }, [filtradas, paginaAtual, tamanhoPagina]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroTipo, instrucaoServicoGlobalId, planoAtividadesGlobal]);

  useEffect(() => {
    if (paginaAtual > totalPaginas) setPaginaAtual(totalPaginas);
  }, [paginaAtual, totalPaginas]);

  function irParaPagina(n: number) {
    setPaginaAtual(n);
    listaRef.current?.scrollIntoView({ block: "start" });
  }

  async function extrairPlanilha() {
    if (exportando || loading || rows.length === 0) return;
    setExportando(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (instrucaoServicoGlobalId) params.set("instrucaoServicoId", instrucaoServicoGlobalId);
      if (planoAtividadesGlobal !== null) {
        params.set("planoAtividades", String(planoAtividadesGlobal));
      }
      const filtro = params.size > 0 ? `?${params.toString()}` : "";
      const [resEq, resInt] = await Promise.all([
        fetch(`/api/equipe${filtro}`, { credentials: "include" }),
        fetch("/api/integrantes", { credentials: "include" }),
      ]);
      const jEq = (await resEq.json()) as { error?: string; equipe?: Equipe[] };
      const jInt = (await resInt.json()) as { error?: string; integrantes?: Integrante[] };
      if (!resEq.ok) {
        setError(jEq.error ?? "Não foi possível carregar a equipe para a planilha.");
        return;
      }
      if (!resInt.ok) {
        setError(jInt.error ?? "Não foi possível carregar os integrantes para a planilha.");
        return;
      }

      const doc = docPorId.get(instrucaoServicoGlobalId);
      const rotulo = doc ? rotuloInstrucaoServico(doc) : "instrucao-de-servico";
      const linhas = montarLinhasPlanilhaAtividades(
        rows,
        jInt.integrantes ?? [],
        jEq.equipe ?? []
      );
      baixarPlanilhaXlsx(linhas, nomeArquivoPlanilhaAtividades(rotulo, planoAtividadesGlobal));
    } catch {
      setError("Não foi possível extrair a planilha.");
    } finally {
      setExportando(false);
    }
  }

  function limparFormulario() {
    setEditingId(null);
    setCodigo("");
    setDescricao("");
    setResponsavel("");
    setInicio("");
    setFim("");
    setProgressoNovo(0);
    setPlanoAtividadesNovo("2");
    setNaoEntregueComJustificativa(false);
    setInstrucaoServicoId(instrucaoServicoGlobalId || defaultIsId(documentosIs));
  }

  function abrirNovo() {
    limparFormulario();
    setShowImportCsv(false);
    setShowForm(true);
    setError(null);
  }

  function abrirEdicao(a: Atividade) {
    setEditingId(a.id);
    setCodigo(a.codigo ?? "");
    setDescricao(a.descricao ?? "");
    setResponsavel(a.responsavel ?? "");
    setInicio(dataParaCampoFormulario(a.inicio));
    setFim(dataParaCampoFormulario(a.fim));
    setProgressoNovo(Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0)));
    setPlanoAtividadesNovo(a.plano_atividades ? String(a.plano_atividades) : "1");
    setNaoEntregueComJustificativa(a.nao_entregue_com_justificativa === true);
    setInstrucaoServicoId(a.instrucao_servico ?? "");
    setShowImportCsv(false);
    setShowForm(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fecharFormulario() {
    setShowForm(false);
    limparFormulario();
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar) return;
    setError(null);
    const corpo: Record<string, unknown> = {
      codigo: codigo.trim(),
      descricao: descricao.trim() || null,
      responsavel: responsavel.trim() || null,
      inicio: normalizarDataParaApi(inicio) ?? null,
      fim: normalizarDataParaApi(fim) ?? null,
      plano_atividades: Number(planoAtividadesNovo),
      nao_entregue_com_justificativa: naoEntregueComJustificativa,
    };
    if (!editingId) {
      corpo.progresso = progressoNovo;
      corpo.instrucao_servico = instrucaoServicoId;
    }
    const res = await fetch(editingId ? `/api/atividades/${editingId}` : "/api/atividades", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(corpo),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
      return;
    }
    const estavaEditando = Boolean(editingId);
    fecharFormulario();
    showAviso("sucesso", estavaEditando ? "Atividade atualizada." : "Atividade criada.");
    window.dispatchEvent(new Event("atividades:changed"));
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
    fd.append("plano_atividades", importPlanoAtividades);
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
    window.dispatchEvent(new Event("atividades:changed"));
    void load();
  }

  async function remove(a: Atividade) {
    if (!podeEditar) return;
    const rotulo = a.codigo?.trim() || "esta atividade";
    const ok = window.confirm(`Excluir a atividade "${rotulo}"? Esta ação não pode ser desfeita.`);
    if (!ok) return;
    setError(null);
    const res = await fetch(`/api/atividades/${a.id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível excluir.");
      return;
    }
    if (expandedId === a.id) {
      setExpandedId(null);
    }
    if (editingId === a.id) {
      fecharFormulario();
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
          Informe código, descrição, responsável, Plano de Atividades e datas de início e fim
          (DD/MM/AAAA). O memorando de pagamento usa esse período para filtrar por mês. Gestores podem
          importar várias atividades de uma vez por arquivo CSV. Progresso, etiqueta e link do relatório só
          podem ser alterados pelo responsável cadastrado (administradores também podem). A busca cobre
          código, descrição, responsável e plano. A IS não pode ser alterada depois de criada a atividade.
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
        <button
          type="button"
          onClick={() => void extrairPlanilha()}
          disabled={loading || exportando || rows.length === 0}
          title="Exporta as atividades da Instrução de Serviço e do Plano de Atividades selecionados no topo"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)] disabled:opacity-50"
        >
          {exportando ? "Extraindo…" : "Extrair planilha"}
        </button>
        {podeEditar && (
          <>
            <button
              type="button"
              onClick={() => {
                setShowImportCsv((v) => {
                  const abrir = !v;
                  if (abrir) {
                    fecharFormulario();
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
              onClick={() => (showForm ? fecharFormulario() : abrirNovo())}
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
            O CSV aceita o tipo sozinho (<code className="rounded bg-[var(--accent-muted)] px-1">DEB</code>)
            ou com etapa (<code className="rounded bg-[var(--accent-muted)] px-1">5E-DEB</code>) — nesse
            caso a etapa da planilha prevalece. O número final (
            <code className="rounded bg-[var(--accent-muted)] px-1">5E-DEB1</code>,{" "}
            <code className="rounded bg-[var(--accent-muted)] px-1">5E-DEB2</code>…) é gerado pelo
            sistema. Informe abaixo o Plano de Atividades que será gravado em todo o lote. Na coluna{" "}
            <strong>equipe</strong>, pode listar vários integrantes na mesma célula
            (um por linha, como no Google Sheets) no formato{" "}
            <code className="rounded bg-[var(--accent-muted)] px-1">matrícula | NOME</code>. O
            responsável da coluna <strong>responsavel</strong> é incluído automaticamente na equipe,
            mesmo que não esteja listado na coluna equipe. Exporte como CSV (separador{" "}
            <strong>;</strong>).
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
                Plano de Atividades <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="number"
                min={1}
                step={1}
                value={importPlanoAtividades}
                onChange={(e) => setImportPlanoAtividades(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
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
              disabled={importando || !importArquivo || !importIsId || !importPlanoAtividades.trim()}
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
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">
            {editingId ? "Editar atividade" : "Nova atividade"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">
                Instrução de Serviço <span className="text-red-600">*</span>
              </label>
              <select
                required
                disabled={Boolean(editingId)}
                value={instrucaoServicoId}
                onChange={(e) => setInstrucaoServicoId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70"
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
              {editingId ? (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  A Instrução de Serviço não pode ser alterada depois de criada a atividade.
                </p>
              ) : documentosIs.length === 0 ? (
                <p className="mt-1 text-xs text-amber-800">
                  Não há Instruções de Serviço na base. Aceda a Documentos e registe pelo menos uma (ex.: IS
                  nº 01/2026).
                </p>
              ) : null}
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
            <div>
              <label className="block text-xs text-[var(--muted)]">
                Plano de Atividades <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="number"
                min={1}
                step={1}
                value={planoAtividadesNovo}
                onChange={(e) => setPlanoAtividadesNovo(e.target.value)}
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
              <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-[var(--card-border)]/80 bg-[var(--background)]/70 px-3 py-2.5 text-sm leading-snug text-[var(--foreground)]">
                <input
                  type="checkbox"
                  checked={naoEntregueComJustificativa}
                  onChange={(e) => setNaoEntregueComJustificativa(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--card-border)] text-[var(--accent)] accent-[var(--accent)] focus:ring-[var(--accent)]/40"
                />
                <span>
                  Não entregue, com justificativa
                  <span className="block text-xs font-normal text-[var(--muted)]">
                    A atividade não foi entregue, mas a situação é considerada normal porque há registro da
                    solicitação.
                  </span>
                </span>
              </label>
            </div>
            {!editingId && (
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
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={
                editingId
                  ? !planoAtividadesNovo.trim()
                  : !instrucaoServicoId || documentosIs.length === 0 || !planoAtividadesNovo.trim()
              }
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {editingId ? "Guardar alterações" : "Guardar atividade"}
            </button>
            <button
              type="button"
              onClick={fecharFormulario}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-medium text-[var(--muted)]">Lista</h3>
          {!loading && (
            <p className="text-sm text-[var(--muted)]">
              <span className="font-semibold tabular-nums text-[var(--accent)]">
                {filtradas.length}
              </span>
              {filtradas.length === 1 ? " atividade" : " atividades"}
            </p>
          )}
        </div>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : filtradas.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {!configured
              ? "Configure o Supabase para ver os dados."
              : rows.length === 0
                ? instrucaoServicoGlobalId
                  ? "Nenhuma atividade para a instrução e o plano selecionados no topo da página."
                  : "Nenhuma atividade ainda."
                : "Nenhum resultado com os critérios atuais (busca, tipo ou recorte do topo)."}
          </p>
        ) : (
          <>
          <div className="mb-3">
            <PaginacaoControles
              total={filtradas.length}
              paginaAtual={paginaAtual}
              setPaginaAtual={irParaPagina}
              tamanhoPagina={tamanhoPagina}
              setTamanhoPagina={setTamanhoPagina}
              posicao="topo"
            />
          </div>
          <div ref={listaRef} className="scroll-mt-28 overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/70 text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="whitespace-nowrap px-3 py-2 font-medium">Código</th>
                  <th className="px-3 py-2 font-medium">Descrição</th>
                  <th className="px-3 py-2 font-medium">Responsável</th>
                  <th className="px-3 py-2 font-medium">Período</th>
                  <th className="px-3 py-2 font-medium">Progresso</th>
                  <th className="px-3 py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
            {atividadesPagina.map((a) => {
              const progressoLinha = Math.min(100, Math.max(0, Number(a.progresso ?? 0) || 0));
              return (
              <Fragment key={a.id}>
                <tr
                  className={`border-b border-[var(--card-border)]/70 ${
                    editingId === a.id ? "bg-[var(--accent-muted)]/40" : ""
                  }`}
                >
                  <td className="cursor-text select-text whitespace-nowrap px-3 py-2 align-top font-medium text-[var(--accent)]">
                    {a.codigo?.trim() || "—"}
                  </td>
                  <td className="cursor-text select-text px-3 py-2 align-top text-[var(--foreground)]">
                    {a.descricao?.trim() || "—"}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-[var(--muted)]">
                    {a.responsavel || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top text-xs text-[var(--muted)]">
                    {formatarPeriodoAtividade(a)}
                  </td>
                  <td className="w-36 px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 min-w-12 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]/70"
                          style={{ width: `${progressoLinha}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-xs font-medium text-[var(--accent)]">
                        {progressoLinha}%
                      </span>
                    </div>
                    {a.nao_entregue_com_justificativa ? (
                      <p className="mt-1 text-[11px] font-medium text-emerald-800">
                        {ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA}
                      </p>
                    ) : rotuloStatusExecucao(a.status_execucao) ? (
                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        {rotuloStatusExecucao(a.status_execucao)}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleRelatorio(a)}
                        className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent-muted)] px-2 py-1 text-xs font-medium text-[var(--accent)] hover:brightness-95"
                      >
                        {expandedId === a.id ? "Fechar" : "Relatório"}
                      </button>
                      {podeEditar && (
                        <>
                          <button
                            type="button"
                            onClick={() => abrirEdicao(a)}
                            className="rounded-md border border-[var(--card-border)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)]/80"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => void remove(a)}
                            className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-700 hover:bg-red-500/10"
                          >
                            Excluir
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedId === a.id && (
                  <tr className="border-b border-[var(--card-border)]/70">
                    <td colSpan={6} className="bg-[var(--background)]/50 px-4 py-4">
                    <p className="mb-2 text-xs text-[var(--muted)]">
                      <span className="font-medium text-[var(--foreground)]">IS: </span>
                      {docPorId.get(a.instrucao_servico)
                        ? rotuloInstrucaoServico(docPorId.get(a.instrucao_servico)!)
                        : "—"}
                      {" · "}
                      {formatarPlanoAtividades(a.plano_atividades)}
                    </p>
                    <div>
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
                    </td>
                  </tr>
                )}
              </Fragment>
              );
            })}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <PaginacaoControles
              total={filtradas.length}
              paginaAtual={paginaAtual}
              setPaginaAtual={irParaPagina}
              tamanhoPagina={tamanhoPagina}
              setTamanhoPagina={setTamanhoPagina}
              posicao="base"
            />
          </div>
          </>
        )}
      </section>
      </div>
    </div>
  );
}
