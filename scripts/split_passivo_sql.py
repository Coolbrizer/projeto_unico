"""Divide scripts/_passivo_import.sql em lotes para execute_sql."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "_passivo_import.sql"
OUT_DIR = ROOT / "scripts" / "_passivo_batches"


def main() -> None:
    raw = SRC.read_text(encoding="utf-8")
    raw = re.sub(r"^--[^\n]*\n", "", raw)
    raw = re.sub(r"^\s*BEGIN;\s*", "", raw, flags=re.MULTILINE)
    raw = re.sub(r"\s*COMMIT;\s*$", "", raw)
    chunks = [c.strip() for c in re.split(r"(?=INSERT INTO public\.atividades)", raw.strip()) if c.strip()]
    parts = [c if c.endswith(";") else c + ";" for c in chunks]
    OUT_DIR.mkdir(exist_ok=True)
    for p in OUT_DIR.glob("batch_*.sql"):
        p.unlink()
    chunk = 25
    for i in range(0, len(parts), chunk):
        batch = parts[i : i + chunk]
        chunk_sql = "BEGIN;\n\n" + "\n\n".join(batch) + "\n\nCOMMIT;"
        (OUT_DIR / f"batch_{i // chunk:03d}.sql").write_text(chunk_sql, encoding="utf-8")
    print(f"{len(parts)} inserts -> {len(list(OUT_DIR.glob('batch_*.sql')))} ficheiros")


if __name__ == "__main__":
    main()
