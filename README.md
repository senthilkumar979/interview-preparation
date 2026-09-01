# PrepQuest

Gamified interview preparation — one Next.js app, content-driven topics, Supabase-ready auth.

## M0 / M1 (this slice)

- pnpm + Turborepo monorepo
- Design tokens (`#EDAE49` primary, cream background)
- Marketing home, footer, dashboard shell
- Guest session **or** Supabase Auth + RLS profiles
- Frontend → JavaScript topics (5), generated roadmap from prerequisites
- Topic reader + persisted completion

## Run

```bash
pnpm install
pnpm --filter @prepquest/web dev
```

Open [http://localhost:3000](http://localhost:3000) → **Continue as guest** (no cloud required).

### Optional: Supabase

1. `npx supabase start` from the repo root (or create a hosted project).
2. Apply `supabase/migrations`.
3. Copy `apps/web/.env.example` to `apps/web/.env.local` and set URL + anon key.
