"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import { AUDITORIA_EMAIL_PERMITIDO } from "@/lib/auth/auditoria";

type AuditLog = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  actor_role: string | null;
  entity_table: string;
  entity_id: string | null;
  action: string;
  before_data: unknown;
  after_data: unknown;
  metadata: unknown;
  created_at: string;
};

function fmtDataHora(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(d);
}

function toJsonCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function csvEscape(v: unknown): string {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

export default function AuditoriaPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailSessao, setEmailSessao] = useState<string | null>(null);

  const [tabela, setTabela] = useState("");
  const [acao, setAcao] = useState("");
  const [ator, setAtor] = useState("");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [limit, setLimit] = useState("300");

  const podeVer = useMemo(
    () => (emailSessao ?? "").trim().toLowerCase() === AUDITORIA_EMAIL_PERMITIDO,
    [emailSessao]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (tabela.trim()) params.set("tabela", tabela.trim());
    if (acao.trim()) params.set("acao", acao.trim());
    if (ator.trim()) params.set("ator", ator.trim());
    if (de.trim()) params.set("de", de.trim());
    if (ate.trim()) params.set("ate", ate.trim());
    if (limit.trim()) params.set("limit", limit.trim());

    const qs = params.toString();
    const res = await fetch(`/api/auditoria${qs ? `?${qs}` : ""}`, { credentials: "include" });
    const data = (await res.json()) as { error?: string; logs?: AuditLog[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar auditoria.");
      setLogs([]);
    } else {
      setLogs(data.logs ?? []);
    }
    setLoading(false);
  }, [acao, ate, ator, de, limit, tabela]);

  useEffect(() => {
    let cancelado = false;
    void (async () => {
      const res = await fetch("/api/auth/session", { credentials: "include" });
      const data = (await res.json()) as { user?: { email?: string | null } | null };
      if (!cancelado) {
        setEmailSessao(data.user?.email ?? null);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (!podeVer) {
      setLoading(false);
      return;
    }
    void load();
  }, [load, podeVer]);

  function extrairCsv() {
    const header = [
      "created_at",
      "actor_email",
      "actor_role",
      "entity_table",
      "entity_id",
      "action",
      "before_data",
      "after_data",
      "metadata",
    ];
    const rows = logs.map((r) => [
      r.created_at,
      r.actor_email ?? "",
      r.actor_role ?? "",
      r.entity_table,
      r.entity_id ?? "",
      r.action,
      toJsonCell(r.before_data),
      toJsonCell(r.after_data),
      toJsonCell(r.metadata),
    ]);
    const csv = [header, ...rows].map((line) => line.map(csvEscape).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auditoria_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!podeVer) {
    return (
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">Auditoria</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Esta página é restrita ao usuário {AUDITORIA_EMAIL_PERMITIDO}.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Auditoria</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Consulte e extraia o relatório de logs da tabela <code>audit_log</code>.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <section className="mb-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <input
            value={tabela}
            onChange={(e) => setTabela(e.target.value)}
            placeholder="Tabela (ex.: atividades)"
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
          <input
            value={acao}
            onChange={(e) => setAcao(e.target.value)}
            placeholder="Ação (insert/update/delete)"
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
          <input
            value={ator}
            onChange={(e) => setAtor(e.target.value)}
            placeholder="E-mail do ator"
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
          <input
            type="datetime-local"
            value={de}
            onChange={(e) => setDe(e.target.value)}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
          <input
            type="datetime-local"
            value={ate}
            onChange={(e) => setAte(e.target.value)}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
          <input
            type="number"
            min={1}
            max={1000}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Limite"
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
          >
            Atualizar logs
          </button>
          <button
            type="button"
            onClick={extrairCsv}
            disabled={logs.length === 0}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)] disabled:opacity-50"
          >
            Extrair CSV
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        {loading ? (
          <p className="p-4 text-sm text-[var(--muted)]">Carregando logs…</p>
        ) : logs.length === 0 ? (
          <p className="p-4 text-sm text-[var(--muted)]">Nenhum log encontrado para os filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2">Data/Hora</th>
                  <th className="px-3 py-2">Usuário</th>
                  <th className="px-3 py-2">Perfil</th>
                  <th className="px-3 py-2">Tabela</th>
                  <th className="px-3 py-2">Registro</th>
                  <th className="px-3 py-2">Ação</th>
                  <th className="px-3 py-2">Antes</th>
                  <th className="px-3 py-2">Depois</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--card-border)]/60 align-top">
                    <td className="px-3 py-2 whitespace-nowrap">{fmtDataHora(l.created_at)}</td>
                    <td className="px-3 py-2">{l.actor_email ?? "—"}</td>
                    <td className="px-3 py-2">{l.actor_role ?? "—"}</td>
                    <td className="px-3 py-2">{l.entity_table}</td>
                    <td className="px-3 py-2">{l.entity_id ?? "—"}</td>
                    <td className="px-3 py-2 uppercase">{l.action}</td>
                    <td className="px-3 py-2 font-mono text-xs">{toJsonCell(l.before_data)}</td>
                    <td className="px-3 py-2 font-mono text-xs">{toJsonCell(l.after_data)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
