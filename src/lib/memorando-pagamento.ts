import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { atividadeSobrepoemMes } from "@/lib/datas-atividade";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

export type ResultadoMemorandoPagamento = {
  integrantes: Integrante[];
  /** Quantidade de atividades cujo período (início/fim) cruza o mês de referência. */
  atividadesNoMes: number;
};

/** Quantidade de dias no mês civil (month = 1–12). */
export function diasNoMesReferencia(year: number, month1a12: number): number {
  return new Date(year, month1a12, 0).getDate();
}

/**
 * Integrantes com vinculação a **alguma** atividade cujo período cruza o mês:
 * - mesmo critério de equipe/setor que `montarGrupos` (setor = código ou nome da linha de equipe);
 * - **ou** nome do integrante reconhecido como responsável da atividade (sem exigir coincidência de setor).
 */
export function listarIntegrantesMemorandoPagamento(
  equipes: Equipe[],
  atividades: Atividade[],
  integrantes: Integrante[],
  year: number,
  month: number
): ResultadoMemorandoPagamento {
  const atividadesMes = atividades.filter((a) =>
    atividadeSobrepoemMes(a, year, month)
  );
  const atividadesNoMes = atividadesMes.length;

  if (atividadesNoMes === 0) {
    return { integrantes: [], atividadesNoMes: 0 };
  }

  const porCodigo = new Map<string, Atividade[]>();
  for (const a of atividadesMes) {
    const c = (a.codigo ?? "").trim();
    if (!porCodigo.has(c)) porCodigo.set(c, []);
    porCodigo.get(c)!.push(a);
  }

  const ids = new Set<string>();

  for (const [codigo, ats] of porCodigo) {
    const equipeRows = equipes.filter((e) => (e.codigo ?? "").trim() === codigo);
    const nomesEquipe = new Set(
      equipeRows.map((e) => (e.equipe ?? "").trim().toLowerCase()).filter(Boolean)
    );
    const codigoLc = codigo.toLowerCase();

    for (const i of integrantes) {
      const s = (i.setor ?? "").trim().toLowerCase();
      if (!s) continue;
      if (codigo && s === codigoLc) ids.add(i.id);
      else if (nomesEquipe.has(s)) ids.add(i.id);
    }

    for (const a of ats) {
      const resp = a.responsavel;
      for (const i of integrantes) {
        if (equipeLinhaEhResponsavel(i.nome ?? "", resp)) ids.add(i.id);
      }
    }
  }

  const lista = integrantes
    .filter((i) => ids.has(i.id))
    .sort((a, b) =>
      (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" })
    );
  return { integrantes: lista, atividadesNoMes };
}

export function gerarPdfMemorandoPagamento(
  resultado: ResultadoMemorandoPagamento,
  year: number,
  month: number
): void {
  const { integrantes, atividadesNoMes } = resultado;
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const mesTitulo = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const totalDias = diasNoMesReferencia(year, month);

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

  if (integrantes.length === 0) {
    doc.setFontSize(10);
    const msg =
      atividadesNoMes === 0
        ? "Nenhuma atividade com período (data inicial e final) que cruze este mês. Confira início e fim em Atividades (DD/MM/AAAA)."
        : "Nenhum integrante cadastrado.";
    doc.text(msg, 14, 42, { maxWidth: 260 });
  } else {
    const head = [["Matrícula", "Nome", "Setor", "Total de dias do mês"]];
    const tableBody = integrantes.map((i) => [
      String(i.matricula),
      (i.nome ?? "").trim() || "—",
      (i.setor ?? "").trim() || "—",
      String(totalDias),
    ]);
    autoTable(doc, {
      startY: 34,
      head,
      body: tableBody,
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [30, 64, 90], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 248, 252] },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 75 },
        2: { cellWidth: 55 },
        3: { cellWidth: 38 },
      },
    });
  }

  doc.save(`memorando-pagamento-${year}-${String(month).padStart(2, "0")}.pdf`);
}
