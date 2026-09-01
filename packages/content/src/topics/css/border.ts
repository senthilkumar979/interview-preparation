import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssBorder: Topic = {
  slug: "css-border",
  title: "Border",
  technologySlug: "css",
  module: "CSS",
  order: 9,
  summary: "Width, style, color, radius, image, and logical borders.",
  prerequisites: ["css-box-model"],
  related: ["css-outline", "css-shadows"],
  levels: cssLevels,
  isHighYield: false,
  figures: [
    {
      src: "/diagrams/css/css-border-outline.png",
      alt: "Border taking layout space versus outline drawn outside with offset",
      caption: "Border occupies space; outline does not",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Border is a painted strip between padding and margin. It takes layout space. Shorthand is `border: width style color`. Style is required for the border to show (`solid`, `dashed`, …).",
    beats: [
      "Per-side: `border-inline-end`. Radius: `border-radius` (can be 8 values). `border-image` slices a graphic.",
      "`border-collapse` on tables. Collapsed tables share borders.",
      "Transparent border keeps width for layout (hover without jump). Outline does not.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Shorthand, radius, logical",
    code: `.card {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
}

.card[aria-current="true"] {
  border-inline-start: 4px solid #edae49;
}
`,
  },
  workedExamples: [
    {
      id: "styles",
      title: "Style keywords",
      about: "none/hidden vs solid/dashed/dotted/double/groove/ridge/inset/outset.",
      language: "css",
      code: `.a { border: 2px dashed #1f2937; }
.b { border: 4px double #edae49; }
.c { border: none; } /* width computes to 0 */
`,
    },
    {
      id: "radius",
      title: "Elliptical corners",
      about: "Slash separates horizontal and vertical radii.",
      language: "css",
      code: `.pill { border-radius: 999px; }
.blob { border-radius: 50% 20% / 10% 40%; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Borders define the edge of the box for layout and often for contrast (1.4.11).",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`border-width` keywords: thin/medium/thick. `box-shadow` can fake borders without affecting size. `outline` for focus. Logical radius: `border-start-start-radius`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Hover borders that add 1px cause layout shift—reserve with transparent border. Radius clipping needs `overflow: hidden` on the same box.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "If style is `none`, width becomes 0. Background extends under the border by default (`background-clip`).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Cards, inputs, dividers (`border-block-end`). Hairlines at `1px` or `0.5px` on retina (support varies).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Keep 3:1 contrast for UI borders when they identify a control. Use radius tokens. Prefer `gap` + border over extra wrappers.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`border: 1px #000` missing style. Using border for focus instead of `:focus-visible` outline. `border-radius` on a child that doesn’t clip the parent image.",
    },
  ],
};
