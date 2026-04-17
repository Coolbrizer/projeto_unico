import type { SessionPayload } from "@/lib/auth/session";
import type { SupabaseClient } from "@supabase/supabase-js";

type AuditAction = "insert" | "update" | "delete" | "upsert" | "auth";

type WriteAuditInput = {
  supabase: SupabaseClient;
  action: AuditAction;
  entityTable: string;
  entityId?: string | null;
  session?: SessionPayload | null;
  beforeData?: unknown;
  afterData?: unknown;
  metadata?: Record<string, unknown>;
};

/**
 * Grava trilha de auditoria sem quebrar o fluxo principal.
 * Qualquer erro no log é silencioso (apenas console.error).
 */
export async function writeAuditLog(input: WriteAuditInput): Promise<void> {
  try {
    const row: Record<string, unknown> = {
      actor_id: input.session?.sub ?? null,
      actor_email: input.session?.email ?? null,
      actor_role: input.session?.role ?? null,
      entity_table: input.entityTable,
      entity_id: input.entityId ?? null,
      action: input.action,
      before_data: input.beforeData ?? null,
      after_data: input.afterData ?? null,
      metadata: input.metadata ?? {},
    };
    const { error } = await input.supabase.from("audit_log").insert(row);
    if (error) {
      console.error("Falha ao gravar audit_log:", error.message);
    }
  } catch (e) {
    console.error("Erro inesperado ao gravar audit_log:", e);
  }
}
