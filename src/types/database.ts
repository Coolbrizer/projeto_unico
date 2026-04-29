/** Valores previstos no passivo importado / relatório de situação. */
export type StatusExecucaoAtividade = "antecedencia" | "no_prazo" | "atraso";

export type Atividade = {
  id: string;
  codigo: string;
  descricao: string | null;
  responsavel: string | null;
  /** UUID do documento (Instrução de Serviço) em `documentos.id`. */
  instrucao_servico: string;
  inicio: string | null;
  fim: string | null;
  progresso?: number | null;
  etiqueta_relatorio?: string | null;
  link_relatorio?: string | null;
  /** 1–4 conforme etapas do projeto (importação passivo). */
  etapa?: number | null;
  status_execucao?: StatusExecucaoAtividade | null;
  created_at: string;
};

export type Equipe = {
  id: string;
  codigo: string;
  equipe: string;
  created_at: string;
};

export type PerfilIntegrante = "basico" | "gestor" | "admin";

export type Integrante = {
  id: string;
  matricula: number;
  nome: string;
  setor: string | null;
  cargo: string | null;
  classe_padrao: string | null;
  email: string | null;
  perfil?: PerfilIntegrante | null;
  /** Se true: não conta na folha (ref_pgto) nem no orçamento. */
  nao_remunerado?: boolean | null;
  /** Vínculo 1:1 com auth.users(id); preenchido pelo POST /api/integrantes. */
  auth_user_id?: string | null;
  created_at: string;
  updated_at?: string;
};

export type RefPgto = {
  id: string;
  cargo: string;
  classe_padrao: string;
  valor_mensal: number;
  created_at: string;
};

export type Orcamento = {
  id: string;
  categoria: string;
  descricao: string | null;
  valor_previsto: number;
  valor_real: number | null;
  periodo: string | null;
  created_at: string;
};

export type Documento = {
  id: string;
  tipo: string | null;
  /** integer no Supabase; aceitamos number ou string (PostgREST coage). */
  numero: number | string | null;
  /** smallint no Supabase; aceitamos number ou string. */
  ano: number | string | null;
  etiqueta: string | null;
  /** URL do documento (coluna `link` no Supabase). */
  link: string | null;
  /** Menor data de início e maior data de fim das atividades da mesma IS (YYYY-MM-DD). */
  periodo_inicio_atividades?: string | null;
  periodo_fim_atividades?: string | null;
  created_at: string;
  updated_at?: string | null;
};
