"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured, useSupabase } from "@/lib/supabase/client";
import type { Documento } from "@/types/database";

export default function DocumentosPage() {
  const mounted = useMounted();
  const supabase = useSupabase();
  const configured = useIsSupabaseConfigured();
  const [rows, setRows] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [url, setUrl] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setError(null);
    const { data, error: err } = await supabase
      .from("documentos")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setRows((data as Documento[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !titulo.trim()) return;
    const { error: err } = await supabase.from("documentos").insert({
      titulo: titulo.trim(),
      tipo: tipo.trim() || null,
      url: url.trim() || null,
      observacoes: observacoes.trim() || null,
    });
    if (err) setError(err.message);
    else {
      setTitulo("");
      setTipo("");
      setUrl("");
      setObservacoes("");
      void load();
    }
  }

  async function remove(id: string) {
    if (!supabase) return;
    const { error: err } = await supabase.from("documentos").delete().eq("id", id);
    if (err) setError(err.message);
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Documentos</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Referências, links e observações sobre arquivos do projeto (inclua URL do Storage do Supabase se usar bucket).
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
      >
        <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Novo registro</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs text-[var(--muted)]">Título</label>
            <input
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)]">Tipo</label>
            <input
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="PDF, planilha, ata…"
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)]">URL / link</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-[var(--muted)]">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!supabase}
          className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
        >
          Adicionar
        </button>
      </form>

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {supabase ? "Nenhum documento cadastrado." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="font-medium">{r.titulo}</p>
                  {r.tipo && (
                    <p className="mt-1 text-sm text-[var(--muted)]">Tipo: {r.tipo}</p>
                  )}
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-sky-400 underline hover:text-sky-300"
                    >
                      Abrir link
                    </a>
                  )}
                  {r.observacoes && (
                    <p className="mt-2 text-xs text-[var(--muted)]">{r.observacoes}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => void remove(r.id)}
                  disabled={!supabase}
                  className="self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-300 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
