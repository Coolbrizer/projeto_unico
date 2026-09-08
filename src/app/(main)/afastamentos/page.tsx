"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import {
  COMPETENCIAS_AFASTAMENTO,
  LIMIAR_DIAS_AFASTAMENTO,
  totalDiasAfastamento,
} from "@/lib/afastamentos";
import { macroSetorIntegrante } from "@/lib/integrante-setor-macro";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { FrequenciaMensal, Integrante } from "@/types/database";

type AfastamentosResponse = {
  error?: string;
  canManageAll?: boolean;
  usuarioId?: string;
  integrantes?: Integrante[];
  frequencias?: FrequenciaMensal[];
};

type ValoresPorIntegrante = Record<string, Record<string, string>>;

function chaveCelula(integranteId: string, competencia: string): string {
  return `${integranteId}:${competencia}`;
}

function matchesBusca(integrante: Integrante, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const campos = [
    integrante.nome,
    String(integrante.matricula),
    integrante.setor ?? "",
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
      proximos[integrante.id][mes.competencia] = String(
        porPessoaEMes.get(chaveCelula(integrante.id, mes.competencia)) ?? 0
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
      setValores({});
      setSalvos({});
      setLoading(false);
      return;
    }

    const iniciais = valoresIniciais(data.integrantes ?? [], data.frequencias ?? []);
    setCanManageAll(data.canManageAll === true);
    setUsuarioId(data.usuarioId ?? "");
    setIntegrantes(data.integrantes ?? []);
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
    if (!Number.isInteger(dias) || dias < 0 || dias > 31) {
      setError("Informe uma quantidade inteira de dias de afastamento entre 0 e 31.");
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
          Informe os dias de afastamento de cada integrante em setembro, outubro, novembro e
          dezembro de 2026. Totais abaixo de {LIMIAR_DIAS_AFASTAMENTO} dias aparecem em vermelho;{" "}
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
              placeholder="Nome, matrícula ou setor"
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            />
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
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/70 text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2.5">Nome</th>
                <th className="px-3 py-2.5">Matrícula</th>
                <th className="px-3 py-2.5">Setor macro</th>
                {COMPETENCIAS_AFASTAMENTO.map((mes) => (
                  <th key={mes.competencia} className="px-3 py-2.5 text-center">
                    {mes.label}
                    <span className="block font-normal normal-case tracking-normal text-[10px]">
                      {mes.ano}
                    </span>
                  </th>
                ))}
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
                        {macroSetorIntegrante(integrante.setor)}
                      </span>
                    </td>
                    {COMPETENCIAS_AFASTAMENTO.map((mes) => {
                      const key = chaveCelula(integrante.id, mes.competencia);
                      return (
                        <td key={mes.competencia} className="px-3 py-2 text-center">
                          <input
                            type="number"
                            min={0}
                            max={31}
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
