import type { OpcoesPlanilhaXlsx } from "@/lib/planilha-xlsx";

export type LinhaAfastamentoPlanilha = {
  numero: number;
  nome: string;
  matricula: string;
  setor: string;
  cargo: string;
  classe: string;
  dias: number[];
  total: number;
};

export function montarPlanilhaAfastamentos(
  meses: { label: string; ano: number }[],
  linhas: LinhaAfastamentoPlanilha[]
): { linhas: string[][]; opcoes: OpcoesPlanilhaXlsx } {
  const cabecalho = [
    "Nº",
    "Nome",
    "Matrícula",
    "Setor",
    "Cargo",
    "Classe",
    ...meses.map((mes) => `${mes.label}/${mes.ano}`),
    "Total",
  ];
  const corpo = linhas.map((linha) => [
    String(linha.numero),
    linha.nome,
    linha.matricula,
    linha.setor,
    linha.cargo,
    linha.classe,
    ...linha.dias.map((dias) => String(dias)),
    String(linha.total),
  ]);
  const indicePrimeiroMes = 6;
  const indiceTotal = indicePrimeiroMes + meses.length;

  return {
    linhas: [cabecalho, ...corpo],
    opcoes: {
      nomeAba: "Afastamentos",
      larguras: [6, 42, 14, 28, 10, 12, ...meses.map(() => 14), 10],
      colunasNumericas: [
        0,
        2,
        ...meses.map((_, indice) => indicePrimeiroMes + indice),
        indiceTotal,
      ],
    },
  };
}

export function nomeArquivoPlanilhaAfastamentos(inicio: string, fim: string): string {
  const trecho = (iso: string) => (/^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : "periodo");
  return `afastamentos-${trecho(inicio)}-a-${trecho(fim)}.xlsx`;
}
