import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssPadding: Topic = {
  slug: "css-padding",
  title: "Padding",
  technologySlug: "css",
  module: "CSS",
  order: 8,
  summary: "Inner space, background painting, and percentage quirks.",
  prerequisites: ["css-box-model"],
  related: ["css-margin", "css-background", "css-spacing"],
  levels: cssLevels,
  isHighYield: false,
  figures: [
    {
      src: "/diagrams/css/css-box-model.png",
      alt: "Box model with padding between content and border",
      caption: "Padding sits inside the border",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Padding is space between the content box and the border. It is inside the background (unless you clip). It does not collapse. Percentages are relative to the containing block’s width.",
    beats: [
      "Shorthand clockwise; logical `padding-block` / `padding-inline`.",
      "`box-sizing: border-box` includes padding in `width`. Hits and focus rings still sit outside unless you account for it.",
      "`padding` on inline boxes affects layout in a limited way (line boxes); prefer padding on inline-block/flex/grid items.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Comfortable control padding",
    code: `button {
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.card {
  padding: 1.25rem;
  background: #fffdf8;
}
`,
  },
  workedExamples: [
    {
      id: "percent",
      title: "Percentage padding is width-based",
      about: "A 16:9 trick: padding-top 56.25% of width.",
      language: "css",
      code: `.ratio {
  padding-top: 56.25%;
  position: relative;
}
.ratio > * {
  position: absolute;
  inset: 0;
}
`,
    },
    {
      id: "background",
      title: "Background covers padding",
      about: "`background-clip: content-box` to stop that.",
      language: "css",
      code: `.chip {
  padding: 0.25rem 0.5rem;
  background: #edae49;
  background-clip: border-box;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Padding is hit area and breathing room. Buttons fail WCAG target size when padding is too tight.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Cannot be negative. `scroll-padding` offsets scroll snap / scroll-into-view for sticky headers. `padding` on `td` is the usual table cell gutter.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Touch targets (2.5.8). Nested padding eats content width. Aspect-ratio used to be padding hacks.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Adds to used size in content-box. In border-box, content area shrinks. Background painting area defaults to border box.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Buttons, cards, inputs, section insets. `scroll-padding-top` for hash links under a fixed header.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Logical properties. Pair with `min-height` on controls for 24px/44px targets. Don’t use padding as a substitute for `gap` between siblings.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`width: 100%` + padding overflow without border-box. Expecting vertical % padding to use height. Padding on `span` wrapping awkwardly.",
    },
  ],
};
