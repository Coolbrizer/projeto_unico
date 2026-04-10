"use client";

import { useCallback, useEffect, useState } from "react";
import { usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import type { PerfilIntegrante } from "@/types/database";

type Linha = {
  id: string;
  matricula: number;
  nome: string;
  email: string | null;
  perfil: PerfilIntegrante | null;
  must_change_password: boolean | null;
};

export default function GestaoSenhasPage() {
  const role = usePerfil();
  const admin = isAdmin(role);
  const [rows, setRows] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!admin) return;
    setError(null);
    setLoading(true);
    const res = await fetch("/api/admin/integrantes-auth", { credentials: "include" });
    const data = (await res.json()) as { error?: string; integrantes?: Linha[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar.");
      setRows([]);
    } else {
      setRows(data.integrantes ?? []);
    }
    setLoading(false);
  }, [admin]);

  useEffect(() => {
    void load();
  }, [load]);

  async function alterarPerfil(id: string, perfil: PerfilIntegrante) {
    setBusyId(id);
    setError(null);
    const res = await fetch(`/api/admin/integrantes-auth/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ perfil }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Falha ao atualizar perfil.");
    else void load();
    setBusyId(null);
  }

  async function resetarSenha(id: string) {
    if (!window.confirm("Redefinir senha para 123456 e exigir troca no próximo login?")) return;
    setBusyId(id);
    setError(null);
    const res = await fetch(`/api/admin/integrantes-auth/${id}/reset-senha`, {
      method: "POST",
      credentials: "include",
    });
    const data = (await res.json()) as { error?: string; aviso?: string };
    if (!res.ok) setError(data.error ?? "Falha ao redefinir.");
    else if (data.aviso) window.alert(data.aviso);
    setBusyId(null);
  }

  if (!admin) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-[var(--muted)]">Apenas administradores podem aceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Gestão de senhas e perfis</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Consulte integrantes, altere o perfil de atuação e redefina senha (volta para 123456 com troca
          obrigatória).
        </p>
      </header>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Nenhum integrante.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2 font-medium">Nome</th>
                <th className="px-3 py-2 font-medium">E-mail</th>
                <th className="px-3 py-2 font-medium">Perfil</th>
                <th className="px-3 py-2 font-medium">Senha</th>
                <th className="px-3 py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-[var(--card-border)]/60">
                  <td className="px-3 py-2">
                    <span className="font-medium">{r.nome}</span>
                    <span className="text-xs text-[var(--muted)]"> · mat. {r.matricula}</span>
                  </td>
                  <td className="px-3 py-2 text-[var(--muted)]">{r.email ?? "—"}</td>
                  <td className="px-3 py-2">
                    <select
                      value={r.perfil ?? "basico"}
                      disabled={busyId === r.id}
                      onChange={(e) =>
                        void alterarPerfil(r.id, e.target.value as PerfilIntegrante)
                      }
                      className="max-w-[140px] rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-2 py-1 text-xs outline-none ring-sky-500/50 focus:ring-2"
                    >
                      <option value="basico">Básico</option>
                      <option value="gestor">Gestor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">
                    {r.must_change_password ? "Troca pendente" : "OK"}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => void resetarSenha(r.id)}
                      className="rounded-lg border border-amber-500/40 px-2 py-1 text-xs text-amber-200 hover:bg-amber-500/10 disabled:opacity-50"
                    >
                      Redefinir senha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
