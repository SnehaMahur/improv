-- Run this in your Supabase SQL editor to set up the schema

create table stories (
  id uuid primary key default gen_random_uuid(),
  number bigserial unique,
  title text not null,
  status text not null default 'active' check (status in ('active', 'finished')),
  line_count integer not null default 0,
  vibes text[] not null default '{}',
  heart_count integer not null default 0,
  comment_count integer not null default 0,
  preview text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_contribution_at timestamptz not null default now()
);

create table story_lines (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references stories(id) on delete cascade,
  content text not null,
  contributor_name text not null,
  line_number integer not null,
  reactions jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique(story_id, line_number)
);

create table story_comments (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references stories(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Index for fast lookups
create index on stories(status, last_contribution_at desc);
create index on story_lines(story_id, line_number);
create index on story_comments(story_id, created_at);

-- Enable Row Level Security
alter table stories enable row level security;
alter table story_lines enable row level security;
alter table story_comments enable row level security;

-- Public read access
create policy "Anyone can read stories" on stories for select using (true);
create policy "Anyone can read story lines" on story_lines for select using (true);
create policy "Anyone can read comments" on story_comments for select using (true);

-- Public write access (no auth required for this app)
create policy "Anyone can create stories" on stories for insert with check (true);
create policy "Anyone can update active stories" on stories for update using (true);
create policy "Anyone can add lines" on story_lines for insert with check (true);
create policy "Anyone can update line reactions" on story_lines for update using (true);
create policy "Anyone can add comments" on story_comments for insert with check (true);
