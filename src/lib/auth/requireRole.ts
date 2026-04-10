import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import type { SessionPayload } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/roles";

export async function requireGestorOuAdmin(): Promise<
  { session: SessionPayload; response: null } | { session: null; response: NextResponse }
> {
  const session = await getSessionFromCookies();
  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }) };
  }
  if (session.role !== "gestor" && session.role !== "admin") {
    return {
      session: null,
      response: NextResponse.json({ error: "Sem permissão para esta ação." }, { status: 403 }),
    };
  }
  return { session, response: null };
}

export async function requireAdmin(): Promise<
  { session: SessionPayload; response: null } | { session: null; response: NextResponse }
> {
  const session = await getSessionFromCookies();
  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }) };
  }
  if (!isAdmin(session.role)) {
    return {
      session: null,
      response: NextResponse.json({ error: "Apenas administradores." }, { status: 403 }),
    };
  }
  return { session, response: null };
}
