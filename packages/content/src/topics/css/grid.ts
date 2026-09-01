import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssGrid: Topic = {
  slug: "css-grid",
  title: "Grid",
  technologySlug: "css",
  module: "CSS",
  order: 16,
  summary: "Two-dimensional tracks, areas, fr, minmax, and auto-fit.",
  prerequisites: ["css-layout", "css-units"],
  related: ["css-flex", "css-align"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-grid.png",
      alt: "CSS grid with numbered lines, gaps, and an item spanning two columns",
      caption: "Tracks, lines, and spanning",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Grid is two-dimensional: rows and columns at once. You define tracks (`grid-template-columns`) and place items (`grid-column`, areas). `fr` shares leftover space. `minmax(0, 1fr)` lets tracks shrink.",
    beats: [
      "`repeat(auto-fit, minmax(16rem, 1fr))` is the responsive card pattern. `auto-fill` keeps empty tracks.",
      "Areas: `grid-template-areas` + `grid-area`. Lines: `1 / -1` for full span.",
      "Subgrid (`grid-template-rows: subgrid`) aligns descendants to the parent tracks. `gap` is gutters.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Page shell and card catalog",
    code: `.page {
  display: grid;
  grid-template-columns: 1fr 18rem;
  grid-template-areas:
    "main aside"
    "main aside";
  gap: 2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
`,
  },
  workedExamples: [
    {
      id: "minmax",
      title: "minmax(0, 1fr) vs 1fr",
      about: "1fr is minmax(auto, 1fr)—content can blow the track.",
      language: "css",
      code: `.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
`,
    },
    {
      id: "areas",
      title: "Named areas",
      about: "ASCII layout in CSS.",
      language: "css",
      code: `.dash {
  display: grid;
  grid-template-areas:
    "nav nav"
    "list detail";
}
.nav { grid-area: nav; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Grid is for 2D alignment: dashboards, forms, full pages, overlapping magazine layouts.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Implicit vs explicit grid. `grid-auto-flow: dense`. `auto-rows`. Alignment `justify-items` / `align-items` per cell; `justify-content` for the whole grid when tracks are smaller than the container. Masonry is not standard everywhere.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Equal columns without hacks. Overlap with line-based placement. Interviews: `fr` vs `%` vs `auto-fit`.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Track sizing algorithm: intrinsic sizes, then `fr`. Items span cells. Absolutely positioned grid items can use grid lines as the containing block if the parent is the grid.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Holy grail. Card grids. Form `label`/`input` pairs. 12-column systems with `repeat(12, 1fr)` or subgrid.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`minmax(0, 1fr)` for equal columns with truncating children. `gap` not dummy columns. Prefer areas for named regions.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`width: 1fr`. Using grid for a single row of icons. Forgetting implicit rows stacking to infinity. `auto-fit` vs `auto-fill` mix-up.",
    },
  ],
};
