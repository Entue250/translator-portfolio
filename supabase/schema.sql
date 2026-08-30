-- =============================================================
-- Translator Portfolio — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor
-- → New query → paste this whole file → Run).
-- =============================================================

-- ---------- PROFILE (single row, id = 1) ----------
create table if not exists profile (
  id                  bigint primary key default 1,
  full_name           text not null default 'Your Name',
  headline            text not null default 'Certified Translator & Interpreter',
  bio_short           text not null default 'Tell visitors what you do in one or two sentences.',
  bio_long            text not null default 'Write your full biography here — your specialties, your background, and what clients can expect.',
  photo_url           text,
  email               text not null default 'you@example.com',
  phone               text,
  location            text not null default 'City, Country',
  years_experience    integer not null default 1,
  resume_url          text,
  linkedin_url        text,
  twitter_url         text,
  instagram_url       text,
  whatsapp_url        text,
  proz_url            text,
  hero_source_text    text,
  hero_source_lang    text,
  hero_target_text    text,
  hero_target_lang    text,
  available_for_work  boolean not null default true,
  constraint single_row check (id = 1)
);

insert into profile (id) values (1) on conflict (id) do nothing;

-- ---------- STATS ----------
create table if not exists stats (
  id          bigint generated always as identity primary key,
  label       text not null,
  value       text not null,
  sort_order  integer not null default 1
);

-- ---------- SERVICES ----------
create table if not exists services (
  id           bigint generated always as identity primary key,
  title        text not null,
  description  text not null,
  icon         text not null default 'document',
  sort_order   integer not null default 1
);

-- ---------- LANGUAGES ----------
create table if not exists languages (
  id           bigint generated always as identity primary key,
  name         text not null,
  code         text not null,
  proficiency  text not null default 'Professional'
               check (proficiency in ('Native', 'Fluent', 'Professional', 'Working')),
  direction    text not null default '⇄',
  sort_order   integer not null default 1
);

-- ---------- EXPERIENCE ----------
create table if not exists experience (
  id            bigint generated always as identity primary key,
  role          text not null,
  organization  text not null,
  location      text,
  start_date    date not null,
  end_date      date,
  is_current    boolean not null default false,
  description   text not null default '',
  sort_order    integer not null default 1
);

-- ---------- EDUCATION ----------
create table if not exists education (
  id            bigint generated always as identity primary key,
  degree        text not null,
  institution   text not null,
  location      text,
  start_date    date not null,
  end_date      date,
  is_current    boolean not null default false,
  description   text not null default '',
  sort_order    integer not null default 1
);

-- ---------- CERTIFICATIONS ----------
create table if not exists certifications (
  id               bigint generated always as identity primary key,
  title            text not null,
  issuer           text not null,
  year             text not null,
  credential_url   text,
  sort_order       integer not null default 1
);

-- ---------- PROJECTS (portfolio case studies) ----------
create table if not exists projects (
  id             bigint generated always as identity primary key,
  title          text not null,
  category       text not null default 'Other',
  language_pair  text not null default '',
  description    text not null default '',
  image_url      text,
  link_url       text,
  featured       boolean not null default false,
  sort_order     integer not null default 1
);

-- ---------- PROFESSIONAL REFERENCES ----------
create table if not exists professional_references (
  id            bigint generated always as identity primary key,
  name          text not null,
  role          text not null,
  organization  text,
  sort_order    integer not null default 1
);

-- ---------- MESSAGES (contact form submissions) ----------
create table if not exists messages (
  id             bigint generated always as identity primary key,
  name           text not null,
  email          text not null,
  subject        text not null,
  message        text not null,
  language_pair  text,
  read           boolean not null default false,
  created_at     timestamptz not null default now()
);

-- =============================================================
-- ROW LEVEL SECURITY
-- Public visitors can only READ published content. Only a signed-in
-- admin (any authenticated Supabase Auth user — create just one) can
-- write. Anyone (including anonymous visitors) can INSERT a message
-- via the contact form, but only an admin can read/update/delete them.
-- =============================================================

alter table profile                 enable row level security;
alter table stats                   enable row level security;
alter table services                enable row level security;
alter table languages                enable row level security;
alter table experience              enable row level security;
alter table education               enable row level security;
alter table certifications          enable row level security;
alter table projects                enable row level security;
alter table professional_references enable row level security;
alter table messages                enable row level security;

-- Public read access for content tables
create policy "Public can read profile" on profile for select using (true);
create policy "Public can read stats" on stats for select using (true);
create policy "Public can read services" on services for select using (true);
create policy "Public can read languages" on languages for select using (true);
create policy "Public can read experience" on experience for select using (true);
create policy "Public can read education" on education for select using (true);
create policy "Public can read certifications" on certifications for select using (true);
create policy "Public can read projects" on projects for select using (true);
create policy "Public can read professional_references" on professional_references for select using (true);

