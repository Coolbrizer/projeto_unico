import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Reduz aviso "multiple lockfiles" quando existe package-lock fora do projeto. */
const tracingRoot = path.join(__dirname);

/**
 * CSP restritiva para API/auth/páginas; ajuste se integrar CDNs ou analytics.
 * Em desenvolvimento inclui 'unsafe-eval' (hot reload do Next).
 */
function buildContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  let connectExtra =
    " https://*.supabase.co https://*.supabase.in wss://*.supabase.co wss://*.supabase.in";
  if (baseUrl) {
    try {
      const host = new URL(baseUrl).hostname;
      connectExtra += ` https://${host} wss://${host}`;
    } catch {
      /* mantém wildcards */
    }
  }
  const scriptSrc = isDev ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self'${connectExtra}`,
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: tracingRoot,
  async headers() {
    const list: { key: string; value: string }[] = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ];
    if (process.env.NODE_ENV === "production") {
      list.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }
    list.push(
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: buildContentSecurityPolicy() }
    );
    return [{ source: "/:path*", headers: list }];
  },
};

export default nextConfig;
