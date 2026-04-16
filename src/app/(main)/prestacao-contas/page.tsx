"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePerfil } from "@/components/AppShell";
import { canEditarDocumentos } from "@/lib/auth/roles";
import { TIPOS_DOCUMENTO } from "@/lib/documentos-constants";
import { useMounted } from "@/hooks/useMounted";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Documento } from "@/types/database";

const TIPO_IS = TIPOS_DOCUMENTO[0];

function hrefSeguro(url: string): string {
  const t = url.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function labelDocumento(r: Documento): string {
  const temRef =
    r.numero != null &&
    r.ano != null &&
    String(r.numero).trim() !== "" &&
    String(r.ano).trim() !== "";
  const linhaPrincipal = temRef ? `${r.tipo ?? r.titulo} nº ${r.numero}/${r.ano}` : r.titulo;
  const etiquetaTxt = r.etiqueta?.trim();
  return etiquetaTxt ? `${linhaPrincipal} — ${etiquetaTxt}` : linhaPrincipal;
}

type LinhaPrestacao = {
  id: string;
  codigo: string;
  atividade: string | null;
  matricula: number | null;
  nome_responsavel: string | null;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
};

export default function PrestacaoContasPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeVer = canEditarDocumentos(perfil);

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [documentoId, setDocumentoId] = useState("");
  const [linhas, setLinhas] = useState<LinhaPrestacao[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [loadingLinhas, setLoadingLinhas] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instrucoesServico = useMemo(
    () => documentos.filter((d) => (d.tipo?.trim() ?? "") === TIPO_IS),
    [documentos]
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
    if (!documentoId) {
      setLinhas([]);
      return;
    }
    void loadLinhas(documentoId);
  }, [documentoId, loadLinhas]);

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
          Selecione uma Instrução de Serviço cadastrada em Documentos para ver as atividades vinculadas e o
          resumo por responsável e relatório.
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
        <label className="block text-xs font-medium text-[var(--muted)]">Instrução de Serviço</label>
        <select
          value={documentoId}
          onChange={(e) => setDocumentoId(e.target.value)}
          disabled={loadingDocs || !configured}
          className="mt-2 w-full max-w-xl rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--input-text)] outline-none ring-[var(--input-focus-ring)] focus:ring-2"
        >
          <option value="">Selecione uma Instrução de Serviço</option>
          {instrucoesServico.map((d) => (
            <option key={d.id} value={d.id}>
              {labelDocumento(d)}
            </option>
          ))}
        </select>
        {!loadingDocs && configured && instrucoesServico.length === 0 && (
          <p className="mt-2 text-xs text-[var(--muted)]">
            Nenhuma Instrução de Serviço cadastrada. Inclua documentos do tipo &quot;{TIPO_IS}&quot; em
            Documentos.
          </p>
        )}
      </div>

      {!documentoId ? null : loadingLinhas ? (
        <p className="text-sm text-[var(--muted)]">Carregando…</p>
      ) : linhas.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          Nenhuma atividade vinculada a esta Instrução de Serviço. Associe a coluna{" "}
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">
            instrucao_servico
          </code>{" "}
          nas atividades (mesmo id deste documento).
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--accent-muted)]/85 text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2.5 font-medium">Código da atividade</th>
                <th className="px-3 py-2.5 font-medium">Atividade</th>
                <th className="px-3 py-2.5 font-medium">Matrícula (responsável)</th>
                <th className="px-3 py-2.5 font-medium">Nome do responsável</th>
                <th className="px-3 py-2.5 font-medium">Setor do responsável</th>
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
                    <td className="max-w-[220px] px-3 py-2.5 text-[var(--foreground)]">
                      {r.atividade?.trim() ? r.atividade : "—"}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-[var(--muted)]">
                      {r.matricula != null ? String(r.matricula) : "—"}
                    </td>
                    <td className="px-3 py-2.5">{r.nome_responsavel ?? "—"}</td>
                    <td className="px-3 py-2.5 text-[var(--muted)]">{r.setor_responsavel ?? "—"}</td>
                    <td className="px-3 py-2.5 text-right font-medium tabular-nums text-[var(--foreground)]">
                      {r.progresso}%
                    </td>
                    <td className="px-3 py-2.5">
                      {!temEtiqueta && !temLink ? (
                        "—"
                      ) : (
                        <span className="inline-flex flex-wrap items-center gap-1">
                          {temLink ? (
                            <a
                              href={hrefSeguro(r.link_relatorio!)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:text-[var(--accent-hover)]"
                            >
                              {temEtiqueta ? r.etiqueta_relatorio : "Abrir link"}
                            </a>
                          ) : (
                            <span>{r.etiqueta_relatorio}</span>
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
