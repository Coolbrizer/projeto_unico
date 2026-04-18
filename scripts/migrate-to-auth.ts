/* eslint-disable no-console */
/**
 * Associação de `integrantes.auth_user_id` quando já existe utilizador em
 * `auth.users` com o mesmo e-mail (Idempotente).
 *
 * Este fluxo cobre projetos **após a Fase 7** (sem colunas `password_hash` /
 * `must_change_password`). A criação em massa de contas com hash legado foi
 * descontinuada — use o painel Supabase Auth ou a Admin API para criar
 * utilizadores e corre novamente este script ou associe manualmente.
 *
 * Como rodar:
 *   1) SUPABASE_SERVICE_ROLE_KEY e NEXT_PUBLIC_SUPABASE_URL definidos.
 *   2) npm run migrate:auth
 *
 *   DRY_RUN=1 — apenas lista o que seria vinculado.
 */

import { createClient } from "@supabase/supabase-js";

type IntegranteRow = {
  id: string;
  email: string | null;
  nome: string | null;
  perfil: string | null;
  auth_user_id: string | null;
};

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const DRY_RUN = process.env.DRY_RUN === "1";

if (!URL || !SERVICE_KEY) {
  console.error(
    "Faltando NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no ambiente."
  );
  process.exit(1);
}

const admin = createClient(URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findExistingAuthUserByEmail(email: string): Promise<string | null> {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data.users.find(
      (u) => (u.email ?? "").toLowerCase() === email.toLowerCase()
    );
    if (found) return found.id;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function main() {
  const { data, error } = await admin
    .from("integrantes")
    .select("id,email,nome,perfil,auth_user_id")
    .is("auth_user_id", null);

  if (error) {
    console.error("Erro ao consultar integrantes:", error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as IntegranteRow[];
  console.log(`Integrantes sem auth_user_id: ${rows.length}${DRY_RUN ? " (DRY-RUN)" : ""}`);

  let vinculados = 0;
  let semEmail = 0;
  let semAuthUser = 0;
  let falhas = 0;

  for (const row of rows) {
    const email = row.email?.trim().toLowerCase();
    if (!email) {
      semEmail += 1;
      console.warn(`SKIP id=${row.id} sem e-mail`);
      continue;
    }

    const existingId = await findExistingAuthUserByEmail(email);
    if (!existingId) {
      semAuthUser += 1;
      console.warn(
        `SKIP ${email}: não existe utilizador em auth.users — crie no painel ou Admin API e volte a correr o script.`
      );
      continue;
    }

    if (DRY_RUN) {
      console.log(`DRY: vincularia ${email} -> auth.users.id=${existingId}`);
      continue;
    }

    try {
      const { error: updErr } = await admin
        .from("integrantes")
        .update({ auth_user_id: existingId })
        .eq("id", row.id);

      if (updErr) {
        falhas += 1;
        console.error(`FAIL link ${email}: ${updErr.message}`);
        continue;
      }

      vinculados += 1;
      console.log(`OK ${email} -> ${existingId}`);
    } catch (err) {
      falhas += 1;
      console.error(`FAIL ${email}:`, err instanceof Error ? err.message : String(err));
    }
  }

  console.log("\n===== Resumo =====");
  console.log(`Vinculados (auth já existia): ${vinculados}`);
  console.log(`Sem e-mail (skip):           ${semEmail}`);
  console.log(`Sem utilizador em Auth:      ${semAuthUser}`);
  console.log(`Falhas:                      ${falhas}`);
  console.log(`Total analisados:            ${rows.length}`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
