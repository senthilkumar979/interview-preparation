import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssSpacing: Topic = {
  slug: "css-spacing",
  title: "Spacing",
  technologySlug: "css",
  module: "CSS",
  order: 11,
  summary: "gap, stacks, logical space, and when to use margin vs padding vs gap.",
  prerequisites: ["css-margin", "css-padding"],
  related: ["css-flex", "css-grid"],
  levels: cssLevels,
  isHighYield: false,
  figures: [
    {
      src: "/diagrams/css/css-spacing.png",
      alt: "Padding inside a box, margin outside, and gap between flex items",
      caption: "Padding, margin, and gap",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Spacing between siblings in flex/grid/multi-column is `gap` (and `row-gap`/`column-gap`). Spacing inside a box is padding. Spacing outside a box in normal flow is margin. Don’t mix all three for the same job.",
    beats: [
      "`gap` does not collapse and does not add space after the last item. It is the default tool for stacks and navs.",
      "The owl selector `.stack > * + * { margin-top }` still works in flow layouts without flex.",
      "Logical: `margin-inline`, `padding-block`, `gap` is already two-axis (`row-gap` is block in horizontal-tb).",
    ],
  },
  codeExample: {
    language: "css",
    caption: "gap vs padding vs margin",
    code: `.nav {
  display: flex;
  gap: 0.75rem;
  padding-inline: 1rem;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
`,
  },
  workedExamples: [
    {
      id: "gap-wrap",
      title: "gap on wrap",
      about: "Both row and column gaps apply when items wrap.",
      language: "css",
      code: `.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
}
`,
    },
    {
      id: "owl",
      title: "Flow stack without flex",
      about: "When you cannot set display.",
      language: "css",
      code: `.prose > * + * { margin-block-start: 0.75em; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Spacing systems are design tokens (`--space-2`) applied as gap, padding, or margin—not magic numbers on every side.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`column-gap` in multi-column and grid. `margin-trim`. Space-between in flex is alignment, not gap (it distributes leftover). `letter-spacing` and `word-spacing` are typographic, not box spacing.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Double spacing (gap + margin on children) is a common visual bug. Consistent rhythm reads as seniority in UI work.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Gap is extra space in the alignment container between tracks/items. It does not wrap around the outside (unlike margin on items).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "8px/4px scales. Tailwind `gap-4`, `p-6`, `space-y-4`. Section padding vs inner stack gap.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Tokens. `gap` for sibling groups. Padding for inner inset. Margin for flow exceptions (pull quotes).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Margin on flex children plus `gap`. Using `&nbsp;` for layout. Inconsistent 13px paddings.",
    },
  ],
};
