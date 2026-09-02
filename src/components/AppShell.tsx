"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isAdmin, type Perfil } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { rotuloDocumentoNumeroAno } from "@/lib/documento-referencia";
import {
  INSTRUCAO_SERVICO_COOKIE,
  PLANO_ATIVIDADES_COOKIE,
  parseInstrucaoServicoId,
  parsePlanoAtividades,
} from "@/lib/instrucao-servico-filtro";
import type { Documento } from "@/types/database";

const PerfilContext = createContext<Perfil>("basico");
const InstrucaoServicoContext = createContext<{
  instrucaoServicoId: string;
  planoAtividades: number | null;
  setInstrucaoServicoId: (id: string) => void;
  setFiltroInstrucaoServico: (instrucaoServicoId: string, planoAtividades?: number | null) => void;
}>({
  instrucaoServicoId: "",
  planoAtividades: null,
  setInstrucaoServicoId: () => {},
  setFiltroInstrucaoServico: () => {},
});

const TIPO_IS = TIPOS_DOCUMENTO[0];
const MIN_PLANOS_POR_IS_COM_PLANO = 2;

export function usePerfil(): Perfil {
  return useContext(PerfilContext);
}

export function useInstrucaoServicoSelecionada() {
  return useContext(InstrucaoServicoContext);
}

