import { sassTopic } from "./factory";

export const sassFunctions = sassTopic({
  slug: "sass-functions",
  title: "Functions",
  order: 10,
  summary: "`@function` returns a value. Mixins emit CSS. Do not confuse them.",
  prerequisites: ["sass-mixins"],
  related: ["sass-operators", "sass-built-in"],
  isHighYield: true,
  oneLiner:
    "`@function name($args) { @return $value; }` computes a Sass value used in a property: `width: col(4);`. Functions must `@return`. They should not emit CSS (no nested selectors). Built-ins live in `sass:math`, `sass:color`, `sass:string`, `sass:list`, `sass:map`, `sass:meta`.",
  beats: [
    "Call as `math.div($a, $b)` after `@use 'sass:math'` — `/` is no longer division.",
    "User functions are namespaced like mixins: `fns.fluid(1rem, 2rem)`.",
    "If you need output CSS, you wanted a mixin.",
  ],
  intro: "Color scales, rem conversion, map.get wrappers.",
  why: "Interviews: “mixin vs function” is a filter question.",
  concept: "Pure computation at compile time. Side-effect-free. `@error` for invalid args.",
  how: "`@return`. Guard with `@if`. Prefer built-ins before writing your own color math.",
  usage: "`strip-unit`, `to-rem`, palette `tint`.",
  practices: "`@error` on bad input. Don’t duplicate `sass:math`. Keep functions tiny.",
  mistakes: "Writing a “function” that includes selectors. Using `/` for division. Calling `darken()` without `sass:color` in modern code (old global names are deprecated).",
  code: `@use "sass:math";

@function rem($px) {
  @return math.div($px, 16px) * 1rem;
}

.title { font-size: rem(24px); }
`,
  examples: [
    {
      id: "error",
      title: "Validate",
      about: "Fail the build, not the browser.",
      language: "css",
      code: `@function rem($px) {
  @if math.is-unitless($px) {
    @error "$px must have unit px";
  }
  @return math.div($px, 16px) * 1rem;
}
`,
    },
  ],
});
