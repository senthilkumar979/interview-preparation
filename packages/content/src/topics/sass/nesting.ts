import { sassTopic } from "./factory";

export const sassNesting = sassTopic({
  slug: "sass-nesting",
  title: "Nesting",
  order: 4,
  summary: "Nested rules compile to descendant or `&`-combined selectors. Depth is a specificity trap.",
  prerequisites: ["sass-variables"],
  related: ["css-nesting", "sass-parent-selector"],
  isHighYield: true,
  oneLiner:
    "Sass lets you nest selectors inside a parent. `.card { h2 {} }` compiles to `.card h2`. `&` is the parent selector: `&:hover` → `.card:hover`, `&.is-on` → `.card.is-on`. Nesting does not exist in the output CSS as nesting unless you target modern CSS — Sass flattens to compound/descendant selectors.",
  beats: [
    "Default (no `&`) is a descendant combinator: a space.",
    "Over-nesting raises specificity and copies long selectors. Keep 2–3 levels.",
    "You can nest `@media` inside a rule; Sass bubbles the media query and repeats the selector.",
  ],
  intro: "Looks like native CSS nesting; the `&` BEM trick (`&__title`) is Sass interpolation on `&`, not native CSS.",
  why: "Readable source, dangerous CSS if you nest `.card { .grid { .item { a { } } } }`.",
  concept:
    "Each nested block is rewritten with the parent prefix. Lists of parents (`.a, .b { &:hover {}}`) multiply: `.a:hover, .b:hover`.",
  how: "Write the parent once. Nest pseudo-classes and elements. Extract deep trees into mixins or flat classes.",
  usage: "Component SCSS files, BEM with `&__`.",
  extras: [
    {
      key: "media",
      title: "Nested media",
      body: "`.card { @media (min-width: 40rem) { padding: 2rem; } }` emits the `@media` wrapping `.card { padding: 2rem; }`. Handy; don’t nest a different media in every component without a mixin.",
    },
  ],
  practices: "Max three levels. Prefer `&:hover` over extra classes when it is the same element.",
  mistakes: "`.parent { .parent-title }` duplicating the parent class. Nesting into huge selector lists that explode (mixin + `@extend` + nest).",
  code: `.card {
  padding: 1rem;

  h2 {
    margin: 0;
  }

  &:hover {
    border-color: #edae49;
  }

  @media (min-width: 40rem) {
    padding: 1.5rem;
  }
}
`,
  examples: [
    {
      id: "output",
      title: "Compiled CSS",
      about: "Flattened selectors.",
      language: "css",
      code: `.card { padding: 1rem; }
.card h2 { margin: 0; }
.card:hover { border-color: #edae49; }
@media (min-width: 40rem) {
  .card { padding: 1.5rem; }
}
`,
    },
  ],
});
