import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Documento } from "@/types/database";
import { parsePartesCodigoAtividade } from "@/lib/atividade-codigo";
import { normalizarNomeSomenteLetras } from "@/lib/equipe-page-helpers";

export type LinhaPrestacaoPdf = {
  codigo: string;
  atividade: string | null;
  equipe: string;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
};

/** Número da etapa a partir do prefixo do código (ex.: "5E-BD1" → 5). */
function numeroEtapaDoCodigo(codigo: string): number | null {
  const { etapa } = parsePartesCodigoAtividade(codigo);
  if (!etapa) return null;
  const n = parseInt(etapa, 10);
  return Number.isFinite(n) ? n : null;
}

/** Texto de etapa(s) reconhecida(s) nos códigos das linhas (ex.: "5ª Etapa", "1ª e 2ª Etapas"). */
function textoEtapas(linhas: LinhaPrestacaoPdf[]): string | null {
  const numeros = new Set<number>();
  for (const l of linhas) {
    const n = numeroEtapaDoCodigo(l.codigo ?? "");
    if (n !== null) numeros.add(n);
  }
  if (numeros.size === 0) return null;
  const ordenados = [...numeros].sort((a, b) => a - b);
  const ordinais = ordenados.map((n) => `${n}ª`);
  if (ordinais.length === 1) return `${ordinais[0]} Etapa`;
  const ultimo = ordinais[ordinais.length - 1];
  const resto = ordinais.slice(0, -1).join(", ");
  return `${resto} e ${ultimo} Etapas`;
}

function hrefSeguro(url: string): string {
  const t = url.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function celulaRelatorio(linha: LinhaPrestacaoPdf): {
  content: string;
  styles?: { textColor: [number, number, number] };
  url: string | null;
} {
  const etiqueta = linha.etiqueta_relatorio?.trim() ?? "";
  const link = linha.link_relatorio?.trim() ?? "";
  if (!etiqueta && !link) return { content: "—", url: null };
  const url = link ? hrefSeguro(link) : null;
  return {
    content: etiqueta || "Abrir link",
    url,
    ...(url ? { styles: { textColor: [29, 78, 216] as [number, number, number] } } : {}),
  };
}

function textoEquipePdf(equipe: string | null | undefined): string {
  const vistos = new Set<string>();
  const nomes: string[] = [];
  for (const linha of String(equipe ?? "").split(/\r?\n/)) {
    const nome = normalizarNomeSomenteLetras(linha);
    if (!nome) continue;
    const chave = nome.toLocaleLowerCase("pt-BR");
    if (vistos.has(chave)) continue;
    vistos.add(chave);
    nomes.push(nome);
  }
  return nomes.length > 0 ? nomes.join("\n") : "—";
}

export function gerarPdfPrestacaoContas(
  documento: Documento,
  linhas: LinhaPrestacaoPdf[],
  numeroPlanoAtividades: string
): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 18;
  const centroX = pageW / 2;

  let ty = 18;
  doc.setTextColor(0, 0, 0);

  const etapaTxt = textoEtapas(linhas);
  const numeroPlano = numeroPlanoAtividades.trim();
  const linhaEtapaPlano = etapaTxt
    ? `${etapaTxt} - Plano de Atividades nº ${numeroPlano}`
    : `Plano de Atividades nº ${numeroPlano}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(linhaEtapaPlano, centroX, ty, { align: "center" });
  ty += 12;

  const head = [["Código", "Atividade", "Equipe", "Setor", "Relatório"]];
  const linksRelatorio: Array<string | null> = [];

  const body = linhas.map((r) => {
    const relatorio = celulaRelatorio(r);
    linksRelatorio.push(relatorio.url);
    return [
      r.codigo?.trim() || "—",
      r.atividade?.trim() || "—",
      textoEquipePdf(r.equipe),
      r.setor_responsavel?.trim() || "—",
      { content: relatorio.content, styles: relatorio.styles },
    ];
  });

  autoTable(doc, {
    startY: ty,
    head,
    body,
    styles: { fontSize: 8, cellPadding: 1.8, overflow: "linebreak" },
    headStyles: { fillColor: [55, 75, 95], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: marginX, right: marginX },
    tableWidth: "auto",
    columnStyles: {
      0: { cellWidth: 18 },
      1: { cellWidth: 96, fontSize: 9 },
      2: { cellWidth: 72 },
      3: { cellWidth: 30, overflow: "visible" },
      4: { cellWidth: 45 },
    },
    didDrawCell: (data) => {
      if (data.section !== "body" || data.column.index !== 4) return;
      const url = linksRelatorio[data.row.index];
      if (!url) return;
      doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url });
      const texto = data.cell.text?.[0] ?? "";
      if (!texto) return;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setDrawColor(29, 78, 216);
      doc.setLineWidth(0.15);
      const larguraTexto = Math.min(
        doc.getTextWidth(texto),
        data.cell.width - 3.6
      );
      const x = data.cell.x + 1.8;
      const y = data.cell.y + 1.8 + 2.9;
      doc.line(x, y, x + larguraTexto, y);
    },
  });

  const num = String(documento.numero ?? "").trim() || "doc";
  const ano = String(documento.ano ?? "").trim() || "";
  const slug = ano ? `${num}-${ano}` : num;
  doc.save(`prestacao-contas-IS-${slug}.pdf`);
}
