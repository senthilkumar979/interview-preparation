import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssZIndex: Topic = {
  slug: "css-z-index",
  title: "z-index",
  technologySlug: "css",
  module: "CSS",
  order: 14,
  summary: "Stacking contexts, integer layers, and why 9999 is a smell.",
  prerequisites: ["css-position"],
  related: ["css-opacity", "css-shadows"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-stacking.png",
      alt: "A stacking context trapping a high z-index tooltip under a sibling",
      caption: "z-index only compares inside a stacking context",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "`z-index` paints positioned (and flex/grid) boxes along the z-axis inside a stacking context. A child cannot paint above a sibling of its ancestor’s context no matter how large the number.",
    beats: [
      "New stacking context: `position` + `z-index` not auto; `opacity < 1`; `transform`; `filter`; `isolation: isolate`; `mix-blend-mode`; some `will-change`; `display: flex/grid` children with z-index.",
      "Without a context, later DOM siblings paint on top of earlier ones (with positioned vs in-flow rules).",
      "Use a small scale (dropdown 10, modal 20, toast 30)—not 99999.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Isolate a component, then layer inside it",
    code: `.header {
  isolation: isolate;
  z-index: 10;
}

.header__dropdown {
  position: absolute;
  z-index: 1;
}
`,
  },
  workedExamples: [
    {
      id: "trap",
      title: "The 9999 that still loses",
      about: "Parent opacity or transform already created a context.",
      language: "css",
      code: `.card { opacity: 0.99; }
.card .tooltip {
  position: absolute;
  z-index: 9999; /* still under the next .card sibling */
}
`,
    },
    {
      id: "flex",
      title: "Flex items and z-index",
      about: "You can layer flex children without position in modern CSS.",
      language: "css",
      code: `.row { display: flex; }
.row > .fab { z-index: 1; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Stacking is a tree of contexts, not a global integer namespace.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Painting order: background/border of the context, negative z-index children, in-flow blocks, floats, in-flow inline, z-index auto positioned, then positive z-index. `isolation: isolate` is the clean way to start a context.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Modals under nav, tooltips clipped, “why is this under the overlay”. Senior answers name stacking contexts.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Compare z-index only among siblings in the same context. Descend into each child context as a unit.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Sticky headers. Popovers. Dialogs. Dragged cards.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Tokenized z-index scale. Isolate overlays at the app root (portal). Avoid opacity on ancestors of popovers.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Arms race of 9999. `z-index` on `static` boxes (ignored). Transform on a parent trapping the dropdown.",
    },
  ],
};
