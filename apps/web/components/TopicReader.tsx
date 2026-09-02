import Link from "next/link";
import { type Topic, type TopicSection } from "@prepquest/content";
import { TopicCodeExample } from "@/components/TopicCodeExample";
import { TopicConceptCard } from "@/components/TopicConceptCard";
import { TopicExamplesCards } from "@/components/TopicExamplesCards";
import { TopicFigureCard } from "@/components/TopicFigureCard";
import { TopicInfoCard } from "@/components/TopicInfoCard";

interface TopicReaderProps {
  topic: Topic;
}

function section(topic: Topic, key: string): TopicSection | undefined {
  return topic.sections.find((item) => item.key === key);
}

export const TopicReader = ({ topic }: TopicReaderProps) => {
  const concept = section(topic, "concept");
  const how = section(topic, "how-it-works");
  const usage = section(topic, "common-usage");
  const practices = section(topic, "best-practices");
  const mistakes = section(topic, "common-mistakes");
  const extraSections = topic.sections.filter(
    (item) =>
      ![
        "introduction",
        "why-it-matters",
        "concept",
        "how-it-works",
        "common-usage",
        "best-practices",
        "common-mistakes",
      ].includes(item.key),
  );

  return (
    <div className="grid gap-5">
      <TopicConceptCard interviewAnswer={topic.interviewAnswer} fallbackBody={concept?.body} />
      {topic.figures?.map((figure) => (
        <TopicFigureCard key={figure.src} figure={figure} />
      ))}
      {topic.codeExample ? <TopicCodeExample example={topic.codeExample} /> : null}
      {how ? <TopicInfoCard title="How it works" body={how.body} /> : null}
      {usage ? <TopicInfoCard title="Common usage" body={usage.body} /> : null}
      {extraSections.map((item) => (
        <TopicInfoCard key={item.key} title={item.title} body={item.body} />
      ))}
      {practices || mistakes ? (
        <div className="grid gap-5 md:grid-cols-2">
          {practices ? (
            <TopicInfoCard title="Best practices" body={practices.body} tone="practice" />
          ) : null}
          {mistakes ? (
            <TopicInfoCard title="Common mistakes" body={mistakes.body} tone="mistake" />
          ) : null}
        </div>
      ) : null}
      <TopicExamplesCards examples={topic.workedExamples ?? []} />
      <Link
        href="/practice"
        className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium"
      >
        Open frontend practice: Quiz, Bug Finder, Bad Practice Finder, Coding
      </Link>
    </div>
  );
};
