import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssOverflow: Topic = {
  slug: "css-overflow",
  title: "Overflow",
  technologySlug: "css",
  module: "CSS",
  order: 18,
  summary: "visible, hidden, auto, scroll, clip, wrapping, and scroll chaining.",
  prerequisites: ["css-layout"],
  related: ["css-text", "css-position"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`overflow` controls what happens when content does not fit: `visible` (default, may paint outside), `hidden` (clip, no scroll UI), `auto` (scrollbars if needed), `scroll` (always reserve gutter in some UAs), `clip` (clip without a scroll container).",
    beats: [
      "`overflow-x` / `overflow-y`: if one is visible and the other isn’t, visible computes to auto.",
      "`text-overflow: ellipsis` needs overflow not visible and usually `white-space: nowrap`.",
      "A non-visible overflow creates a scroll container and a BFC. It can prevent `position: sticky` in descendants if this box is the scrollport they didn’t intend.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Truncation and a panel scrollport",
    code: `.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.panel {
  overflow: auto;
  overscroll-behavior: contain;
  max-height: 70dvh;
}
`,
  },
  workedExamples: [
    {
      id: "xy",
      title: "The visible + hidden trap",
      about: "Setting overflow-x hidden forces overflow-y to auto if it was visible.",
      language: "css",
      code: `.box {
  overflow-x: hidden;
  overflow-y: visible; /* used value becomes auto */
}
`,
    },
    {
      id: "line-clamp",
      title: "Multi-line clamp",
      about: "WebKit property, now widely supported.",
      language: "css",
      code: `.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Overflow is clipping, scrolling, and ellipsis. It also quietly changes formatting contexts.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`overflow-wrap` / `word-break` for long URLs. `overscroll-behavior`. `scrollbar-gutter`. `overflow: clip` does not make a scroll container. Logical `overflow-inline`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Horizontal page scroll from `100vw`. Sticky headers dying. Focus rings clipped. Modals that scroll the body behind them.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Scrollable overflow is the padding edge. Programmatic `scrollIntoView` uses this box. `position: sticky` sticks inside the nearest scroll ancestor.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Chat logs. Tables in cards. Image crop (`hidden` + `object-fit`). Body `overflow: hidden` while a dialog is open.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`auto` over `scroll` unless you need stable gutters. `overscroll-behavior: contain` in overlays. Don’t clip focus—add padding.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Ellipsis without nowrap. `overflow: hidden` to clear floats (use `flow-root`). Clipping dropdowns. Assuming `visible` on one axis stays visible.",
    },
  ],
};
