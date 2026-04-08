/** URL e chave pública lidas no Node (servidor, API, layout). */
export function getPublicSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "";
  return {
    url,
    anonKey,
    hasUrl: Boolean(url),
    hasKey: Boolean(anonKey),
  };
}

/** Compatível com a rota de diagnóstico. */
export function readSupabaseEnvFromProcess() {
  const { hasUrl, hasKey } = getPublicSupabaseEnv();
  return { hasUrl, hasKey };
}
