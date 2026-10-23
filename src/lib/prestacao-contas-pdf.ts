import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Documento } from "@/types/database";
import { parsePartesCodigoAtividade } from "@/lib/atividade-codigo";
import { normalizarNomeSomenteLetras } from "@/lib/equipe-page-helpers";
import { ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA } from "@/lib/status-execucao";

export type LinhaPrestacaoPdf = {
  codigo: string;
  atividade: string | null;
  equipe: string;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
  nao_entregue_com_justificativa?: boolean | null;
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
  /** A etiqueta fica na última linha; a justificativa ocupa a linha de cima. */
  linkNaUltimaLinha: boolean;
} {
  const etiqueta = linha.etiqueta_relatorio?.trim() ?? "";
  const link = linha.link_relatorio?.trim() ?? "";
  const url = link ? hrefSeguro(link) : null;
  const textoRelatorio = etiqueta || (link ? "Abrir link" : "");
  const justificativa = linha.nao_entregue_com_justificativa === true;

  if (justificativa) {
    return {
      content: textoRelatorio
        ? `${ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA}\n${textoRelatorio}`
        : ROTULO_NAO_ENTREGUE_COM_JUSTIFICATIVA,
      url: textoRelatorio ? url : null,
      linkNaUltimaLinha: Boolean(textoRelatorio && url),
    };
  }

  if (!textoRelatorio) return { content: "—", url: null, linkNaUltimaLinha: false };
  return {
    content: textoRelatorio,
    url,
    linkNaUltimaLinha: false,
    ...(url ? { styles: { textColor: [29, 78, 216] as [number, number, number] } } : {}),
  };
}

function corFundoCelula(fillColor: unknown): [number, number, number] {
  if (Array.isArray(fillColor) && fillColor.length >= 3) {
    return [Number(fillColor[0]), Number(fillColor[1]), Number(fillColor[2])];
  }
  if (typeof fillColor === "number") return [fillColor, fillColor, fillColor];
  return [255, 255, 255];
}

function textoPercentualConclusao(progresso: number): string {
  const n = Number(progresso);
  if (!Number.isFinite(n)) return "—";
  return `${Math.round(n)}%`;
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
  linhas: LinhaPrestacaoPdf[]
): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 18;
  const centroX = pageW / 2;

  let ty = 18;
  doc.setTextColor(0, 0, 0);

  const etapaTxt = textoEtapas(linhas);
  if (etapaTxt) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(etapaTxt, centroX, ty, { align: "center" });
    ty += 12;
  }

  const colRelatorio = 5;
  const head = [
    ["Código", "Atividade", "Equipe", "Setor", "Percentual de Conclusão", "Relatório"],
  ];
  const linksRelatorio: Array<{ url: string | null; linkNaUltimaLinha: boolean }> = [];

  const body = linhas.map((r) => {
    const relatorio = celulaRelatorio(r);
    linksRelatorio.push({
      url: relatorio.url,
      linkNaUltimaLinha: relatorio.linkNaUltimaLinha,
    });
    return [
      r.codigo?.trim() || "—",
      r.atividade?.trim() || "—",
      textoEquipePdf(r.equipe),
      r.setor_responsavel?.trim() || "—",
      textoPercentualConclusao(r.progresso),
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
      1: { cellWidth: 78, fontSize: 9 },
      2: { cellWidth: 62 },
      3: { cellWidth: 30, overflow: "visible" },
      4: { cellWidth: 32, halign: "center" },
      5: { cellWidth: 41 },
    },
    didDrawCell: (data) => {
      if (data.section !== "body" || data.column.index !== colRelatorio) return;
      const meta = linksRelatorio[data.row.index];
      if (!meta?.url) return;
      const linhasTexto = data.cell.text ?? [];
      const indice = meta.linkNaUltimaLinha ? linhasTexto.length - 1 : 0;
      const texto = linhasTexto[indice] ?? "";
      if (!texto) return;

      const fontePt = 8;
      const fonteMm = fontePt / doc.internal.scaleFactor;
      const alturaLinha = fonteMm * doc.getLineHeightFactor();
      const padTop =
        typeof data.cell.padding === "function" ? data.cell.padding("top") : 1.8;
      const padLeft =
        typeof data.cell.padding === "function" ? data.cell.padding("left") : 1.8;
      const baseline =
        data.cell.y + padTop + fonteMm * 0.85 + indice * alturaLinha;
      const x = data.cell.x + padLeft;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(fontePt);

      if (meta.linkNaUltimaLinha) {
        const [r, g, b] = corFundoCelula(data.cell.styles.fillColor);
        doc.setFillColor(r, g, b);
        doc.rect(
          data.cell.x + 0.4,
          baseline - fonteMm * 0.78,
          data.cell.width - 0.8,
          fonteMm * 1.15,
          "F"
        );
        doc.setTextColor(29, 78, 216);
        doc.text(texto, x, baseline);
        doc.link(
          data.cell.x,
          data.cell.y + padTop + indice * alturaLinha,
          data.cell.width,
          alturaLinha,
          { url: meta.url }
        );
      } else {
        doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, {
          url: meta.url,
        });
      }

      doc.setDrawColor(29, 78, 216);
      doc.setLineWidth(0.15);
      const larguraTexto = Math.min(doc.getTextWidth(texto), data.cell.width - padLeft * 2);
      const y = meta.linkNaUltimaLinha ? baseline + fonteMm * 0.18 : data.cell.y + padTop + 2.9;
      doc.line(x, y, x + larguraTexto, y);
    },
  });

  const num = String(documento.numero ?? "").trim() || "doc";
  const ano = String(documento.ano ?? "").trim() || "";
  const slug = ano ? `${num}-${ano}` : num;
  doc.save(`prestacao-contas-IS-${slug}.pdf`);
}
