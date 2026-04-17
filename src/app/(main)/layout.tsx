import { AppShell } from "@/components/AppShell";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { parsePerfil } from "@/lib/auth/roles";
import { podeAcessarAuditoria } from "@/lib/auth/auditoria";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionFromCookies();
  const role = session?.role ?? parsePerfil(undefined);
  const canViewAuditoria = podeAcessarAuditoria(session);

  return (
    <AppShell role={role} canViewAuditoria={canViewAuditoria}>
      {children}
    </AppShell>
  );
}
