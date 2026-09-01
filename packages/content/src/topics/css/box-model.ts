import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssBoxModel: Topic = {
  slug: "css-box-model",
  title: "Box model",
  technologySlug: "css",
  module: "CSS",
  order: 6,
  summary: "Content, padding, border, margin, box-sizing, and formatting contexts.",
  prerequisites: ["css-units"],
  related: ["css-margin", "css-padding", "css-border", "css-outline"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-box-model.png",
      alt: "Concentric CSS box model: content, padding, border, and margin",
      caption: "The four layers of a CSS box",
    },
    {
      src: "/diagrams/css/css-box-sizing.png",
      alt: "content-box width plus padding and border versus border-box width that includes them",
      caption: "content-box vs border-box",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Every box has content, padding, border, and margin. `box-sizing: content-box` (default) puts padding and border outside `width`. `border-box` includes them in `width`/`height`. Margin sits outside and can collapse.",
    beats: [
      "Used width = specified width + padding + border in content-box. In border-box, specified width includes padding and border; content shrinks.",
      "`outline` and `box-shadow` do not take layout space. Scrollbars can.",
      "Block boxes participate in a BFC; inline in an IFC. `display: flow-root` / `flex` / `grid` / `overflow` other than visible create a BFC and stop margin collapse through the parent.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "border-box globally",
    code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  width: 20rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  margin: 1rem;
}
`,
  },
  workedExamples: [
    {
      id: "content-vs-border",
      title: "content-box vs border-box",
      about: "Same width declaration, different occupied size.",
      language: "css",
      code: `.a {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 10px solid;
} /* occupied 260px + margin */

.b {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 10px solid;
} /* occupied 200px + margin */
`,
    },
    {
      id: "replaced",
      title: "Replaced elements",
      about: "img/video have intrinsic size; object-fit maps the content box.",
      language: "css",
      code: `img {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Layout is boxes. If `width: 100%` overflows, it is almost always the box model plus padding.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Standard box model vs IE/legacy. Logical properties (`padding-inline`, `margin-block`) follow writing mode. Min/max-width clamp the used size. `box-decoration-break` for fragments.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Grid/flex `minmax(0, 1fr)` exists because min-content (the content box) prevents shrinking. Interviews draw the four layers.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Containing block defines percentages. For absolute, it is the padding edge of the positioned ancestor. Margin collapse only between block-level boxes in the same BFC, vertically.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Global `border-box`. Cards with padding + border. Full-bleed with `width: 100vw` fighting padding on `body`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`border-box` everywhere. Logical properties for i18n. Don’t mix `width: 100%` with horizontal padding on the same node unless border-box.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Forgetting border-box. Expecting outline to add width. Confusing margin with padding. Horizontal “margin collapse” (it does not).",
    },
  ],
};
