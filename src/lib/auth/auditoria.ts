import type { SessionPayload } from "@/lib/auth/session";

export const AUDITORIA_EMAIL_PERMITIDO = "alexandredamasceno@mpf.mp.br";

export function podeAcessarAuditoria(
  sessionOrEmail: Pick<SessionPayload, "email"> | string | null | undefined
): boolean {
  const email =
    typeof sessionOrEmail === "string"
      ? sessionOrEmail
      : typeof sessionOrEmail?.email === "string"
        ? sessionOrEmail.email
        : "";
  return email.trim().toLowerCase() === AUDITORIA_EMAIL_PERMITIDO;
}