-- Admin (any authenticated user) write access for content tables
create policy "Admin can update profile" on profile for update using (auth.role() = 'authenticated');

create policy "Admin can insert stats" on stats for insert with check (auth.role() = 'authenticated');
create policy "Admin can update stats" on stats for update using (auth.role() = 'authenticated');
create policy "Admin can delete stats" on stats for delete using (auth.role() = 'authenticated');

create policy "Admin can insert services" on services for insert with check (auth.role() = 'authenticated');
create policy "Admin can update services" on services for update using (auth.role() = 'authenticated');
create policy "Admin can delete services" on services for delete using (auth.role() = 'authenticated');

create policy "Admin can insert languages" on languages for insert with check (auth.role() = 'authenticated');
create policy "Admin can update languages" on languages for update using (auth.role() = 'authenticated');
create policy "Admin can delete languages" on languages for delete using (auth.role() = 'authenticated');

create policy "Admin can insert experience" on experience for insert with check (auth.role() = 'authenticated');
create policy "Admin can update experience" on experience for update using (auth.role() = 'authenticated');
create policy "Admin can delete experience" on experience for delete using (auth.role() = 'authenticated');

create policy "Admin can insert education" on education for insert with check (auth.role() = 'authenticated');
create policy "Admin can update education" on education for update using (auth.role() = 'authenticated');
create policy "Admin can delete education" on education for delete using (auth.role() = 'authenticated');

create policy "Admin can insert certifications" on certifications for insert with check (auth.role() = 'authenticated');
create policy "Admin can update certifications" on certifications for update using (auth.role() = 'authenticated');
create policy "Admin can delete certifications" on certifications for delete using (auth.role() = 'authenticated');

create policy "Admin can insert projects" on projects for insert with check (auth.role() = 'authenticated');
create policy "Admin can update projects" on projects for update using (auth.role() = 'authenticated');
create policy "Admin can delete projects" on projects for delete using (auth.role() = 'authenticated');

create policy "Admin can insert professional_references" on professional_references for insert with check (auth.role() = 'authenticated');
create policy "Admin can update professional_references" on professional_references for update using (auth.role() = 'authenticated');
create policy "Admin can delete professional_references" on professional_references for delete using (auth.role() = 'authenticated');

-- Messages: anyone can submit, only an admin can read/manage
create policy "Anyone can submit a message" on messages for insert with check (true);
create policy "Admin can read messages" on messages for select using (auth.role() = 'authenticated');
create policy "Admin can update messages" on messages for update using (auth.role() = 'authenticated');
create policy "Admin can delete messages" on messages for delete using (auth.role() = 'authenticated');

-- =============================================================
-- STORAGE — bucket for profile photos & project images
-- =============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can view media"
on storage.objects for select
using (bucket_id = 'media');

create policy "Admin can upload media"
on storage.objects for insert
with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admin can update media"
on storage.objects for update
using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admin can delete media"
on storage.objects for delete
using (bucket_id = 'media' and auth.role() = 'authenticated');

-- =============================================================
-- SEED DATA (optional) — sample content so the admin panel isn't
-- empty on first login. Feel free to delete/edit everything from
-- the admin panel afterwards.
-- =============================================================

insert into stats (label, value, sort_order) values
  ('Years of experience', '4+', 1),
  ('Languages spoken', '4', 2),
  ('Interpreting modes', '2', 3),
  ('Digital skills certified', 'ICDL', 4)
on conflict do nothing;

insert into services (title, description, icon, sort_order) values
  ('Translation & Localization', 'English, French, Kiswahili and Kinyarwanda translation for individual and institutional clients.', 'globe', 1),
  ('Consecutive & Simultaneous Interpreting', 'Conference-style interpreting in both consecutive and simultaneous modes.', 'mic', 2),
  ('Audio & Video Transcription', 'Accurate multilingual transcription for media, academic and corporate clients.', 'document', 3),
  ('Subtitling & Captioning', 'Timed, broadcast-ready subtitles and captions for film and training content.', 'captions', 4),
  ('Terminology Research & Glossary Management', 'Building and maintaining glossaries across legal, literary, medical and technical domains.', 'book', 5),
  ('Digital Skills Training', 'ICDL-certified support in spreadsheets, documents, presentations and online collaboration.', 'check', 6)
on conflict do nothing;

insert into languages (name, code, proficiency, sort_order) values
  ('Kinyarwanda', 'RW', 'Native', 1),
  ('English', 'EN', 'Fluent', 2),
  ('French', 'FR', 'Fluent', 3),
  ('Kiswahili', 'SW', 'Fluent', 4)
on conflict do nothing;
