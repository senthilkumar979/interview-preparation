import { sassTopic } from "./factory";

export const sassMixins = sassTopic({
  slug: "sass-mixins",
  title: "Mixins",
  order: 9,
  summary: "`@mixin` / `@include` copy declarations (and nested rules) with arguments.",
  prerequisites: ["sass-modules"],
  related: ["sass-functions", "sass-inheritance"],
  isHighYield: true,
  oneLiner:
    "A mixin is a reusable chunk of CSS. `@mixin name($arg: default) { ... }` then `@include name(value)`. Arguments can be positional or keyword. `@content` lets the caller pass a block. Mixins may emit selectors; they duplicate CSS at each include — unlike `@extend`, which groups selectors.",
  beats: [
    "Use mixins when you need parameters or `@content`. Use `@extend` only for true selector grouping (and prefer mixins if unsure).",
    "`@include mixins.center;` after `@use 'mixins'`.",
    "Varargs: `$rest...`. Optional args with defaults.",
  ],
  intro: "The workhorse of Sass libraries: truncate, visually-hidden, media breakpoints.",
  why: "DRY for patterns that are not a single shared class in HTML.",
  concept:
    "Mixins are expanded at include sites. They can contain nested rules, `@if`, and further includes. They are not functions: they do not return a value; they emit CSS.",
  how: "Define in `_mixins.scss`. Include inside rules or at root (root mixins emit their selectors).",
  usage: "Clearfix (legacy), font stacks, breakpoint wrappers with `@content`.",
  extras: [
    {
      key: "content",
      title: "`@content`",
      body: "`@mixin mq($bp) { @media (min-width: $bp) { @content; } }` then `@include mq(40rem) { display: grid; }`. The block is injected where `@content` sits.",
    },
  ],
  practices: "Name mixins as verbs/patterns. Keep output small. Prefer a class in HTML when every use is identical and unparameterized.",
  mistakes: "Giant mixins included 100 times (CSS bloat). Using a mixin where a function should return a value. Forgetting parentheses when the mixin has no args (`@include foo;` is fine; `@include foo();` also).",
  code: `@mixin stack($gap: 1rem) {
  display: flex;
  flex-direction: column;
  gap: $gap;
}

.card {
  @include stack(0.75rem);
}
`,
  examples: [
    {
      id: "mq",
      title: "Breakpoint mixin",
      about: "`@content` injects the caller’s block.",
      language: "css",
      code: `@mixin from($bp) {
  @media (min-width: $bp) {
    @content;
  }
}

.hero {
  @include from(40rem) {
    font-size: 2rem;
  }
}
`,
    },
  ],
});
