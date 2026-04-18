# Migração para Supabase Auth

Este diretório contém o script da **Fase 2** da migração da autenticação caseira
(bcrypt + JWT em cookie `app_session`) para o **Supabase Auth**.

## Estado atual da migração

| Fase | O que faz | Status |
|------|-----------|--------|
| 1 | Schema: `integrantes.auth_user_id`, `current_perfil()`, `current_integrante()` | Aplicada (`supabase/migration_auth_phase1_link_integrantes.sql`) |
| 2 | Importa os 138 integrantes para `auth.users` mantendo o hash bcrypt | **Este script** |
| 3 | Trigger `sync_perfil_to_auth` + função `jwt_perfil()` | Aplicada (`supabase/migration_auth_phase3_sync_metadata.sql`) |
| 4 | Trocar `/api/auth/login` etc. por `signInWithPassword` | Pendente (mudança de código) |
| 5 | Substituir RLS aberto por políticas baseadas em `auth.uid()` + perfil | Pendente |
| 6 | Migrar APIs para usar cliente do usuário (não `service_role`) | Pendente |
| 7 | Remover `password_hash`, `must_change_password`, `bcryptjs`, `jose` | Pendente |

## Como executar a Fase 2

### 1. Pré-requisitos

Variáveis no shell (ou em `.env.local` carregado pelo seu shell):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key do projeto>
```

> A `SUPABASE_SERVICE_ROLE_KEY` precisa ter permissão de admin — qualquer
> service role key funciona.

### 2. Dry-run (recomendado primeiro)

Apenas lista o que seria feito, sem criar ninguém em `auth.users`.

**PowerShell (Windows):**

```powershell
$env:DRY_RUN="1"; npm run migrate:auth
Remove-Item Env:DRY_RUN
```

**Bash / zsh (Linux, macOS, WSL):**

```bash
DRY_RUN=1 npm run migrate:auth
```

### 3. Execução real

```bash
npm run migrate:auth
```

O script imprime no final um sumário do tipo:

```
===== Resumo =====
Criados em auth.users:  130
Apenas vinculados:      0
Sem e-mail (skip):      2
Sem password_hash:      6
Falhas:                 0
Total processado:       138
```

### 4. Características importantes

- **Idempotente**: só processa quem ainda não tem `auth_user_id`. Pode rodar
  várias vezes sem causar duplicação.
- **Reaproveita o bcrypt**: nenhum usuário precisa redefinir senha. O Supabase
  Auth aceita o hash via Admin API (`createUser({ password_hash })`).
- **Resiliente**: se uma execução criou o usuário em `auth.users` mas falhou
  ao salvar `auth_user_id`, a próxima execução localiza o usuário existente
  por e-mail e apenas faz o vínculo.
- **Trigger `integrantes_sync_perfil`** (Fase 3) é disparado automaticamente
  quando `auth_user_id` é preenchido, copiando `perfil`, `integrante_id` e
  `must_change_password` para `auth.users.raw_app_meta_data`.

## Validação após executar

No SQL editor do Supabase, ou via MCP:

```sql
-- Quantos vinculados:
SELECT count(*) FILTER (WHERE auth_user_id IS NOT NULL) AS vinculados,
       count(*) FILTER (WHERE auth_user_id IS NULL)     AS pendentes,
       count(*)                                          AS total
FROM public.integrantes;

-- Conferir que app_metadata foi populado:
SELECT id, email, raw_app_meta_data
FROM auth.users
LIMIT 5;
```

Esperado: `raw_app_meta_data` contendo `{"perfil": "...", "integrante_id": "...", "must_change_password": ...}`.

## Próximo passo

Após a Fase 2 ser executada com sucesso, partir para a **Fase 4** — trocar
o fluxo de login no código (Next.js) para usar `supabase.auth.signInWithPassword`.
Os usuários migrados continuam logando com a mesma senha.
