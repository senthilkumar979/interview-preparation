import type { Topic, TopicCodeExample, TopicFigure, WorkedExample } from "../../types";
import { pwaLevels } from "./levels";

export interface PwaTopicDraft {
  slug: string;
  title: string;
  order: number;
  summary: string;
  prerequisites?: string[];
  related?: string[];
  isHighYield?: boolean;
  oneLiner: string;
  beats: string[];
  intro: string;
  why: string;
  concept: string;
  how: string;
  usage: string;
  practices: string;
  mistakes: string;
  extras?: { key: string; title: string; body: string }[];
  code: string;
  caption?: string;
  language?: TopicCodeExample["language"];
  examples: WorkedExample[];
  figures?: TopicFigure[];
}

export function pwaTopic(draft: PwaTopicDraft): Topic {
  return {
    slug: draft.slug,
    title: draft.title,
    technologySlug: "pwa",
    module: "PWA",
    order: draft.order,
    summary: draft.summary,
    prerequisites: draft.prerequisites ?? [],
    related: draft.related ?? [],
    levels: pwaLevels,
    isHighYield: draft.isHighYield ?? false,
    interviewAnswer: {
      oneLiner: draft.oneLiner,
      beats: draft.beats,
    },
    codeExample: {
      language: draft.language ?? "javascript",
      caption: draft.caption ?? draft.title,
      code: draft.code,
    },
    workedExamples: draft.examples,
    figures: draft.figures,
    sections: [
      { key: "introduction", title: "Introduction", body: draft.intro },
      { key: "concept", title: "Concept", body: draft.concept },
      { key: "why-it-matters", title: "Why it matters", body: draft.why },
      { key: "how-it-works", title: "How it works", body: draft.how },
      { key: "common-usage", title: "Common usage", body: draft.usage },
      ...(draft.extras ?? []),
      { key: "best-practices", title: "Best practices", body: draft.practices },
      { key: "common-mistakes", title: "Common mistakes", body: draft.mistakes },
    ],
  };
}
