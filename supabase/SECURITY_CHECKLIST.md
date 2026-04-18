# Segurança Supabase Auth (checklist manual)

Algumas proteções só existem no **Dashboard** do projeto (não há API de migração estável para todos). Após cada deploy ou revisão de segurança, confirme os itens abaixo.

## Proteção contra passwords vazadas (Have I Been Pwned)

1. Abra [Supabase Dashboard](https://supabase.com/dashboard) → o seu projeto.
2. **Authentication** → **Providers** → **Email** (ou **Auth** → **Policies** conforme a UI atual).
3. Ative **Leaked password protection** (ou equivalente: bloqueio de passwords conhecidas como comprometidas).
4. Guarde as alterações e teste um registo com uma password de teste conhecida como vazada (se o painel permitir simulação).

## MFA (TOTP) para administradores na aplicação

1. No Dashboard: **Authentication** → **Providers** — confirme que **MFA** / **Phone** ou **TOTP** está permitido conforme a política da organização.
2. Na app, defina `NEXT_PUBLIC_REQUIRE_ADMIN_MFA=true` só **depois** dos administradores concluírem o enrolamento em `/configurar-mfa`.
3. Utilizadores admin sem MFA verificado (AAL2) são redirecionados para `/configurar-mfa` ao acederem a `/orcamento` e `/gestao-senhas`; as APIs em `/api/admin/*` respondem `403` com código `MFA_REQUIRED`.

## Auditoria na base de dados

- Triggers `audit_row_change` em `atividades`, `documentos`, `equipe`, `orcamento` registam alterações quando o pedido corre com JWT do utilizador (`auth.uid()` presente).
- Operações feitas com **service role** não duplicam linhas vazias no `audit_log`; onde a rota ainda usa `service_role`, mantém-se `writeAuditLog` no código da API quando aplicável.
