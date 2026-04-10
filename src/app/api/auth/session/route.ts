import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) {
    return NextResponse.json({ user: null });
  }
  const session = await verifySessionToken(raw);
  if (!session) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: {
      email: session.email,
      mustChangePassword: session.mcp,
      perfil: session.role,
    },
  });
}
