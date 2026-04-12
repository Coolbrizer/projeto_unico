import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
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

/** Evita HTML estático gerado no build sem as variáveis; na Vercel o env existe em runtime em cada pedido. */
export const dynamic = "force-dynamic";

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
          {children}
          <ScrollToTopButton />
        </SupabaseProvider>
      </body>
    </html>
  );
}
