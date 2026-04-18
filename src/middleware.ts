import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionAal } from "@/lib/auth/sessionAal";
import { isAdmin, parsePerfil } from "@/lib/auth/roles";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

const LOGIN = "/login";
const ALTERAR_SENHA = "/alterar-senha";
const CONFIGURAR_MFA = "/configurar-mfa";
const ADMIN_ONLY = ["/orcamento", "/gestao-senhas"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // Sem configuração do Supabase: deixa o app responder normalmente.
  if (!supabase) return response;

  const { data, error } = await supabase.auth.getUser();
  const user = error ? null : data.user;

  const meta = (user?.app_metadata ?? {}) as {
    perfil?: unknown;
    must_change_password?: unknown;
  };
  const role = parsePerfil(meta.perfil);
  const mustChange = meta.must_change_password === true;

  if (pathname === LOGIN) {
    if (user && mustChange) {
      return NextResponse.redirect(new URL(ALTERAR_SENHA, request.url));
    }
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }

  if (pathname === ALTERAR_SENHA) {
    if (!user) {
      return NextResponse.redirect(new URL(LOGIN, request.url));
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  if (mustChange) {
    return NextResponse.redirect(new URL(ALTERAR_SENHA, request.url));
  }

  const emConfigurarMfa =
    pathname === CONFIGURAR_MFA || pathname.startsWith(`${CONFIGURAR_MFA}/`);

  if (
    process.env.NEXT_PUBLIC_REQUIRE_ADMIN_MFA === "true" &&
    isAdmin(role) &&
    !emConfigurarMfa
  ) {
    const zonaAdmin = ADMIN_ONLY.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    );
    if (zonaAdmin) {
      const { data: sess } = await supabase.auth.getSession();
      const aal = getSessionAal(sess.session ?? undefined);
      if (aal !== "aal2") {
        return NextResponse.redirect(new URL(CONFIGURAR_MFA, request.url));
      }
    }
  }

  const precisaAdmin = ADMIN_ONLY.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (precisaAdmin && !isAdmin(role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
