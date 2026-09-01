import { cssCurriculumTopics } from "../topics/css";
import { htmlCurriculumTopics } from "../topics/html";
import { javascriptCurriculumTopics } from "../topics/javascript";
import { pwaCurriculumTopics } from "../topics/pwa";
import { sassCurriculumTopics } from "../topics/sass";
import { typescriptCurriculumTopics } from "../topics/typescript";
import { ecmascriptCurriculumTopics } from "../topics/ecmascript";
import { webCurriculumTopics } from "../topics/web";
import type { CurriculumTopic } from "../types";

function live(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: true };
}

export const webTopics: CurriculumTopic[] = webCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const htmlTopics: CurriculumTopic[] = htmlCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const cssTopics: CurriculumTopic[] = cssCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const sassTopics: CurriculumTopic[] = sassCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const javascriptTopics: CurriculumTopic[] = javascriptCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const pwaTopics: CurriculumTopic[] = pwaCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const typescriptTopics: CurriculumTopic[] = typescriptCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const ecmascriptTopics: CurriculumTopic[] = ecmascriptCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);
