/** Valores previstos no passivo importado / relatório de situação. */
export type StatusExecucaoAtividade = "antecedencia" | "no_prazo" | "atraso";

export type Atividade = {
  id: string;
  codigo: string;
  descricao: string | null;
  responsavel: string | null;
  /** Integrante cujo nome coincide exatamente com o responsável. Nulo se houver homônimo ou nenhuma correspondência. */
  responsavel_id?: string | null;
  /** UUID do documento (Instrução de Serviço) em `documentos.id`. */
  instrucao_servico: string;
  inicio: string | null;
  fim: string | null;
  progresso?: number | null;
  etiqueta_relatorio?: string | null;
  link_relatorio?: string | null;
  /** Número do Plano de Atividades ao qual a atividade pertence. */
  plano_atividades?: number | null;
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

/** integrante: membro do projeto. colaborador: acesso ao sistema sem integrar equipe/folha. */
export type VinculoPessoa = "integrante" | "colaborador";

export type Integrante = {
  id: string;
  matricula: number | null;
  nome: string;
  setor: string | null;
  cargo: string | null;
  classe_padrao: string | null;
  email: string | null;
  perfil?: PerfilIntegrante | null;
  vinculo?: VinculoPessoa | null;
  /** Se true: não conta na folha (ref_pgto) nem no orçamento. */
  nao_remunerado?: boolean | null;
  /** Vínculo 1:1 com auth.users(id); preenchido pelo POST /api/integrantes. */
  auth_user_id?: string | null;
  created_at: string;
  updated_at?: string;
};

export type FrequenciaMensal = {
  id: string;
  integrante_id: string;
  /** Primeiro dia do mês de referência (YYYY-MM-DD). */
  competencia: string;
  dias_afastamento: number;
  informado_por: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type RefPgto = {
  id: string;
  cargo: string;
  classe_padrao: string;
  valor_mensal: number;
  created_at: string;
};

export type OrcamentoCenarioLinha = {
  ref_pgto_id: string;
  meses: number;
  pessoas: number;
};

export type OrcamentoCenario = {
  id: string;
  nome: string;
  linhas: OrcamentoCenarioLinha[];
  total_pessoas: number;
  total_valor: number;
  /** Linhas cujo ref_pgto_id não existe mais na referência atual. Calculado na leitura. */
  linhas_sem_referencia?: number;
  criado_por: string | null;
  created_at: string;
};

export type OrcamentoCenarioFeriasLinha = {
  integrante_id: string;
  dias_ferias: number;
};

export type OrcamentoCenarioFerias = {
  id: string;
  nome: string;
  data_inicio: string;
  data_fim: string;
  linhas: OrcamentoCenarioFeriasLinha[];
  total_economia: number;
  economia_sejud: number;
  economia_stic: number;
  /** Pessoas do cenário sem correspondência atual de cargo/classe. Calculado na leitura. */
  sem_correspondencia?: number;
  criado_por: string | null;
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
  /** Período oficial da instrução (YYYY-MM-DD), gravado no documento. */
  periodo_inicio?: string | null;
  periodo_fim?: string | null;
  /** Período usado nas telas: o gravado, quando início e fim existem; senão, o das atividades. */
  periodo_inicio_atividades?: string | null;
  periodo_fim_atividades?: string | null;
  /** Planos de atividades já vinculados a esta Instrução de Serviço. */
  planos_atividades?: number[];
  created_at: string;
  updated_at?: string | null;
};
