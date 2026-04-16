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

function blobParaDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error("Leitura do ficheiro falhou."));
    r.readAsDataURL(blob);
  });
}

/** Razão altura/largura da imagem (para dimensionar em mm no PDF). */
function aspectRatioDeDataUrlPng(dataUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || 1;
      resolve((img.naturalHeight || 1) / w);
    };
    img.onerror = () => reject(new Error("Imagem inválida."));
    img.src = dataUrl;
  });
}

/**
 * Carrega o brasão em PNG (preto e branco) a partir de /public/brasao-republica.png.
 */
async function carregarBrasao(): Promise<{ dataUrl: string; aspect: number } | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/brasao-republica.png", { cache: "force-cache" });
    if (!res.ok) return null;
    const dataUrl = await blobParaDataUrl(await res.blob());
    const aspect = await aspectRatioDeDataUrlPng(dataUrl);
    return { dataUrl, aspect };
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
  const centroX = pageW / 2;

  let ty = 14;

  const brasao = await carregarBrasao();
  const imgWmm = 42;
  if (brasao) {
    try {
      const imgHmm = imgWmm * brasao.aspect;
      const imgX = centroX - imgWmm / 2;
      doc.addImage(brasao.dataUrl, "PNG", imgX, ty, imgWmm, imgHmm);
      ty += imgHmm + 5;
    } catch {
      ty += 2;
    }
  } else {
    ty += 2;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  doc.text("Ministério Público Federal", centroX, ty, { align: "center" });
  ty += 5;
  doc.text("Procuradoria-Geral da República", centroX, ty, { align: "center" });
  ty += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("ANEXO", centroX, ty, { align: "center" });
  ty += 8;

  doc.setFontSize(11);
  doc.text(tituloInstrucaoServico(documento), centroX, ty, { align: "center" });
  ty += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "Relatório de prestação de contas - Projeto de Modernização do Sistema Único",
    centroX,
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
