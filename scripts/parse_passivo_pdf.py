#!/usr/bin/env python3
"""
Extrai registos do texto do PDF (Passivo) e gera SQL para public.atividades.
Requer: scripts/_passivo_extract.txt (gerado por extract do PDF).
"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_FILE = ROOT / "scripts" / "_passivo_extract.txt"
OUT_SQL = ROOT / "scripts" / "_passivo_import.sql"
OUT_JSON = ROOT / "scripts" / "_passivo_parsed.json"

# Mapa IS (numero, ano) -> uuid (preenchido pelo gerador ou manualmente)
IS_UUID: dict[tuple[int, int], str] = {
    (1, 2022): "48fd27a5-d084-4646-bb8b-74e3781dfad4",
    (2, 2022): "5d41a468-ac03-4497-b8d9-81b12d116df0",
    (4, 2022): "784f62e0-a513-4d4a-ad2a-db5dbe25fad3",
    (12, 2022): "e1735f3d-9e67-40eb-9071-40ede68c4785",
    (1, 2023): "46872ac5-67df-41f3-a0bb-26684f8f6b20",
    (6, 2023): "a479192e-0f6a-45b4-a38b-253492518191",
    (9, 2023): "c07fed56-dd76-4436-b53b-023b4e9d7679",
    (11, 2023): "d10a603d-4192-4796-b946-0adcd5e0a99f",
    (1, 2024): "d60e998b-2300-4769-98d7-134cc36bea0d",
    (2, 2024): "04fc2826-3be7-4424-a135-8800d8febbef",
    (3, 2024): "60ab5c25-849d-4d43-a11f-6aaf74043245",
    (5, 2024): "7726117e-4e31-41a8-8401-2f003935d84e",
    (7, 2024): "b757b7b9-c974-4d5f-9aa3-6bfac538c2ba",
    (8, 2024): "45472455-ae6f-4c45-9583-ea53491193cb",
    (1, 2025): "c33aab71-fc81-44d3-8f66-02020f5518e2",
    (2, 2025): "db2ae982-fd83-47ee-a513-9cdf3dfe7645",
    (3, 2025): "0476a4c4-09f2-4d3d-b1d2-49c905f2e025",
    (5, 2025): "d14f2867-279d-48da-b8e9-cd51cdb36d35",
    (6, 2025): "44be1bd8-5f90-4188-9ce9-3a9d759846ea",
    (18, 2025): "16532f34-d1e6-41ff-bb01-f607e1de0883",
    (21, 2025): "1911bd51-b129-4152-9652-67e275651093",
    (1, 2026): "b0ab2147-a0fd-4535-94f6-c97bd98bd052",
}

RECORD_SPLIT = re.compile(r"(?=[1-4]ª ETAPA[1-4]E-)")

# Núcleo: etapa, código (normalizado), resto até equipe
CORE_RE = re.compile(
    r"^([1-4])ª ETAPA"
    r"([1-4]E-[A-Z]{2,})\s*(\d{2})"  # 1E-INT + 01
    r"(.*?)"  # descrição (inclui V4.x)
    r"(\d{4,6})\s*\|\s*"
    r"(.+?)"
    r"(\d{2}/\d{2}/\d{4})(\d{2}/\d{2}/\d{4})"
    r"(\d{1,3})%"
    r"(PGR-[0-9]+/[0-9]{4})"
    r"(https://[^\s]+)"
    r"Instrução de Serviço nº\s*(\d+)/(\d{4})"
    r"(\d{2}/\d{2}/\d{4})"
    # Status até ao primeiro membro da equipa (matrícula |) ou fim.
    r"(CONCLUÍDO.*?)(?=\d{4,6}\s*\|\s*|\Z)"
    r"(.*)$",
    re.DOTALL | re.UNICODE,
)

STATUS_MAP = [
    ("CONCLUÍDO COM ANTECEDÊNCIA", "antecedencia"),
    ("CONCLUÍDO NO PRAZO", "no_prazo"),
    ("CONCLUÍDO COM ATRASO", "atraso"),
]


def sql_str(s: str | None) -> str:
    if s is None:
        return "NULL"
    return "'" + s.replace("'", "''") + "'"


def sql_date_br(d: str) -> str:
    # DD/MM/YYYY -> YYYY-MM-DD
    parts = d.split("/")
    if len(parts) != 3:
        return "NULL"
    dd, mm, yyyy = parts
    return f"'{yyyy}-{mm.zfill(2)}-{dd.zfill(2)}'"


def normalizar_codigo(prefix: str, num: str) -> str:
    c = f"{prefix.strip()}{num.strip()}"
    return re.sub(r"\s+", "", c)


def strip_accents(s: str) -> str:
    nf = unicodedata.normalize("NFD", s)
    return "".join(c for c in nf if unicodedata.category(c) != "Mn")


def limpar_responsavel(raw: str) -> str:
    t = raw.strip()
    t = re.sub(r"\s+", " ", t)
    return strip_accents(t)


def fix_status(raw: str) -> str:
    s = raw.strip()
    for prefix, key in STATUS_MAP:
        if s.startswith(prefix):
            return key
    if "ANTECED" in s.upper():
        return "antecedencia"
    if "PRAZO" in s.upper() and "ATRASO" not in s.upper():
        return "no_prazo"
    if "ATRASO" in s.upper():
        return "atraso"
    return "no_prazo"


def parse_equipe(tail: str) -> list[str]:
    """Lista 'matricula | NOME' sem acentos."""
    out: list[str] = []
    for m in re.finditer(r"(\d{4,6})\s*\|\s*([A-ZÁÀÂÃÇÉÊÍÓÔÕÚÜÑa-záàâãçéêíóôõúüñ\s\.'-]+?)(?=(?:\d{4,6}\s*\||$))", tail):
        mat, nome = m.group(1), m.group(2).strip()
        nome = strip_accents(re.sub(r"\s+", " ", nome))
        out.append(f"{mat} | {nome}")
    return out


def parse_one(chunk: str) -> dict | None:
    chunk = chunk.strip()
    if not chunk or "etapacodigo" in chunk[:80]:
        return None
    m = CORE_RE.match(chunk)
    if not m:
        return None
    etapa_s, pref, num2, desc_prev, mat, nome_raw, d1, d2, pct, pgr, url, isn, is_ano, dfim, stat_raw, equipe_tail = (
        m.groups()
    )
    codigo = normalizar_codigo(pref, num2)
    descricao = (desc_prev or "").strip()
    if descricao.startswith("V") or descricao.startswith("v"):
        pass
    descricao = re.sub(r"\s+", " ", descricao).strip()
    descricao = strip_accents(descricao)
    isn_i, ano_i = int(isn), int(is_ano)
    is_key = (isn_i, ano_i)
    if is_key not in IS_UUID:
        raise ValueError(f"IS não mapeada: {isn_i}/{ano_i} código {codigo}")
    instrucao = IS_UUID[is_key]
    pct_i = int(pct)
    prog = min(100, (pct_i // 10) * 10)
    row = {
        "etapa": int(etapa_s),
        "codigo": codigo,
        "descricao": descricao or None,
        "responsavel": limpar_responsavel(nome_raw),
        "inicio": d1,
        "fim": d2,
        "progresso": prog,
        "etiqueta_relatorio": pgr,
        "link_relatorio": url,
        "instrucao_servico": instrucao,
        "status_execucao": fix_status(stat_raw),
        "equipe": parse_equipe(equipe_tail),
        "_is_ref": f"{isn_i}/{ano_i}",
    }
    return row


def main() -> None:
    raw = TEXT_FILE.read_text(encoding="utf-8")
    parts = RECORD_SPLIT.split(raw)
    rows: list[dict] = []
    errors: list[str] = []
    for i, p in enumerate(parts):
        try:
            r = parse_one(p)
            if r:
                rows.append(r)
        except Exception as e:
            errors.append(f"part {i}: {e}")

    OUT_JSON.write_text(json.dumps({"rows": rows, "errors": errors}, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "-- Gerado por scripts/parse_passivo_pdf.py — importação Passivo PDF",
        "BEGIN;",
    ]
    for r in rows:
        lines.append(
            f"""INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
) VALUES (
  {sql_str(r["codigo"])},
  {sql_str(r["descricao"])},
  {sql_str(r["responsavel"])},
  {sql_date_br(r["inicio"])},
  {sql_date_br(r["fim"])},
  {r["progresso"]},
  {sql_str(r["etiqueta_relatorio"])},
  {sql_str(r["link_relatorio"])},
  '{r["instrucao_servico"]}'::uuid,
  {r["etapa"]},
  {sql_str(r["status_execucao"])}
)
ON CONFLICT (instrucao_servico, (btrim(codigo))) WHERE (btrim(codigo) <> '')
DO UPDATE SET
  descricao = EXCLUDED.descricao,
  responsavel = EXCLUDED.responsavel,
  inicio = EXCLUDED.inicio,
  fim = EXCLUDED.fim,
  progresso = EXCLUDED.progresso,
  etiqueta_relatorio = EXCLUDED.etiqueta_relatorio,
  link_relatorio = EXCLUDED.link_relatorio,
  etapa = EXCLUDED.etapa,
  status_execucao = EXCLUDED.status_execucao;
"""
        )
    lines.append("COMMIT;")
    OUT_SQL.write_text("\n".join(lines), encoding="utf-8")
    print(f"OK: {len(rows)} linhas, {len(errors)} erros")
    print(f"SQL -> {OUT_SQL}")
    if errors[:5]:
        print("Primeiros erros:", errors[:5])


if __name__ == "__main__":
    main()
