"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/", label: "Atividades" },
  { href: "/equipe", label: "Equipe" },
  { href: "/integrantes", label: "Integrantes" },
  { href: "/orcamento", label: "Orçamento" },
  { href: "/documentos", label: "Documentos" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="min-w-0 shrink-0">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Projeto
            </p>
            <h1 className="truncate text-lg font-semibold leading-snug text-[var(--foreground)]">
              Modernização do Único
            </h1>
          </div>
          <nav className="flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-x-auto pb-1 md:justify-end">
            {nav.map((item) => {
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
                      ? "bg-sky-500/20 text-sky-300"
                      : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="ml-1 shrink-0 rounded-lg border border-[var(--card-border)] px-3 py-2 text-sm font-medium text-[var(--muted)] hover:bg-white/5 hover:text-[var(--foreground)]"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-12">{children}</main>
    </div>
  );
}
