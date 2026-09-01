import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssPosition: Topic = {
  slug: "css-position",
  title: "Position",
  technologySlug: "css",
  module: "CSS",
  order: 13,
  summary: "static, relative, absolute, fixed, sticky, inset, and containing blocks.",
  prerequisites: ["css-layout"],
  related: ["css-z-index", "css-overflow"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-position.png",
      alt: "static, relative, absolute, fixed, and sticky positioning compared",
      caption: "Five position values",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "`position` takes a box out of or offsets it in flow. `static` is the default. `relative` offsets without leaving flow. `absolute` and `fixed` leave flow. `sticky` is relative until a threshold, then sticks in its ancestor.",
    beats: [
      "Absolute containing block: nearest ancestor with `position` not `static` (or transform/filter/perspective, `will-change`, `contain`). Fixed: viewport unless an ancestor transforms.",
      "`inset: 0` is `top/right/bottom/left: 0`. Stretch an absolute box to the padding box of the containing block.",
      "Sticky needs a scroll ancestor and room to stick; `overflow: hidden` on a parent often kills it.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Relative parent, absolute child, sticky header",
    code: `.card { position: relative; }

.badge {
  position: absolute;
  inset: 0.5rem 0.5rem auto auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
}
`,
  },
  workedExamples: [
    {
      id: "fixed-trap",
      title: "transform creates a containing block",
      about: "Why fixed menus stick to a modal, not the viewport.",
      language: "css",
      code: `.modal {
  transform: translateZ(0);
}
.modal .toast {
  position: fixed;
  bottom: 1rem; /* fixed to .modal, not the window */
}
`,
    },
    {
      id: "sticky-fail",
      title: "Sticky needs overflow visible on the path",
      about: "A common dashboard bug.",
      language: "css",
      code: `.sidebar { overflow: auto; }
.sidebar h2 {
  position: sticky;
  top: 0;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Positioning is for overlays, badges, and stickiness—not for building a 12-column page.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`relative` still occupies original space. Absolute does not. `fixed` scrolls with the viewport (usually). `sticky` combines both. `z-index` only applies to positioned boxes (and flex/grid items).",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Dropdowns, dialogs, tooltips. Sticky table headers. Interviews: containing block rules with `transform`.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Offsets resolve against the containing block. `auto` insets keep “static position” for absolute boxes.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Close button `absolute` on a card. Sticky section titles. Fixed cookie bar (watch 2.4.11).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Positioned parent on the component root. Prefer sticky over JS scroll. Don’t `position: relative` everything “just in case”.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Absolute without a positioned ancestor (jumps to the initial containing block). Sticky inside overflow hidden. Using absolute for equal-height columns.",
    },
  ],
};
