import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { SupabaseProvider } from "@/lib/supabase/context";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projeto de Modernização do Único",
  description: "Controle de atividades, equipe, orçamento e documentos do projeto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { url, anonKey } = getPublicSupabaseEnv();

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SupabaseProvider url={url} anonKey={anonKey}>
          <AppShell>{children}</AppShell>
        </SupabaseProvider>
      </body>
    </html>
  );
}
