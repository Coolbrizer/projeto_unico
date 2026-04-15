"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { canEditarDocumentos } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Documento } from "@/types/database";

function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

function formatarDataDocumento(iso: string): string {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function DocumentosPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarDocumentos(perfil);
  const [rows, setRows] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState<string>(TIPOS_DOCUMENTO[0]);
  const [numero, setNumero] = useState("");
  const [ano, setAno] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [link, setLink] = useState("");

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/documentos", { credentials: "include" });
    const data = (await res.json()) as { error?: string; documentos?: Documento[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar os documentos.");
      setRows([]);
    } else {
      setRows(data.documentos ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar) return;
    setError(null);
    const res = await fetch("/api/documentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        tipo_documento: tipoDocumento,
        numero: apenasDigitos(numero),
        ano: apenasDigitos(ano),
        etiqueta: etiqueta.trim() || null,
        link: link.trim() || null,
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
      return;
    }
    setNumero("");
    setAno("");
    setEtiqueta("");
    setLink("");
    setTipoDocumento(TIPOS_DOCUMENTO[0]);
    void load();
  }

  async function remove(id: string) {
    if (!podeEditar) return;
    setError(null);
    const res = await fetch(`/api/documentos/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Documentos</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Cadastre documentos por tipo, número, ano, etiqueta e link. A lista mostra os mais recentes
          primeiro.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      {podeEditar && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
        >
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Novo documento</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Tipo de Documento</label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              >
                {TIPOS_DOCUMENTO.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Número</label>
              <input
                required
                value={numero}
                onChange={(e) => setNumero(apenasDigitos(e.target.value))}
                inputMode="numeric"
                autoComplete="off"
                placeholder="Apenas números"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Ano</label>
              <input
                required
                value={ano}
                onChange={(e) => setAno(apenasDigitos(e.target.value))}
                inputMode="numeric"
                autoComplete="off"
                placeholder="Apenas números"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Etiqueta</label>
              <input
                value={etiqueta}
                onChange={(e) => setEtiqueta(e.target.value)}
                placeholder="Texto livre"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL ou texto de referência"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-sky-500/50 focus:ring-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
          >
            Salvar
          </button>
        </form>
      )}

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista de documentos</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured ? "Nenhum documento cadastrado." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 space-y-1 text-sm">
                  <p className="text-xs text-[var(--muted)]">
                    {formatarDataDocumento(r.created_at)}
                  </p>
                  {r.numero != null || r.ano != null ? (
                    <>
                      <p className="font-medium text-[var(--foreground)]">
                        {r.tipo ?? "—"}
                      </p>
                      <p>
                        <span className="text-[var(--muted)]">Número: </span>
                        {r.numero ?? "—"}
                        <span className="text-[var(--muted)]"> · Ano: </span>
                        {r.ano ?? "—"}
                      </p>
                    </>
                  ) : (
                    <p className="font-medium text-[var(--foreground)]">{r.titulo}</p>
                  )}
                  {r.etiqueta && (
                    <p>
                      <span className="text-[var(--muted)]">Etiqueta: </span>
                      {r.etiqueta}
                    </p>
                  )}
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block break-all text-sky-400 underline hover:text-sky-300"
                    >
                      {r.url}
                    </a>
                  )}
                  {r.observacoes && (
                    <p className="text-xs text-[var(--muted)]">{r.observacoes}</p>
                  )}
                </div>
                {podeEditar && (
                  <button
                    type="button"
                    onClick={() => void remove(r.id)}
                    className="self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-300 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
                  >
                    Excluir
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
