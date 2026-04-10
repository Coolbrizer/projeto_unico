import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { atividadeSobrepoemMes } from "@/lib/datas-atividade";
import { montarGrupos } from "@/lib/equipe-grupos";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export type ResultadoMemorandoPagamento = {
  integrantes: Integrante[];
  /** Quantidade de atividades cujo período (início/fim) cruza o mês de referência. */
  atividadesNoMes: number;
};

/**
 * Integrantes únicos ligados a pelo menos uma atividade cujo intervalo [início, fim] cruza o mês escolhido,
 * usando as mesmas regras da tela Equipe (setor × código / nome da equipe).
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
        ? "Nenhuma atividade com período (data inicial e final) que cruze este mês. Confira início e fim em Atividades (DD/MM/AAAA) e o código da atividade."
        : "Nenhum integrante vinculado às atividades deste período. O setor do integrante deve coincidir com o código da atividade ou com o nome cadastrado em Equipe para o mesmo código.";
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
