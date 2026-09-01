import Link from "next/link";
import { TrackIcon } from "@/components/TrackIcon";
import type { TrackBar } from "@/lib/dashboardView";

interface TrackSnapshotProps {
  bars: TrackBar[];
}

export const TrackSnapshot = ({ bars }: TrackSnapshotProps) => {
  const focus = [...bars]
    .filter((bar) => bar.total > 0 && bar.percent < 100)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 6);

  const cards = focus.length > 0 ? focus : bars.slice(0, 6);

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((bar) => (
        <li key={bar.slug}>
          <Link
            href={`/roadmap/${bar.slug}`}
            className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40"
          >
            <div className="flex items-center gap-3">
              <TrackIcon slug={bar.slug} />
              <div className="min-w-0">
                <p className="truncate font-semibold">{bar.title}</p>
                <p className="text-xs text-muted-foreground">
                  {bar.completed} of {bar.total} complete
                </p>
              </div>
            </div>
            <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${bar.percent}%` }} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
