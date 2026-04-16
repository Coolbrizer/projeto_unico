"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigWarning } from "@/components/ConfigWarning";
import { usePerfil } from "@/components/AppShell";
import { isAdmin } from "@/lib/auth/roles";
import { useMounted } from "@/hooks/useMounted";
import { totalDespesaMensalFolha, valorMensalDoRef } from "@/lib/orcamento-folha";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";
import type { Integrante, Orcamento, RefPgto } from "@/types/database";

function formatMoney(n: number | null) {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

export default function OrcamentoPage() {
  const mounted = useMounted();
  const configured = useIsSupabaseConfigured();
  const perfil = usePerfil();
  const podeExcluirLancamento = isAdmin(perfil);
  const [rows, setRows] = useState<Orcamento[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [refPgto, setRefPgto] = useState<RefPgto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mesesProjecao, setMesesProjecao] = useState(1);

  const load = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/orcamento", { credentials: "include" });
    const data = (await res.json()) as {
      error?: string;
      orcamento?: Orcamento[];
      integrantes?: Integrante[];
      ref_pgto?: RefPgto[];
    };
    if (!res.ok) {
      setError(data.error ?? "Não foi possível carregar o orçamento.");
      setRows([]);
      setIntegrantes([]);
      setRefPgto([]);
    } else {
      setRows(data.orcamento ?? []);
      setIntegrantes(data.integrantes ?? []);
      setRefPgto(data.ref_pgto ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const folha = useMemo(
    () => totalDespesaMensalFolha(integrantes, refPgto),
    [integrantes, refPgto]
  );

  const refPorCargo = useMemo(() => {
    const map = new Map<string, RefPgto[]>();
    for (const r of refPgto) {
      const key = (r.cargo ?? "").trim() || "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) =>
        (a.classe_padrao ?? "").localeCompare(b.classe_padrao ?? "", "pt-BR", { numeric: true })
      );
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  }, [refPgto]);

  const mesesValidos = Math.max(1, Math.min(120, Math.floor(Number(mesesProjecao)) || 1));
  const despesaPeriodo = folha.total * mesesValidos;
  const despesaAnual = folha.total * 12;

  const totais = useMemo(() => {
    let prev = 0;
    let real = 0;
    let anyReal = false;
    for (const r of rows) {
      prev += Number(r.valor_previsto) || 0;
      if (r.valor_real != null) {
        anyReal = true;
        real += Number(r.valor_real) || 0;
      }
    }
    return { prev, real, anyReal };
  }, [rows]);

  async function removeOrc(id: string) {
    if (!podeExcluirLancamento) return;
    setError(null);
    const res = await fetch(`/api/orcamento/${id}`, { method: "DELETE", credentials: "include" });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) setError(data.error ?? "Não foi possível excluir.");
    else void load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Orçamento</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Despesa da folha (integrantes × <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">ref_pgto</code>),
          projeções por período e, se houver, lançamentos por categoria.
        </p>
      </header>

      {mounted && !configured && <ConfigWarning />}

      {error && (
        <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {!loading && configured && (
        <div className="mb-8 rounded-xl border border-[var(--success)]/25 bg-[var(--success)]/10 px-4 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--success)]">
            Despesa mensal (folha integrantes)
          </p>
          <p className="mt-2 text-2xl font-bold text-[var(--success)]">{formatMoney(folha.total)}</p>

          <div className="mt-5 border-t border-[var(--success)]/20 pt-4">
            <p className="text-xs font-medium text-[var(--success)]">Projeções</p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div>
                <label className="block text-xs text-[var(--muted)]">Multiplicar por meses</label>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={mesesProjecao}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setMesesProjecao(1);
                        return;
                      }
                      const n = parseInt(raw, 10);
                      if (Number.isNaN(n)) return;
                      setMesesProjecao(Math.min(120, Math.max(1, n)));
                    }}
                    className="w-20 rounded-lg border border-[var(--card-border)] bg-white px-2 py-1.5 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)]/30 focus:ring-2"
                  />
                  <span className="text-xs text-[var(--muted)]">meses</span>
                  <div className="flex flex-wrap gap-1">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMesesProjecao(m)}
                        className="rounded border border-[var(--success)]/25 bg-white/70 px-2 py-0.5 text-xs font-medium text-[var(--success)] hover:bg-[var(--success)]/10"
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  Total no período ({mesesValidos} {mesesValidos === 1 ? "mês" : "meses"}):{" "}
                  <strong className="text-[var(--success)]">{formatMoney(despesaPeriodo)}</strong>
                </p>
              </div>
              <div className="rounded-lg border border-[var(--success)]/20 bg-white/65 px-3 py-2 sm:min-w-[200px]">
                <p className="text-xs text-[var(--muted)]">Despesa anual (12 meses)</p>
                <p className="mt-1 text-lg font-semibold text-[var(--success)]">{formatMoney(despesaAnual)}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-[var(--foreground)]">
            Valores com base na referência <strong>ref_pgto</strong> e nos integrantes. Ajuste dados no
            Supabase ou na tela de integrantes.
          </p>
          {folha.semCorrespondencia.length > 0 && (
            <div className="mt-3 rounded-lg border border-[var(--warning)]/25 bg-[#f4ead5] px-3 py-2 text-xs text-[#6f4d14]">
              <p className="font-medium text-[#6f4d14]">
                {folha.semCorrespondencia.length} integrante(s) com cargo/classe sem linha em ref_pgto:
              </p>
              <ul className="mt-1 list-inside list-disc text-[#7c5a20]">
                {folha.semCorrespondencia.slice(0, 8).map((x) => (
                  <li key={x.id}>
                    {x.nome} — {x.cargo || "—"} / {x.classe_padrao || "—"}
                  </li>
                ))}
                {folha.semCorrespondencia.length > 8 && (
                  <li>… e mais {folha.semCorrespondencia.length - 8}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <section className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">
          Referência de pagamento (ref_pgto)
        </h3>
        <p className="mb-4 text-xs text-[var(--muted)]">
          Dados somente leitura nesta tela. Para incluir ou alterar linhas, use o Supabase (SQL em{" "}
          <code className="rounded bg-[var(--accent-muted)] px-1 text-[var(--foreground)]">supabase/migration_ref_pgto.sql</code> cria a tabela).
        </p>
        {refPgto.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Nenhuma linha em ref_pgto.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
            <table className="w-full min-w-[360px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--background)]/80 text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Cargo</th>
                  <th className="px-3 py-2.5 font-medium">Classe/Padrão</th>
                  <th className="px-3 py-2.5 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {refPorCargo.map(([cargo, itens]) =>
                  itens.map((r, idx) => (
                    <tr
                      key={r.id}
                      className="border-b border-[var(--card-border)]/50 last:border-b-0"
                    >
                      {idx === 0 ? (
                        <td
                          rowSpan={itens.length}
                          className="align-middle border-r border-[var(--card-border)]/40 px-3 py-2 font-medium text-[var(--foreground)]"
                        >
                          {cargo}
                        </td>
                      ) : null}
                      <td className="px-3 py-2 text-[var(--muted)]">{r.classe_padrao || "—"}</td>
                      <td className="px-3 py-2 text-right font-medium tabular-nums text-[var(--accent)]">
                        {formatMoney(Number(r.valor_mensal))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {rows.length > 0 && (
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)]">Total previsto (lançamentos)</p>
            <p className="mt-1 text-xl font-semibold">{formatMoney(totais.prev)}</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)]">Total real (somatório informado)</p>
            <p className="mt-1 text-xl font-semibold">
              {totais.anyReal ? formatMoney(totais.real) : "—"}
            </p>
          </div>
        </div>
      )}

      <section>
        <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Lista de lançamentos</h3>
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            {configured ? "Nenhum lançamento ainda." : "Configure o Supabase para ver os dados."}
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{r.categoria}</p>
                  {r.descricao && (
                    <p className="mt-1 text-sm text-[var(--muted)]">{r.descricao}</p>
                  )}
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Previsto {formatMoney(Number(r.valor_previsto))}
                    {" · "}
                    Real {r.valor_real != null ? formatMoney(Number(r.valor_real)) : "—"}
                    {r.periodo && ` · ${r.periodo}`}
                  </p>
                </div>
                {podeExcluirLancamento && (
                  <button
                    type="button"
                    onClick={() => void removeOrc(r.id)}
                    className="self-start rounded-lg border border-[var(--danger)]/30 bg-white/70 px-2 py-1.5 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger)]/10 sm:self-center disabled:opacity-50"
                  >
                    Excluir
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {integrantes.length > 0 && refPgto.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-3 text-sm font-medium text-[var(--muted)]">Detalhe por integrante (mês)</h3>
          <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-[var(--card-border)] bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2">Nome</th>
                  <th className="px-3 py-2">Cargo</th>
                  <th className="px-3 py-2">Classe/Padrão</th>
                  <th className="px-3 py-2 text-right">Valor/mês</th>
                </tr>
              </thead>
              <tbody>
                {integrantes.map((i) => {
                  const v = valorMensalDoRef(refPgto, i.cargo, i.classe_padrao);
                  return (
                    <tr key={i.id} className="border-b border-[var(--card-border)]/60">
                      <td className="px-3 py-2">{i.nome}</td>
                      <td className="px-3 py-2 text-[var(--muted)]">{i.cargo || "—"}</td>
                      <td className="px-3 py-2 text-[var(--muted)]">{i.classe_padrao || "—"}</td>
                      <td className="px-3 py-2 text-right font-medium text-[var(--accent)]">
                        {formatMoney(v)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
