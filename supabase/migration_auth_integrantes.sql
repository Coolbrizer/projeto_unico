-- Autenticação: senha por integrante (bcrypt) e troca obrigatória no primeiro acesso.
-- Execute no SQL Editor do Supabase após backup, se necessário.

alter table public.integrantes
  add column if not exists password_hash text,
  add column if not exists must_change_password boolean not null default true;

-- Senha inicial para quem já tem e-mail cadastrado: 123456 (trocar no primeiro login).
-- Não altera a conta de exemplo (example@mpf.mp.br), ajustada no bloco seguinte.
update public.integrantes
set
  password_hash = '$2b$10$V0CH8dLafYFVbArTDZ4VHuwKVi4WJIrabA4e8UzRtKEVABHFmLB4C',
  must_change_password = true
where
  email is not null
  and btrim(email) <> ''
  and lower(btrim(email)) <> 'example@mpf.mp.br';

-- Conta de exemplo: example@mpf.mp.br / senha: example (sem obrigação de troca).
update public.integrantes
set
  password_hash = '$2b$10$VH09u4ysKw99bWBScNK8JeczoHJZPnGJ9I4jQuicJQAqenvUYI.sa',
  must_change_password = false
where lower(btrim(email)) = 'example@mpf.mp.br';

insert into public.integrantes (matricula, nome, email, password_hash, must_change_password)
select
  999999001,
  'Conta exemplo',
  'example@mpf.mp.br',
  '$2b$10$VH09u4ysKw99bWBScNK8JeczoHJZPnGJ9I4jQuicJQAqenvUYI.sa',
  false
where not exists (
  select 1 from public.integrantes where lower(btrim(email)) = 'example@mpf.mp.br'
);

create unique index if not exists integrantes_email_lower_uniq
  on public.integrantes (lower(btrim(email)))
  where email is not null and btrim(email) <> '';
