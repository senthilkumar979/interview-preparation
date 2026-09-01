import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssCascade: Topic = {
  slug: "css-cascade",
  title: "The cascade",
  technologySlug: "css",
  module: "CSS",
  order: 2,
  summary: "Origin, layers, specificity, order, inheritance, and !important.",
  prerequisites: ["css-syntax"],
  related: ["css-selectors", "css-focus"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-cascade.png",
      alt: "Cascade order from origins and layers through specificity and source order",
      caption: "How the cascade picks a winner",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "The cascade is the algorithm that picks one declared value per property. It compares origin and importance, then `@layer`, then specificity, then source order. Inheritance is a different step: it fills in properties that were not specified.",
    beats: [
      "Origins: user-agent → user → author. `!important` reverses author vs user for that declaration. Transitions and animations win later.",
      "Specificity: inline style (1,0,0,0) > ID (0,1,0,0) > class/attr/pseudo-class (0,0,1,0) > type/pseudo-element (0,0,0,1). `:is()` / `:where()` / `:not()` have special counting. `:where()` is zero.",
      "`@layer` lets a later file lose to an earlier layer. `revert` goes back an origin; `revert-layer` to the previous layer.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Specificity vs layers vs important",
    code: `@layer base, components;

@layer base {
  button { padding: 0.5rem; }
}

@layer components {
  .btn { padding: 0.75rem; }
}

#app .btn { padding: 1rem; } /* unlayered author styles beat layers */
.btn { padding: 2rem !important; }
`,
  },
  workedExamples: [
    {
      id: "specificity",
      title: "Count specificity out loud",
      about: "Interviews want the tuple, not “the more specific one”.",
      language: "css",
      code: `/* (0, 0, 0, 1) */
button {}
/* (0, 0, 1, 1) */
button.primary {}
/* (0, 1, 0, 0) */
#submit {}
/* (0, 0, 0, 0) — :where does not add */
:where(button.primary) {}
`,
    },
    {
      id: "inherit",
      title: "inherit vs initial vs unset vs revert",
      about: "Keywords that look interchangeable and are not.",
      language: "css",
      code: `.reset {
  color: inherit;   /* parent’s computed color */
  display: initial; /* spec initial: inline for display */
  font-size: unset; /* inheritable → inherit; else initial */
  padding: revert;  /* back to user-agent / previous origin */
}
`,
    },
    {
      id: "important",
      title: "!important is an origin bump",
      about: "It does not beat a more important origin. Utilities abuse it.",
      language: "css",
      code: `p { color: navy !important; }
p { color: crimson; } /* still navy — important vs normal */
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "If two rules target the same element, the cascade decides. This is the CSS interview.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "After cascade, inherited properties (color, font, line-height, …) copy from the parent if still unspecified. Non-inherited (margin, border, display) use initial. Shadow DOM has its own encapsulation; `::part` and custom properties can cross. Presentation attributes in SVG sit with author origin at specificity 0.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Framework CSS fights you until you understand layers and specificity. `!important` in a component becomes un-overridable. Inheritance explains why `color` on `body` tints buttons’ text but not their padding.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "For each property: collect declared values → sort by origin/importance → layer → specificity → order. Then compute (relative units, `currentColor`). Then layout uses used values (`auto` widths resolve).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "`@layer reset, tokens, components, utilities`. Tailwind preflight vs utilities. `:where()` in resets to keep specificity flat.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Keep specificity low. Prefer layers over `!important`. Use `:where()` for resets. Don’t fight inline styles from JS with classes unless you control both.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "IDs in CSS. Counting `div div div` as “more specific” than a class (it is not). Thinking `!important` always wins over inline. Forgetting inheritance vs cascade.",
    },
  ],
};
