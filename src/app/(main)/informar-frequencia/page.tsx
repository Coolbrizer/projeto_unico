"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { FrequenciaMensal, Integrante } from "@/types/database";

type FrequenciasResponse = {
  error?: string;
  competencia?: string;
  canManageAll?: boolean;
  usuarioId?: string;
  integrantes?: Integrante[];
  frequencias?: FrequenciaMensal[];
};

function formatarCompetencia(competencia: string): string {
  const data = new Date(`${competencia}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(data);
}

function matchesBusca(integrante: Integrante, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const campos = [
    integrante.nome,
    integrante.email ?? "",
    integrante.setor ?? "",
    String(integrante.matricula),
  ].map((c) => c.toLowerCase());
  return q.split(/\s+/).every((token) => campos.some((campo) => campo.includes(token)));
}

export default function InformarFrequenciaPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const [competencia, setCompetencia] = useState("");
  const [canManageAll, setCanManageAll] = useState(false);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [valores, setValores] = useState<Record<string, string>>({});
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/frequencias", { credentials: "include" });
    const data = (await res.json()) as FrequenciasResponse;

    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar as frequências.");
      setIntegrantes([]);
      setValores({});
      setLoading(false);
      return;
    }

    const frequenciasPorIntegrante = new Map(
      (data.frequencias ?? []).map((f) => [f.integrante_id, String(f.dias_afastamento)])
    );
    const proximosValores: Record<string, string> = {};
    for (const integrante of data.integrantes ?? []) {
      proximosValores[integrante.id] = frequenciasPorIntegrante.get(integrante.id) ?? "0";
    }

    setCompetencia(data.competencia ?? "");
    setCanManageAll(data.canManageAll === true);
    setIntegrantes(data.integrantes ?? []);
    setValores(proximosValores);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const integrantesFiltrados = useMemo(
    () =>
      integrantes
        .filter((integrante) => matchesBusca(integrante, busca))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })),
    [integrantes, busca]
  );

  async function salvar(integrante: Integrante) {
    const dias = Number(valores[integrante.id] ?? 0);
    if (!Number.isInteger(dias) || dias < 0 || dias > 31) {
      setError("Informe uma quantidade inteira de dias de afastamento entre 0 e 31.");
      setSucesso(null);
      return;
    }

    setSavingId(integrante.id);
    setError(null);
    setSucesso(null);

    const res = await fetch("/api/frequencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        integrante_id: integrante.id,
        dias_afastamento: dias,
      }),
    });
    const data = (await res.json()) as { error?: string; frequencia?: FrequenciaMensal };
    setSavingId(null);

    if (!res.ok) {
      setError(data.error ?? "Não foi possível salvar a frequência.");
      return;
    }

    setValores((atual) => ({
      ...atual,
      [integrante.id]: String(data.frequencia?.dias_afastamento ?? dias),
    }));
    setSucesso(`Frequência de ${integrante.nome} salva.`);
  }

  const competenciaLabel = competencia ? formatarCompetencia(competencia) : "mês corrente";

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Informar Frequência</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Informe quantos dias de afastamento houve no mês corrente. Afastamentos incluem férias,
          atestados médicos, banco de horas e ocorrências equivalentes.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      <section className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Mês de referência
        </p>
        <p className="mt-1 text-lg font-semibold capitalize text-[var(--foreground)]">
          {competenciaLabel}
        </p>
      </section>

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
        <div className="mb-5">
          <label className="block text-xs text-[var(--muted)]">Buscar integrante</label>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Nome, matrícula, setor ou e-mail"
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : integrantesFiltrados.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          {canManageAll ? "Nenhum integrante encontrado." : "Não foi possível identificar seu cadastro."}
        </p>
      ) : (
        <ul className="space-y-3">
          {integrantesFiltrados.map((integrante) => (
            <li
              key={integrante.id}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                    Nome
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-[var(--foreground)]">
                    {integrante.nome}
                  </h3>
                  {canManageAll && (
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Mat. {integrante.matricula} · {integrante.setor || "Sem setor"}
                    </p>
                  )}
                </div>

                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    void salvar(integrante);
                  }}
                  className="flex flex-col gap-2 sm:flex-row sm:items-end"
                >
                  <div>
                    <label className="block text-xs text-[var(--muted)]">
                      Dias de afastamento
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={31}
                      step={1}
                      value={valores[integrante.id] ?? "0"}
                      onChange={(e) =>
                        setValores((atual) => ({
                          ...atual,
                          [integrante.id]: e.target.value,
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2 sm:w-44"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingId === integrante.id}
                    className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
                  >
                    {savingId === integrante.id ? "Salvando…" : "Salvar"}
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
