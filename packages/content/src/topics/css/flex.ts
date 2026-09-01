import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssFlex: Topic = {
  slug: "css-flex",
  title: "Flex",
  technologySlug: "css",
  module: "CSS",
  order: 15,
  summary: "One-dimensional layout: direction, wrap, grow, shrink, basis, and alignment.",
  prerequisites: ["css-layout", "css-spacing"],
  related: ["css-grid", "css-align"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-flex-axes.png",
      alt: "Flex row with main axis along the row and cross axis perpendicular",
      caption: "Main axis and cross axis",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Flexbox lays out children in a row or column. The main axis is `flex-direction`; wrapping is `flex-wrap`. `flex` is `grow shrink basis`. Alignment uses `justify-content` (main) and `align-items` (cross).",
    beats: [
      "`flex: 1` ≈ `1 1 0%` in many browsers’ used values for `flex: 1 1 0`. `flex: auto` is `1 1 auto`. `flex: none` is `0 0 auto`.",
      "Default `min-width: auto` prevents shrinking below content—use `min-width: 0` on children that must shrink.",
      "`gap` is the sibling gutter. `margin: auto` on an item absorbs extra space on that side.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Toolbar: cluster + pushed action",
    code: `.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toolbar__end {
  margin-inline-start: auto;
}
`,
  },
  workedExamples: [
    {
      id: "shrink",
      title: "Why text won’t shrink in a flex row",
      about: "The interview min-width: auto bug.",
      language: "css",
      code: `.row { display: flex; }
.title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`,
    },
    {
      id: "wrap",
      title: "Wrap + grow",
      about: "Cards that share a row then wrap.",
      language: "css",
      code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.cards > * {
  flex: 1 1 16rem;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Flex is for distribution along one axis: nav, form rows, split buttons, vertical stacks.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`flex-flow` shorthand. `align-self` overrides `align-items`. `order` changes paint/layout order (a11y: don’t use instead of DOM order for meaning). `flex-basis` vs `width`: basis is the starting size before grow/shrink.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Most UI chrome is flex. Grid for the page; flex for the component.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Hypothetical main size from basis → leftover space to grow → deficit to shrink (weighted by shrink * base). Wrap creates multiple flex lines; `align-content` packs lines.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Headers. Button groups. Input + button. Equal-height cards in a row (`align-items: stretch`, the default).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`gap` over margins. `min-width: 0` on flex children with truncation. Don’t use `order` to reshuffle focus order.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Using flex for a 12-cell page. Forgetting wrap. `justify-content: space-between` with one item. `flex: 1` on an image without min-size 0.",
    },
  ],
};
