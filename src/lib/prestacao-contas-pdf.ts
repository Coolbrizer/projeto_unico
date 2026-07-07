import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Documento } from "@/types/database";
import { rotuloDocumentoNumeroAno } from "@/lib/documento-referencia";
import { parsePartesCodigoAtividade } from "@/lib/atividade-codigo";

export type LinhaPrestacaoPdf = {
  codigo: string;
  atividade: string | null;
  equipe: string;
  setor_responsavel: string | null;
  progresso: number;
  etiqueta_relatorio: string | null;
  link_relatorio: string | null;
};

function tituloInstrucaoServico(d: Documento): string {
  return rotuloDocumentoNumeroAno({
    tipo: "Instrução de Serviço",
    numero: d.numero,
    ano: d.ano,
  });
}

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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Anexo", centroX, ty, { align: "center" });
  ty += 8;

  doc.setFontSize(11);
  doc.text(tituloInstrucaoServico(documento), centroX, ty, { align: "center" });
  ty += 7;

  const etapaTxt = textoEtapas(linhas);
  const numeroPlano = numeroPlanoAtividades.trim();
  const linhaEtapaPlano = etapaTxt
    ? `${etapaTxt} - Plano de Atividades nº ${numeroPlano}`
    : `Plano de Atividades nº ${numeroPlano}`;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(linhaEtapaPlano, centroX, ty, { align: "center" });
  ty += 12;

  const head = [["Código", "Atividade", "Equipe", "Setor"]];

  const body = linhas.map((r) => [
    r.codigo?.trim() || "—",
    r.atividade?.trim() || "—",
    r.equipe?.trim() || "—",
    r.setor_responsavel?.trim() || "—",
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
      0: { cellWidth: 20 },
      1: { cellWidth: 112 },
      2: { cellWidth: 91 },
      3: { cellWidth: 38, overflow: "visible" },
    },
  });

  const num = String(documento.numero ?? "").trim() || "doc";
  const ano = String(documento.ano ?? "").trim() || "";
  const slug = ano ? `${num}-${ano}` : num;
  doc.save(`prestacao-contas-IS-${slug}.pdf`);
}
