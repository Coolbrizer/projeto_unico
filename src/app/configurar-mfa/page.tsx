"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase/client";

export default function ConfigurarMfaPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const iniciar = useCallback(async () => {
    if (!supabase) {
      setError("Supabase não configurado.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const { data, error: enErr } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "App autenticador",
      });
      if (enErr || !data) {
        setError(enErr?.message ?? "Não foi possível iniciar o MFA.");
        return;
      }
      setFactorId(data.id);
      const totp = data.totp as { qr_code?: string; secret?: string } | undefined;
      setQr(totp?.qr_code ?? null);
      setSecret(totp?.secret ?? null);
    } finally {
      setBusy(false);
    }
  }, [supabase]);

  const confirmar = useCallback(async () => {
    if (!supabase || !factorId || !code.trim()) {
      setError("Informe o código de 6 dígitos.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const { error: chErr } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: code.trim(),
      });
      if (chErr) {
        setError(chErr.message);
        return;
      }
      router.replace("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }, [supabase, factorId, code, router]);

  if (!supabase) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-sm text-[var(--muted)]">
        Configure NEXT_PUBLIC_SUPABASE_URL e a chave pública no servidor.
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">Autenticação em dois fatores (MFA)</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Utilize uma aplicação compatível com TOTP (Google Authenticator, Microsoft Authenticator, 1Password,
        etc.). O administrador pode exigir MFA nas rotas sensíveis ao definir{" "}
        <code className="rounded bg-[var(--accent-muted)] px-1">NEXT_PUBLIC_REQUIRE_ADMIN_MFA=true</code>.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      {!factorId ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void iniciar()}
          className="mt-8 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {busy ? "A gerar…" : "Gerar código QR"}
        </button>
      ) : (
        <div className="mt-8 space-y-4">
          {qr && (
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              {/* qr_code do Supabase costuma ser uma data URL SVG */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="QR TOTP" className="mx-auto max-h-48 w-auto" />
            </div>
          )}
          {secret && (
            <p className="text-xs text-[var(--muted)]">
              Chave manual (se não usar QR): <span className="font-mono">{secret}</span>
            </p>
          )}
          <div>
            <label htmlFor="otp" className="block text-xs text-[var(--muted)]">
              Código de 6 dígitos
            </label>
            <input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)]/40 focus:ring-2"
              placeholder="000000"
            />
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => void confirmar()}
            className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {busy ? "A validar…" : "Confirmar e ativar"}
          </button>
        </div>
      )}
    </div>
  );
}
