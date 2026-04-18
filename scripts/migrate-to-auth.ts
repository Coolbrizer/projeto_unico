/* eslint-disable no-console */
/**
 * Fase 2 da migração para Supabase Auth.
 *
 * Cria um usuário em `auth.users` para cada linha de `public.integrantes` que
 * ainda não tenha `auth_user_id` preenchido. Reaproveita o hash bcrypt já
 * existente em `password_hash` (Supabase aceita via Admin API), portanto os
 * usuários NÃO precisam redefinir a senha — eles continuam logando com a
 * mesma credencial atual após o switch para `signInWithPassword` (Fase 4).
 *
 * Como rodar:
 *   1) Garanta que SUPABASE_SERVICE_ROLE_KEY e NEXT_PUBLIC_SUPABASE_URL
 *      estão definidos (em .env.local ou exportados no shell).
 *   2) npm run migrate:auth
 *
 * Características:
 *   - Idempotente: só processa quem ainda não tem auth_user_id; pode rodar
 *     quantas vezes quiser sem efeito colateral.
 *   - Tolerante a falhas: registra erro por usuário, segue adiante e mostra
 *     um sumário no final.
 *   - Dry-run: defina DRY_RUN=1 para apenas listar o que seria feito.
 */

import { createClient } from "@supabase/supabase-js";

type IntegranteRow = {
  id: string;
  email: string | null;
  nome: string | null;
  perfil: string | null;
  password_hash: string | null;
  must_change_password: boolean | null;
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
  // Admin API não tem busca direta por email; paginar até achar (poucos usuários).
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
    .select("id,email,nome,perfil,password_hash,must_change_password,auth_user_id")
    .is("auth_user_id", null);

  if (error) {
    console.error("Erro ao consultar integrantes:", error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as IntegranteRow[];
  console.log(`Integrantes pendentes: ${rows.length}${DRY_RUN ? " (DRY-RUN)" : ""}`);

  let criados = 0;
  let vinculados = 0;
  let semSenha = 0;
  let semEmail = 0;
  let falhas = 0;

  for (const row of rows) {
    const email = row.email?.trim().toLowerCase();
    if (!email) {
      semEmail += 1;
      console.warn(`SKIP id=${row.id} sem e-mail`);
      continue;
    }
    if (!row.password_hash) {
      semSenha += 1;
      console.warn(`SKIP ${email} sem password_hash`);
      continue;
    }

    if (DRY_RUN) {
      console.log(`DRY: criaria/vincularia ${email} (perfil=${row.perfil})`);
      continue;
    }

    try {
      let authUserId: string | null = null;

      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password_hash: row.password_hash,
        email_confirm: true,
        user_metadata: { nome: row.nome ?? "" },
        app_metadata: {
          perfil: row.perfil ?? "basico",
          integrante_id: row.id,
          must_change_password: row.must_change_password ?? false,
        },
      });

      if (createErr) {
        // Provavelmente o usuário já existe em auth.users (criado em tentativa anterior
        // que falhou no UPDATE da tabela integrantes). Tenta localizar e só vincular.
        const existingId = await findExistingAuthUserByEmail(email);
        if (!existingId) {
          falhas += 1;
          console.error(`FAIL ${email}: ${createErr.message}`);
          continue;
        }
        authUserId = existingId;
        vinculados += 1;
      } else {
        authUserId = created.user.id;
        criados += 1;
      }

      const { error: updErr } = await admin
        .from("integrantes")
        .update({ auth_user_id: authUserId })
        .eq("id", row.id);

      if (updErr) {
        falhas += 1;
        console.error(`FAIL link ${email}: ${updErr.message}`);
        continue;
      }

      console.log(`OK ${email} -> ${authUserId}`);
    } catch (err) {
      falhas += 1;
      console.error(
        `FAIL ${email}:`,
        err instanceof Error ? err.message : String(err)
      );
    }
  }

  console.log("\n===== Resumo =====");
  console.log(`Criados em auth.users:  ${criados}`);
  console.log(`Apenas vinculados:      ${vinculados}`);
  console.log(`Sem e-mail (skip):      ${semEmail}`);
  console.log(`Sem password_hash:      ${semSenha}`);
  console.log(`Falhas:                 ${falhas}`);
  console.log(`Total processado:       ${rows.length}`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
