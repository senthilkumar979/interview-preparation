import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssText: Topic = {
  slug: "css-text",
  title: "Text",
  technologySlug: "css",
  module: "CSS",
  order: 19,
  summary: "Color, alignment, decoration, wrapping, spacing, and transform.",
  prerequisites: ["css-cascade"],
  related: ["css-fonts", "css-align", "css-overflow"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "Text properties paint and wrap glyphs: `color`, `text-align`, `text-decoration`, `text-transform`, `letter-spacing`, `word-spacing`, `line-height`, `white-space`, `overflow-wrap`, `hyphens`, `text-overflow`.",
    beats: [
      "`line-height` unitless inherits as a multiplier; `%` and `px` inherit as computed px.",
      "`white-space: nowrap` + overflow hidden + `text-overflow: ellipsis` for single-line truncation.",
      "`text-decoration-thickness` / `underline-offset` for readable links. Don’t rely on color alone for visited/links (1.4.1).",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Readable body and a link",
    code: `.prose {
  color: #1f2937;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
`,
  },
  workedExamples: [
    {
      id: "transform",
      title: "text-transform vs real text",
      about: "Screen readers may still hear the source; copy-paste may uppercase.",
      language: "css",
      code: `.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
`,
    },
    {
      id: "white-space",
      title: "white-space values",
      about: "normal, nowrap, pre, pre-wrap, pre-line, break-spaces.",
      language: "css",
      code: `code { white-space: pre; }
.chat { white-space: pre-wrap; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Typography is CSS text + fonts. This topic is wrapping, decoration, and color of glyphs.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`text-indent`. `direction` / `unicode-bidi` (prefer HTML `dir`). `writing-mode`. `text-wrap: balance` / `pretty` for headings. `hanging-punctuation`. `tab-size`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Overflowing words break layouts. Tiny underlines fail hit and contrast. `letter-spacing` on all-caps improves tracking.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Soft wrap opportunities: spaces, `&shy;`, `overflow-wrap`. Justification inserts extra spacing (`text-align: justify`—hyphens help).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Prose measure. Ellipsis titles. Uppercase labels. Code `pre`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Unitless line-height. `overflow-wrap: anywhere` on URLs. Visible link underline or equivalent. `text-wrap: balance` on short headings.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`line-height: 14px` nested inheritance. Justify without hyphens. Removing underlines with no other affordance. `word-break: break-all` on English body copy.",
    },
  ],
};
