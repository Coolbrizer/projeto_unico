"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import {
  COMPETENCIAS_AFASTAMENTO,
  LIMIAR_DIAS_AFASTAMENTO,
  PERIODO_AFASTAMENTO_ROTULO,
  diasConsideradosNoPeriodo,
  diasMaximosNoPeriodo,
  rotuloLimiteMes,
  totalDiasAfastamento,
} from "@/lib/afastamentos";
import { resumoFolhaAfastamentos } from "@/lib/afastamentos-folha";
import { macroSetorIntegrante, parseSetorMicroMacro, rotuloSetorMicroMacro } from "@/lib/integrante-setor-macro";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { FrequenciaMensal, Integrante, RefPgto } from "@/types/database";

type AfastamentosResponse = {
  error?: string;
  canManageAll?: boolean;
  usuarioId?: string;
  integrantes?: Integrante[];
  frequencias?: FrequenciaMensal[];
  ref_pgto?: RefPgto[];
};

type ValoresPorIntegrante = Record<string, Record<string, string>>;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function chaveCelula(integranteId: string, competencia: string): string {
  return `${integranteId}:${competencia}`;
}

function matchesBusca(integrante: Integrante, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const { micro, macro } = parseSetorMicroMacro(integrante.setor);
  const campos = [
    integrante.nome,
    String(integrante.matricula),
    integrante.setor ?? "",
    micro,
    macro,
    rotuloSetorMicroMacro(integrante.setor),
    macroSetorIntegrante(integrante.setor),
  ].map((c) => c.toLowerCase());
  return q.split(/\s+/).every((token) => campos.some((campo) => campo.includes(token)));
}

function valoresIniciais(integrantes: Integrante[], frequencias: FrequenciaMensal[]): ValoresPorIntegrante {
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
    for (const mes of COMPETENCIAS_AFASTAMENTO) {
      const bruto = porPessoaEMes.get(chaveCelula(integrante.id, mes.competencia)) ?? 0;
      proximos[integrante.id][mes.competencia] = String(
        diasConsideradosNoPeriodo(mes.competencia, bruto)
      );
    }
  }
  return proximos;
}

