import { nextCurriculumTopics } from "../topics/next";
import { reactCurriculumTopics } from "../topics/react";
import type { CurriculumTopic } from "../types";

function soon(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: false };
}

function live(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: true };
}

export const reactTopics: CurriculumTopic[] = reactCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);

export const angularTopics: CurriculumTopic[] = [
  soon("angular-components", "Components & templates", "Inputs, outputs, and view encapsulation."),
  soon("angular-di", "Dependency injection", "Providers, tokens, and scopes."),
  soon("angular-rxjs", "RxJS", "Streams, operators, and teardown."),
  soon("angular-cd", "Change detection", "Default vs OnPush and signals."),
  soon("angular-routing", "Routing", "Guards, resolvers, and lazy modules."),
  soon("angular-signals", "Signals", "Fine-grained reactivity in modern Angular."),
];

export const vueTopics: CurriculumTopic[] = [
  soon("vue-reactivity", "Reactivity & templates", "ref, reactive, and the compiler."),
  soon("vue-composition", "Composition API", "Reusable logic without mixins."),
  soon("vue-state", "State with Pinia", "Stores, getters, and SSR caveats."),
  soon("vue-routing", "Vue Router", "Guards, layouts, and data loading."),
  soon("vue-ssr", "SSR & Nuxt", "Universal Vue rendering."),
];

export const nextTopics: CurriculumTopic[] = nextCurriculumTopics.map((topic) =>
  live(topic.slug, topic.title, topic.summary),
);
