import { sassTopic } from "./factory";

export const sassControl = sassTopic({
  slug: "sass-control",
  title: "Control flow",
  order: 13,
  summary: "`@if`, `@else`, `@each`, `@for`, `@while` — generate CSS from data.",
  prerequisites: ["sass-operators", "sass-interpolation"],
  related: ["sass-maps"],
  oneLiner:
    "Sass has compile-time control flow. `@if $cond { } @else { }`. `@each $item in $list` and `@each $k, $v in $map`. `@for $i from 1 through 3` (inclusive) vs `to` (exclusive). `@while` is rare. There is no CSS leftover of the loop — only emitted rules.",
  beats: [
    "`through` includes the end; `to` does not.",
    "`@each` over maps is how token files become utility classes.",
    "Truthiness: `null` and `false` are false; `0` and empty string are true.",
  ],
  intro: "Utility generation without writing 12 copies by hand.",
  why: "Design-system Sass is maps + `@each`.",
  concept: "All of this runs in the compiler. The browser never sees `@if`.",
  how: "Keep loops in mixins/modules so `main.scss` stays declarative.",
  usage: "Color variants, z-index helpers, grid columns.",
  practices: "Bound `@while`. Prefer `@each` over `@for` when you have a list. Don’t generate thousands of classes “just in case.”",
  mistakes: "Treating `0` as false. Infinite `@while`. Nesting `@for` that explodes selectors.",
  code: `$tones: ("ok": #edae49, "danger": #b91c1c);

@each $name, $color in $tones {
  .badge--#{$name} {
    background: $color;
  }
}
`,
  examples: [
    {
      id: "for",
      title: "`from` / `through`",
      about: "Inclusive end.",
      language: "css",
      code: `@for $i from 1 through 3 {
  .p-#{$i} { padding: $i * 0.25rem; }
}
`,
    },
  ],
});
