"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { isAdmin, type Perfil } from "@/lib/auth/roles";

const PerfilContext = createContext<Perfil>("basico");

export function usePerfil(): Perfil {
  return useContext(PerfilContext);
}

const navBase = [
  { href: "/", label: "Atividades" },
  { href: "/progresso", label: "Progresso" },
  { href: "/equipe", label: "Equipe" },
  { href: "/integrantes", label: "Integrantes" },
  { href: "/documentos", label: "Documentos" },
] as const;

const navAdmin = [
  { href: "/orcamento", label: "Orçamento" },
  { href: "/gestao-senhas", label: "Gestão de senhas" },
] as const;

const labelPerfil: Record<Perfil, string> = {
  basico: "Básico",
  gestor: "Gestor",
  admin: "Administrador",
};

export function AppShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Perfil;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
    router.refresh();
  }

  const navItems = isAdmin(role)
    ? ([...navBase, ...navAdmin] as const)
    : ([...navBase] as const);

  return (
    <PerfilContext.Provider value={role}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-[var(--card-border)] bg-[var(--card)]/92 shadow-sm backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="min-w-0 shrink-0">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Projeto
              </p>
              <div className="flex flex-wrap items-baseline gap-2">
                <h1 className="truncate text-lg font-semibold leading-snug text-[var(--foreground)]">
                  Modernização do Único
                </h1>
                <span className="shrink-0 rounded-md border border-[var(--card-border)] bg-[var(--accent-muted)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {labelPerfil[role]}
                </span>
              </div>
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
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-12">{children}</main>
      </div>
    </PerfilContext.Provider>
  );
}
