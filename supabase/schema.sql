-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.entries (
  id         uuid primary key default gen_random_uuid(),
  section    text not null,
  data       jsonb not null default '{}',
  position   int  not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists entries_section_idx on public.entries (section, position, created_at);

-- RLS on with NO policies: the public/anon key cannot read or write this table.
-- Only the server (service-role key) can.
alter table public.entries enable row level security;

-- Public bucket for media (files are readable by URL; uploads need a server-signed token).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800, array[
  'image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime',
  'application/pdf','application/zip','text/plain','application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;
