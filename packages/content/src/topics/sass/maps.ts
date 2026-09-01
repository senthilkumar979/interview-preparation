import { sassTopic } from "./factory";

export const sassMaps = sassTopic({
  slug: "sass-maps",
  title: "Lists and maps",
  order: 14,
  summary: "Sass data structures: space/comma lists and `map.get` token dictionaries.",
  prerequisites: ["sass-control"],
  related: ["sass-built-in"],
  isHighYield: true,
  oneLiner:
    "A list is a sequence (`10px 2em` or `helvetica, arial`). A map is `(\"sm\": 20rem, \"md\": 40rem)`. Access with `list.nth` and `map.get` after `@use 'sass:list'` / `sass:map`. Maps + `@each` are the standard way to store a design scale in Sass.",
  beats: [
    "`map.get($bps, \"md\")` — unknown keys return `null`.",
    "`map.merge` / `map.set` (immutable-style: they return new maps).",
    "Lists are 1-indexed. `nth($list, -1)` is the last item.",
  ],
  intro: "If variables are scalars, maps are your theme object.",
  why: "One source of breakpoints for mixins and utilities.",
  concept:
    "Maps cannot be emitted as CSS; you read them in Sass and write properties. Nested maps for palettes (`color.gray.500`).",
  how: "`@use 'sass:map'`. Store maps in `_tokens.scss`. Expose getters as functions.",
  usage: "z-index dictionary, palette, font stacks.",
  practices: "Quote map keys. Provide a function that `@error`s on missing keys instead of silent `null`.",
  mistakes: "0-based index. Mutating a map in place (you reassign). Putting CSS declarations inside a map.",
  code: `@use "sass:map";

$bp: (
  "sm": 20rem,
  "md": 40rem,
);

.hero {
  @media (min-width: map.get($bp, "md")) {
    font-size: 2rem;
  }
}
`,
  examples: [
    {
      id: "list",
      title: "List nth",
      about: "1-based.",
      language: "css",
      code: `@use "sass:list";
$stack: "Iowan Old Style", "Palatino", serif;
body { font-family: list.nth($stack, 1), list.nth($stack, 3); }
`,
    },
  ],
});
