import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssTransition: Topic = {
  slug: "css-transition",
  title: "Transition",
  technologySlug: "css",
  module: "CSS",
  order: 28,
  summary: "Property, duration, easing, delay, and what not to animate.",
  prerequisites: ["css-cascade"],
  related: ["css-opacity", "css-cursors"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "`transition` interpolates property changes over time. Shorthand: `property duration easing delay`. Prefer compositing-friendly properties (`transform`, `opacity`). Honor `prefers-reduced-motion`.",
    beats: [
      "`transition-property: transform, opacity` beats `all` (which is slow and surprises you with width).",
      "Easing: `ease`, `linear`, `ease-in-out`, `cubic-bezier()`, `steps()`. Delay starts the clock after the change.",
      "`transitionend` in JS. Discrete properties (display) don’t interpolate unless you use newer `@starting-style` / `allow-discrete` patterns.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Hover lift and reduced motion",
    code: `.card {
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.card:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
`,
  },
  workedExamples: [
    {
      id: "all",
      title: "Why not transition: all",
      about: "Layout properties are expensive and often look wrong.",
      language: "css",
      code: `/* costly */
.box { transition: all 0.3s; }

/* explicit */
.box { transition: background-color 0.2s ease; }
`,
    },
    {
      id: "delay",
      title: "Stagger with delay",
      about: "nth-child delays for a list enter.",
      language: "css",
      code: `.item {
  transition: opacity 200ms ease;
}
.item:nth-child(2) { transition-delay: 40ms; }
.item:nth-child(3) { transition-delay: 80ms; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Transitions are state-to-state. Animations (`@keyframes`) are timelines. Interviews expect both words and when to use which.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`transition-behavior: allow-discrete` for `display`. View Transitions API is a different layer. `will-change` is a hint, not a default. Spring physics is JS or WAAPI, not CSS transitions.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Jank from transitioning `height`/`top`. Vestibular harm from big motion. Duration tokens keep the UI coherent.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "On computed-value change, if the property is interpolable, the UA samples from old to new. Reverse hover cancels and runs back with the same duration unless you set separate groups.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Button color. Accordion grid-template-rows 0fr/1fr tricks. Opacity fades. Transform menus.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "150–250ms UI. Transform/opacity. Reduced-motion media query. Named properties only.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`transition: all 1s` on the page. Animating `margin`. No reduced-motion. Transitioning from `display: none` without a discrete strategy and wondering why it pops.",
    },
  ],
};
