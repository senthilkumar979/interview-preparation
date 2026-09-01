import { sassTopic } from "./factory";

export const sassParentSelector = sassTopic({
  slug: "sass-parent-selector",
  title: "Parent selector `&`",
  order: 5,
  summary: "`&` is replaced by the current parent selector; it can prefix, suffix, or build BEM names.",
  prerequisites: ["sass-nesting"],
  related: ["sass-interpolation"],
  oneLiner:
    "`&` is the parent selector at compile time. `&:hover` appends a pseudo-class. `&.mod` adds a class to the same element. `.card { &__title }` becomes `.card__title` (BEM). `&` can appear in the middle (`h2 &` for `.is-on h2` when nested under `.is-on`). There is no `&` in the output CSS.",
  beats: [
    "BEM: `&__element` and `&--modifier` concatenate because `__` is just text after `&`.",
    "Native CSS nesting does not do `&__element` string concat the same way — that is a Sass tell.",
    "`@at-root` compiles a rule at the root, escaping the parent (useful with `&` tricks).",
  ],
  intro: "Once you nest, `&` is how you talk about “this element” vs “a descendant.”",
  why: "BEM in Sass is this one character. Interviews write a modifier on a whiteboard.",
  concept: "`&` is replaced, then the result is a selector. Multiple `&` repeat the parent.",
  how: "Pseudo-classes and modifiers on the same node use `&`. Descendants omit `&`.",
  usage: "`.btn { &--primary { } }` → `.btn--primary`.",
  practices: "Use `&` for same-element state. Don’t build unreadable `& & &` chains.",
  mistakes: "`.block { .block__el }` instead of `&__el`. Assuming `&` works inside interpolated strings without `#{}`.",
  code: `.btn {
  &--primary { background: #edae49; }
  &:disabled { opacity: 0.5; }
  & + & { margin-inline-start: 0.5rem; }
}
`,
  examples: [
    {
      id: "suffix",
      title: "Parent as suffix",
      about: "`.theme-dark &` when nested in `.card`.",
      language: "css",
      code: `.card {
  .theme-dark & {
    background: #1f2937;
  }
}
/* .theme-dark .card { ... } */
`,
    },
  ],
});
