"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({
  url,
  anonKey,
  children,
}: {
  url: string;
  anonKey: string;
  children: ReactNode;
}) {
  const client = useMemo(() => {
    if (!url?.trim() || !anonKey?.trim()) return null;
    return createBrowserClient(url.trim(), anonKey.trim());
  }, [url, anonKey]);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export function useSupabase(): SupabaseClient | null {
  return useContext(SupabaseContext);
}

export function useIsSupabaseConfigured(): boolean {
  return useContext(SupabaseContext) !== null;
}
