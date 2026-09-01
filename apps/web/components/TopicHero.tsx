import Link from "next/link";
import { Star } from "lucide-react";
import { experienceLevels, type ExperienceLevel, type Topic } from "@prepquest/content";
import { TopicProse } from "@/components/TopicProse";

interface TopicHeroProps {
  topic: Topic;
  isCompleted: boolean;
  userLevel: ExperienceLevel | null;
  trackSlug: string | null;
  trackTitle: string;
}

export const TopicHero = ({ topic, isCompleted, userLevel, trackSlug, trackTitle }: TopicHeroProps) => {
  const introduction = topic.sections.find((item) => item.key === "introduction");
  const why = topic.sections.find((item) => item.key === "why-it-matters");
  const selectedLevel = experienceLevels.find((level) => level.slug === userLevel);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="text-xs font-bold text-muted-foreground">
          <Link href="/roadmap" className="hover:text-foreground">
            Roadmap
          </Link>
          <span className="mx-2">/</span>
          {trackSlug ? (
            <Link href={`/roadmap/${trackSlug}`} className="hover:text-foreground">
              {trackTitle}
            </Link>
          ) : (
            <span>{trackTitle}</span>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{topic.title}</span>
        </nav>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {isCompleted ? "Completed" : "In progress"}
        </span>
      </div>

      <header className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-1.5 bg-primary" />
        <div className="grid gap-5 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <h1 className="min-w-0 text-4xl font-semibold tracking-tight text-primary-dark md:text-5xl">
              {topic.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:shrink-0 md:justify-end">
              {selectedLevel ? (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold">
                  {selectedLevel.name}
                </span>
              ) : null}
              {topic.isHighYield ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  <Star className="size-3.5 fill-current" />
                  High-yield
                </span>
              ) : null}
            </div>
          </div>
          {introduction ? (
            <TopicProse className="max-w-3xl text-lg leading-8" text={introduction.body} />
          ) : null}
          {why ? (
            <TopicProse className="max-w-3xl text-sm text-muted-foreground" text={why.body} />
          ) : null}
        </div>
      </header>
    </div>
  );
};
