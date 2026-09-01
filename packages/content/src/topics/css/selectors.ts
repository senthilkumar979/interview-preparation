import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssSelectors: Topic = {
  slug: "css-selectors",
  title: "Selectors",
  technologySlug: "css",
  module: "CSS",
  order: 3,
  summary: "Type, class, id, attribute, combinators, groups, and specificity impact.",
  prerequisites: ["css-cascade"],
  related: ["css-nesting", "css-pseudo-classes"],
  levels: cssLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/css/css-selectors.png",
      alt: "Type, class, id, descendant, and child selectors mapped to a small DOM",
      caption: "Selector shapes",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "A selector matches elements. Compound selectors (no space) AND features on one node; combinators relate nodes. Groups (commas) share a block. Specificity is counted from the selector, not from how “narrow” it feels.",
    beats: [
      "Simple: `*`, type `h1`, class `.btn`, id `#nav`, attribute `[type=\"email\"]`, `:pseudo`, `::pseudo-element`.",
      "Combinators: descendant ` ` (space), child `>`, next sibling `+`, subsequent `~`, column `||` (limited). Relative selectors in `:has()` / nesting.",
      "`:is()` takes the most specific argument. `:where()` is always 0. `:not()` counts its argument. `:has()` counts like `:is()`.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Combinators and attributes",
    code: `nav > a[aria-current="page"] {
  font-weight: 700;
}

article h2 + p {
  margin-top: 0;
}

label:has(+ input:invalid) {
  color: crimson;
}
`,
  },
  workedExamples: [
    {
      id: "compound",
      title: "Compound vs descendant",
      about: "The space is a combinator. No space is the same element.",
      language: "css",
      code: `/* a button that is also .primary */
button.primary {}

/* a .primary anywhere inside a button */
button .primary {}
`,
    },
    {
      id: "attr",
      title: "Attribute selectors",
      about: "Presence, exact, token, prefix, suffix, substring, case-insensitive.",
      language: "css",
      code: `a[href] {}
a[href="https://prepquest.app"] {}
a[href^="https"] {}
a[href$=".pdf"] {}
a[href*="learn"] {}
[class~="btn"] {}
[type="email" i] {}
`,
    },
    {
      id: "is-where",
      title: ":is vs :where",
      about: "Forgiving selector lists skip invalid arguments.",
      language: "css",
      code: `:is(section, article, aside) h2 { font-size: 1.25rem; }
:where(h1, h2, h3, h4, h5, h6) { margin: 0; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Selectors are how CSS finds DOM nodes. Wrong combinator is the most common “why didn’t it match” bug.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Selector list: `h1, h2`. Universal `*` is 0 specificity. Namespace `svg|a` is rare. Shadow: `:host`, `::slotted()`, `::part()`. Specificity of `* + *` is two types.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Over-qualified selectors (`html body div.card`) are brittle and inflate specificity. `:has()` finally gives parent selection without JS.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Right-to-left matching in engines: find key selector, walk ancestors. `:has()` is more expensive. Invalid selectors in a list used to drop the whole list; `:is()`/`:where()` are forgiving.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "BEM classes. Attribute hooks `[data-state=open]`. Form `:checked` + sibling. `:has()` for card hover states.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Prefer classes. One or two combinators. Use `:where()` in resets. Don’t select on tags if the component can change tags.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`button .primary` vs `button.primary`. IDs. `ul li a span` chains. Assuming commas share specificity across the list (each selector has its own).",
    },
  ],
};
