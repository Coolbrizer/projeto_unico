"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isAdmin, type Perfil } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { rotuloDocumentoNumeroAno } from "@/lib/documento-referencia";
import {
  INSTRUCAO_SERVICO_COOKIE,
  parseInstrucaoServicoId,
} from "@/lib/instrucao-servico-filtro";
import type { Documento } from "@/types/database";

const PerfilContext = createContext<Perfil>("basico");
const InstrucaoServicoContext = createContext<{
  instrucaoServicoId: string;
  setInstrucaoServicoId: (id: string) => void;
}>({
  instrucaoServicoId: "",
  setInstrucaoServicoId: () => {},
});

const TIPO_IS = TIPOS_DOCUMENTO[0];

export function usePerfil(): Perfil {
  return useContext(PerfilContext);
}

export function useInstrucaoServicoSelecionada() {
  return useContext(InstrucaoServicoContext);
}

const navBase = [
  { href: "/", label: "Atividades" },
  { href: "/progresso", label: "Progresso" },
  { href: "/equipe", label: "Equipe" },
  { href: "/integrantes", label: "Integrantes" },
  { href: "/documentos", label: "Documentos" },
] as const;

/** Gestor e administrador. */
const navPrestacaoContas = [{ href: "/prestacao-contas", label: "Prestação de Contas" }] as const;

const navAdmin = [
  { href: "/orcamento", label: "Orçamento" },
  { href: "/gestao-senhas", label: "Gestão de senhas" },
  { href: "/configurar-mfa", label: "MFA" },
] as const;
const navAuditoria = { href: "/auditoria", label: "Auditoria" } as const;

const labelPerfil: Record<Perfil, string> = {
  basico: "Básico",
  gestor: "Gestor",
  admin: "Administrador",
};

export function AppShell({
  children,
  role,
  canViewAuditoria,
}: {
  children: React.ReactNode;
  role: Perfil;
  canViewAuditoria?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [documentosIs, setDocumentosIs] = useState<Documento[]>([]);
  const [instrucaoServicoId, setInstrucaoServicoIdState] = useState("");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
    router.refresh();
  }

  const navItemsBase = isAdmin(role)
    ? ([...navBase, ...navPrestacaoContas, ...navAdmin] as const)
    : role === "gestor"
      ? ([...navBase, ...navPrestacaoContas] as const)
      : ([...navBase] as const);
  const navItems = canViewAuditoria ? [...navItemsBase, navAuditoria] : navItemsBase;
  const instrucaoSelecionadaEhValida = useMemo(
    () => !instrucaoServicoId || documentosIs.some((d) => d.id === instrucaoServicoId),
    [documentosIs, instrucaoServicoId]
  );

  const setInstrucaoServicoId = useCallback((id: string) => {
    const valor = parseInstrucaoServicoId(id);
    setInstrucaoServicoIdState(valor);
  }, []);

  useEffect(() => {
    const salvo = parseInstrucaoServicoId(window.localStorage.getItem(INSTRUCAO_SERVICO_COOKIE));
    if (salvo) setInstrucaoServicoIdState(salvo);
  }, []);

  useEffect(() => {
    let ativo = true;
    void (async () => {
      const res = await fetch("/api/documentos", { credentials: "include" });
      const data = (await res.json()) as { documentos?: Documento[] };
      if (!ativo || !res.ok) return;
      const is = (data.documentos ?? []).filter((d) => d.tipo === TIPO_IS);
      setDocumentosIs(is);
    })();
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!instrucaoSelecionadaEhValida) {
      setInstrucaoServicoIdState("");
    }
  }, [instrucaoSelecionadaEhValida]);

  useEffect(() => {
    if (instrucaoServicoId) {
      window.localStorage.setItem(INSTRUCAO_SERVICO_COOKIE, instrucaoServicoId);
      document.cookie = `${INSTRUCAO_SERVICO_COOKIE}=${encodeURIComponent(
        instrucaoServicoId
      )}; path=/; max-age=31536000; samesite=lax`;
    } else {
      window.localStorage.removeItem(INSTRUCAO_SERVICO_COOKIE);
      document.cookie = `${INSTRUCAO_SERVICO_COOKIE}=; path=/; max-age=0; samesite=lax`;
    }
  }, [instrucaoServicoId]);

  return (
    <PerfilContext.Provider value={role}>
      <InstrucaoServicoContext.Provider value={{ instrucaoServicoId, setInstrucaoServicoId }}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-[var(--card-border)] bg-[var(--card)]/92 shadow-sm backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="min-w-0 shrink-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  Projeto
                </p>
                <h1 className="truncate text-lg font-semibold leading-snug text-[var(--foreground)]">
                  Modernização do Único
                </h1>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Perfil:{" "}
                  <span className="font-medium text-[var(--foreground)]">{labelPerfil[role]}</span>
                </p>
              </div>
              <nav className="flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-x-auto pb-1 md:justify-end">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border border-[var(--accent)]/20 bg-[var(--accent-muted)] text-[var(--accent)] shadow-sm"
                          : "text-[var(--muted)] hover:bg-[var(--accent-muted)]/75 hover:text-[var(--foreground)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="ml-1 shrink-0 rounded-lg border border-[var(--card-border)] bg-white/55 px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent-muted)]/7 hover:text-[var(--foreground)]"
                >
                  Sair
                </button>
              </nav>
            </div>
            <div className="border-t border-[var(--card-border)]/80">
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:gap-4">
                <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  Instrução de Serviço ativa
                </label>
                <select
                  value={instrucaoServicoId}
                  onChange={(e) => setInstrucaoServicoId(e.target.value)}
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2 md:max-w-xl"
                >
                  <option value="">Todas as Instruções de Serviço</option>
                  {documentosIs.map((d) => (
                    <option key={d.id} value={d.id}>
                      {rotuloDocumentoNumeroAno(d)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-12">{children}</main>
        </div>
      </InstrucaoServicoContext.Provider>
    </PerfilContext.Provider>
  );
}
