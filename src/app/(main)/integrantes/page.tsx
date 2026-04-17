"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { canEditarAtividadesIntegrantes } from "@/lib/auth/roles";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Integrante } from "@/types/database";

function parseMatricula(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  const n = Number(t);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return n;
}

/** Busca em matrícula, nome, setor e e-mail: cada palavra deve aparecer em algum desses campos. */
function integranteMatchesBusca(r: Integrante, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  const matStr = String(r.matricula).toLowerCase();
  const nome = (r.nome ?? "").toLowerCase();
  const setor = (r.setor ?? "").toLowerCase();
  const email = (r.email ?? "").toLowerCase();
  const campos = [matStr, nome, setor, email];
  return tokens.every((tok) => campos.some((c) => c.includes(tok)));
}

export default function IntegrantesPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeEditar = canEditarAtividadesIntegrantes(perfil);
  const [rows, setRows] = useState<Integrante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState("");

  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [classePadrao, setClassePadrao] = useState("");
  const [email, setEmail] = useState("");

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/integrantes", { credentials: "include" });
    const data = (await res.json()) as { error?: string; integrantes?: Integrante[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar os integrantes.");
      setRows([]);
    } else {
      setRows(data.integrantes ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtradas = useMemo(
    () =>
      rows
        .filter((r) => integranteMatchesBusca(r, busca))
        .sort((a, b) => (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })),
    [rows, busca]
  );

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!podeEditar || !nome.trim()) return;
    const m = parseMatricula(matricula);
    if (m === null) {
      setError("Informe uma matrícula numérica inteira válida.");
      return;
    }
    if (!email.trim()) {
      setError("Informe o e-mail — é necessário para o login no sistema.");
      return;
    }
    setError(null);
    const res = await fetch("/api/integrantes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        matricula,
        nome: nome.trim(),
        setor: setor.trim() || null,
        cargo: cargo.trim() || null,
        classe_padrao: classePadrao.trim() || null,
        email: email.trim(),
      }),
    });
    const payload = (await res.json()) as { error?: string; aviso?: string };
    if (!res.ok) {
      setError(payload.error ?? "Não foi possível guardar.");
      return;
    }
    setMatricula("");
    setNome("");
    setSetor("");
    setCargo("");
    setClassePadrao("");
    setEmail("");
    setShowForm(false);
    if (payload.aviso) {
      window.alert(payload.aviso);
    }
    void load();
  }

  async function remove(id: string) {
    if (!podeEditar) return;
    setError(null);
    const res = await fetch(`/api/integrantes/${id}`, { method: "DELETE", credentials: "include" });
    const payload = (await res.json()) as { error?: string };
    if (!res.ok) setError(payload.error ?? "Não foi possível excluir.");
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Integrantes</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Cadastro com matrícula, nome, setor, cargo, classe/padrão e e-mail. O e-mail é obrigatório e
          usado para login; novos integrantes recebem a senha inicial 123456 e devem
          alterá-la no primeiro acesso. A busca cobre matrícula, nome, setor e e-mail.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="block text-xs text-[var(--muted)]">Buscar</label>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Matrícula, nome, setor ou e-mail (várias palavras refinam a busca)"
            className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
        </div>
        {podeEditar && (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
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
          <h3 className="mb-4 text-sm font-medium text-[var(--muted)]">Novo integrante</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-[var(--muted)]">Matrícula</label>
              <input
                inputMode="numeric"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Número inteiro"
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Nome</label>
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Setor</label>
              <input
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Cargo</label>
              <input
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">Classe / Padrão</label>
              <input
                value={classePadrao}
                onChange={(e) => setClassePadrao(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)]">E-mail (obrigatório para login)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              Guardar integrante
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--muted)] hover:bg-white/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : filtradas.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured
              ? rows.length === 0
                ? "Nenhum integrante cadastrado."
                : "Nenhum resultado para a busca."
              : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-2">
            {filtradas.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-1 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium leading-snug">
                    <span className="text-[var(--accent)]">Mat. {r.matricula}</span>
                    {" · "}
                    {r.nome}
                    {r.email && (
                      <>
                        {" · "}
                        <span className="text-sm font-normal text-[var(--muted)]">{r.email}</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {r.setor || "—"} · {r.cargo || "—"} · {r.classe_padrao || "—"}
                  </p>
                </div>
                {podeEditar && (
                  <button
                    type="button"
                    onClick={() => void remove(r.id)}
                    className="self-start rounded-lg border border-red-500/40 px-2 py-1.5 text-xs text-red-700 hover:bg-red-500/10 sm:self-center disabled:opacity-50"
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
