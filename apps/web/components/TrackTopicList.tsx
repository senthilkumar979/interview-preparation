import Link from "next/link";
import { ArrowRight, Check, Circle, Lock } from "lucide-react";
import type { TrackTopicView } from "@/lib/roadmapView";

interface TrackTopicListProps {
  topics: TrackTopicView[];
}

export const TrackTopicList = ({ topics }: TrackTopicListProps) => (
  <ol className="grid gap-3">
    {topics.map((topic, index) => (
      <li key={topic.slug}>
        <TopicRow topic={topic} index={index} />
      </li>
    ))}
  </ol>
);

const TopicRow = ({ topic, index }: { topic: TrackTopicView; index: number }) => {
  const inner = (
    <div
      className={`flex gap-4 rounded-2xl border px-4 py-4 md:px-5 ${
        topic.state === "current" ? "border-primary bg-primary/10" : "border-border bg-card"
      } ${topic.state === "soon" ? "opacity-70" : ""}`}
    >
      <span className="w-8 shrink-0 text-sm font-bold tabular-nums text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <TopicStateIcon state={topic.state} />
      <div className="grid min-w-0 flex-1 gap-1">
        <p className="font-bold leading-6 text-primary-dark">{topic.title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{topic.summary}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {stateLabel(topic.state)}
        </p>
      </div>
    </div>
  );

  if (!topic.href) return inner;
  return (
    <Link href={topic.href} className="block">
      {inner}
    </Link>
  );
};

function stateLabel(state: TrackTopicView["state"]): string {
  if (state === "completed") return "Completed";
  if (state === "current") return "Continue here";
  if (state === "soon") return "Coming soon";
  return "Ready";
}

const TopicStateIcon = ({ state }: { state: TrackTopicView["state"] }) => {
  const className = "mt-0.5 size-4 shrink-0";
  if (state === "completed") return <Check className={`${className} text-primary`} />;
  if (state === "current") return <ArrowRight className={`${className} text-primary`} />;
  if (state === "soon") return <Lock className={`${className} text-muted-foreground`} />;
  return <Circle className={`${className} text-muted-foreground`} />;
};
