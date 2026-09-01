import { sassTopic } from "./factory";

export const sassInterpolation = sassTopic({
  slug: "sass-interpolation",
  title: "Interpolation",
  order: 6,
  summary: "`#{$expr}` injects a Sass value into a selector, property name, or comment.",
  prerequisites: ["sass-variables", "sass-parent-selector"],
  related: ["sass-mixins"],
  oneLiner:
    "Interpolation `#{$name}` converts a Sass expression to a CSS identifier/string in places variables cannot go: selectors, property names, `@import` URLs, comments. `color: $brand` does not need `#{}`; `.#{$ns}-item` does.",
  beats: [
    "Use interpolation in selectors and names, not for quoting math you could write as `$x * 2`.",
    "It stringifies: a color becomes its CSS function/hex in the output.",
    "You cannot interpolate into Sass keywords like `@mixin #{$x}` in older mental models — mixin names are identifiers; check current Dart Sass if you generate mixin names (usually you should not).",
  ],
  intro: "The `#{}` you also see in JS templates. Same idea, compile time.",
  why: "Utility class generators and BEM namespaces.",
  concept: "Wherever the parser expects CSS text, not a Sass value, interpolate.",
  how: "`#{$bp}` in `@media (min-width: $bp)` is optional for values; required in `.col-#{$i}`.",
  usage: "Loops that emit `.grid-1` … `.grid-12`.",
  practices: "Prefer maps + `@each` over clever interpolation. Keep generated selectors grep-able.",
  mistakes: "`color: #{$brand}` unnecessarily. Interpolating untrusted strings into selectors.",
  code: `$ns: "pq";
.#{$ns}-badge { color: #1f2937; }
`,
  examples: [
    {
      id: "loop",
      title: "Generated utilities",
      about: "`@for` + interpolation.",
      language: "css",
      code: `@for $i from 1 through 3 {
  .mt-#{$i} { margin-top: $i * 0.25rem; }
}
`,
    },
  ],
});