const navBase = [
  { href: "/", label: "Atividades" },
  { href: "/meu-perfil", label: "Meu perfil" },
  { href: "/informar-frequencia", label: "Informar Frequência" },
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

type OpcaoFiltroInstrucao = {
  value: string;
  instrucaoServicoId: string;
  planoAtividades: number | null;
  label: string;
};

function valorFiltroInstrucao(instrucaoServicoId: string, planoAtividades: number | null): string {
  if (!instrucaoServicoId) return "";
  return `${instrucaoServicoId}:${planoAtividades ?? ""}`;
}

function parseValorFiltroInstrucao(raw: string): {
  instrucaoServicoId: string;
  planoAtividades: number | null;
} {
  const [idRaw, planoRaw = ""] = raw.split(":");
  const instrucaoServicoId = parseInstrucaoServicoId(idRaw);
  if (!instrucaoServicoId) return { instrucaoServicoId: "", planoAtividades: null };
  return {
    instrucaoServicoId,
    planoAtividades: parsePlanoAtividades(planoRaw),
  };
}

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
  const [documentosCarregados, setDocumentosCarregados] = useState(false);
  const [instrucaoServicoId, setInstrucaoServicoIdState] = useState("");
  const [planoAtividades, setPlanoAtividadesState] = useState<number | null>(null);

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
  const opcoesFiltroInstrucao = useMemo<OpcaoFiltroInstrucao[]>(() => {
    return documentosIs.flatMap((d): OpcaoFiltroInstrucao[] => {
      const rotulo = rotuloDocumentoNumeroAno(d);
      const planos = d.planos_atividades ?? [];
      if (planos.length === 0) {
        return [
          {
            value: valorFiltroInstrucao(d.id, null),
            instrucaoServicoId: d.id,
            planoAtividades: null,
            label: rotulo,
          },
        ];
      }
      const maiorPlano = Math.max(MIN_PLANOS_POR_IS_COM_PLANO, ...planos);
      const planosExibidos = Array.from({ length: maiorPlano }, (_, idx) => idx + 1);
      return planosExibidos.map((plano) => ({
        value: valorFiltroInstrucao(d.id, plano),
        instrucaoServicoId: d.id,
        planoAtividades: plano,
        label: `${rotulo} - Plano de Atividades nº ${plano}`,
      }));
    });
  }, [documentosIs]);

  const filtroSelecionadoEhValido = useMemo(
    () =>
      !documentosCarregados ||
      !instrucaoServicoId ||
      opcoesFiltroInstrucao.some(
        (opcao) =>
          opcao.instrucaoServicoId === instrucaoServicoId &&
          opcao.planoAtividades === planoAtividades
      ),
    [documentosCarregados, instrucaoServicoId, opcoesFiltroInstrucao, planoAtividades]
  );

  const setInstrucaoServicoId = useCallback((id: string) => {
    const valor = parseInstrucaoServicoId(id);
    setInstrucaoServicoIdState(valor);
    setPlanoAtividadesState(null);
  }, []);

  const setFiltroInstrucaoServico = useCallback(
    (id: string, plano: number | null = null) => {
      const valor = parseInstrucaoServicoId(id);
      setInstrucaoServicoIdState(valor);
      setPlanoAtividadesState(valor ? plano : null);
    },
    []
  );

  const carregarDocumentos = useCallback(async () => {
    const res = await fetch("/api/documentos", { credentials: "include" });
    const data = (await res.json()) as { documentos?: Documento[] };
    if (!res.ok) return;
    const is = (data.documentos ?? []).filter((d) => d.tipo === TIPO_IS);
    setDocumentosIs(is);
    setDocumentosCarregados(true);
  }, []);

  useEffect(() => {
    const salvo = parseInstrucaoServicoId(window.localStorage.getItem(INSTRUCAO_SERVICO_COOKIE));
    const planoSalvo = parsePlanoAtividades(window.localStorage.getItem(PLANO_ATIVIDADES_COOKIE));
    if (salvo) {
      setInstrucaoServicoIdState(salvo);
      setPlanoAtividadesState(planoSalvo);
    }
  }, []);

  useEffect(() => {
    let ativo = true;
    void (async () => {
      await carregarDocumentos();
      if (!ativo) return;
    })();
    window.addEventListener("atividades:changed", carregarDocumentos);
    return () => {
      ativo = false;
      window.removeEventListener("atividades:changed", carregarDocumentos);
    };
  }, [carregarDocumentos]);

  useEffect(() => {
    if (!filtroSelecionadoEhValido) {
      setInstrucaoServicoIdState("");
      setPlanoAtividadesState(null);
    }
  }, [filtroSelecionadoEhValido]);

  useEffect(() => {
    if (instrucaoServicoId) {
      window.localStorage.setItem(INSTRUCAO_SERVICO_COOKIE, instrucaoServicoId);
      document.cookie = `${INSTRUCAO_SERVICO_COOKIE}=${encodeURIComponent(
        instrucaoServicoId
      )}; path=/; max-age=31536000; samesite=lax`;
      if (planoAtividades !== null) {
        window.localStorage.setItem(PLANO_ATIVIDADES_COOKIE, String(planoAtividades));
        document.cookie = `${PLANO_ATIVIDADES_COOKIE}=${encodeURIComponent(
          String(planoAtividades)
        )}; path=/; max-age=31536000; samesite=lax`;
      } else {
        window.localStorage.removeItem(PLANO_ATIVIDADES_COOKIE);
        document.cookie = `${PLANO_ATIVIDADES_COOKIE}=; path=/; max-age=0; samesite=lax`;
      }
    } else {
      window.localStorage.removeItem(INSTRUCAO_SERVICO_COOKIE);
      document.cookie = `${INSTRUCAO_SERVICO_COOKIE}=; path=/; max-age=0; samesite=lax`;
      window.localStorage.removeItem(PLANO_ATIVIDADES_COOKIE);
      document.cookie = `${PLANO_ATIVIDADES_COOKIE}=; path=/; max-age=0; samesite=lax`;
    }
  }, [instrucaoServicoId, planoAtividades]);

  return (
    <PerfilContext.Provider value={role}>
      <InstrucaoServicoContext.Provider
        value={{ instrucaoServicoId, planoAtividades, setInstrucaoServicoId, setFiltroInstrucaoServico }}
      >
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
                  Instrução de Serviço / Plano ativo
                </label>
                <select
                  value={valorFiltroInstrucao(instrucaoServicoId, planoAtividades)}
                  onChange={(e) => {
                    const filtro = parseValorFiltroInstrucao(e.target.value);
                    setFiltroInstrucaoServico(filtro.instrucaoServicoId, filtro.planoAtividades);
                  }}
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2 md:max-w-xl"
                >
                  <option value="">Todas as Instruções de Serviço</option>
                  {opcoesFiltroInstrucao.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
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
