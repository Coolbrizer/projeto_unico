const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((soma, parte) => soma + parte.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const parte of parts) {
    out.set(parte, offset);
    offset += parte.length;
  }
  return out;
}

function u16(valor: number): Uint8Array {
  return Uint8Array.of(valor & 0xff, (valor >>> 8) & 0xff);
}

function u32(valor: number): Uint8Array {
  return Uint8Array.of(valor & 0xff, (valor >>> 8) & 0xff, (valor >>> 16) & 0xff, (valor >>> 24) & 0xff);
}

/** ZIP com arquivos armazenados sem compressão. O Excel abre esse pacote. */
function zipArmazenado(arquivos: { nome: string; conteudo: string }[]): Uint8Array {
  const encoder = new TextEncoder();
  const locais: Uint8Array[] = [];
  const centrais: Uint8Array[] = [];
  let offset = 0;

  for (const arquivo of arquivos) {
    const nome = encoder.encode(arquivo.nome);
    const dados = encoder.encode(arquivo.conteudo);
    const crc = crc32(dados);
    const local = concatBytes([
      u32(0x04034b50),
      u16(20),
      u16(0x0800),
      u16(0),
      u16(0x6000),
      u16(0x5d47),
      u32(crc),
      u32(dados.length),
      u32(dados.length),
      u16(nome.length),
      u16(0),
      nome,
      dados,
    ]);
    const central = concatBytes([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0x0800),
      u16(0),
      u16(0x6000),
      u16(0x5d47),
      u32(crc),
      u32(dados.length),
      u32(dados.length),
      u16(nome.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nome,
    ]);
    locais.push(local);
    centrais.push(central);
    offset += local.length;
  }

  const centralDir = concatBytes(centrais);
  const fim = concatBytes([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(arquivos.length),
    u16(arquivos.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);

  return concatBytes([...locais, centralDir, fim]);
}

function escaparXml(valor: string): string {
  return valor
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r\n|\r|\n/g, "&#10;");
}

function colunaExcel(indice: number): string {
  let n = indice + 1;
  let nome = "";
  while (n > 0) {
    const resto = (n - 1) % 26;
    nome = String.fromCharCode(65 + resto) + nome;
    n = Math.floor((n - 1) / 26);
  }
  return nome;
}

const LARGURAS_PADRAO = [18, 72, 42, 72];

export type OpcoesPlanilhaXlsx = {
  nomeAba?: string;
  larguras?: number[];
  /** Índices de coluna (0-based) gravados como número nas linhas de dados. */
  colunasNumericas?: number[];
};

function nomeAbaExcel(nome: string): string {
  const limpo = nome.replace(/[:\\/?*[\]]/g, " ").trim() || "Planilha";
  return escaparXml(limpo.slice(0, 31));
}

function planilhaXml(linhas: string[][], opcoes?: OpcoesPlanilhaXlsx): string {
  const larguras = opcoes?.larguras?.length ? opcoes.larguras : LARGURAS_PADRAO;
  const numericas = new Set(opcoes?.colunasNumericas ?? []);
  const cols = larguras
    .map(
      (largura, indice) =>
        `<col min="${indice + 1}" max="${indice + 1}" width="${largura}" customWidth="1"/>`
    )
    .join("");
  const rows = linhas
    .map((linha, indiceLinha) => {
      const r = indiceLinha + 1;
      const estilo = indiceLinha === 0 ? 1 : 2;
      const cells = linha
        .map((valor, indiceColuna) => {
          const ref = `${colunaExcel(indiceColuna)}${r}`;
          if (indiceLinha > 0 && numericas.has(indiceColuna) && /^-?\d+$/.test(valor)) {
            return `<c r="${ref}" s="${estilo}"><v>${valor}</v></c>`;
          }
          return `<c r="${ref}" t="inlineStr" s="${estilo}"><is><t xml:space="preserve">${escaparXml(valor)}</t></is></c>`;
        })
        .join("");
      return `<row r="${r}">${cells}</row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>${cols}</cols>
  <sheetData>${rows}</sheetData>
</worksheet>`;
}

function workbookXml(nomeAba: string): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="${nomeAbaExcel(nomeAba)}" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

const WORKBOOK_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
  </cellXfs>
</styleSheet>`;

export function criarPlanilhaXlsx(linhas: string[][], opcoes?: OpcoesPlanilhaXlsx): Uint8Array {
  return zipArmazenado([
    { nome: "[Content_Types].xml", conteudo: CONTENT_TYPES },
    { nome: "_rels/.rels", conteudo: RELS },
    { nome: "xl/workbook.xml", conteudo: workbookXml(opcoes?.nomeAba ?? "Atividades") },
    { nome: "xl/_rels/workbook.xml.rels", conteudo: WORKBOOK_RELS },
    { nome: "xl/styles.xml", conteudo: STYLES },
    { nome: "xl/worksheets/sheet1.xml", conteudo: planilhaXml(linhas, opcoes) },
  ]);
}

export function baixarPlanilhaXlsx(
  linhas: string[][],
  nomeArquivo: string,
  opcoes?: OpcoesPlanilhaXlsx
): void {
  const bytes = criarPlanilhaXlsx(linhas, opcoes);
  const copia = new Uint8Array(bytes.byteLength);
  copia.set(bytes);
  const blob = new Blob([copia], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
