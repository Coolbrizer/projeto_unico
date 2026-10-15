import { gerarPdfPrestacaoContas } from "../src/lib/prestacao-contas-pdf";
import type { Documento } from "../src/types/database";

const documento = {
  id: "00000000-0000-0000-0000-000000000001",
  tipo: "Instrução de Serviço",
  numero: "99",
  ano: 2026,
} as Documento;

gerarPdfPrestacaoContas(documento, [
  {
    codigo: "1E-MEL01",
    atividade: "Atividade de verificação",
    equipe: "Ana",
    setor_responsavel: "Setor",
    progresso: 100,
    etiqueta_relatorio: "PGR-1/2026",
    link_relatorio: "https://example.com/relatorio",
    nao_entregue_com_justificativa: false,
  },
]);
