"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInstrucaoServicoSelecionada } from "@/components/AppShell";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import {
  COMPETENCIAS_AFASTAMENTO,
  LIMIAR_DIAS_AFASTAMENTO,
  PERIODO_AFASTAMENTO_PADRAO,
  PERIODO_AFASTAMENTO_ROTULO,
  diasConsideradosNoPeriodo,
  diasMaximosNoPeriodo,
  rotuloLimiteMes,
  rotuloPeriodoAfastamento,
  totalDiasAfastamento,
  type PeriodoAfastamento,
} from "@/lib/afastamentos";
import { resumoFolhaAfastamentos } from "@/lib/afastamentos-folha";
import { camposCorrespondemBusca } from "@/lib/busca-texto";
import { macroSetorIntegrante, parseSetorMicroMacro, rotuloSetorMicroMacro } from "@/lib/integrante-setor-macro";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { FrequenciaMensal, Integrante, RefPgto } from "@/types/database";

type MesAfastamento = { competencia: string; label: string; curto: string; ano: number };

type AfastamentosResponse = {
  error?: string;
  canManageAll?: boolean;
  usuarioId?: string;
  periodo?: { inicio: string; fim: string; rotulo: string };
  competencias?: MesAfastamento[];
  integrantes?: Integrante[];
  frequencias?: FrequenciaMensal[];
  ref_pgto?: RefPgto[];
};

type ValoresPorIntegrante = Record<string, Record<string, string>>;

type OrdemLista = "nome" | "dias-asc" | "dias-desc";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function chaveCelula(integranteId: string, competencia: string): string {
  return `${integranteId}:${competencia}`;
}

function matchesBusca(integrante: Integrante, raw: string): boolean {
  const { micro, macro } = parseSetorMicroMacro(integrante.setor);
  return camposCorrespondemBusca(
    [
      integrante.nome,
      integrante.matricula,
      integrante.setor,
      integrante.cargo,
      integrante.classe_padrao,
      micro,
      macro,
      rotuloSetorMicroMacro(integrante.setor),
      macroSetorIntegrante(integrante.setor),
    ],
    raw
  );
}

function valoresIniciais(
  integrantes: Integrante[],
  frequencias: FrequenciaMensal[],
  competencias: readonly { competencia: string }[],
  periodo: PeriodoAfastamento
): ValoresPorIntegrante {
  const porPessoaEMes = new Map<string, number>();
  for (const freq of frequencias) {
    porPessoaEMes.set(
      chaveCelula(freq.integrante_id, freq.competencia.slice(0, 10)),
      freq.dias_afastamento
    );
  }

  const proximos: ValoresPorIntegrante = {};
  for (const integrante of integrantes) {
    proximos[integrante.id] = {};
    for (const mes of competencias) {
      const bruto = porPessoaEMes.get(chaveCelula(integrante.id, mes.competencia)) ?? 0;
      proximos[integrante.id][mes.competencia] = String(
        diasConsideradosNoPeriodo(mes.competencia, bruto, periodo)
      );
    }
  }
  return proximos;
}