export default function AfastamentosPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const [canManageAll, setCanManageAll] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [refPgto, setRefPgto] = useState<RefPgto[]>([]);
  const [valores, setValores] = useState<ValoresPorIntegrante>({});
  const [salvos, setSalvos] = useState<ValoresPorIntegrante>({});
  const [busca, setBusca] = useState("");
  const [setorMacro, setSetorMacro] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/afastamentos", { credentials: "include" });
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

    const iniciais = valoresIniciais(data.integrantes ?? [], data.frequencias ?? []);
    setCanManageAll(data.canManageAll === true);
    setUsuarioId(data.usuarioId ?? "");
    setIntegrantes(data.integrantes ?? []);
    setRefPgto(data.ref_pgto ?? []);
    setValores(iniciais);
    setSalvos(iniciais);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setoresMacro = useMemo(() => {
    const set = new Set(integrantes.map((item) => macroSetorIntegrante(item.setor)));
    return [...set].sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  }, [integrantes]);

  const integrantesFiltrados = useMemo(
    () =>
      integrantes
        .filter((integrante) => {
          if (setorMacro && macroSetorIntegrante(integrante.setor) !== setorMacro) return false;
          return matchesBusca(integrante, busca);
        })
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })),
    [integrantes, busca, setorMacro]
  );

  const resumoFolha = useMemo(
    () => resumoFolhaAfastamentos(integrantes, refPgto, valores),
    [integrantes, refPgto, valores]
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
    const max = diasMaximosNoPeriodo(competencia);
    if (!Number.isInteger(dias) || dias < 0 || dias > max) {
      setError(
        `Informe uma quantidade inteira entre 0 e ${max}. Apenas o período de ${PERIODO_AFASTAMENTO_ROTULO} é considerado.`
      );
      setSucesso(null);
      atualizarValor(integrante.id, competencia, salvo);
      return;
    }

    const key = chaveCelula(integrante.id, competencia);
    setSavingKey(key);
    setError(null);
    setSucesso(null);

    const res = await fetch("/api/afastamentos", {
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
          Informe os dias de afastamento de cada integrante. O período considerado é de{" "}
          <span className="font-medium text-[var(--foreground)]">{PERIODO_AFASTAMENTO_ROTULO}</span>
          ; afastamentos fora desse intervalo não entram no total. Totais abaixo de{" "}
          {LIMIAR_DIAS_AFASTAMENTO} dias aparecem em vermelho; {LIMIAR_DIAS_AFASTAMENTO} dias ou
          mais, em verde. Os valores são gravados ao sair de cada campo.
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
          {PERIODO_AFASTAMENTO_ROTULO}
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Em junho, informe apenas os dias a partir do dia 12. Em dezembro, apenas até o dia 19.
          Afastamentos fora desse intervalo não são considerados.
        </p>
      </section>

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
              Folha de {resumoFolha.pessoasNaFolha} integrante(s) de {PERIODO_AFASTAMENTO_ROTULO},
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
          O gasto mensal da tabela considera todos os meses de 12/06 a 19/12, inclusive julho e
          agosto. O abatimento usa o valor diário de cada integrante (cargo e classe/padrão) e os
          dias lançados na grade abaixo.
        </p>
        {resumoFolha.semCorrespondencia > 0 && (
          <p className="text-xs text-[#6f4d14]">
            {resumoFolha.semCorrespondencia} integrante(s) com cargo/classe sem correspondência na
            referência de pagamento — o valor desses registros entra como R$ 0,00.
          </p>
        )}
      </section>

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
        <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <label className="block text-xs text-[var(--muted)]">Buscar integrante</label>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome, matrícula, setor macro ou micro"
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
          {integrantes.length === 0
            ? canManageAll
              ? "Nenhum integrante encontrado."
              : "Não foi possível identificar seu cadastro."
            : "Nenhum resultado para o filtro informado."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/70 text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2.5">Nome</th>
                <th className="px-3 py-2.5">Matrícula</th>
                <th className="px-3 py-2.5">Setor</th>
                {COMPETENCIAS_AFASTAMENTO.map((mes) => {
                  const limite = rotuloLimiteMes(mes.competencia);
                  return (
                    <th key={mes.competencia} className="px-3 py-2.5 text-center">
                      {mes.label}
                      <span className="block font-normal normal-case tracking-normal text-[10px]">
                        {mes.ano}
                        {limite ? ` · ${limite}` : ""}
                      </span>
                    </th>
                  );
                })}
                <th className="px-3 py-2.5 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {integrantesFiltrados.map((integrante) => {
                const total = totalDiasAfastamento(valores[integrante.id] ?? {});
                const atingiuLimiar = total >= LIMIAR_DIAS_AFASTAMENTO;
                const editavel = podeEditar(integrante);
                return (
                  <tr key={integrante.id} className="border-b border-[var(--card-border)]/60">
                    <td className="px-3 py-2 font-medium text-[var(--foreground)]">
                      {integrante.nome}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-[var(--muted)]">
                      {integrante.matricula}
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded-md border border-[var(--card-border)] bg-[var(--accent-muted)]/50 px-2 py-0.5 text-xs font-medium">
                        {rotuloSetorMicroMacro(integrante.setor)}
                      </span>
                    </td>
                    {COMPETENCIAS_AFASTAMENTO.map((mes) => {
                      const key = chaveCelula(integrante.id, mes.competencia);
                      const max = diasMaximosNoPeriodo(mes.competencia);
                      return (
                        <td key={mes.competencia} className="px-3 py-2 text-center">
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
                            className={`mx-auto w-16 rounded-md border border-[var(--card-border)] bg-white px-2 py-1 text-center text-sm outline-none ring-[var(--accent)]/30 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                              savingKey === key ? "opacity-70" : ""
                            }`}
                          />
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`inline-flex min-w-[2.75rem] justify-center rounded-md px-2 py-1 text-sm font-semibold tabular-nums ${
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
