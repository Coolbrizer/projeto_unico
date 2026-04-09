import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { montarGrupos } from "@/lib/equipe-grupos";
import type { Atividade, Equipe, Integrante } from "@/types/database";

/** Remove espaços estranhos e prefixos tipo "Início:" colados ao valor. */
function limparTextoData(s: string): string {
  return s
    .replace(/\u200b/g, "")
    .trim()
    .replace(/^(in[íi]cio|inicio|final|fim)\s*:\s*/i, "")
    .trim();
}

/**
 * Interpreta datas em texto: ISO (yyyy-mm-dd), brasileiro (dd/mm/aaaa, dd-mm-aaaa, dd.mm.aaaa),
 * inclusive quando há texto extra ou rótulos. Preferência DD/MM (pt-BR).
 */
export function parseDataTexto(s: string | null | undefined): Date | null {
  if (s == null) return null;
  const t = limparTextoData(String(s));
  if (!t) return null;

  // ISO no início ou após espaço (yyyy-mm-dd)
  const iso = /(?:^|\s)(\d{4})-(\d{2})-(\d{2})/.exec(t);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]);
    const day = Number(iso[3]);
    const d = new Date(y, m - 1, day);
    if (
      !Number.isNaN(d.getTime()) &&
      d.getFullYear() === y &&
      d.getMonth() === m - 1 &&
      d.getDate() === day
    ) {
      return d;
    }
  }

  // Brasileiro em qualquer posição: 11/02/2026, 11-02-2026, 11.02.2026, inclusive "11 / 02 / 2026"
  const br = /\b(\d{1,2})\s*[./-]\s*(\d{1,2})\s*[./-]\s*(\d{4})\b/.exec(t);
  if (br) {
    const day = Number(br[1]);
    const month = Number(br[2]);
    const y = Number(br[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const d = new Date(y, month - 1, day);
      if (
        !Number.isNaN(d.getTime()) &&
        d.getFullYear() === y &&
        d.getMonth() === month - 1 &&
        d.getDate() === day
      ) {
        return d;
      }
    }
  }

  const parsed = Date.parse(t);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  return null;
}

function intervaloAtividade(a: Atividade): { start: Date; end: Date } | null {
  const pi = parseDataTexto(a.inicio);
  const pf = parseDataTexto(a.fim);
  if (pi && pf) {
    const start = new Date(pi);
    start.setHours(0, 0, 0, 0);
    const end = new Date(pf);
    end.setHours(23, 59, 59, 999);
    if (start > end) return { start: end, end: start };
    return { start, end };
  }
  if (pi) {
    const s = new Date(pi);
    s.setHours(0, 0, 0, 0);
    const e = new Date(s);
    e.setHours(23, 59, 59, 999);
    return { start: s, end: e };
  }
  if (pf) {
    const e = new Date(pf);
    e.setHours(23, 59, 59, 999);
    const s = new Date(e);
    s.setHours(0, 0, 0, 0);
    return { start: s, end: e };
  }
  return null;
}

/** A atividade tem interseção com o mês civil [year, month] (month 1–12)? */
export function atividadeSobrepoemMes(a: Atividade, year: number, month: number): boolean {
  const iv = intervaloAtividade(a);
  if (!iv) return false;
  const monthStart = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const monthEnd = new Date(year, month, 0, 23, 59, 59, 999);
  return iv.start <= monthEnd && iv.end >= monthStart;
}

export type ResultadoMemorandoPagamento = {
  integrantes: Integrante[];
  /** Quantidade de registros de atividade cujo período cruza o mês (após interpretar início/fim). */
  atividadesNoMes: number;
};

/**
 * Integrantes únicos ligados a pelo menos uma atividade que cruza o mês,
 * usando as mesmas regras de agrupamento da tela Equipe (setor × código/equipe).
 */
export function listarIntegrantesMemorandoPagamento(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[],
  year: number,
  month: number
): ResultadoMemorandoPagamento {
  const codigosNoMes = new Set<string>();
  let atividadesNoMes = 0;
  for (const a of atividades) {
    if (atividadeSobrepoemMes(a, year, month)) {
      atividadesNoMes += 1;
      codigosNoMes.add((a.codigo ?? "").trim());
    }
  }

  const grupos = montarGrupos(equipes, atividades, integrantes);
  const map = new Map<string, Integrante>();
  for (const g of grupos) {
    if (!codigosNoMes.has(g.codigo)) continue;
    for (const i of g.integrantes) {
      map.set(i.id, i);
    }
  }
  const lista = [...map.values()].sort((a, b) =>
    (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
  );
  return { integrantes: lista, atividadesNoMes };
}

/** Nomes para o PDF: ordenados alfabeticamente, cada nome aparece uma vez (texto normalizado). */
export function nomesUnicosParaMemorando(integrantes: Integrante[]): string[] {
  const sorted = [...integrantes].sort((a, b) =>
    (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
  );
  const visto = new Set<string>();
  const nomes: string[] = [];
  for (const i of sorted) {
    const exibicao = (i.nome ?? "").trim();
    if (!exibicao) continue;
    const chave = exibicao.replace(/\s+/g, " ").toLowerCase();
    if (visto.has(chave)) continue;
    visto.add(chave);
    nomes.push(exibicao);
  }
  return nomes;
}

export function gerarPdfMemorandoPagamento(
  resultado: ResultadoMemorandoPagamento,
  year: number,
  month: number
): void {
  const { integrantes, atividadesNoMes } = resultado;
  const nomesPdf = nomesUnicosParaMemorando(integrantes);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const mesTitulo = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  doc.setFontSize(16);
  doc.text("Memorando de Pagamento", 14, 16);
  doc.setFontSize(11);
  doc.text(
    `Mês de referência: ${mesTitulo.charAt(0).toUpperCase() + mesTitulo.slice(1)}`,
    14,
    24
  );
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, 14, 30);
  doc.setTextColor(0, 0, 0);

  if (nomesPdf.length === 0) {
    doc.setFontSize(10);
    const msg =
      atividadesNoMes === 0
        ? "Nenhum registro encontrado para o mês selecionado. Verifique as datas de início e fim (formato dd/mm/aaaa ou aaaa-mm-dd)."
        : "Nenhum integrante vinculado ao período. Verifique se o setor de cada integrante coincide com o código da atividade ou com o nome cadastrado em Equipe.";
    doc.text(msg, 14, 42, { maxWidth: 260 });
  } else {
    const head = [["Nome"]];
    const tableBody = nomesPdf.map((nome) => [nome]);
    autoTable(doc, {
      startY: 34,
      head,
      body: tableBody,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [30, 64, 90], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 248, 252] },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
      columnStyles: { 0: { cellWidth: 250 } },
    });
  }

  doc.save(`memorando-pagamento-${year}-${String(month).padStart(2, "0")}.pdf`);
}
