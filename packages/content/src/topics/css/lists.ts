import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssLists: Topic = {
  slug: "css-lists",
  title: "Lists",
  technologySlug: "css",
  module: "CSS",
  order: 21,
  summary: "list-style, markers, counters, and keeping list semantics.",
  prerequisites: ["css-fonts"],
  related: ["css-pseudo-elements", "html-block"],
  levels: cssLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "`list-style` sets type, position, and image of markers on `ul`/`ol`/`li`. `::marker` styles the bullet/number. CSS counters (`counter-reset` / `counter-increment` / `counter()`) build custom numbering. Don’t replace lists with divs just to restyle.",
    beats: [
      "`list-style-type`: `disc` `circle` `square` `decimal` `none` and many i18n types.",
      "`list-style-position: inside | outside`. Outside hangs in the padding/margin gutter.",
      "`list-style: none` plus flex is fine; keep `ul`/`ol`/`li` for SR and SEO.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Reset nav lists without losing HTML",
    code: `nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
}

ol.steps ::marker {
  font-weight: 700;
  color: #d89a32;
}
`,
  },
  workedExamples: [
    {
      id: "counters",
      title: "Nested CSS counters",
      about: "When ol start/value is not enough.",
      language: "css",
      code: `ol.toc { counter-reset: item; }
ol.toc li { counter-increment: item; }
ol.toc li::before {
  content: counters(item, ".") " ";
}
`,
    },
    {
      id: "none",
      title: "none still a list",
      about: "Safari historically needed a11y role fixes; prefer native lists.",
      language: "css",
      code: `ul.plain { list-style-type: none; padding-left: 0; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Lists are HTML. CSS only skins the marker and spacing.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`::marker` vs `::before` for custom bullets. `list-style-image`. Reversed `ol` is HTML. Description lists (`dl`) don’t use `list-style`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Navs, recipes, TOCs. Removing bullets without padding leaves a weird indent. Fake lists break rotor navigation.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Marker box is generated for list items (`display: list-item`). Flex/grid on `li` can affect marker; `::marker` support is the modern path.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Reset lists in components. Gold markers for steps. Legal `decimal` outlines.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Keep list markup. Zero padding when `list-style: none`. Use `ol` for order that matters.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<div>` stacks as lists. Styling `::before` and leaving default disc. Counters without `counter-reset`.",
    },
  ],
};
