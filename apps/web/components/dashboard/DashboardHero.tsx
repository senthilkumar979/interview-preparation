import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardTopic } from "@/lib/dashboardView";

interface DashboardHeroProps {
  greeting: string;
  displayName: string;
  role: string;
  tech: string;
  level: string;
  percent: number;
  nextTopic: DashboardTopic | null;
}

export const DashboardHero = ({
  greeting,
  displayName,
  role,
  tech,
  level,
  percent,
  nextTopic,
}: DashboardHeroProps) => (
  <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/20 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
    />
    <div className="relative grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
      <div className="grid gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {greeting}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{displayName}</h1>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground">
          {role} path with {tech} · {level}. Pick up where you left off, or open a track that is
          still behind.
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip>{role}</Chip>
          <Chip>{tech}</Chip>
          <Chip>{level}</Chip>
        </div>
      </div>
      <div className="grid min-w-[240px] gap-3">
        {nextTopic ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Continue · {nextTopic.trackTitle}
            </p>
            <p className="text-lg font-semibold leading-snug">{nextTopic.title}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{nextTopic.summary}</p>
            <Button asChild size="lg" className="mt-1 w-full">
              <Link href={nextTopic.href}>
                Resume
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </>
        ) : (
          <p className="text-sm font-semibold">Path complete. Review tracks or wait for new modules.</p>
        )}
        <p className="text-xs text-muted-foreground">Overall completion {percent}%</p>
      </div>
    </div>
  </section>
);

const Chip = ({ children }: { children: string }) => (
  <span className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-bold">
    {children}
  </span>
);
