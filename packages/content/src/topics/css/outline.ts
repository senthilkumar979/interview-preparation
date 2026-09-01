import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssOutline: Topic = {
  slug: "css-outline",
  title: "Outline",
  technologySlug: "css",
  module: "CSS",
  order: 10,
  summary: "Drawn outside the border, no layout space—the default focus ring.",
  prerequisites: ["css-border"],
  related: ["css-focus", "css-box-model"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-border-outline.png",
      alt: "Outline drawn outside the border with outline-offset, not affecting layout",
      caption: "Use outline for focus rings",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Outline is painted outside the border box and does not affect layout. Browsers use it for `:focus`. `outline-offset` moves it. Removing outline without a visible replacement fails WCAG 2.4.7.",
    beats: [
      "`outline: 2px solid #1f2937; outline-offset: 2px;` is a typical custom ring.",
      "`outline-style: auto` keeps the UA ring. `none` removes it.",
      "Unlike border, outline may be non-rectangular and can cover neighbors. It is not a box-model edge.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Focus-visible ring without layout shift",
    code: `button:focus { outline: none; } /* bad alone */

button:focus-visible {
  outline: 3px solid #1f2937;
  outline-offset: 2px;
}
`,
  },
  workedExamples: [
    {
      id: "offset",
      title: "offset vs fake border",
      about: "Offset keeps the ring off the gold fill.",
      language: "css",
      code: `.chip:focus-visible {
  outline: 2px solid #1f2937;
  outline-offset: 4px;
}
`,
    },
    {
      id: "auto",
      title: "Keep the platform ring",
      about: "When you don’t need a brand ring.",
      language: "css",
      code: `a:focus-visible { outline: auto; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Outline is the accessibility-friendly sibling of border: visible, not layout-shifting.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`outline-width`, `outline-style`, `outline-color` (`invert` is deprecated/limited). Shorthand `outline`. Does not follow `border-radius` in older engines; newer ones often round it.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "WCAG 2.4.7 / 2.4.13. Keyboard users are lost without a ring. `outline: none` on `:focus` is a classic fail.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Painted in a separate layer after the box. Can be clipped by `overflow: hidden` on ancestors in some cases.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "`:focus-visible` rings on buttons, links, inputs. High-contrast mode may override your color.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Never remove focus indication. Prefer `:focus-visible` over `:focus` for mouse users. 3:1 contrast against adjacent pixels (1.4.11).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`outline: none` globally. Using only `box-shadow` that fails in Windows High Contrast unless you also set outline. Expecting outline to add to `offsetWidth`.",
    },
  ],
};
