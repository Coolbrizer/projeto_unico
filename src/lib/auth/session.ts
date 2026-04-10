import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import type { Perfil } from "@/lib/auth/roles";
import { parsePerfil } from "@/lib/auth/roles";

export const SESSION_COOKIE = "app_session";

export type SessionPayload = {
  sub: string;
  email: string;
  /** must change password */
  mcp: boolean;
  role: Perfil;
};

function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET?.trim();
  if (!raw || raw.length < 16) {
    throw new Error("AUTH_SECRET deve ter pelo menos 16 caracteres.");
  }
  return new TextEncoder().encode(raw);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, mcp: payload.mcp, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    const email = typeof payload.email === "string" ? payload.email : "";
    const mcp = payload.mcp === true;
    const role = parsePerfil(payload.role);
    if (!sub || !email) return null;
    return { sub, email, mcp, role };
  } catch {
    return null;
  }
}
