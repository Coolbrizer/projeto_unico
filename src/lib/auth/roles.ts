export type Perfil = "basico" | "gestor" | "admin";

export function parsePerfil(raw: unknown): Perfil {
  if (raw === "admin" || raw === "gestor" || raw === "basico") return raw;
  return "basico";
}

export function canEditarAtividadesIntegrantes(perfil: Perfil): boolean {
  return perfil === "gestor" || perfil === "admin";
}

export function canEditarDocumentos(perfil: Perfil): boolean {
  return perfil === "gestor" || perfil === "admin";
}

export function canEditarEquipe(perfil: Perfil): boolean {
  return perfil === "gestor" || perfil === "admin";
}

export function isAdmin(perfil: Perfil): boolean {
  return perfil === "admin";
}
