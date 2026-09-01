import { sassTopic } from "./factory";

export const sassVariables = sassTopic({
  slug: "sass-variables",
  title: "Variables",
  order: 3,
  summary: "`$name: value` is compile-time. Scope, `!default`, and vs CSS custom properties.",
  prerequisites: ["sass-scss-vs-sass"],
  related: ["sass-modules", "css-cascade"],
  isHighYield: true,
  oneLiner:
    "Sass variables use `$name: value;`. They are resolved when compiling. They are scoped to the block or module unless you use `!global` (avoid). `!default` assigns only if the variable is not set yet — that is how themeable libraries work. They are not `--css-variables`.",
  beats: [
    "`$brand: #edae49;` then `color: $brand;` emits `color: #edae49`.",
    "After `@use`, variables are namespaced: `tokens.$brand` unless you `@use 'tokens' as *`.",
    "`!default` lets the consumer set `$brand` before `@use` via `with (...)`.",
  ],
  intro: "Token files are 80% of real Sass. Know scope and `!default` or you will fight libraries.",
  why: "Theming, spacing scales, and “why is this undefined” across files.",
  concept:
    "Types: numbers (with units), strings, colors, lists, maps, booleans, null. Interpolation `#{$name}` when you need a value inside a selector or property name.",
  how: "Define in a `_tokens.scss` module. `@use 'tokens';` then `tokens.$space`. Configure: `@use 'tokens' with ($brand: #000);`.",
  usage: "Breakpoints, palettes, z-index scales.",
  extras: [
    {
      key: "css-vars",
      title: "When to emit CSS variables",
      body: "If the value must change at runtime (dark class, JS), compile Sass into `--brand: #edae49` on `:root` and use `var(--brand)` in CSS. Keep Sass `$` for things that never change in the browser (grid columns count, mixin math).",
    },
  ],
  practices: "One tokens module. `!default` on library variables. Don’t `!global` from mixins.",
  mistakes: "Shadowing `$color` inside a rule and expecting the outer value. Using Sass vars for hover theming that JS must flip.",
  code: `$brand: #edae49;
$radius: 0.5rem;

.btn {
  background: $brand;
  border-radius: $radius;
}
`,
  examples: [
    {
      id: "default",
      title: "`!default`",
      about: "Set only if unset — library API.",
      language: "css",
      code: `$brand: #edae49 !default;
`,
    },
    {
      id: "with",
      title: "Configure a module",
      about: "`with` must wrap the first `@use` of that module.",
      language: "css",
      code: `@use "tokens" with (
  $brand: #1f2937
);
`,
    },
  ],
});
