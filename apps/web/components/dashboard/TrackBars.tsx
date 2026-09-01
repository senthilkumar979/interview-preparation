import Link from "next/link";
import { TrackIcon } from "@/components/TrackIcon";
import type { TrackBar } from "@/lib/dashboardView";

interface TrackBarsProps {
  bars: TrackBar[];
}

export const TrackBars = ({ bars }: TrackBarsProps) => (
  <ul className="grid max-h-[22rem] gap-3 overflow-y-auto pr-1">
    {bars.map((bar) => (
      <li key={bar.slug}>
        <Link href={`/roadmap/${bar.slug}`} className="group grid gap-1.5">
          <div className="flex items-center gap-2">
            <TrackIcon slug={bar.slug} size="sm" />
            <p className="min-w-0 flex-1 truncate text-sm font-medium group-hover:text-foreground">
              {bar.title}
            </p>
            <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {bar.completed}/{bar.total}
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${bar.percent}%` }}
            />
          </div>
        </Link>
      </li>
    ))}
  </ul>
);
