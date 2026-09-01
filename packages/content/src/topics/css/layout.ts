import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssLayout: Topic = {
  slug: "css-layout",
  title: "Layout",
  technologySlug: "css",
  module: "CSS",
  order: 12,
  summary: "display, flow, formatting contexts, and choosing a layout mode.",
  prerequisites: ["css-box-model"],
  related: ["css-flex", "css-grid", "css-position"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-block-inline.png",
      alt: "Block boxes stacking full width versus inline boxes in a line of text",
      caption: "Block vs inline in normal flow",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "`display` picks the layout mode: `block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `contents`, table values, `flow-root`. Inside, children follow that mode. Outer and inner display can be split (`display: inline flex`).",
    beats: [
      "Normal flow: blocks stack, inlines pack into line boxes. `inline-block` is a block box in a line.",
      "`none` removes from tree (no a11y if not careful—prefer `hidden` HTML for hide). `contents` makes children appear to skip the box (a11y bugs historically).",
      "Choose: flow for documents, flex for 1D, grid for 2D, position for overlays, floats only for text wrapping around images.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Inner vs outer display",
    code: `.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.page {
  display: grid;
  grid-template-columns: 1fr 17.5rem;
}
`,
  },
  workedExamples: [
    {
      id: "flow-root",
      title: "flow-root vs overflow hidden",
      about: "New BFC without clipping.",
      language: "css",
      code: `.card { display: flow-root; }
.legacy { overflow: hidden; } /* BFC side effect people used for floats */
`,
    },
    {
      id: "none-contents",
      title: "none vs contents",
      about: "none: no box. contents: phantom wrapper.",
      language: "css",
      code: `.gone { display: none; }
.unwrap { display: contents; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Layout is which formatting context you opt into. Everything else (flex, grid, position) is a specialization.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`display: table` / `table-cell` for old equal-height columns. Multi-column `column-count`. `float` + `clear`. Containing blocks. Independent formatting contexts isolate floats and margin collapse.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Wrong `display` is why `gap` “doesn’t work” (not a flex/grid). `inline` ignores `width`/`margin-block` as people expect.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Used value of `display` can be blockified (flex items are blockified). Absolutely positioned boxes are taken out of flow.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Document flow in articles. Flex toolbars. Grid page shells. `inline-flex` chips.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Don’t use grid for a single row of buttons—flex is simpler. Don’t use position for page columns. Avoid `float` for layout.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`width` on `inline`. `display: none` for “visually hidden” (wrong for SR-only). Nested grids when one would do. `display: contents` on interactive wrappers.",
    },
  ],
};
