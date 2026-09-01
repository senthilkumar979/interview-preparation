import type { CurriculumTopic } from "../types";

function soon(slug: string, title: string, summary: string): CurriculumTopic {
  return { slug, title, summary, isContentReady: false };
}

export const architectureTopics: CurriculumTopic[] = [
  soon("arch-boundaries", "Module boundaries", "Features vs layers and public APIs."),
  soon("arch-state", "State & data flow", "Client cache, server state, and events."),
  soon("arch-rendering", "Rendering strategy", "CSR, SSR, SSG, and islands."),
  soon("arch-api", "API strategy", "BFF, REST, GraphQL, and contracts."),
  soon("arch-auth", "Authn & authz", "Sessions, tokens, and UI gating."),
  soon("arch-observability", "Observability", "Logging, metrics, and frontend errors."),
];

export const bestPracticeTopics: CurriculumTopic[] = [
  soon("bp-quality", "Code quality", "Readability, coupling, and review habits."),
  soon("bp-errors", "Error handling", "Boundaries, retries, and user-facing failure."),
  soon("bp-a11y", "Accessibility practice", "Keyboard, names, and contrast as defaults."),
  soon("bp-security", "Frontend security", "XSS, CSRF, and supply chain basics."),
  soon("bp-testing", "Testing strategy", "What to unit, integrate, and skip."),
];

export const testingTopics: CurriculumTopic[] = [
  soon("test-unit", "Unit testing", "Pure logic and component contracts."),
  soon("test-component", "Component testing", "User-centric queries and events."),
  soon("test-e2e", "E2E testing", "Critical journeys only."),
  soon("test-msw", "API mocking", "Network as a seam."),
];

export const performanceTopics: CurriculumTopic[] = [
  soon("perf-cwv", "Core Web Vitals", "LCP, INP, CLS and how to debug them."),
  soon("perf-load", "Loading performance", "Code split, images, and fonts."),
  soon("perf-runtime", "Runtime performance", "Long tasks and hydration."),
  soon("perf-measure", "Measurement", "Profilers, RUM, and budgets."),
];

export const securityTopics: CurriculumTopic[] = [
  soon("sec-xss", "XSS", "Sinks, sanitization, and CSP."),
  soon("sec-auth", "Auth attacks", "Token storage and session fixation."),
  soon("sec-deps", "Dependencies", "Lockfiles and supply chain."),
  soon("sec-privacy", "Privacy", "Cookies, tracking, and PII in the client."),
];
