import type { CurriculumTopic } from "../types";

function soon(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: false };
}

export const reactTopics: CurriculumTopic[] = [
  soon("react-components", "Components", "Composition, children, and element types."),
  soon("react-hooks", "Hooks", "useState, useEffect, and the rules of hooks."),
  soon("react-state", "State management", "Local, lifted, context, and stores."),
  soon("react-rendering", "Rendering", "Reconciliation, keys, and concurrent features."),
  soon("react-performance", "Performance", "Memo, lists, and avoiding waterfalls."),
  soon("react-rsc", "Server Components", "Where work runs and what crosses the wire."),
  soon("react-architecture", "React architecture", "Boundaries, data, and feature folders."),
];

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

export const nextTopics: CurriculumTopic[] = [
  soon("next-app-router", "App Router", "Layouts, nested routes, and parallel slots."),
  soon("next-rsc", "Server Components", "Server-first UI and client islands."),
  soon("next-data", "Data fetching", "async components, cache, and revalidate."),
  soon("next-cache", "Caching", "Full route cache vs fetch cache."),
  soon("next-middleware", "Middleware & routing", "Auth gates and rewrites."),
  soon("next-metadata", "Metadata & SEO", "generateMetadata and streaming."),
  soon("next-deploy", "Deployment", "Edge, Node, and environment boundaries."),
];
