import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssAlign: Topic = {
  slug: "css-align",
  title: "Align",
  technologySlug: "css",
  module: "CSS",
  order: 17,
  summary: "text-align, vertical-align, and Box Alignment (justify/align/place).",
  prerequisites: ["css-flex", "css-grid"],
  related: ["css-text", "css-margin"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-align.png",
      alt: "Flex alignment with justify-content on the main axis and align-items on the cross axis",
      caption: "justify vs align",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Alignment is context-specific. In flow, `text-align` and `vertical-align` apply. In flex/grid, the Box Alignment spec: `justify-*` on the main/inline axis, `align-*` on the cross/block axis, shorthands `place-*`.",
    beats: [
      "`justify-content` distributes extra space on the container. `justify-items` (grid) sets default `justify-self` for items.",
      "`align-items: center` is the usual flex vertical center in a row. `align-content` only matters when there is extra space in the cross axis (wrapped flex / grid).",
      "`vertical-align` on `inline`/`table-cell` does not center a block in a div—use flex/grid.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Centering recipes",
    code: `.hero {
  display: grid;
  place-items: center;
  min-height: 100dvh;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`,
  },
  workedExamples: [
    {
      id: "place",
      title: "place-items vs place-content",
      about: "items = per cell; content = the whole grid as a pack.",
      language: "css",
      code: `.grid {
  display: grid;
  height: 20rem;
  place-items: center;    /* each item centered in its area */
  place-content: center;  /* tracks centered in the container */
}
`,
    },
    {
      id: "text-align",
      title: "text-align on the parent",
      about: "It aligns inline content, not block children (unless they are inline-level).",
      language: "css",
      code: `.caption { text-align: center; }
.caption img { display: inline-block; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "“How do I center a div?” is this topic. The answer depends on the formatting context.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Keywords: `start` `end` `center` `stretch` `baseline` `space-between` `space-around` `space-evenly` `safe`/`unsafe`. Logical `justify-content: start` follows writing mode. `margin: auto` in flex/grid absorbs space.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Misusing `vertical-align` is a junior tell. `space-between` with leftover items looks uneven—`gap` + `start` is often better.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Alignment runs after track/flex sizing. `stretch` is the default for grid items and flex `align-items`. Absolutely positioned boxes use a different inset alignment.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Icon + label (`inline-flex` + `align-items: center`). Footer split. Grid form labels `align-items: start`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Prefer `start`/`end` over `left`/`right`. Use `place-items: center` for the hero. Baseline-align text rows with mixed font sizes.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`vertical-align: middle` on a block. `align-content` on a single-line flex (no effect). `text-align` to center a `div` with `display: block; width: 100%`.",
    },
  ],
};
