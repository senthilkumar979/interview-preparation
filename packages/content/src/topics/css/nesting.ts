import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssNesting: Topic = {
  slug: "css-nesting",
  title: "Nesting",
  technologySlug: "css",
  module: "CSS",
  order: 4,
  summary: "Native CSS nesting, &, relative selectors, and nested at-rules.",
  prerequisites: ["css-selectors"],
  related: ["css-cascade", "css-pseudo-classes", "sass-nesting"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "Native CSS nesting lets you write inner rules inside a parent’s `{}`. The nested selector is relative to the parent. `&` concatenates to the parent; without `&` you get a descendant combinator in current nesting rules.",
    beats: [
      "`.card { h2 { } }` ≈ `.card h2`. `.card { &:hover { } }` ≈ `.card:hover`. `.card { &.featured { } }` ≈ `.card.featured`.",
      "You can nest `@media` / `@supports` / `@layer` inside a rule. The parent selector is implied.",
      "Don’t confuse Sass `&__element` BEM concatenation with CSS `&` (no string interpolation). Invalid nesting used to require a leading `&` in older drafts.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Parent, compound, and nested media",
    code: `.card {
  padding: 1rem;

  h2 {
    margin: 0;
  }

  &:hover {
    border-color: #edae49;
  }

  @media (min-width: 40rem) {
    padding: 1.5rem;
  }
}
`,
  },
  workedExamples: [
    {
      id: "ampersand",
      title: "& is the parent",
      about: "Compound vs descendant depends on whether you put a combinator.",
      language: "css",
      code: `.btn {
  &.primary { background: #edae49; } /* .btn.primary */
  & .icon { width: 1rem; }           /* .btn .icon */
  :is(&) { }                         /* same as parent */
}
`,
    },
    {
      id: "at-nest",
      title: "Nested at-rules",
      about: "Keeps breakpoints next to the component.",
      language: "css",
      code: `nav {
  display: flex;
  @media (max-width: 40rem) {
    flex-direction: column;
  }
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Nesting is now in browsers as CSS, not only Sass. Same cascade as if you had written the flattened selector.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Nested declarations after nested rules: modern CSS allows mixed order with `& {}` wrapping. Specificity is the flattened selector’s specificity. `:is()` wrapping can change how lists combine.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Colocation reduces selector duplication. Over-nesting recreates the `html body div` specificity problem.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The engine desugars nesting to flat selectors. `&` is replaced by the parent selector list (with `:is()` if the parent is a list).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Component files. Hover/focus next to the base. Nested `@media`. Tailwind `@apply` is not nesting.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Two or three levels max. Use `&` explicitly for pseudo-classes. Prefer a class on the child over `.card .card .card`.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Expecting Sass interpolation (`&__item`). Nesting that accidentally matches too much. Forgetting that nested `.foo &` can reverse the subject.",
    },
  ],
};
