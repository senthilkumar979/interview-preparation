import {
  BookOpenCheck,
  CircleDot,
  Flame,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

interface StatGridProps {
  completed: number;
  remaining: number;
  inProgress: number;
  tracksComplete: number;
  tracksTotal: number;
  highYieldDone: number;
  highYieldTotal: number;
}

export const StatGrid = ({
  completed,
  remaining,
  inProgress,
  tracksComplete,
  tracksTotal,
  highYieldDone,
  highYieldTotal,
}: StatGridProps) => {
  const stats: StatItem[] = [
    {
      label: "Completed",
      value: String(completed),
      hint: "Live topics finished",
      icon: BookOpenCheck,
    },
    {
      label: "Remaining",
      value: String(remaining),
      hint: "Still on the path",
      icon: CircleDot,
    },
    {
      label: "In progress",
      value: String(inProgress),
      hint: "Opened, not marked done",
      icon: Flame,
    },
    {
      label: "Tracks done",
      value: `${tracksComplete}/${tracksTotal}`,
      hint: `${highYieldDone}/${highYieldTotal} high-yield`,
      icon: Layers,
    },
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </p>
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <stat.icon className="size-4" strokeWidth={2} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
        </li>
      ))}
    </ul>
  );
};
