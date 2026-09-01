-- M3/M4: XP, streaks, practice activity, optional leaderboard

alter table public.profiles
  add column if not exists xp_total integer not null default 0,
  add column if not exists streak integer not null default 0,
  add column if not exists last_active_on date,
  add column if not exists leaderboard_opt_in boolean not null default false,
  add column if not exists badges text[] not null default '{}',
  add column if not exists completed_activity_ids text[] not null default '{}',
  add column if not exists daily_key text,
  add column if not exists weekly_key text,
  add column if not exists notify_practice boolean not null default true;

create table if not exists public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount integer not null,
  reason text not null,
  activity_id text,
  created_at timestamptz not null default now()
);

alter table public.xp_transactions enable row level security;

drop policy if exists "xp_select_own" on public.xp_transactions;
create policy "xp_select_own"
  on public.xp_transactions for select
  using (auth.uid() = user_id);

drop policy if exists "xp_insert_own" on public.xp_transactions;
create policy "xp_insert_own"
  on public.xp_transactions for insert
  with check (auth.uid() = user_id);

create or replace view public.leaderboard_entries
  with (security_invoker = false)
  as
  select id, display_name, xp_total
  from public.profiles
  where leaderboard_opt_in = true;

grant select on public.leaderboard_entries to authenticated;
