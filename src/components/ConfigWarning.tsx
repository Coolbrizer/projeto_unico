"use client";

import { useEffect, useState } from "react";
import { useIsSupabaseConfigured } from "@/lib/supabase/client";

type ServerEnv = {
  hasUrl: boolean;
  hasKey: boolean;
  cwd?: string;
  envLocalExists?: boolean;
  envLocalWrongSpace?: boolean;
  envExists?: boolean;
  keysInEnvLocal?: string[];
} | null;

/** Só deve ser renderizado no cliente (ex.: após useMounted no pai) para evitar erro de hidratação. */
export function ConfigWarning() {
  const clientOk = useIsSupabaseConfigured();
  const [serverEnv, setServerEnv] = useState<ServerEnv>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/debug/supabase-env")
      .then((r) => r.json() as Promise<NonNullable<ServerEnv>>)
      .then((data) => {
        if (!cancelled) setServerEnv(data);
      })
      .catch(() => {
        if (!cancelled) setServerEnv(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const serverOk = serverEnv && serverEnv.hasUrl && serverEnv.hasKey;
  const staleCache = !clientOk && serverOk;

  const needsNextPublic =
    serverEnv?.keysInEnvLocal &&
    serverEnv.keysInEnvLocal.length > 0 &&
    (!serverEnv.keysInEnvLocal.some((k) => k === "NEXT_PUBLIC_SUPABASE_URL") ||
      !serverEnv.keysInEnvLocal.some(
        (k) =>
          k === "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY" ||
          k === "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      ));

  return (
    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
      <p className="font-medium">Supabase não configurado</p>
      <p className="mt-1 text-amber-200/90">
        Crie o arquivo <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code> na{" "}
        <strong>raiz do projeto</strong> (mesma pasta do <code className="rounded bg-black/30 px-1.5 py-0.5">package.json</code>) com{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY</code>{" "}
        (ou <code className="rounded bg-black/30 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>). Veja{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">.env.example</code>.
      </p>
      <p className="mt-2 text-amber-200/90">
        Reinicie o terminal após salvar (<code className="rounded bg-black/30 px-1.5 py-0.5">Ctrl+C</code> e{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">npm run dev</code>). No Windows, confira se o arquivo não se chama{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local.txt</code> (extensão oculta).
      </p>

      {serverEnv && (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-black/20 px-3 py-2 text-xs text-amber-100/95">
          <p className="font-medium text-amber-50">Diagnóstico (sem mostrar segredos)</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            <li>
              Servidor Next.js — URL: {serverEnv.hasUrl ? "encontrada" : "ausente"} · Chave:{" "}
              {serverEnv.hasKey ? "encontrada" : "ausente"}
            </li>
            <li>Interface (bundle): {clientOk ? "ok" : "ainda sem variáveis"}</li>
            {serverEnv.cwd !== undefined && (
              <li className="break-all">
                Pasta em que o servidor está a correr (<code className="rounded bg-black/30 px-1">cwd</code>):{" "}
                <span className="text-amber-50">{serverEnv.cwd}</span>
              </li>
            )}
            {serverEnv.envLocalExists !== undefined && (
              <li>
                Arquivo <code className="rounded bg-black/30 px-1">.env.local</code> nessa pasta:{" "}
                {serverEnv.envLocalExists ? "encontrado" : "não encontrado"}
              </li>
            )}
            {serverEnv.keysInEnvLocal && serverEnv.keysInEnvLocal.length > 0 && (
              <li>
                Nomes de variáveis no <code className="rounded bg-black/30 px-1">.env.local</code>:{" "}
                {serverEnv.keysInEnvLocal.join(", ")}
              </li>
            )}
          </ul>
          {staleCache && (
            <p className="mt-2 text-amber-50">
              O servidor já vê as variáveis, mas o navegador não (cache do bundle). Apague a pasta{" "}
              <code className="rounded bg-black/30 px-1">.next</code> e rode{" "}
              <code className="rounded bg-black/30 px-1">npm run dev</code> de novo. Se continuar, use o modo sem
              Turbopack (o script <code className="rounded bg-black/30 px-1">dev</code> já usa o Webpack por padrão;
              evite <code className="rounded bg-black/30 px-1">dev:turbo</code> enquanto testa).
            </p>
          )}
          {serverEnv.envLocalWrongSpace && (
            <p className="mt-2 rounded border border-amber-400/50 bg-amber-500/20 px-2 py-2 font-medium text-amber-50">
              Foi detetado um ficheiro chamado <code className="rounded bg-black/30 px-1">.env .local</code> (com{" "}
              <strong>espaço</strong> no nome). O Next.js só lê <code className="rounded bg-black/30 px-1">.env.local</code>{" "}
              <strong>sem espaço</strong>. No Explorador de ficheiros, renomeie para{" "}
              <code className="rounded bg-black/30 px-1">.env.local</code> e reinicie o{" "}
              <code className="rounded bg-black/30 px-1">npm run dev</code>.
            </p>
          )}
          {serverEnv.envLocalExists === false && !serverEnv.envLocalWrongSpace && (
            <p className="mt-2 text-amber-50">
              O Next não encontrou <code className="rounded bg-black/30 px-1">.env.local</code> na pasta indicada acima.
              Coloque o ficheiro aí (ou abra o terminal nesta pasta do projeto antes de{" "}
              <code className="rounded bg-black/30 px-1">npm run dev</code>).
            </p>
          )}
          {needsNextPublic && (
            <p className="mt-2 text-amber-50">
              As variáveis precisam começar por <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_</code> para a
              aplicação no browser as receber. Não use só <code className="rounded bg-black/30 px-1">SUPABASE_URL</code>{" "}
              sem o prefixo.
            </p>
          )}
          {!serverEnv.hasUrl && !serverEnv.hasKey && serverEnv.envLocalExists && !needsNextPublic && (
            <p className="mt-2 text-amber-50">
              O ficheiro existe mas os valores podem estar vazios ou com aspas incorretas. Confira se cada linha é{" "}
              <code className="rounded bg-black/30 px-1">NOME=valor</code> sem espaços em volta do{" "}
              <code className="rounded bg-black/30 px-1">=</code>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
