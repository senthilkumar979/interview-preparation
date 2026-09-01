import { architectureCurriculumTopics } from "../topics/architecture";
import { bestPracticeCurriculumTopics } from "../topics/best-practices";
import { errorHandlingCurriculumTopics } from "../topics/error-handling";
import { performanceCurriculumTopics } from "../topics/performance";
import { securityCurriculumTopics } from "../topics/security";
import { testingCurriculumTopics } from "../topics/testing";
import type { CurriculumTopic } from "../types";

function live(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: true };
}

export const architectureTopics: CurriculumTopic[] = architectureCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const bestPracticeTopics: CurriculumTopic[] = bestPracticeCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const testingTopics: CurriculumTopic[] = testingCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const performanceTopics: CurriculumTopic[] = performanceCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const securityTopics: CurriculumTopic[] = securityCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const errorHandlingTopics: CurriculumTopic[] = errorHandlingCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);
