import Link from "next/link";

interface Crumb {
  href: string;
  label: string;
}

interface Stat {
  label: string;
  value: string;
}

interface FinderSessionHeroProps {
  crumbs: Crumb[];
  current: string;
  kicker: string;
  title: string;
  summary: string;
  stats: Stat[];
  steps: string[];
}

export const FinderSessionHero = ({
  crumbs,
  current,
  kicker,
  title,
  summary,
  stats,
  steps,
}: FinderSessionHeroProps) => (
  <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-10 -top-20 size-56 rounded-full bg-primary/20 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
    />
    <div className="relative grid gap-6 p-6 md:p-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {crumbs.map((crumb, index) => (
          <span key={crumb.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            <Link href={crumb.href} className="hover:text-foreground">
              {crumb.label}
            </Link>
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span aria-hidden>/</span>
          <span className="text-foreground">{current}</span>
        </span>
      </nav>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{kicker}</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{summary}</p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="min-w-[6.5rem] rounded-xl border border-border bg-background/80 px-4 py-3"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">{stat.value}</p>
            </li>
          ))}
        </ul>
      </div>
      <ol className="grid gap-2 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex gap-3 rounded-xl border border-border/80 bg-muted/40 px-3 py-3 text-sm leading-5"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/25 text-[11px] font-bold">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  </section>
);
