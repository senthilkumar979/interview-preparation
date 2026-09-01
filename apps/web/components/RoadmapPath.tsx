import { RoadmapTrack } from "@/components/RoadmapTrack";
import type { TrackView } from "@/lib/roadmapView";

interface RoadmapPathProps {
  tracks: TrackView[];
}

export const RoadmapPath = ({ tracks }: RoadmapPathProps) => (
  <div className="mt-8 grid gap-5">
    {tracks.map((track) => (
      <RoadmapTrack key={track.slug} track={track} />
    ))}
  </div>
);
