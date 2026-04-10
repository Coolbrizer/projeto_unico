import type { Atividade } from "@/types/database";

/** Remove espaços estranhos e prefixos tipo "Início:" colados ao valor. */
function limparTextoData(s: string): string {
  return s
    .replace(/\u200b/g, "")
    .trim()
    .replace(/^(in[íi]cio|inicio|final|fim)\s*:\s*/i, "")
    .trim();
}

/**
 * Interpreta datas em texto: ISO (yyyy-mm-dd), brasileiro (dd/mm/aaaa),
 * inclusive quando há texto extra ou rótulos.
 */
export function parseDataTexto(s: string | Date | null | undefined): Date | null {
  if (s == null) return null;
  if (s instanceof Date) {
    if (Number.isNaN(s.getTime())) return null;
    return new Date(s.getFullYear(), s.getMonth(), s.getDate());
  }
  const t = limparTextoData(String(s));
  if (!t) return null;

  const iso = /(?:^|\s)(\d{4})-(\d{2})-(\d{2})/.exec(t);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]);
    const day = Number(iso[3]);
    const d = new Date(y, m - 1, day);
    if (
      !Number.isNaN(d.getTime()) &&
      d.getFullYear() === y &&
      d.getMonth() === m - 1 &&
      d.getDate() === day
    ) {
      return d;
    }
  }

  const br = /\b(\d{1,2})\s*[./-]\s*(\d{1,2})\s*[./-]\s*(\d{4})\b/.exec(t);
  if (br) {
    const day = Number(br[1]);
    const month = Number(br[2]);
    const y = Number(br[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const d = new Date(y, month - 1, day);
      if (
        !Number.isNaN(d.getTime()) &&
        d.getFullYear() === y &&
        d.getMonth() === month - 1 &&
        d.getDate() === day
      ) {
        return d;
      }
    }
  }

  const parsed = Date.parse(t);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  return null;
}

/** Exibe data em DD/MM/AAAA (valores ISO do Postgres, texto livre ou Date). */
export function formatDataParaExibicao(value: string | Date | null | undefined): string {
  if (value == null || value === "") return "—";
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "—";
    const d = value.getDate();
    const m = value.getMonth() + 1;
    const y = value.getFullYear();
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }
  const t = String(value).trim();
  if (!t) return "—";
  const parsed = parseDataTexto(t);
  if (!parsed) return t;
  const d = parsed.getDate();
  const m = parsed.getMonth() + 1;
  const y = parsed.getFullYear();
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

/** Converte entrada do utilizador ou ISO para YYYY-MM-DD (coluna date no Postgres). */
export function normalizarDataParaApi(raw: string | null | undefined): string | null {
  const t = raw?.trim();
  if (!t) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  const d = parseDataTexto(t);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Texto do período para listagens (ex.: "11/02/2026 a 11/06/2026"). */
export function formatarPeriodoAtividade(a: Atividade): string {
  const i = formatDataParaExibicao(a.inicio);
  const f = formatDataParaExibicao(a.fim);
  if (i === "—" && f === "—") return "—";
  if (i === "—") return f;
  if (f === "—") return i;
  return `${i} a ${f}`;
}

export function intervaloAtividade(a: Atividade): { start: Date; end: Date } | null {
  const pi = parseDataTexto(a.inicio);
  const pf = parseDataTexto(a.fim);
  if (pi && pf) {
    const start = new Date(pi);
    start.setHours(0, 0, 0, 0);
    const end = new Date(pf);
    end.setHours(23, 59, 59, 999);
    if (start > end) return { start: end, end: start };
    return { start, end };
  }
  if (pi) {
    const s = new Date(pi);
    s.setHours(0, 0, 0, 0);
    const e = new Date(s);
    e.setHours(23, 59, 59, 999);
    return { start: s, end: e };
  }
  if (pf) {
    const e = new Date(pf);
    e.setHours(23, 59, 59, 999);
    const s = new Date(e);
    s.setHours(0, 0, 0, 0);
    return { start: s, end: e };
  }
  return null;
}

/**
 * A atividade cruza o mês civil [year, month] (month 1–12)?
 * Ex.: início 11/02/2026 e fim 11/06/2026 → qualquer mês de fevereiro a junho de 2026 inclui a atividade.
 */
export function atividadeSobrepoemMes(a: Atividade, year: number, month: number): boolean {
  const iv = intervaloAtividade(a);
  if (!iv) return false;
  const monthStart = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const monthEnd = new Date(year, month, 0, 23, 59, 59, 999);
  return iv.start <= monthEnd && iv.end >= monthStart;
}
