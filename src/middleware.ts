import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

const LOGIN = "/login";
const ALTERAR_SENHA = "/alterar-senha";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const session = raw ? await verifySessionToken(raw) : null;

  if (pathname === LOGIN) {
    if (session && session.mcp) {
      return NextResponse.redirect(new URL(ALTERAR_SENHA, request.url));
    }
    if (session && !session.mcp) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === ALTERAR_SENHA) {
    if (!session) {
      return NextResponse.redirect(new URL(LOGIN, request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  if (session.mcp) {
    return NextResponse.redirect(new URL(ALTERAR_SENHA, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
