import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssPseudoElements: Topic = {
  slug: "css-pseudo-elements",
  title: "Pseudo-elements",
  technologySlug: "css",
  module: "CSS",
  order: 26,
  summary: "::before, ::after, ::marker, ::placeholder, ::selection, and friends.",
  prerequisites: ["css-pseudo-classes"],
  related: ["css-lists", "css-fonts"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "Pseudo-elements style a fragment the DOM does not expose as a node (`::first-line`) or generate boxes (`::before` / `::after` with `content`). Double colon is the CSS3 convention; some old single-colon aliases still work.",
    beats: [
      "`::before` / `::after` require `content` (even `\"\"`). They are not in the DOM for querySelector; they are not for real content or accessible names.",
      "`::placeholder`, `::marker`, `::file-selector-button`, `::backdrop`, `::selection`, `::cue`.",
      "Specificity: a pseudo-element is like a type selector (0,0,0,1) plus the rest of the selector.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Decorative before and placeholder",
    code: `.card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: #edae49;
}

input::placeholder {
  color: #6b7280;
  opacity: 1;
}
`,
  },
  workedExamples: [
    {
      id: "content",
      title: "content values",
      about: "Strings, counters, attr(), images. Not for SEO body copy.",
      language: "css",
      code: `a[href^="http"]::after {
  content: "↗";
}
li::marker { content: counter(list-item) ". "; }
`,
    },
    {
      id: "first-line",
      title: "first-line / first-letter limits",
      about: "Only a subset of properties apply.",
      language: "css",
      code: `p::first-letter {
  font-size: 3em;
  float: left;
}
p::first-line { letter-spacing: 0.02em; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Pseudo-elements are extra boxes or fragments. They are terrible for real text that must be readable, selectable, or translated via HTML.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`::before` is the first child-like box; `::after` the last. `::part()` and `::slotted()` for shadow DOM. `::grammar-error` `::spelling-error` `::target-text` `::highlight()` `::view-transition-old/new`. `::details-content` (newer).",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Icons, gold rails, quote marks, file button restyles, dialog backdrops. Generated content may be ignored by some ATs—don’t put “required” only in `::after`.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Generated boxes participate in layout like children. `position` on `::before` is relative to the element if it is the containing block.",
    },
    {
      key: "pe-catalog",
      title: "Catalog",
      body: "`::before` `::after` — generated children; need `content`.\n\n`::first-letter` `::first-line` — typographic fragments of a block container.\n\n`::placeholder` — placeholder text of inputs.\n\n`::marker` — list item marker.\n\n`::selection` — highlighted text (limited properties: color, background, text-shadow, stroke).\n\n`::backdrop` — behind top-layer dialog/fullscreen.\n\n`::file-selector-button` — the Choose file control.\n\n`::cue` — WebVTT captions.\n\n`::part(name)` — styled shadow parts.\n\n`::slotted()` — light-DOM children in a slot (from inside shadow).\n\n`::grammar-error` `::spelling-error` — UA decorations.\n\n`::target-text` — text fragment navigation highlight.\n\n`::highlight(name)` — Custom Highlight API.\n\n`::view-transition-old(root)` `::view-transition-new(...)` `::view-transition-group` `::view-transition-image-pair` — View Transitions.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Clearfixes (legacy). Decorative icons. Overlay scrims. Custom bullets via `::marker`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "`content: \"\"` for empty decorative boxes. Real text in HTML. Style `::placeholder` with sufficient contrast or don’t rely on it as a label.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Forgetting `content`. Putting meaning only in `::before`. Expecting `::selection` to style every property. `::after` on `img`/`input` (replaced elements often cannot have them).",
    },
  ],
};
