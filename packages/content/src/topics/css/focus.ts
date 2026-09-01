import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssFocus: Topic = {
  slug: "css-focus",
  title: "Focus",
  technologySlug: "css",
  module: "CSS",
  order: 27,
  summary: ":focus, :focus-visible, :focus-within, rings, and order.",
  prerequisites: ["css-outline", "css-pseudo-classes"],
  related: ["html-wcag", "css-z-index"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-border-outline.png",
      alt: "Focus outline outside the border with offset, not taking layout space",
      caption: "Outline is the usual focus ring",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Focus CSS is how you show the keyboard’s current control. Style `:focus-visible` with a 3:1 ring (`outline` or a transparent outline + `box-shadow`). Never `outline: none` on `:focus` without a replacement. `:focus-within` styles a parent when a child is focused.",
    beats: [
      "Tab order is DOM order plus `tabindex`. Positive tabindex is a trap. `tabindex=\"0\"` adds a non-interactive element only if you also implement keys.",
      "`:focus-visible` follows UA heuristics (keyboard vs mouse). Don’t hide rings on inputs—users still need them.",
      "WCAG 2.4.7 visible, 2.4.3 order, 2.4.11 not fully covered by sticky UI. `:focus-within` for highlighted cards/fields.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Standard app ring",
    code: `:focus { outline: none; } /* still bad globally */

:focus-visible {
  outline: 3px solid #1f2937;
  outline-offset: 2px;
}

.field:focus-within {
  border-color: #edae49;
}
`,
  },
  workedExamples: [
    {
      id: "within",
      title: "Card highlight when an inner input is focused",
      about: "Does not move focus itself.",
      language: "css",
      code: `.card:focus-within {
  box-shadow: 0 0 0 2px #edae49;
}
`,
    },
    {
      id: "skip",
      title: "Skip link becomes visible on focus",
      about: "2.4.1 bypass blocks.",
      language: "css",
      code: `.skip {
  position: absolute;
  left: -999px;
}
.skip:focus {
  left: 1rem;
  top: 1rem;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Focus is a JS and HTML concern; CSS is the paint. Interviews mix all three.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`accent-color` for native controls. `:focus-visible` polyfills are obsolete in modern browsers. `focus-visible` vs `:focus-within` vs `aria-activedescendant` (focus stays on the combobox).",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Keyboard-only users. WCAG lawsuits. Custom widgets that steal Tab and show no ring.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The focused element matches `:focus`. UA sets `:focus-visible` based on modality. Descendants don’t match `:focus` on the parent unless the parent itself is focused.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Buttons, links, inputs, custom listboxes. Skip links. Modal focus trap is JS; the ring is CSS.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Global `:focus-visible` token. Keep input rings even for mouse. Don’t cover focused controls with stickies (2.4.11).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`* { outline: none }`. Rings clipped by `overflow: hidden`. `:focus-within` on a wrapper that includes the whole page. Relying on browser default rings that fail on gold buttons.",
    },
  ],
};
