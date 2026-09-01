import { getTopic, getTopicsByTechnology, type Topic } from "@prepquest/content";

export interface LearnContext {
  topic: Topic;
  index: number;
  total: number;
  previous: Topic | null;
  next: Topic | null;
  related: Topic[];
}

export function getLearnContext(slug: string): LearnContext | null {
  const topic = getTopic(slug);
  if (!topic) return null;

  const ordered = getTopicsByTechnology(topic.technologySlug);
  const index = ordered.findIndex((item) => item.slug === slug);
  const related = topic.related
    .map((relatedSlug) => getTopic(relatedSlug))
    .filter((item): item is Topic => Boolean(item));

  return {
    topic,
    index,
    total: ordered.length,
    previous: index > 0 ? (ordered[index - 1] ?? null) : null,
    next: index >= 0 && index < ordered.length - 1 ? (ordered[index + 1] ?? null) : null,
    related,
  };
}
