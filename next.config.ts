import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "path";
import { fileURLToPath } from "url";

// Garante leitura de .env.local a partir da pasta do projeto (onde está este arquivo)
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
loadEnvConfig(projectRoot);

const nextConfig: NextConfig = {};

export default nextConfig;
