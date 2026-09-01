import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TrackIcon } from "@/components/TrackIcon";
import type { TrackView } from "@/lib/roadmapView";

interface RoadmapTrackProps {
  track: TrackView;
}

export const RoadmapTrack = ({ track }: RoadmapTrackProps) => (
  <Link
    href={`/roadmap/${track.slug}`}
    className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50 md:p-6"
  >
    <div className="flex min-w-0 items-start gap-4">
      <TrackIcon slug={track.slug} />
      <div className="grid min-w-0 gap-1">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {String(track.index + 1).padStart(2, "0")}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-primary-dark">{track.title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{track.description}</p>
        <p className="pt-1 text-xs font-bold text-muted-foreground">
          {track.completedCount}/{track.topicCount} topics · open track
        </p>
      </div>
    </div>
    <ChevronRight className="mt-2 size-5 shrink-0 text-muted-foreground" />
  </Link>
);
