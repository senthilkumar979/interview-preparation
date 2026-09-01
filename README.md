# PrepQuest

Gamified interview preparation — one Next.js app, content-driven topics, Supabase-ready auth.

## M0 / M1 (this slice)

- pnpm + Turborepo monorepo
- Design tokens (`#EDAE49` primary, cream background)
- Marketing home, footer, dashboard shell
- Guest session **or** Supabase Auth + RLS profiles
- Frontend → JavaScript topics (5), generated roadmap from prerequisites
- Topic reader + persisted completion

## M3 / M4

- Practice: timed questions, CodeMirror + Web Worker JS tests, HTML/CSS iframe sandbox, Bug Finder, Bad Practice Finder (`/practice`)
- Gamification: XP, streaks, levels, badges, daily/weekly challenges, composite prep %, next-study, opt-in leaderboard

Apply `supabase/migrations` including `20260901000100_m3_m4_gamification.sql` for signed-in XP. Guests persist game state in a cookie.

```bash
pnpm install
pnpm --filter @prepquest/web dev
```

Open [http://localhost:3000](http://localhost:3000) → **Continue as guest** (no cloud required).

### Optional: Supabase

1. `npx supabase start` from the repo root (or create a hosted project).
2. Apply `supabase/migrations`.
3. Copy `apps/web/.env.example` to `apps/web/.env.local` and set URL + anon key.
