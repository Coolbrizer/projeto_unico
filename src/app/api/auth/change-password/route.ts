import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

export async function POST(request: Request) {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  const user = userRes.user;
  const email = (user.email ?? "").toLowerCase();

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = (await request.json()) as { currentPassword?: string; newPassword?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const currentPassword = body.currentPassword ?? "";
  const newPassword = body.newPassword ?? "";
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Informe a senha atual e a nova senha." }, { status: 400 });
  }

  // Validação da senha atual: usa um cliente isolado (sem cookies) para não
  // bagunçar a sessão do usuário corrente.
  const { url, anonKey } = getPublicSupabaseEnv();
  if (!url || !anonKey) {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }
  const validator = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: validateErr } = await validator.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (validateErr) {
    return NextResponse.json({ error: "Senha atual incorreta." }, { status: 400 });
  }

  const { error: updErr } = await supabase.auth.updateUser({ password: newPassword });
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 });
  }

  // Limpa a flag must_change_password em integrantes — o trigger
  // integrantes_sync_perfil propaga a mudança para auth.users.app_metadata.
  try {
    const admin = createServiceClient();
    const integranteId =
      typeof user.app_metadata?.integrante_id === "string"
        ? (user.app_metadata.integrante_id as string)
        : null;

    if (integranteId) {
      await admin
        .from("integrantes")
        .update({ must_change_password: false })
        .eq("id", integranteId);
    }
  } catch {
    // sem service role: a flag continua true; usuário será redirecionado de novo.
  }

  return NextResponse.json({ ok: true });
}
