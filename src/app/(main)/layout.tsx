import { AppShell } from "@/components/AppShell";
import { getSessionFromCookies } from "@/lib/auth/getSession";
import { parsePerfil } from "@/lib/auth/roles";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionFromCookies();
  const role = session?.role ?? parsePerfil(undefined);

  return <AppShell role={role}>{children}</AppShell>;
}
