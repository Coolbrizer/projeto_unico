from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
rows = json.loads((ROOT / "scripts/_passivo_rows.json").read_text(encoding="utf-8"))

CHUNK = 40

def build_sql(chunk: list[dict], tag: str) -> str:
    js_literal = json.dumps(chunk, ensure_ascii=False)
    return f"""BEGIN;

WITH payload AS (
  SELECT * FROM jsonb_to_recordset(${tag}${js_literal}${tag}$::jsonb)
  AS x(
    codigo text,
    descricao text,
    responsavel text,
    inicio text,
    fim text,
    progresso integer,
    etiqueta_relatorio text,
    link_relatorio text,
    instrucao_servico text,
    etapa integer,
    status_execucao text
  )
)
INSERT INTO public.atividades (
  codigo, descricao, responsavel, inicio, fim, progresso,
  etiqueta_relatorio, link_relatorio, instrucao_servico, etapa, status_execucao
)
SELECT
  codigo,
  descricao,
  responsavel,
  to_date(inicio, 'DD/MM/YYYY'),
  to_date(fim, 'DD/MM/YYYY'),
  progresso,
  etiqueta_relatorio,
  link_relatorio,
  instrucao_servico::uuid,
  etapa,
  status_execucao
FROM payload
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

COMMIT;
"""


def main() -> None:
    for i in range(0, len(rows), CHUNK):
        chunk = rows[i : i + CHUNK]
        tag = f"p{i // CHUNK}_imp"
        sql = build_sql(chunk, tag)
        out = ROOT / f"scripts/_passivo_bulk_{i // CHUNK:02d}.sql"
        out.write_text(sql, encoding="utf-8")
        print(out.name, len(sql))


if __name__ == "__main__":
    main()
