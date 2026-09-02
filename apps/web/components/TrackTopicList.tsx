"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, Lock, Star } from "lucide-react";
import type { ExperienceLevel } from "@prepquest/content";
import { Button } from "@/components/ui/button";
import type { TrackTopicView } from "@/lib/roadmapView";

type DifficultyFilter = "all" | ExperienceLevel;

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "junior", label: "Junior" },
  { value: "medior", label: "Medior" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
];

interface TrackTopicListProps {
  topics: TrackTopicView[];
}

export const TrackTopicList = ({ topics }: TrackTopicListProps) => {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [highYieldOnly, setHighYieldOnly] = useState(false);

  const visible = useMemo(
    () =>
      topics.filter((topic) => {
        const matchesDifficulty =
          difficulty === "all" || topic.levels.includes(difficulty);
        const matchesYield = !highYieldOnly || topic.isHighYield;
        return matchesDifficulty && matchesYield;
      }),
    [difficulty, highYieldOnly, topics],
  );

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {difficultyOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={difficulty === option.value ? "default" : "outline"}
              onClick={() => setDifficulty(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant={highYieldOnly ? "default" : "outline"}
          onClick={() => setHighYieldOnly((value) => !value)}
        >
          <Star className={highYieldOnly ? "fill-current" : ""} />
          Show only High Yield questions
        </Button>
      </div>
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          No subtopics match these filters.
        </p>
      ) : (
        <ol className="grid gap-3">
          {visible.map((topic, index) => (
            <li key={topic.slug}>
              <TopicRow topic={topic} index={index} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

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
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-bold leading-6 text-primary-dark">{topic.title}</p>
          {topic.isHighYield ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              <Star className="size-3 fill-current" />
              High yield
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{topic.summary}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {stateLabel(topic.state)}
          {topic.levels.length > 0 ? ` · ${topic.levels.map(levelLabel).join(" / ")}` : ""}
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

function levelLabel(level: ExperienceLevel): string {
  if (level === "junior") return "Junior";
  if (level === "medior") return "Medior";
  if (level === "senior") return "Senior";
  return "Expert";
}

const TopicStateIcon = ({ state }: { state: TrackTopicView["state"] }) => {
  const className = "mt-0.5 size-4 shrink-0";
  if (state === "completed") return <Check className={`${className} text-primary`} />;
  if (state === "current") return <ArrowRight className={`${className} text-primary`} />;
  if (state === "soon") return <Lock className={`${className} text-muted-foreground`} />;
  return <Circle className={`${className} text-muted-foreground`} />;
};
