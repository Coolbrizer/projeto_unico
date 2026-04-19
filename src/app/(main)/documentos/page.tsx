"use client";

import { useCallback, useEffect, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { canEditarDocumentos } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { isTipoDocumento } from "@/lib/documentos-validacao";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Documento } from "@/types/database";

function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

function hrefSeguro(url: string): string {
  const t = url.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function tipoValidoOuPadrao(tipo: string | null | undefined): string {
  const t = tipo?.trim() ?? "";
  if (t && isTipoDocumento(t)) return t;
  return TIPOS_DOCUMENTO[0];
}

export default function DocumentosPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarDocumentos(perfil);
  const [rows, setRows] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  function limparFormulario() {
    setEditingId(null);
    setTipoDocumento(TIPOS_DOCUMENTO[0]);
    setNumero("");
    setAno("");
    setEtiqueta("");
    setLink("");
  }

  function iniciarEdicao(r: Documento) {
    setEditingId(r.id);
    setTipoDocumento(tipoValidoOuPadrao(r.tipo));
    setNumero(apenasDigitos(String(r.numero ?? "")));
    setAno(apenasDigitos(String(r.ano ?? "")));
    setEtiqueta(r.etiqueta?.trim() ?? "");
    setLink(r.link?.trim() ?? "");
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEditar) return;
    setError(null);

    const payload = {
      tipo_documento: tipoDocumento,
      numero: apenasDigitos(numero),
      ano: apenasDigitos(ano),
      etiqueta: etiqueta.trim() || null,
      link: link.trim() || null,
    };

    const res = await fetch(
      editingId ? `/api/documentos/${editingId}` : "/api/documentos",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível guardar.");
      return;
    }
    limparFormulario();
    void load();
  }

  async function remove(id: string) {
    if (!podeEditar) return;
    setError(null);
    const res = await fetch(`/api/documentos/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else {
      if (editingId === id) limparFormulario();
      void load();
    }
  }

  const btnPrimario =
    "rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50";
  const inputClasse =
    "mt-1 w-full rounded-lg border border-[var(--input-border)] px-3 py-2 text-sm text-[var(--input-text)] outline-none ring-[var(--input-focus-ring)] focus:ring-2";

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Documentos</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          A lista ordena do mais novo para o mais antigo: ano mais recente primeiro; no mesmo ano,
          número maior primeiro.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      {podeEditar && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm"
        >
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">
            {editingId ? "Editar documento" : "Novo documento"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Tipo de Documento</label>
              <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} className={inputClasse}>
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
                className={inputClasse}
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
                className={inputClasse}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Etiqueta</label>
              <input
                value={etiqueta}
                onChange={(e) => setEtiqueta(e.target.value)}
                placeholder="Texto livre"
                className={inputClasse}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[var(--muted)]">Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL ou texto de referência"
                className={inputClasse}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="submit" className={btnPrimario}>
              {editingId ? "Guardar alterações" : "Salvar"}
            </button>
            {editingId && (
              <button type="button" onClick={() => limparFormulario()} className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-black/[0.04]">
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      )}

      <section>
        <h3 className="mb-2 text-sm font-medium text-[var(--muted)]">Lista de documentos</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured ? "Nenhum documento cadastrado." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="divide-y divide-[var(--card-border)] rounded-lg border border-[var(--card-border)] bg-[var(--card)] shadow-sm">
            {rows.map((r) => {
              const temRef =
                r.numero != null &&
                r.ano != null &&
                String(r.numero).trim() !== "" &&
                String(r.ano).trim() !== "";
              const linhaPrincipal = temRef
                ? `${r.tipo ?? "Documento"} nº ${r.numero}/${r.ano}`
                : r.tipo ?? "Documento";
              const etiquetaTxt = r.etiqueta?.trim();

              const temLink = Boolean(r.link?.trim());

              return (
                <li key={r.id}>
                  <div className="flex min-h-[2rem] flex-wrap items-center justify-between gap-x-3 gap-y-1 px-2 py-1 sm:px-3 sm:py-1.5">
                    <div className="min-w-0 flex flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-snug sm:text-sm">
                      <span className="font-medium text-[var(--accent)]">{linhaPrincipal}</span>
                      {etiquetaTxt ? (
                        <span className="text-[var(--muted)]">— {etiquetaTxt}</span>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {temLink ? (
                        <a
                          href={hrefSeguro(r.link!)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] sm:text-xs"
                        >
                          Acessar
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Não há link cadastrado. Edite o documento e informe o link."
                          className="inline-flex cursor-not-allowed items-center rounded-md border border-[var(--card-border)] bg-[var(--input-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)] opacity-70 sm:text-xs"
                        >
                          Acessar
                        </button>
                      )}
                      {podeEditar && (
                        <>
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(r)}
                            className="rounded border border-[var(--card-border)] bg-[var(--input-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--input-text)] hover:bg-[var(--background)] sm:text-xs"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => void remove(r.id)}
                            className="rounded border border-red-500/50 px-1.5 py-0.5 text-[10px] text-red-700 hover:bg-red-500/10 sm:text-xs"
                          >
                            Excluir
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
