import Link from "next/link";
import { getDailyChallenge, getWeeklyChallenge } from "@prepquest/content";
import { levelForXp, type GameState } from "@/lib/game";

interface GameStripProps {
  game: GameState;
  prepPercent: number;
  nextHref: string | null;
  nextTitle: string | null;
}

export const GameStrip = ({ game, prepPercent, nextHref, nextTitle }: GameStripProps) => {
  const { level, into, span } = levelForXp(game.xp);
  const daily = getDailyChallenge();
  const weekly = getWeeklyChallenge();

  return (
    <section className="grid gap-3">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Prep %" value={`${prepPercent}%`} hint="Topics + practice + high-yield" />
        <Stat label="XP" value={String(game.xp)} hint={`Level ${level} · ${into}/${span}`} />
        <Stat label="Streak" value={`${game.streak}d`} hint={game.lastActiveDay ?? "Start a lesson"} />
        <Stat label="Badges" value={String(game.badges.length)} hint={game.badges[0] ?? "Earn your first"} />
      </ul>
      <div className="grid gap-3 md:grid-cols-3">
        <ChallengeCard
          eyebrow="Daily"
          title={daily.set.title}
          href={`/practice/${daily.set.topicSlug}?challenge=daily`}
        />
        <ChallengeCard
          eyebrow="Weekly"
          title={weekly.set.title}
          href={`/practice/${weekly.set.topicSlug}?challenge=weekly`}
        />
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Study next
          </p>
          <p className="mt-2 font-semibold">{nextTitle ?? "Path complete"}</p>
          {nextHref ? (
            <Link href={nextHref} className="mt-3 inline-block text-sm font-medium underline">
              Open
            </Link>
          ) : null}
          <Link href="/leaderboard" className="mt-3 ml-3 inline-block text-sm text-muted-foreground underline">
            Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, hint }: { label: string; value: string; hint: string }) => (
  <li className="rounded-2xl border border-border bg-card p-4">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
  </li>
);

const ChallengeCard = ({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href: string;
}) => (
  <Link href={href} className="rounded-2xl border border-border bg-card p-4 hover:border-primary/40">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
    <p className="mt-2 font-semibold">{title}</p>
    <p className="mt-2 text-sm text-muted-foreground">Bonus XP on first win this period.</p>
  </Link>
);
