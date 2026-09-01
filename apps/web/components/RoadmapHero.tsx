import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RoadmapHeroProps {
  role: string;
  tech: string;
  level: string;
  percent: number;
  completedCount: number;
  readyCount: number;
  continueHref: string | null;
}

export const RoadmapHero = ({
  role,
  tech,
  level,
  percent,
  completedCount,
  readyCount,
  continueHref,
}: RoadmapHeroProps) => (
  <section className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
      <div className="grid gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Interview path
        </p>
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          Your frontend roadmap
        </h1>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground">
          HTML through architecture, with {tech} as your framework track. Open a track to see every
          subtopic and jump without returning here.
        </p>
        <div className="flex flex-wrap gap-2">
          <MetaChip>{role}</MetaChip>
          <MetaChip>{tech}</MetaChip>
          <MetaChip>{level}</MetaChip>
        </div>
      </div>
      <div className="grid min-w-[220px] gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Completion
          </span>
          <span className="text-3xl font-semibold tabular-nums">{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {readyCount} live topics complete
        </p>
        {continueHref ? (
          <Button asChild size="lg" className="mt-1 w-full">
            <Link href={continueHref}>Continue learning</Link>
          </Button>
        ) : (
          <p className="text-sm font-bold">Path complete. Review or wait for new modules.</p>
        )}
      </div>
    </div>
  </section>
);

const MetaChip = ({ children }: { children: string }) => (
  <span className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-bold">
    {children}
  </span>
);
