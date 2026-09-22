"use client";

import { useCallback, useEffect, useState } from "react";
import { usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { rotuloVinculo, vinculoEhColaborador, type VinculoPessoa } from "@/lib/vinculo-pessoa";
import type { PerfilIntegrante } from "@/types/database";

type Linha = {
  id: string;
  matricula: number | null;
  nome: string;
  email: string | null;
  perfil: PerfilIntegrante | null;
  vinculo: VinculoPessoa | null;
  must_change_password: boolean | null;
};

export default function GestaoSenhasPage() {
  const role = usePerfil();
  const admin = isAdmin(role);
  const [rows, setRows] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [criando, setCriando] = useState(false);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [emailColaborador, setEmailColaborador] = useState("");

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

  async function cadastrarColaborador(ev: React.FormEvent) {
    ev.preventDefault();
    if (!nomeColaborador.trim() || !emailColaborador.trim()) return;
    setCriando(true);
    setError(null);
    const res = await fetch("/api/admin/integrantes-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nome: nomeColaborador.trim(),
        email: emailColaborador.trim(),
      }),
    });
    const data = (await res.json()) as { error?: string; aviso?: string };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível cadastrar o colaborador.");
    } else {
      setNomeColaborador("");
      setEmailColaborador("");
      if (data.aviso) window.alert(data.aviso);
      void load();
    }
    setCriando(false);
  }

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
          Consulte integrantes e colaboradores, altere o perfil de atuação e redefina senha (volta para
          123456 com troca obrigatória). Colaboradores têm perfil básico e acesso ao sistema, mas não
          entram na equipe do projeto.
        </p>
      </header>

      <form
        onSubmit={(ev) => void cadastrarColaborador(ev)}
        className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
      >
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Novo colaborador</h3>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Cria login com perfil básico. A pessoa não aparece em Integrantes, Equipe, Orçamento nem
          Afastamentos.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs text-[var(--muted)]" htmlFor="colaborador-nome">
              Nome
            </label>
            <input
              id="colaborador-nome"
              required
              value={nomeColaborador}
              onChange={(e) => setNomeColaborador(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)]" htmlFor="colaborador-email">
              E-mail (login)
            </label>
            <input
              id="colaborador-email"
              type="email"
              required
              value={emailColaborador}
              onChange={(e) => setEmailColaborador(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={criando}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {criando ? "Cadastrando…" : "Cadastrar colaborador"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Nenhum usuário cadastrado.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--accent-muted)]/85 text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2 font-medium">Nome</th>
                <th className="px-3 py-2 font-medium">Vínculo</th>
                <th className="px-3 py-2 font-medium">E-mail</th>
                <th className="px-3 py-2 font-medium">Perfil</th>
                <th className="px-3 py-2 font-medium">Senha</th>
                <th className="px-3 py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-[var(--card-border)]/60 bg-[var(--card)] last:border-b-0">
                  <td className="px-3 py-2">
                    <span className="font-medium">{r.nome}</span>
                    {!vinculoEhColaborador(r.vinculo) && r.matricula != null && (
                      <span className="text-xs text-[var(--muted)]"> · mat. {r.matricula}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        vinculoEhColaborador(r.vinculo)
                          ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                          : "bg-[var(--background)] text-[var(--muted)]"
                      }`}
                    >
                      {rotuloVinculo(r.vinculo)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[var(--muted)]">{r.email ?? "—"}</td>
                  <td className="px-3 py-2">
                    <select
                      value={r.perfil ?? "basico"}
                      disabled={busyId === r.id}
                      onChange={(e) =>
                        void alterarPerfil(r.id, e.target.value as PerfilIntegrante)
                      }
                      className="max-w-[140px] rounded-lg border border-[var(--card-border)] bg-white px-2 py-1 text-xs text-[var(--foreground)] outline-none ring-[var(--accent)]/40 focus:ring-2"
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
                      className="rounded-lg border border-[var(--warning)]/30 bg-[#f4ead5] px-2 py-1 text-xs font-medium text-[#6f4d14] hover:bg-[#eeddbd] disabled:opacity-50"
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
