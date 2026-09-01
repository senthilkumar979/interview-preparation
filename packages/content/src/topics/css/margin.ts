import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssMargin: Topic = {
  slug: "css-margin",
  title: "Margin",
  technologySlug: "css",
  module: "CSS",
  order: 7,
  summary: "Outer space, collapse, auto, negative margins, and logical sides.",
  prerequisites: ["css-box-model"],
  related: ["css-padding", "css-spacing", "css-align"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-margin-collapse.png",
      alt: "Two block margins collapsing to the larger value instead of adding",
      caption: "Vertical margin collapse",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Margin is space outside the border. Vertical margins of adjoining block boxes in the same BFC collapse to the larger of the two (with rules for negatives). `margin-inline: auto` centers a block with a defined width.",
    beats: [
      "Shorthand: `margin: t r b l` (clockwise from top). Two values: block then inline. Logical: `margin-block`, `margin-inline`.",
      "Collapse: parent-child through empty padding/border; sibling-sibling. Flex/grid/BFC (`overflow: auto`, `flow-root`) prevent parent-child collapse.",
      "Negative margin pulls neighbors / overlaps. Percentage margins use containing-block width, including top/bottom.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Collapse vs gap vs auto",
    code: `.stack > * + * {
  margin-block-start: 1rem;
}

.center {
  width: min(40rem, 100%);
  margin-inline: auto;
}

.bfc {
  display: flow-root;
}
`,
  },
  workedExamples: [
    {
      id: "collapse",
      title: "Sibling margin collapse",
      about: "1rem + 2rem becomes 2rem, not 3rem.",
      language: "css",
      code: `.a { margin-bottom: 1rem; }
.b { margin-top: 2rem; }
/* gap between border boxes = 2rem */
`,
    },
    {
      id: "auto",
      title: "Why auto does not center a block without width",
      about: "A block already takes 100% width; leftover is 0.",
      language: "css",
      code: `.full { margin-inline: auto; } /* no visible centering */
.fixed { width: 20rem; margin-inline: auto; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Margin separates boxes from each other. Padding separates content from the border.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`margin: auto` on flex children absorbs extra space on that axis. `margin-trim` (newer) can eat container overflow from last child’s margin. `margin: 0` on `h1`/`p` is a typical reset.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Unexpected gaps are collapsed margins. Unexpected overlap is negative margin or collapse through a parent.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "If both positive, max wins. If one negative, add. If both negative, the more negative wins.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Lobotomized owl `* + *`. Auto centering. Flex `margin-left: auto` to push an item to the end.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Prefer `gap` in flex/grid. Use one direction of margin in stacks to avoid collapse surprises. Logical properties.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Adding padding to “fix” collapse without understanding BFC. Horizontal collapse myths. `margin: auto` on inline boxes (ignored for centering the way people expect).",
    },
  ],
};
