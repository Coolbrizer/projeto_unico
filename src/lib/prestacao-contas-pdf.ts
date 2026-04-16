import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Documento } from "@/types/database";

export type LinhaPrestacaoPdf = {
  codigo: string;
  atividade: string | null;
  matricula: number | null;
  nome_responsavel: string | null;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
};

function tituloInstrucaoServico(d: Documento): string {
  const temRef =
    d.numero != null &&
    d.ano != null &&
    String(d.numero).trim() !== "" &&
    String(d.ano).trim() !== "";
  if (temRef) {
    return `Instrução de Serviço nº ${String(d.numero).trim()}/${String(d.ano).trim()}`;
  }
  return (d.titulo ?? "").trim() || "Instrução de Serviço";
}

/**
 * Converte SVG em PNG em escala de cinza (adequado a “preto e branco” no PDF).
 */
async function svgParaPngDataUrl(svg: string, larguraPx: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      const w = larguraPx;
      const h = Math.round(larguraPx * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas não disponível."));
        return;
      }
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.filter = "grayscale(100%) contrast(1.15)";
      ctx.drawImage(img, 0, 0, w, h);
      ctx.filter = "none";
      const data = canvas.toDataURL("image/png");
      URL.revokeObjectURL(url);
      resolve(data);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Falha ao carregar SVG."));
    };
    img.src = url;
  });
}

async function carregarBrasaoPngDataUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/brasao-republica.svg", { cache: "force-cache" });
    if (!res.ok) return null;
    const svg = await res.text();
    return await svgParaPngDataUrl(svg, 220);
  } catch {
    return null;
  }
}

function textoEtiqueta(l: LinhaPrestacaoPdf): string {
  const et = l.etiqueta_relatorio?.trim();
  const ln = l.link_relatorio?.trim();
  if (et && ln) return `${et} (${ln})`;
  if (ln) return ln;
  if (et) return et;
  return "—";
}

export async function gerarPdfPrestacaoContas(
  documento: Documento,
  linhas: LinhaPrestacaoPdf[]
): Promise<void> {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 18;
  const y = 16;

  const brasaoData = await carregarBrasaoPngDataUrl();
  const imgW = 22;
  const imgH = 26;
  if (brasaoData) {
    try {
      doc.addImage(brasaoData, "PNG", marginX, y, imgW, imgH);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(6.5);
      doc.setTextColor(45, 45, 45);
      doc.text("Brasão da República", marginX + imgW / 2, y + imgH + 3, { align: "center" });
      doc.setTextColor(0, 0, 0);
    } catch {
      /* imagem opcional */
    }
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textoX = brasaoData ? marginX + imgW + 6 : marginX;
  let ty = y + 4;
  doc.text("Ministério Público Federal", textoX, ty);
  ty += 5;
  doc.text("Procuradoria-Geral da República", textoX, ty);
  ty += 14;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("ANEXO", pageW / 2, ty, { align: "center" });
  ty += 8;

  doc.setFontSize(11);
  doc.text(tituloInstrucaoServico(documento), pageW / 2, ty, { align: "center" });
  ty += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "Relatório de prestação de contas - Projeto de Modernização do Sistema Único",
    pageW / 2,
    ty,
    { align: "center" }
  );
  ty += 12;

  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, marginX, ty);
  doc.setTextColor(0, 0, 0);
  ty += 6;

  const head = [
    [
      "Código",
      "Atividade",
      "Matrícula",
      "Responsável",
      "Setor",
      "% conclusão",
      "Etiqueta / link",
    ],
  ];

  const body = linhas.map((r) => [
    r.codigo?.trim() || "—",
    r.atividade?.trim() || "—",
    r.matricula != null ? String(r.matricula) : "—",
    r.nome_responsavel?.trim() || "—",
    r.setor_responsavel?.trim() || "—",
    `${r.progresso}%`,
    textoEtiqueta(r),
  ]);

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
      0: { cellWidth: 26 },
      1: { cellWidth: 52 },
      2: { cellWidth: 22 },
      3: { cellWidth: 42 },
      4: { cellWidth: 32 },
      5: { cellWidth: 18 },
      6: { cellWidth: "auto" },
    },
  });

  const num = String(documento.numero ?? "").trim() || "doc";
  const ano = String(documento.ano ?? "").trim() || "";
  const slug = ano ? `${num}-${ano}` : num;
  doc.save(`prestacao-contas-IS-${slug}.pdf`);
}
