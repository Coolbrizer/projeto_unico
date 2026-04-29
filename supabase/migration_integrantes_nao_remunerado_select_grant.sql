-- Após adicionar a coluna nao_remunerado, incluir no GRANT SELECT por coluna
-- (ver migration_auth_phase5_column_privileges.sql). Sem isso, a role
-- `authenticated` recebe "permission denied for table integrantes" ao
-- selecionar colunas não listadas.

GRANT SELECT (nao_remunerado) ON public.integrantes TO authenticated;
