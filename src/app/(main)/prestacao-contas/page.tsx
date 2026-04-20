"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInstrucaoServicoSelecionada, usePerfil } from "@/components/AppShell";
import { canEditarDocumentos } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import { gerarPdfPrestacaoContas } from "@/lib/prestacao-contas-pdf";
import { rotuloDocumentoNumeroAno } from "@/lib/documento-referencia";
import type { Documento } from "@/types/database";

const TIPO_IS = TIPOS_DOCUMENTO[0];

function hrefSeguro(url: string): string {
  const t = url.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function labelDocumento(r: Documento): string {
  const linhaPrincipal = rotuloDocumentoNumeroAno(r);
  const etiquetaTxt = r.etiqueta?.trim();
  return etiquetaTxt ? `${linhaPrincipal} — ${etiquetaTxt}` : linhaPrincipal;
}

type LinhaPrestacao = {
  id: string;
  codigo: string;
  atividade: string | null;
  equipe: string;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
};

export default function PrestacaoContasPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const { instrucaoServicoId } = useInstrucaoServicoSelecionada();
  const podeVer = canEditarDocumentos(perfil);

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [linhas, setLinhas] = useState<LinhaPrestacao[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [loadingLinhas, setLoadingLinhas] = useState(false);
  const [pdfGerando, setPdfGerando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instrucoesServico = useMemo(
    () => documentos.filter((d) => (d.tipo?.trim() ?? "") === TIPO_IS),
    [documentos]
  );

  const documentoSelecionado = useMemo(
    () => documentos.find((d) => d.id === instrucaoServicoId) ?? null,
    [documentos, instrucaoServicoId]
  );

  const loadDocumentos = useCallback(async () => {
    if (!podeVer) return;
    setError(null);
    setLoadingDocs(true);
    const res = await fetch("/api/documentos", { credentials: "include" });
    const data = (await res.json()) as { error?: string; documentos?: Documento[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar os documentos.");
      setDocumentos([]);
    } else {
      setDocumentos(data.documentos ?? []);
    }
    setLoadingDocs(false);
  }, [podeVer]);

  useEffect(() => {
    void loadDocumentos();
  }, [loadDocumentos]);

  const loadLinhas = useCallback(async (id: string) => {
    if (!id) {
      setLinhas([]);
      return;
    }
    setLoadingLinhas(true);
    setError(null);
    const res = await fetch(`/api/prestacao-contas?documentoId=${encodeURIComponent(id)}`, {
      credentials: "include",
    });
    const data = (await res.json()) as { error?: string; linhas?: LinhaPrestacao[] };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar o resumo.");
      setLinhas([]);
    } else {
      setLinhas(data.linhas ?? []);
    }
    setLoadingLinhas(false);
  }, []);

  useEffect(() => {
    if (!instrucaoServicoId) {
      setLinhas([]);
      return;
    }
    void loadLinhas(instrucaoServicoId);
  }, [instrucaoServicoId, loadLinhas]);

  async function handleExtrairPdf() {
    if (!documentoSelecionado || linhas.length === 0) return;
    setPdfGerando(true);
    setError(null);
    try {
      await gerarPdfPrestacaoContas(documentoSelecionado, linhas);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível gerar o PDF.");
    } finally {
      setPdfGerando(false);
    }
  }

  if (!podeVer) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-[var(--muted)]">
          Apenas perfis gestor e administrador podem aceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Prestação de Contas</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          A Instrução de Serviço selecionada no topo da página define os dados exibidos aqui (atividades
          vinculadas e resumo por responsável e relatório).
        </p>
      </header>

      {mounted && !configured && (
        <p className="mb-4 text-sm text-[var(--muted)]">Configure o Supabase para ver os dados.</p>
      )}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm">
        <p className="text-xs font-medium text-[var(--muted)]">Instrução de Serviço ativa no topo</p>
        <p className="mt-2 text-sm text-[var(--foreground)]">
          {documentoSelecionado ? labelDocumento(documentoSelecionado) : "Nenhuma Instrução de Serviço selecionada."}
        </p>
        {!loadingDocs && configured && instrucoesServico.length === 0 && (
          <p className="mt-2 text-xs text-[var(--muted)]">
            Nenhuma Instrução de Serviço cadastrada. Inclua documentos do tipo &quot;{TIPO_IS}&quot; em
            Documentos.
          </p>
        )}
      </div>

      {!instrucaoServicoId ? (
        <p className="text-sm text-[var(--muted)]">
          Selecione uma Instrução de Serviço no campo superior para exibir a prestação de contas.
        </p>
      ) : loadingLinhas ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : linhas.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          Nenhuma atividade vinculada a esta Instrução de Serviço. Em Atividades, edite cada linha e
          escolha esta IS no campo correspondente (ou crie novas atividades já com a IS selecionada).
        </p>
      ) : (
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => void handleExtrairPdf()}
              disabled={pdfGerando || loadingLinhas}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {pdfGerando ? "A gerar PDF…" : "Extrair PDF"}
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[1100px] table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[32%]" />
              <col className="w-[30%]" />
              <col className="w-[11%]" />
              <col className="w-[7%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead className="border-b border-[var(--card-border)] bg-[var(--accent-muted)]/85 text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2.5 font-medium">Código da atividade</th>
                <th className="px-3 py-2.5 font-medium">Atividade</th>
                <th className="px-3 py-2.5 font-medium">Equipe</th>
                <th className="px-3 py-2.5 font-medium">Setor</th>
                <th className="px-3 py-2.5 font-medium text-right">% conclusão</th>
                <th className="px-3 py-2.5 font-medium">Etiqueta</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((r) => {
                const temEtiqueta = Boolean(r.etiqueta_relatorio?.trim());
                const temLink = Boolean(r.link_relatorio?.trim());
                return (
                  <tr key={r.id} className="border-b border-[var(--card-border)]/60 last:border-b-0">
                    <td className="px-3 py-2.5 font-medium text-[var(--accent)]">{r.codigo || "—"}</td>
                    <td className="min-w-0 px-3 py-2.5 text-[var(--foreground)]">
                      {r.atividade?.trim() ? r.atividade : "—"}
                    </td>
                    <td className="px-3 py-2.5 align-top">
                      {r.equipe?.trim() ? (
                        <ul className="m-0 list-none space-y-0.5 p-0">
                          {r.equipe.split("\n").map((linha, i) => (
                            <li key={i} className="whitespace-nowrap font-normal">
                              {linha}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--muted)]">{r.setor_responsavel ?? "—"}</td>
                    <td className="px-3 py-2.5 text-right font-medium tabular-nums text-[var(--foreground)]">
                      {r.progresso}%
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      {!temEtiqueta && !temLink ? (
                        "—"
                      ) : temLink && temEtiqueta ? (
                        <a
                          href={hrefSeguro(r.link_relatorio!)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap text-blue-700 underline decoration-blue-700 underline-offset-2 hover:text-blue-900"
                        >
                          {r.etiqueta_relatorio}
                        </a>
                      ) : temLink ? (
                        <a
                          href={hrefSeguro(r.link_relatorio!)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap text-blue-700 underline decoration-blue-700 underline-offset-2 hover:text-blue-900"
                        >
                          Abrir link
                        </a>
                      ) : (
                        <span className="whitespace-nowrap">{r.etiqueta_relatorio}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
