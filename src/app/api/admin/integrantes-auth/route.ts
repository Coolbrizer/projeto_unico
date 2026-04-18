import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { requireAdmin } from "@/lib/auth/requireRole";
import { requireAdminMfaIfEnabled } from "@/lib/auth/requireAdminMfa";

type IntegranteRow = {
  id: string;
  matricula: number | null;
  nome: string | null;
  email: string | null;
  perfil: string | null;
  auth_user_id: string | null;
};

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const mfa = await requireAdminMfaIfEnabled();
  if (mfa) return mfa;

  let admin;
  try {
    admin = createServiceClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data, error } = await admin
    .from("integrantes")
    .select("id, matricula, nome, email, perfil, auth_user_id")
    .order("nome", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Junta must_change_password lendo de auth.users.app_metadata.
  const mcpById = new Map<string, boolean>();
  try {
    let page = 1;
    const perPage = 1000;
    for (;;) {
      const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page, perPage });
      if (listErr) break;
      list.users.forEach((u) => {
        const meta = (u.app_metadata ?? {}) as { must_change_password?: unknown };
        mcpById.set(u.id, meta.must_change_password === true);
      });
      if (list.users.length < perPage) break;
      page += 1;
    }
  } catch {
    // se falhar a listagem, devolve sem a flag: o front exibe "OK".
  }

  const integrantes = ((data ?? []) as IntegranteRow[]).map((row) => ({
    id: row.id,
    matricula: row.matricula,
    nome: row.nome,
    email: row.email,
    perfil: row.perfil,
    must_change_password: row.auth_user_id ? mcpById.get(row.auth_user_id) ?? false : false,
  }));

  return NextResponse.json({ integrantes });
}
