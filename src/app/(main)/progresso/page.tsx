"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Atividade } from "@/types/database";

function progressoSeguro(valor: number | null | undefined): number {
  return Math.min(100, Math.max(0, Number(valor ?? 0) || 0));
}

export default function ProgressoPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroProgresso, setFiltroProgresso] = useState<string>("todos");

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

  const atividadesOrdenadas = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const progressoA = progressoSeguro(a.progresso);
        const progressoB = progressoSeguro(b.progresso);
        if (progressoA !== progressoB) return progressoA - progressoB;
        return (a.codigo ?? "").localeCompare(b.codigo ?? "", "pt-BR", { sensitivity: "base" });
      }),
    [rows]
  );

  const atividadesFiltradas = useMemo(() => {
    if (filtroProgresso === "todos") return atividadesOrdenadas;
    const percentual = Number(filtroProgresso);
    return atividadesOrdenadas.filter((atividade) => progressoSeguro(atividade.progresso) === percentual);
  }, [atividadesOrdenadas, filtroProgresso]);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Progresso</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Cada atividade é exibida em barra horizontal do menor para o maior progresso. Clique em uma
          atividade para abrir a tela de Atividades com o código já aplicado na busca.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:p-5">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-sm font-medium text-[var(--muted)]">Gráfico de barras</h3>
          <div className="sm:w-56">
            <label className="block text-xs text-[var(--muted)]">Filtrar por progresso</label>
            <select
              value={filtroProgresso}
              onChange={(e) => setFiltroProgresso(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-2.5 py-1.5 text-sm outline-none ring-sky-500/50 focus:ring-2"
            >
              <option value="todos">Todos</option>
              {Array.from({ length: 11 }, (_, idx) => idx * 10).map((percentual) => (
                <option key={percentual} value={String(percentual)}>
                  {percentual}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : atividadesFiltradas.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured
              ? "Nenhuma atividade encontrada para esse percentual."
              : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-0">
            {atividadesFiltradas.map((atividade) => {
              const progresso = progressoSeguro(atividade.progresso);
              const codigo = atividade.codigo?.trim() || "SEM-CODIGO";
              return (
                <li key={atividade.id}>
                  <Link
                    href={`/?busca=${encodeURIComponent(codigo)}`}
                    className="-mx-1 block rounded-md border-0 bg-transparent px-1 py-0.5 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 sm:py-1"
                  >
                    <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_3rem] sm:items-center sm:gap-2">
                      <p className="truncate text-sm font-medium leading-tight text-sky-300">{codigo}</p>
                      <div className="h-3 w-full min-w-0 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-sky-500/70"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                      <p className="text-right text-sm font-medium leading-tight tabular-nums text-[var(--foreground)]">
                        {progresso}%
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
