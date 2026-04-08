import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { readSupabaseEnvFromProcess } from "@/lib/supabase/env";

function parseEnvKeysOnly(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const keys: string[] = [];
    for (const line of content.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq <= 0) continue;
      const k = t.slice(0, eq).trim();
      if (k) keys.push(k);
    }
    return keys;
  } catch {
    return [];
  }
}

/** Diagnóstico sem expor segredos. Em desenvolvimento inclui pasta de trabalho e se .env.local existe. */
export function GET() {
  const { hasUrl, hasKey } = readSupabaseEnvFromProcess();
  const isDev = process.env.NODE_ENV === "development";

  const cwd = process.cwd();
  const envLocalPath = path.join(cwd, ".env.local");
  const envLocalWithSpacePath = path.join(cwd, ".env .local");
  const envPath = path.join(cwd, ".env");
  const envLocalExists = fs.existsSync(envLocalPath);
  const envLocalWrongSpace = !envLocalExists && fs.existsSync(envLocalWithSpacePath);
  const envExists = fs.existsSync(envPath);

  const payload: Record<string, unknown> = {
    hasUrl,
    hasKey,
  };

  if (isDev) {
    payload.cwd = cwd;
    payload.envLocalExists = envLocalExists;
    payload.envLocalWrongSpace = envLocalWrongSpace;
    payload.envExists = envExists;
    if (envLocalExists) {
      payload.keysInEnvLocal = parseEnvKeysOnly(envLocalPath);
    }
  }

  return NextResponse.json(payload);
}
