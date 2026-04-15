"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured, useSupabase } from "@/lib/supabase/client";
import type { Atividade } from "@/types/database";

function progressoSeguro(valor: number | null | undefined): number {
  return Math.min(100, Math.max(0, Number(valor ?? 0) || 0));
}

export default function ProgressoPage() {
  const mounted = useMounted();
  const supabase = useSupabase();
  const configured = useIsSupabaseConfigured();
  const [rows, setRows] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setError(null);
    const { data, error: err } = await supabase.from("atividades").select("*");

    if (err) {
      setError(err.message);
    } else {
      setRows((data as Atividade[]) ?? []);
    }

    setLoading(false);
  }, [supabase]);

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
        <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Gráfico de barras</h3>

        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : atividadesOrdenadas.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {supabase ? "Nenhuma atividade encontrada." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {atividadesOrdenadas.map((atividade) => {
              const progresso = progressoSeguro(atividade.progresso);
              const codigo = atividade.codigo?.trim() || "SEM-CODIGO";
              return (
                <li key={atividade.id}>
                  <Link
                    href={`/?busca=${encodeURIComponent(codigo)}`}
                    className="block rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-3 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
                  >
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[200px_minmax(0,1fr)_70px] sm:items-center sm:gap-3">
                      <p className="truncate text-sm font-medium text-sky-300">{codigo}</p>
                      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-sky-500/70"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                      <p className="text-right text-sm font-medium text-[var(--foreground)]">{progresso}%</p>
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
