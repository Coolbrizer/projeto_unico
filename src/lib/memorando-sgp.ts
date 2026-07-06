import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  coletarIdsIntegrantesVinculados,
  diasTotaisMemorandoPagamento,
} from "@/lib/memorando-pagamento";
import type { Atividade, Equipe, Integrante } from "@/types/database";

/** Integrantes vinculados a qualquer atividade da IS selecionada (dados já filtrados por IS). */
export function listarIntegrantesMemorandoSgp(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[]
): Integrante[] {
  if (atividades.length === 0) return [];

  const ids = coletarIdsIntegrantesVinculados(equipes, atividades, integrantes);

  return integrantes
    .filter((i) => ids.has(i.id) && !i.nao_remunerado)
    .sort((a, b) => a.matricula - b.matricula);
}

export function gerarPdfMemorandoSgp(
  integrantes: Integrante[],
  year: number,
  month: number
): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const marginX = 18;
  const mesNome = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", { month: "long" });
  const mesCapitalizado = mesNome.charAt(0).toUpperCase() + mesNome.slice(1);
  const totalDias = diasTotaisMemorandoPagamento(year, month);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Projeto de Modernização do Sistema Único", marginX, 20);

  doc.setFontSize(12);
  doc.text("Gratificação de Projeto", marginX, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Referência: ${mesCapitalizado} de ${year}`, marginX, 36);

  if (integrantes.length === 0) {
    doc.setFontSize(10);
    doc.text("Nenhum integrante vinculado à Instrução de Serviço selecionada.", marginX, 48, {
      maxWidth: 170,
    });
  } else {
    const body = integrantes.map((i) => [
      String(i.matricula),
      (i.nome ?? "").trim() || "—",
      String(totalDias),
    ]);

    autoTable(doc, {
      startY: 44,
      head: [["Matrícula", "Nome", "Total de dias"]],
      body,
      styles: { fontSize: 9, cellPadding: 2, overflow: "linebreak" },
      headStyles: { fillColor: [55, 75, 95], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: marginX, right: marginX },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 32, halign: "center" },
      },
    });
  }

  doc.save(`memorando-sgp-${year}-${String(month).padStart(2, "0")}.pdf`);
}
