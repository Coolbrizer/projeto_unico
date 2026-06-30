import { NextResponse } from "next/server";
import {
  ETAPAS_CODIGO_ATIVIDADE,
  atribuirCodigosAtividades,
  parseAtividadesCsv,
} from "@/lib/atividades-csv-import";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireGestorOuAdmin } from "@/lib/auth/requireRole";
import { isUuidString } from "@/lib/uuid";

export async function POST(request: Request) {
  const auth = await requireGestorOuAdmin();
  if (auth.response) return auth.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Envio inválido." }, { status: 400 });
  }

  const instrucaoServicoId = String(form.get("instrucao_servico") ?? "").trim();
  const etapa = String(form.get("etapa") ?? "")
    .trim()
    .toUpperCase();
  const arquivo = form.get("arquivo");

  if (!instrucaoServicoId || !isUuidString(instrucaoServicoId)) {
    return NextResponse.json(
      { error: "Selecione uma Instrução de Serviço válida." },
      { status: 400 }
    );
  }

  if (!(ETAPAS_CODIGO_ATIVIDADE as readonly string[]).includes(etapa)) {
    return NextResponse.json(
      { error: "Selecione a etapa do código (1E a 5E)." },
      { status: 400 }
    );
  }

  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return NextResponse.json({ error: "Selecione um arquivo CSV." }, { status: 400 });
  }

  const texto = await arquivo.text();
  const { linhas, erros } = parseAtividadesCsv(texto);

  if (linhas.length === 0) {
    return NextResponse.json(
      {
        error: erros[0] ?? "Nenhuma linha válida no CSV.",
        erros,
      },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Configuração do servidor incompleta." }, { status: 500 });
  }

  const { data: existentes, error: errExist } = await supabase
    .from("atividades")
    .select("codigo")
    .eq("instrucao_servico", instrucaoServicoId);

  if (errExist) {
    return NextResponse.json({ error: errExist.message }, { status: 400 });
  }

  const comCodigo = atribuirCodigosAtividades(
    etapa,
    linhas,
    (existentes ?? []).map((r) => String(r.codigo ?? ""))
  );

  const atividadesInsert = comCodigo.map((l) => ({
    codigo: l.codigo,
    descricao: l.descricao,
    responsavel: l.responsavel,
    inicio: l.inicio,
    fim: l.fim,
    instrucao_servico: instrucaoServicoId,
    progresso: 0,
  }));

  const { data: inseridas, error: errInsert } = await supabase
    .from("atividades")
    .insert(atividadesInsert)
    .select("id, codigo");

  if (errInsert) {
    return NextResponse.json({ error: errInsert.message, erros }, { status: 400 });
  }

  const equipeRows: { codigo: string; equipe: string }[] = [];
  for (const l of comCodigo) {
    for (const membro of l.equipeMembros) {
      equipeRows.push({ codigo: l.codigo, equipe: membro });
    }
  }

  let equipesInseridas = 0;
  if (equipeRows.length > 0) {
    const { data: eqData, error: errEq } = await supabase
      .from("equipe")
      .insert(equipeRows)
      .select("id");
    if (errEq) {
      return NextResponse.json(
        {
          error: `Atividades criadas, mas falha ao inserir equipes: ${errEq.message}`,
          atividades: inseridas?.length ?? 0,
          codigos: comCodigo.map((l) => l.codigo),
          erros,
        },
        { status: 400 }
      );
    }
    equipesInseridas = eqData?.length ?? 0;
  }

  return NextResponse.json({
    ok: true,
    atividades: inseridas?.length ?? 0,
    equipes: equipesInseridas,
    codigos: comCodigo.map((l) => l.codigo),
    avisos: erros,
  });
}
