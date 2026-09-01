import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssShadows: Topic = {
  slug: "css-shadows",
  title: "Shadows",
  technologySlug: "css",
  module: "CSS",
  order: 23,
  summary: "box-shadow, text-shadow, and filter drop-shadow.",
  prerequisites: ["css-background"],
  related: ["css-z-index", "css-border"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`box-shadow` draws outside (or inset) the border box and does not take layout space. `text-shadow` follows glyphs. `filter: drop-shadow()` follows alpha (transparent PNG, text).",
    beats: [
      "Syntax: `offset-x offset-y blur spread color`. Multiple shadows comma-separated (painted last on top for box-shadow).",
      "`inset` for inner wells. Spread expands/contracts the shadow before blur.",
      "Shadows don’t count for overflow scroll size the way you might think; they can paint outside and be clipped by `overflow: hidden`.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Elevation token",
    code: `.card {
  box-shadow:
    0 1px 2px rgb(31 41 55 / 0.06),
    0 8px 24px rgb(31 41 55 / 0.06);
}

.logo {
  filter: drop-shadow(0 4px 8px rgb(31 41 55 / 0.2));
}
`,
  },
  workedExamples: [
    {
      id: "ring",
      title: "Shadow as focus ring",
      about: "Pair with outline for forced-colors.",
      language: "css",
      code: `button:focus-visible {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 3px #fffdf8, 0 0 0 6px #1f2937;
}
`,
    },
    {
      id: "text",
      title: "text-shadow",
      about: "No spread. Multiple layers for glow.",
      language: "css",
      code: `.glow {
  text-shadow: 0 1px 0 #fff, 0 0 12px rgb(237 174 73 / 0.8);
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Shadows suggest elevation. They are paint, not boxes.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`filter` creates a stacking context. Too many large blurs cost GPU. `box-shadow: none` in high-contrast if you used shadow as the only edge.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Cards, popovers, text on photos. Performance on low-end devices. Focus rings that don’t shift layout.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "UA paints shadows during the box’s effects phase. Inset shadows paint above the background and below content.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Two-layer elevation. Dropdown. Gold glow on brand marks.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Soft, low-opacity stacks beat one huge blur. Tokens. Keep an outline fallback for focus.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Using shadow instead of border for a 1px line that must stay 3:1. Clipping shadows with overflow hidden on the same radius card unexpectedly. Drop-shadow on a fully opaque rectangle (same as box-shadow).",
    },
  ],
};
