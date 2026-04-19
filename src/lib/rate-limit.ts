/**
 * Limitador simples em memória (por instância Node).
 * Em ambientes com várias réplicas (ex.: Vercel) cada réplica tem o seu limite —
 * suficiente para reduzir abuso casual; para limites globais use Redis/Upstash.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

function pruneStale(now: number): void {
  if (store.size < 800) return;
  for (const [k, b] of store) {
    if (now >= b.resetAt) store.delete(k);
  }
}

export function clientIp(request: Request): string {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  pruneStale(now);

  let bucket = store.get(key);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 1, resetAt: now + windowMs };
    store.set(key, bucket);
    return { ok: true };
  }

  if (bucket.count < limit) {
    bucket.count += 1;
    return { ok: true };
  }

  const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  return { ok: false, retryAfterSec };
}
