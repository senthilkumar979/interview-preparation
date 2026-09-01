import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssSyntax: Topic = {
  slug: "css-syntax",
  title: "CSS & its syntax",
  technologySlug: "css",
  module: "CSS",
  order: 1,
  summary: "Stylesheets, rules, declarations, at-rules, comments, and how CSS is applied.",
  prerequisites: [],
  related: ["css-cascade", "css-selectors"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "CSS is a declaration language: a stylesheet is a list of rules. A rule is a selector plus a declaration block of `property: value;` pairs. The cascade then picks a used value for each property on each element.",
    beats: [
      "Attach CSS with `link rel=\"stylesheet\"`, `<style>`, or (avoid) `style=\"\"`. `@import` is extra network and delayed.",
      "Syntax: selectors, `{}`, declarations, `!important`, at-rules (`@media`, `@layer`, `@supports`, `@font-face`, `@keyframes`).",
      "Invalid declarations are dropped; the rest of the rule still applies. Custom properties (`--token`) are valid identifiers.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "A rule, a custom property, and an at-rule",
    code: `:root {
  --primary: #edae49;
}

.badge {
  color: #1f2937;
  background: var(--primary);
}

@media (min-width: 40rem) {
  .badge { padding: 0.5rem 0.75rem; }
}
`,
  },
  workedExamples: [
    {
      id: "anatomy",
      title: "Rule anatomy",
      about: "Selector, declaration, property, value, and a dropped invalid line.",
      language: "css",
      code: `/* selector          declarations */
article.card h2 {
  font-size: 1.5rem; /* property: value */
  colour: red;       /* invalid — ignored */
  color: #1f2937;
}
`,
    },
    {
      id: "at-rules",
      title: "Common at-rules",
      about: "They are not selectors; they wrap or declare other constructs.",
      language: "css",
      code: `@charset "utf-8";
@import url("reset.css") layer(reset);
@layer base, components, utilities;
@supports (display: grid) {
  .layout { display: grid; }
}
`,
    },
    {
      id: "custom-props",
      title: "Custom properties are inherited",
      about: "`var(--x, fallback)` if the property is invalid at computed-value time.",
      language: "css",
      code: `:root { --gap: 1rem; }
.card { padding: var(--gap, 8px); }
.card--tight { --gap: 0.5rem; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "CSS describes presentation. Interviews start here: what a stylesheet is, what a browser does with a bad line, and why inline styles are a last resort.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "A stylesheet contains statements: rule sets and at-rules. A qualified rule has a prelude (selectors) and a `{}` block. Values can be lists (`margin: 1rem 2rem`), functions (`calc()`, `rgb()`, `url()`), or keywords (`inherit`, `initial`, `unset`, `revert`, `revert-layer`). Comments are `/* */` — there is no `//` in CSS files (except in some preprocessors).",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "One invalid property does not kill the whole rule—debugging “why didn’t color apply” is often a typo. Specificity and `!important` live in this syntax. `@layer` changes cascade without changing selectors.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Parse → specified values per cascade → computed → used → actual. Custom properties compute on the element and inherit. `var()` substitution happens at computed-value time.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Global tokens on `:root`. Component classes. `@media` for viewport. `@layer` in design systems. Tailwind and CSS modules still compile to this syntax.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "External stylesheets for cache and CSP. Design tokens as custom properties. Prefer classes over `#id` and inline styles. Keep `@import` out of hot paths.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Missing semicolon so the next declaration is eaten. `//` comments. `@import` after a regular rule (invalid). Assuming a failed `var()` falls back to the previous property instead of `unset`.",
    },
  ],
};