export default function AfastamentosPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const { instrucaoServicoId, filtroInstrucaoPronto } = useInstrucaoServicoSelecionada();
  const [canManageAll, setCanManageAll] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [refPgto, setRefPgto] = useState<RefPgto[]>([]);
  const [valores, setValores] = useState<ValoresPorIntegrante>({});
  const [salvos, setSalvos] = useState<ValoresPorIntegrante>({});
  const [busca, setBusca] = useState("");
  const [setorMacro, setSetorMacro] = useState("");
  const [ordemLista, setOrdemLista] = useState<OrdemLista>("nome");
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [competencias, setCompetencias] = useState<MesAfastamento[]>([...COMPETENCIAS_AFASTAMENTO]);
  const [periodo, setPeriodo] = useState<PeriodoAfastamento>(PERIODO_AFASTAMENTO_PADRAO);
  const [rotuloPeriodo, setRotuloPeriodo] = useState(PERIODO_AFASTAMENTO_ROTULO);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (instrucaoServicoId) params.set("instrucaoServicoId", instrucaoServicoId);
    const filtro = params.size > 0 ? `?${params.toString()}` : "";
    const res = await fetch(`/api/afastamentos${filtro}`, { credentials: "include" });
    const data = (await res.json()) as AfastamentosResponse;

    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar os afastamentos.");
      setIntegrantes([]);
      setRefPgto([]);
      setValores({});
      setSalvos({});
      setLoading(false);
      return;
    }

    const periodoCarregado =
      data.periodo?.inicio && data.periodo?.fim
        ? { inicio: data.periodo.inicio.slice(0, 10), fim: data.periodo.fim.slice(0, 10) }
        : PERIODO_AFASTAMENTO_PADRAO;
    const meses =
      data.competencias && data.competencias.length > 0
        ? data.competencias
        : [...COMPETENCIAS_AFASTAMENTO];
    setPeriodo(periodoCarregado);
    setCompetencias(meses);
    setRotuloPeriodo(data.periodo?.rotulo || rotuloPeriodoAfastamento(periodoCarregado));
    const iniciais = valoresIniciais(
      data.integrantes ?? [],
      data.frequencias ?? [],
      meses,
      periodoCarregado
    );
    setCanManageAll(data.canManageAll === true);
    setUsuarioId(data.usuarioId ?? "");
    setIntegrantes(data.integrantes ?? []);
    setRefPgto(data.ref_pgto ?? []);
    setValores(iniciais);
    setSalvos(iniciais);
    setLoading(false);
  }, [instrucaoServicoId]);

  useEffect(() => {
    if (!filtroInstrucaoPronto) return;
    void load();
  }, [filtroInstrucaoPronto, load]);

  const integrantesVisiveis = useMemo(
    () => integrantes.filter((item) => !item.nao_remunerado),
    [integrantes]
  );

  const setoresMacro = useMemo(() => {
    const set = new Set(integrantesVisiveis.map((item) => macroSetorIntegrante(item.setor)));
    return [...set].sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  }, [integrantesVisiveis]);

  const integrantesFiltrados = useMemo(
    () =>
      integrantesVisiveis
        .filter((integrante) => {
          if (setorMacro && macroSetorIntegrante(integrante.setor) !== setorMacro) return false;
          return matchesBusca(integrante, busca);
        })
        .sort((a, b) => {
          if (ordemLista !== "nome") {
            const diasA = totalDiasAfastamento(valores[a.id] ?? {}, competencias, periodo);
            const diasB = totalDiasAfastamento(valores[b.id] ?? {}, competencias, periodo);
            if (diasA !== diasB) return ordemLista === "dias-asc" ? diasA - diasB : diasB - diasA;
          }
          return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
        }),
    [integrantesVisiveis, busca, setorMacro, ordemLista, valores, competencias, periodo]
  );

  const resumoFolha = useMemo(
    () => resumoFolhaAfastamentos(integrantes, refPgto, valores, periodo),
    [integrantes, refPgto, valores, periodo]
  );

  function podeEditar(integrante: Integrante): boolean {
    return canManageAll || integrante.id === usuarioId;
  }

  function atualizarValor(integranteId: string, competencia: string, valor: string) {
    setValores((atual) => ({
      ...atual,
      [integranteId]: {
        ...(atual[integranteId] ?? {}),
        [competencia]: valor,
      },
    }));
  }

  async function salvarCelula(integrante: Integrante, competencia: string, brutoInformado?: string) {
    if (!podeEditar(integrante)) return;

    const bruto = brutoInformado ?? valores[integrante.id]?.[competencia] ?? "0";
    const salvo = salvos[integrante.id]?.[competencia] ?? "0";
    if (bruto === salvo) return;

    const dias = Number(bruto === "" ? 0 : bruto);
    const max = diasMaximosNoPeriodo(competencia, periodo);
    if (!Number.isInteger(dias) || dias < 0 || dias > max) {
      setError(
        `Informe uma quantidade inteira entre 0 e ${max}. Apenas o período de ${rotuloPeriodo} é considerado.`
      );
      setSucesso(null);
      atualizarValor(integrante.id, competencia, salvo);
      return;
    }

    const key = chaveCelula(integrante.id, competencia);
    setSavingKey(key);
    setError(null);
    setSucesso(null);

    const params = new URLSearchParams();
    if (instrucaoServicoId) params.set("instrucaoServicoId", instrucaoServicoId);
    const filtro = params.size > 0 ? `?${params.toString()}` : "";
    const res = await fetch(`/api/afastamentos${filtro}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        integrante_id: integrante.id,
        competencia,
        dias_afastamento: dias,
      }),
    });
    const data = (await res.json()) as { error?: string; frequencia?: FrequenciaMensal };
    setSavingKey(null);

    if (!res.ok) {
      setError(data.error ?? "Não foi possível salvar o afastamento.");
      atualizarValor(integrante.id, competencia, salvo);
      return;
    }

    const gravado = String(data.frequencia?.dias_afastamento ?? dias);
    setValores((atual) => ({
      ...atual,
      [integrante.id]: {
        ...(atual[integrante.id] ?? {}),
        [competencia]: gravado,
      },
    }));
    setSalvos((atual) => ({
      ...atual,
      [integrante.id]: {
        ...(atual[integrante.id] ?? {}),
        [competencia]: gravado,
      },
    }));
    setSucesso(`Afastamento de ${integrante.nome} atualizado.`);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Afastamentos</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {canManageAll
            ? "Informe os dias de afastamento de cada integrante."
            : "Informe os seus dias de afastamento."}{" "}
          O período considerado é de{" "}
          <span className="font-medium text-[var(--foreground)]">{rotuloPeriodo}</span>
          . Totais abaixo de {LIMIAR_DIAS_AFASTAMENTO} dias aparecem em vermelho;{" "}
          {LIMIAR_DIAS_AFASTAMENTO} dias ou mais, em verde. Os valores são gravados ao sair de cada
          campo.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex min-w-[2rem] justify-center rounded-md bg-red-500/20 px-1.5 py-0.5 font-semibold text-red-800">
              0
            </span>
            abaixo de {LIMIAR_DIAS_AFASTAMENTO} dias
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex min-w-[2rem] justify-center rounded-md bg-emerald-500/20 px-1.5 py-0.5 font-semibold text-emerald-800">
              {LIMIAR_DIAS_AFASTAMENTO}
            </span>
            {LIMIAR_DIAS_AFASTAMENTO} dias ou mais
          </span>
        </div>
      </header>

      <section className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Período considerado
        </p>
        <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
          {rotuloPeriodo}
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {competencias.length > 0 && competencias[0].competencia === competencias[competencias.length - 1].competencia
            ? `Em ${competencias[0].label.toLowerCase()}, informe os dias de ${Number(periodo.inicio.slice(8, 10))} até ${Number(periodo.fim.slice(8, 10))}.`
            : `Em ${competencias[0]?.label.toLowerCase() ?? "o primeiro mês"}, informe apenas os dias a partir do dia ${Number(periodo.inicio.slice(8, 10))}. Em ${competencias[competencias.length - 1]?.label.toLowerCase() ?? "o último mês"}, apenas até o dia ${Number(periodo.fim.slice(8, 10))}.`}{" "}
          Dias fora desse intervalo não entram no total.
        </p>
      </section>

      {!loading && canManageAll && (
      <section className="mb-6 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--card)] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Gasto total do período
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--foreground)]">
              {formatMoney(resumoFolha.gastoPeriodo)}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Folha de {resumoFolha.pessoasNaFolha} integrante(s) de {rotuloPeriodo},
              conforme cargo e classe/padrão.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Gasto mensal (mês cheio)
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--foreground)]">
              {formatMoney(resumoFolha.gastoMensalCheio)}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Soma da referência de pagamento de cada integrante remunerado.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/25 bg-[var(--card)] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Abatimento no pagamento
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-emerald-800">
              {resumoFolha.abatimentoPeriodo > 0 ? "−" : ""}
              {formatMoney(resumoFolha.abatimentoPeriodo)}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Redução proporcional aos dias afastados, pelo valor diário da classe/padrão.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--success)]/25 bg-[var(--success)]/10 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--success)]">
              Pagamento líquido do período
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--success)]">
              {formatMoney(resumoFolha.liquidoPeriodo)}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Gasto do período menos o abatimento dos afastamentos.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/70 text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2.5">Mês</th>
                <th className="px-3 py-2.5 text-right">Dias pagos</th>
                <th className="px-3 py-2.5 text-right">Gasto</th>
                <th className="px-3 py-2.5 text-right">Abatimento</th>
                <th className="px-3 py-2.5 text-right">Líquido</th>
              </tr>
            </thead>
            <tbody>
              {resumoFolha.meses.map((mes) => (
                <tr key={mes.competencia} className="border-b border-[var(--card-border)]/60 last:border-b-0">
                  <td className="px-3 py-2">
                    <span className="font-medium text-[var(--foreground)]">{mes.label}</span>
                    <span className="ml-1 text-xs text-[var(--muted)]">{mes.ano}</span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                    {mes.diasPagos}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[var(--foreground)]">
                    {formatMoney(mes.gasto)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium text-emerald-800">
                    {mes.abatimento > 0 ? `−${formatMoney(mes.abatimento)}` : formatMoney(0)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-semibold text-[var(--foreground)]">
                    {formatMoney(mes.liquido)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-[var(--card-border)] bg-[var(--background)]/70 text-sm">
              <tr>
                <td className="px-3 py-2 font-medium">Total do período</td>
                <td className="px-3 py-2 text-right tabular-nums text-[var(--muted)]">
                  {resumoFolha.meses.reduce((soma, mes) => soma + mes.diasPagos, 0)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {formatMoney(resumoFolha.gastoPeriodo)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-emerald-800">
                  {resumoFolha.abatimentoPeriodo > 0
                    ? `−${formatMoney(resumoFolha.abatimentoPeriodo)}`
                    : formatMoney(0)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {formatMoney(resumoFolha.liquidoPeriodo)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)]">
          O gasto mensal da tabela considera {rotuloPeriodo}. O abatimento usa o
          valor diário de cada integrante (cargo e classe/padrão) e os dias lançados na grade
          abaixo.
        </p>
        {resumoFolha.semCorrespondencia > 0 && (
          <p className="text-xs text-[#6f4d14]">
            {resumoFolha.semCorrespondencia} integrante(s) com cargo/classe sem correspondência na
            referência de pagamento — o valor desses registros entra como R$ 0,00.
          </p>
        )}
      </section>
      )}

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}
      {sucesso && (
        <p className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800">
          {sucesso}
        </p>
      )}

      {canManageAll && (
        <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px_220px]">
          <div>
            <label className="block text-xs text-[var(--muted)]">Buscar integrante</label>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome, matrícula, setor, cargo ou classe"
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            />
            {busca.trim() !== "" && (
              <p className="mt-1.5 text-xs text-[var(--muted)]">
                {integrantesFiltrados.length}{" "}
                {integrantesFiltrados.length === 1
                  ? "registro encontrado"
                  : "registros encontrados"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)]">Ordenar por dias afastados</label>
            <select
              value={ordemLista}
              onChange={(e) => setOrdemLista(e.target.value as OrdemLista)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            >
              <option value="nome">Nome</option>
              <option value="dias-asc">Crescente</option>
              <option value="dias-desc">Decrescente</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)]">Setor macro</label>
            <select
              value={setorMacro}
              onChange={(e) => setSetorMacro(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            >
              <option value="">Todos</option>
              {setoresMacro.map((macro) => (
                <option key={macro} value={macro}>
                  {macro}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : integrantesFiltrados.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          {integrantesVisiveis.length === 0
            ? canManageAll
              ? "Nenhum integrante encontrado."
              : "Não foi possível identificar seu cadastro."
            : "Nenhum resultado para o filtro informado."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[1180px] table-fixed border-collapse text-left text-[11px]">
            <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/70 text-[10px] uppercase text-[var(--muted)]">
              <tr>
                <th className="w-[16%] px-1.5 py-1.5 font-medium">Nome</th>
                <th className="w-[6%] px-1 py-1.5 font-medium">Matrícula</th>
                <th className="w-[9%] px-1 py-1.5 font-medium">Setor</th>
                <th className="w-[12%] px-1 py-1.5 font-medium">Cargo</th>
                <th className="w-[8%] px-1 py-1.5 font-medium">Classe</th>
                {competencias.map((mes) => {
                  const limite = rotuloLimiteMes(mes.competencia, periodo);
                  return (
                    <th
                      key={mes.competencia}
                      title={`${mes.label} de ${mes.ano}${limite ? ` (${limite})` : ""}`}
                      className="px-0.5 py-1.5 text-center font-medium"
                    >
                      {mes.curto}
                      <span className="block font-normal normal-case text-[9px] leading-tight">
                        {String(mes.ano).slice(-2)}
                        {limite ? ` · ${limite}` : ""}
                      </span>
                    </th>
                  );
                })}
                <th className="w-[6%] px-1 py-1.5 text-center font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {integrantesFiltrados.map((integrante) => {
                const total = totalDiasAfastamento(valores[integrante.id] ?? {}, competencias, periodo);
                const atingiuLimiar = total >= LIMIAR_DIAS_AFASTAMENTO;
                const editavel = podeEditar(integrante);
                return (
                  <tr key={integrante.id} className="border-b border-[var(--card-border)]/60">
                    <td className="px-1.5 py-1 font-medium leading-tight text-[var(--foreground)]">
                      {integrante.nome}
                    </td>
                    <td className="px-1 py-1 tabular-nums text-[var(--muted)]">
                      {integrante.matricula}
                    </td>
                    <td className="px-1 py-1">
                      <span className="inline-block max-w-full truncate rounded border border-[var(--card-border)] bg-[var(--accent-muted)]/50 px-1 py-px text-[10px] font-medium">
                        {rotuloSetorMicroMacro(integrante.setor)}
                      </span>
                    </td>
                    <td className="px-1 py-1 leading-tight" title={integrante.cargo?.trim() || undefined}>
                      <span className="block truncate">{integrante.cargo?.trim() || "—"}</span>
                    </td>
                    <td
                      className="px-1 py-1 leading-tight"
                      title={integrante.classe_padrao?.trim() || undefined}
                    >
                      <span className="block truncate">{integrante.classe_padrao?.trim() || "—"}</span>
                    </td>
                    {competencias.map((mes) => {
                      const key = chaveCelula(integrante.id, mes.competencia);
                      const max = diasMaximosNoPeriodo(mes.competencia, periodo);
                      return (
                        <td key={mes.competencia} className="px-0.5 py-1 text-center">
                          <input
                            type="number"
                            min={0}
                            max={max}
                            step={1}
                            disabled={!editavel}
                            value={valores[integrante.id]?.[mes.competencia] ?? "0"}
                            onChange={(e) =>
                              atualizarValor(integrante.id, mes.competencia, e.target.value)
                            }
                            onBlur={(e) =>
                              void salvarCelula(integrante, mes.competencia, e.currentTarget.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.currentTarget.blur();
                              }
                            }}
                            aria-busy={savingKey === key}
                            aria-label={`Dias de afastamento de ${integrante.nome} em ${mes.label} de ${mes.ano}`}
                            className={`mx-auto w-10 rounded border border-[var(--card-border)] bg-white px-0.5 py-0.5 text-center text-[11px] tabular-nums outline-none ring-[var(--accent)]/30 [appearance:textfield] focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                              savingKey === key ? "opacity-70" : ""
                            }`}
                          />
                        </td>
                      );
                    })}
                    <td className="px-1 py-1 text-center">
                      <span
                        className={`inline-flex min-w-[1.75rem] justify-center rounded px-1 py-0.5 text-[11px] font-semibold tabular-nums ${
                          atingiuLimiar
                            ? "bg-emerald-500/20 text-emerald-800"
                            : "bg-red-500/20 text-red-800"
                        }`}
                      >
                        {total}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
