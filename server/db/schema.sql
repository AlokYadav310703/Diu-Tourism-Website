-- ============================================================
-- Diu Tourism — Supabase (Postgres) schema
-- Run this once in the Supabase SQL Editor on a fresh project.
-- ============================================================

create extension if not exists vector;

-- ============================================================
-- PROFILES — extends Supabase Auth's built-in auth.users.
-- auth.users holds email/password/OAuth identity (managed by
-- Supabase Auth itself). This table holds the app-specific bits:
-- display name, trip date, and admin flag.
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_name text,
  date_of_trip date,
  is_admin boolean not null default false,
  trip_reminder_sent boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- EVENT PLAN ITEMS — replaces the old "event_plan_<username>"
-- pattern (one MySQL table created per user). Now a single table
-- filtered by user_id.
-- ============================================================
create table if not exists event_plan_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  activity text not null,
  status text not null default 'todo',
  unique (user_id, activity)
);

-- ============================================================
-- New-user setup: on signup, auto-create a profile row and seed
-- the 12 default itinerary activities (same list the old app
-- inserted into each per-user table).
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
  default_activities text[] := array[
    'Nagoa','Ghoghla','Chakratirth','Jallandhar','Gomtimata','DiuFort',
    'PaniKotha','Gangeshwar','NadiaCaves','St Paul Church',
    'INS Khukhri Memorial','Sea Shell Museum'
  ];
  activity text;
begin
  insert into public.profiles (id, user_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'user_name', split_part(new.email, '@', 1)));

  foreach activity in array default_activities loop
    insert into public.event_plan_items (user_id, activity, status)
    values (new.id, activity, 'todo');
  end loop;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- FEEDBACK + REPLIES + VOTES — replaces the old "<place>_feedback"
-- / "<place>_replies" / "nagoa_votes"-style per-place tables.
-- Now one table each, filtered by a "place" column. The `place`
-- values match whatever string each page already passes as
-- <Feedback placename="..."> in the frontend (e.g. "nagoa",
-- "ghoghla", "St_Paul_Church") — no frontend route changes needed.
-- ============================================================
-- One feedback entry per person per place (mirrors the old design,
-- where email was the table's primary key) — now backed by the real
-- logged-in user's email instead of a free-text form field.
create table if not exists feedback (
  id bigint generated always as identity primary key,
  place text not null,
  email text not null,
  user_name text,
  likes int not null default 0,
  dislikes int not null default 0,
  user_comment text not null,
  created_at timestamptz not null default now(),
  unique (place, email)
);
create index if not exists feedback_place_idx on feedback(place);

create table if not exists replies (
  id bigint generated always as identity primary key,
  feedback_id bigint not null references feedback(id) on delete cascade,
  replier_email text not null,
  replier_name text,
  replier_comment text not null,
  created_at timestamptz not null default now()
);
create index if not exists replies_feedback_id_idx on replies(feedback_id);

create table if not exists votes (
  id bigint generated always as identity primary key,
  feedback_id bigint not null references feedback(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote_type text not null check (vote_type in ('like', 'dislike')),
  unique (feedback_id, user_id)
);

-- Atomic counters used by POST /msg/feedback/:id/vote — avoids a
-- read-then-write race condition on concurrent votes.
create or replace function increment_feedback_count(row_id bigint, column_name text)
returns void as $$
begin
  if column_name = 'likes' then
    update feedback set likes = likes + 1 where id = row_id;
  elsif column_name = 'dislikes' then
    update feedback set dislikes = dislikes + 1 where id = row_id;
  end if;
end;
$$ language plpgsql;

create or replace function decrement_feedback_count(row_id bigint, column_name text)
returns void as $$
begin
  if column_name = 'likes' then
    update feedback set likes = greatest(likes - 1, 0) where id = row_id;
  elsif column_name = 'dislikes' then
    update feedback set dislikes = greatest(dislikes - 1, 0) where id = row_id;
  end if;
end;
$$ language plpgsql;

-- ============================================================
-- CORE TOURISM DATA — restaurants, hotels, transport, misc.
-- Every admin-editable table gets a real "id" primary key so
-- removal is reliable (several original tables had no PK at all,
-- which made deleting a specific row fragile).
-- ============================================================
create table if not exists restaurants (
  id int generated always as identity primary key,
  name varchar(255) not null,
  address varchar(255) not null,
  phone varchar(20),
  type varchar(50),
  open_time time,
  close_time time
);

create table if not exists hotels (
  id int generated always as identity primary key,
  name varchar(255) not null,
  address text not null,
  phone varchar(12) not null,
  website varchar(255) default null
);

create table if not exists local_buses (
  id int generated always as identity primary key,
  from_location varchar(100) not null,
  to_location varchar(100) not null,
  bus_time time not null,
  cost decimal(10,2) not null
);

create table if not exists state_buses (
  id int generated always as identity primary key,
  from_location varchar(100) not null,
  to_location varchar(100) not null,
  start_time time not null,
  end_time time not null,
  travels varchar(100) not null,
  cost decimal(10,2) not null,
  link varchar(500)
);

-- flight_name is the canonical column (the old admin_activity.js
-- insert used "airline", which doesn't exist on this table and
-- would have failed — fixed here and in the new flights route).
create table if not exists flights (
  id int generated always as identity primary key,
  from_location varchar(100) not null,
  to_location varchar(100) not null,
  flight_time time not null,
  flight_name varchar(100) not null
);

create table if not exists rickshaw (
  id int generated always as identity primary key,
  driver_name varchar(50) not null,
  phone varchar(20) not null
);

create table if not exists public_toilets (
  id int generated always as identity primary key,
  name varchar(255) not null,
  latitude double precision not null,
  longitude double precision not null
);

create table if not exists contactus (
  id bigint generated always as identity primary key,
  user_name varchar(50),
  email varchar(50),
  subject varchar(100),
  message varchar(500),
  created_at timestamptz not null default now()
);

-- ============================================================
-- RAG KNOWLEDGE BASE for the chatbot
-- ============================================================
create table if not exists knowledge_chunks (
  id bigint generated always as identity primary key,
  source_table varchar(50),
  source_id int,
  content text not null,
  embedding vector(1536),
  created_at timestamptz default now()
);

create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function match_knowledge(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  source_table varchar(50),
  source_id int,
  content text,
  similarity float
)
language sql stable
as $$
  select id, source_table, source_id, content,
         1 - (embedding <=> query_embedding) as similarity
  from knowledge_chunks
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- ============================================================
-- ROW LEVEL SECURITY — safety net only.
-- The Express backend uses the service_role key, which bypasses
-- RLS entirely, and does its own auth/admin checks in middleware
-- (see server/middleware/auth.js). Enabling RLS here with no
-- policies for anon/authenticated means the public anon key
-- (which is always exposed in frontend code) cannot read or
-- write any of this data directly — everything must go through
-- Express, where the real authorization logic lives.
-- ============================================================
alter table profiles enable row level security;
alter table event_plan_items enable row level security;
alter table feedback enable row level security;
alter table replies enable row level security;
alter table votes enable row level security;
alter table restaurants enable row level security;
alter table hotels enable row level security;
alter table local_buses enable row level security;
alter table state_buses enable row level security;
alter table flights enable row level security;
alter table rickshaw enable row level security;
alter table public_toilets enable row level security;
alter table contactus enable row level security;
alter table knowledge_chunks enable row level security;

-- ============================================================
-- First admin — run manually after your first signup, e.g.:
-- update profiles set is_admin = true where id =
--   (select id from auth.users where email = 'alok@gmail.com');
-- ============================================================
