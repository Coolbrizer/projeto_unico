"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { canEditarEquipe } from "@/lib/auth/roles";
import { formatarPeriodoAtividade } from "@/lib/datas-atividade";
import { parsePartesCodigoAtividade, tiposAtividadeDistintos } from "@/lib/atividade-codigo";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
import { grupoAtividadeMatchesBusca, montarGrupos } from "@/lib/equipe-grupos";
import {
  gerarPdfMemorandoPagamento,
  listarIntegrantesMemorandoPagamento,
} from "@/lib/memorando-pagamento";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Atividade, Equipe, Integrante } from "@/types/database";

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
  const labelId = `pagsize-${posicao}`;

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

export default function EquipePage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const { instrucaoServicoId } = useInstrucaoServicoSelecionada();
  const podeEditar = canEditarEquipe(perfil);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [mesExtracao, setMesExtracao] = useState("");
  const [anoExtracao, setAnoExtracao] = useState("");

  const anosExtracao = useMemo(() => {
    const now = new Date().getFullYear();
    const end = Math.max(now, 2026) + 10;
    const out: number[] = [];
    for (let y = 2026; y <= end; y++) out.push(y);
    return out;
  }, []);

  const [codigo, setCodigo] = useState("");
  const [equipe, setEquipe] = useState("");

  const [tamanhoPagina, setTamanhoPagina] = useState<TamanhoPagina>(10);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    const filtro = instrucaoServicoId
      ? `?instrucaoServicoId=${encodeURIComponent(instrucaoServicoId)}`
      : "";
    const [resEq, resAt, resInt] = await Promise.all([
      fetch("/api/equipe", { credentials: "include" }),
      fetch(`/api/atividades${filtro}`, { credentials: "include" }),
      fetch("/api/integrantes", { credentials: "include" }),
    ]);
    const jEq = (await resEq.json()) as { error?: string; equipe?: Equipe[] };
    const jAt = (await resAt.json()) as { error?: string; atividades?: Atividade[] };
    const jInt = (await resInt.json()) as { error?: string; integrantes?: Integrante[] };
    if (!resEq.ok) setError(jEq.error ?? "Não foi possível carregar equipes.");
    else setEquipes(jEq.equipe ?? []);
    if (!resAt.ok) setError(jAt.error ?? "Não foi possível carregar atividades.");
    else setAtividades(jAt.atividades ?? []);
    if (!resInt.ok) setError(jInt.error ?? "Não foi possível carregar integrantes.");
    else setIntegrantes(jInt.integrantes ?? []);
    setLoading(false);
  }, [instrucaoServicoId]);

  useEffect(() => {
    void load();
  }, [load]);

  const grupos = useMemo(
    () => montarGrupos(equipes, atividades, integrantes),
    [equipes, atividades, integrantes]
  );

  const tiposDisponiveis = useMemo(
    () =>
      tiposAtividadeDistintos([
        ...atividades.map((a) => a.codigo),
        ...equipes.map((e) => e.codigo),
      ]),
    [atividades, equipes]
  );

  const gruposFiltrados = useMemo(() => {
    let list = grupos.filter((g) => grupoAtividadeMatchesBusca(g, busca));
    if (filtroTipo) {
      list = list.filter((g) => {
        const p = parsePartesCodigoAtividade(g.codigo);
        return p.reconhecido && p.tipo === filtroTipo;
      });
    }
    return list;
  }, [grupos, busca, filtroTipo]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroTipo, instrucaoServicoId, tamanhoPagina]);

  useEffect(() => {
    if (tamanhoPagina === "all") return;
    const totalPaginas = Math.max(1, Math.ceil(gruposFiltrados.length / tamanhoPagina));
    if (paginaAtual > totalPaginas) setPaginaAtual(totalPaginas);
  }, [gruposFiltrados.length, tamanhoPagina, paginaAtual]);

  const gruposPaginados = useMemo(() => {
    if (tamanhoPagina === "all") return gruposFiltrados;
    const start = (paginaAtual - 1) * tamanhoPagina;
    return gruposFiltrados.slice(start, start + tamanhoPagina);
  }, [gruposFiltrados, tamanhoPagina, paginaAtual]);

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
          equipe ou com o código. O responsável vem do cadastro de Atividades (mesmo código). A busca cobre
          código, linhas de equipe, integrantes (nome, setor, matrícula), descrição e responsável da
          atividade.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)]/80 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--muted)]">
              Mês <span className="text-[var(--warning)]">*</span>
            </label>
            <select
              value={mesExtracao}
              onChange={(e) => setMesExtracao(e.target.value)}
              className="mt-1 min-w-[180px] rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
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
              Ano <span className="text-[var(--warning)]">*</span>
            </label>
            <select
              value={anoExtracao}
              onChange={(e) => setAnoExtracao(e.target.value)}
              className="mt-1 min-w-[120px] rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
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
          disabled={!configured || loading}
          className="rounded-lg border border-[var(--warning)]/30 bg-[#f4ead5] px-4 py-2 text-sm font-semibold text-[#6f4d14] hover:bg-[#eeddbd] disabled:opacity-50"
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
            placeholder="Código, equipe, integrante, setor, matrícula, descrição ou responsável (várias palavras refinam a busca)"
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
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm hover:bg-[var(--accent-hover)]"
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
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Equipe</label>
              <input
                value={equipe}
                onChange={(e) => setEquipe(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-[var(--card-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)]/55"
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
            {configured
              ? grupos.length === 0
                ? "Nenhum dado para agrupar."
                : "Nenhum resultado para a busca."
              : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <>
            <div className="mb-4">
              <PaginacaoControles
                total={gruposFiltrados.length}
                paginaAtual={paginaAtual}
                setPaginaAtual={setPaginaAtual}
                tamanhoPagina={tamanhoPagina}
                setTamanhoPagina={setTamanhoPagina}
                posicao="topo"
              />
            </div>
            <div className="space-y-8">
              {gruposPaginados.map((g) => (
              <div
                key={g.codigo || "__vazio__"}
                className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
              >
                <div className="border-b border-[var(--card-border)] bg-[var(--accent-muted)]/85 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                    Código da atividade
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[var(--accent)]">
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

                <div className="p-4">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                      Equipes / funções
                    </h4>
                    {g.equipeRows.length === 0 ? (
                      <p className="text-sm text-[var(--muted)]">Nenhum registro de equipe.</p>
                    ) : (
                      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1">
                        {g.equipeRows.map((r) => {
                          const ehResp = equipeLinhaEhResponsavel(
                            r.equipe ?? "",
                            g.atividade?.responsavel
                          );
                          return (
                            <li
                              key={r.id}
                              className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm ${
                                ehResp
                                  ? "border border-[var(--success)]/35 bg-[var(--success)]/12 ring-1 ring-[var(--success)]/15"
                                  : "border border-[var(--card-border)] bg-[var(--background)]/60"
                              }`}
                            >
                              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                                <span className={ehResp ? "font-medium text-[var(--success)]" : ""}>
                                  {r.equipe || "—"}
                                </span>
                                {ehResp && (
                                  <span className="shrink-0 rounded bg-[var(--success)]/16 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--success)]">
                                    Responsável
                                  </span>
                                )}
                              </span>
                              {podeEditar && (
                                <button
                                  type="button"
                                  onClick={() => void remove(r.id)}
                                  className="shrink-0 rounded border border-[var(--danger)]/30 bg-white/70 px-2 py-1 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger)]/10 disabled:opacity-50"
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
                </div>
              </div>
            ))}
            </div>
            <div className="mt-6">
              <PaginacaoControles
                total={gruposFiltrados.length}
                paginaAtual={paginaAtual}
                setPaginaAtual={setPaginaAtual}
                tamanhoPagina={tamanhoPagina}
                setTamanhoPagina={setTamanhoPagina}
                posicao="base"
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
