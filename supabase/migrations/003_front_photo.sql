-- Migration 003: front barrier picture.
-- For databases created from an older schema.sql. Safe to run more than once.
-- Supabase dashboard → SQL Editor → New query → paste → Run.

-- NULL = no front picture (unlike side/rear, there is no default one).
alter table public.upd_cards add column if not exists front_photo_url text;
