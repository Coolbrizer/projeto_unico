import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { atividadeSobrepoemMes } from "@/lib/datas-atividade";
import { equipeLinhaEhResponsavel } from "@/lib/equipe-page-helpers";
import type { Atividade, Equipe, Integrante } from "@/types/database";

type JsPDFWithAutoTable = jsPDF & { lastAutoTable?: { finalY: number } };

export type ResultadoMemorandoPagamento = {
  integrantes: Integrante[];
  /** Quantidade de atividades cujo período (início/fim) cruza o mês de referência. */
  atividadesNoMes: number;
};

/** Quantidade de dias no mês civil (month = 1–12). */
export function diasNoMesReferencia(year: number, month1a12: number): number {
  return new Date(year, month1a12, 0).getDate();
}

/** Formato esperado do setor: `micro/macro` (ex.: ACQ/SEJUD). */
export function parseSetorMicroMacro(setor: string | null | undefined): {
  micro: string;
  macro: string;
} {
  const s = (setor ?? "").trim();
  if (!s) return { micro: "—", macro: "(sem setor)" };
  const idx = s.indexOf("/");
  if (idx < 0) return { micro: "—", macro: s };
  const micro = s.slice(0, idx).trim() || "—";
  const macro = s.slice(idx + 1).trim() || "—";
  return { micro, macro };
}

/**
 * Integrantes com vinculação a **alguma** atividade cujo período cruza o mês:
 * - mesmo critério de setor que `montarGrupos` (setor = código ou nome da linha de equipe);
 * - **ou** nome do integrante alinhado ao texto de **cada linha** da tabela equipe daquele código
 *   (como na coluna “Equipes / funções”), via `equipeLinhaEhResponsavel`;
 * - **ou** nome do integrante reconhecido no campo responsável da atividade.
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

    for (const r of equipeRows) {
      for (const i of integrantes) {
        if (equipeLinhaEhResponsavel(r.equipe ?? "", i.nome ?? "")) ids.add(i.id);
      }
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
    .sort((a, b) => {
      const sa = (a.setor ?? "").trim();
      const sb = (b.setor ?? "").trim();
      const ka = sa ? sa.toLowerCase() : "\uffff";
      const kb = sb ? sb.toLowerCase() : "\uffff";
      const porSetor = ka.localeCompare(kb, "pt-BR", { sensitivity: "base" });
      if (porSetor !== 0) return porSetor;
      return (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" });
    });
  return { integrantes: lista, atividadesNoMes };
}

export function gerarPdfMemorandoPagamento(
  resultado: ResultadoMemorandoPagamento,
  year: number,
  month: number
): void {
  const { integrantes, atividadesNoMes } = resultado;
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const marginX = 18;
  const mesTitulo = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const totalDias = diasNoMesReferencia(year, month);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Memorando de Pagamento", marginX, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Mês de referência: ${mesTitulo.charAt(0).toUpperCase() + mesTitulo.slice(1)}`,
    marginX,
    24
  );
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, marginX, 30);
  doc.setTextColor(0, 0, 0);

  if (integrantes.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const msg =
      atividadesNoMes === 0
        ? "Nenhuma atividade com período (data inicial e final) que cruze este mês. Confira início e fim em Atividades (DD/MM/AAAA)."
        : "Nenhum integrante cadastrado.";
    doc.text(msg, marginX, 42, { maxWidth: 260 });
  } else {
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const barW = pageW - marginX * 2;

    const porMacro = new Map<string, Integrante[]>();
    for (const i of integrantes) {
      const { macro } = parseSetorMicroMacro(i.setor);
      if (!porMacro.has(macro)) porMacro.set(macro, []);
      porMacro.get(macro)!.push(i);
    }

    const macrosOrdenados = [...porMacro.keys()].sort((a, b) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" })
    );

    for (const lista of porMacro.values()) {
      lista.sort((a, b) => {
        const ma = parseSetorMicroMacro(a.setor).micro;
        const mb = parseSetorMicroMacro(b.setor).micro;
        const cmp = ma.localeCompare(mb, "pt-BR", { sensitivity: "base" });
        if (cmp !== 0) return cmp;
        return (a.nome ?? "").localeCompare(b.nome ?? "", "pt-BR", { sensitivity: "base" });
      });
    }

    let startY = 36;
    const head = [["Micro", "Matrícula", "Nome", "Total de dias"]];

    for (let m = 0; m < macrosOrdenados.length; m++) {
      const macro = macrosOrdenados[m];
      const lista = porMacro.get(macro)!;

      if (startY > pageH - 28) {
        doc.addPage();
        startY = 16;
      }

      doc.setFillColor(55, 75, 95);
      doc.rect(marginX, startY, barW, 6.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(macro, marginX + 2, startY + 4.5);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      startY += 8;

      const body = lista.map((i) => {
        const { micro } = parseSetorMicroMacro(i.setor);
        return [
          micro,
          String(i.matricula),
          (i.nome ?? "").trim() || "—",
          String(totalDias),
        ];
      });

      autoTable(doc, {
        startY,
        head,
        body,
        styles: { fontSize: 8, cellPadding: 1.8, overflow: "linebreak" },
        headStyles: { fillColor: [55, 75, 95], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: marginX, right: marginX },
        tableWidth: "auto",
        columnStyles: {
          0: { cellWidth: 36 },
          1: { cellWidth: 26 },
          2: { cellWidth: 173 },
          3: { cellWidth: 26 },
        },
      });

      startY = ((doc as JsPDFWithAutoTable).lastAutoTable?.finalY ?? startY) + (m < macrosOrdenados.length - 1 ? 8 : 0);
    }
  }

  doc.save(`memorando-pagamento-${year}-${String(month).padStart(2, "0")}.pdf`);
}
