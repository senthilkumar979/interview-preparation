import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssOpacity: Topic = {
  slug: "css-opacity",
  title: "Opacity",
  technologySlug: "css",
  module: "CSS",
  order: 24,
  summary: "Whole-element alpha vs color alpha, stacking, and pointer-events.",
  prerequisites: ["css-cascade"],
  related: ["css-z-index", "css-background", "css-cursors"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`opacity` multiplies the entire element—including text, borders, and descendants—and creates a stacking context. To fade only a background, use `rgb(… / 0.5)` or `background-color` with alpha, not `opacity` on the parent.",
    beats: [
      "Range 0–1. `0` is invisible but still in layout and, unless `pointer-events: none`, still clickable.",
      "Cannot be overridden on children (they fade too). Use a separate overlay node or color alpha.",
      "Animatable; compositing-friendly. Combined with `visibility`/`display` for enter/leave.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Fade overlay vs faded text",
    code: `.modal::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgb(31 41 55 / 0.5);
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
`,
  },
  workedExamples: [
    {
      id: "alpha-color",
      title: "Alpha on the paint, not the subtree",
      about: "Children stay opaque.",
      language: "css",
      code: `.banner {
  background: rgb(237 174 73 / 0.2);
  color: #1f2937;
}
`,
    },
    {
      id: "stacking",
      title: "opacity < 1 traps z-index",
      about: "Same as the z-index topic trap.",
      language: "css",
      code: `.card { opacity: 0.99; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Opacity is a blunt instrument. Color alpha is a scalpel.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`visibility: hidden` hides but keeps layout; not the same. `rgba()` / `hsl()` / `#rrggbbaa`. SVG `fill-opacity`. Mix-blend plus opacity.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Disabled buttons with unreadable faded labels. Overlays that dim the whole page including the dialog if applied on the wrong node. Stacking bugs.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The element is flattened to a bitmap-like group and multiplied. Nested opacities multiply (0.5 × 0.5 = 0.25).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Hover fade icons. Skeleton pulses. Disabled states (still need contrast—don’t rely on opacity alone for meaning).",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Keep text contrast after fade. `pointer-events: none` on purely visual overlays. Don’t use opacity as the only disabled cue.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Fading a card and wondering why the button text faded. Invisible `opacity: 0` buttons still in tab order. Using opacity instead of `visibility` for leave animations without removing from a11y tree.",
    },
  ],
};
