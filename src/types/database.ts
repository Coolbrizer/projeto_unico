export type Atividade = {
  id: string;
  codigo: string;
  descricao: string | null;
  responsavel: string | null;
  /** Id do documento (Instrução de Serviço) em `documentos.id`. */
  instrucao_servico?: string | null;
  inicio: string | null;
  fim: string | null;
  progresso?: number | null;
  etiqueta_relatorio?: string | null;
  link_relatorio?: string | null;
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
  /** Resumo interno / legado; gerado na API ao salvar. */
  titulo: string;
  tipo: string | null;
  numero: string | null;
  ano: string | null;
  etiqueta: string | null;
  /** URL do documento (coluna `link` no Supabase). */
  link: string | null;
  observacoes: string | null;
  created_at: string;
};
