import { sassTopic } from "./factory";

export const sassOperators = sassTopic({
  slug: "sass-operators",
  title: "Operators",
  order: 12,
  summary: "Math, color, string, and comparison operators — and why `/` is not divide.",
  prerequisites: ["sass-variables"],
  related: ["sass-functions"],
  isHighYield: true,
  oneLiner:
    "Sass computes `+ - * %` on numbers (units must be compatible). Division is `math.div($a, $b)` after `@use 'sass:math'` — a slash in CSS is often a separator (`font: 16px/1.4`). `==`, `!=`, `<`, `and`/`or`/`not` work in `@if`. `+` concatenates unquoted strings.",
  beats: [
    "`1rem + 8px` is a compile error (incompatible units) unless you convert.",
    "`10px * 2` → `20px`. `10px * 10px` is invalid (px²).",
    "Parentheses for grouping. Color arithmetic via `sass:color`, not `$c + #111` in modern code.",
  ],
  intro: "The `/` change is the trick question since Dart Sass 1.33+.",
  why: "Grid math, spacing scales, and broken `line-height` if you divide with `/`.",
  concept:
    "Operators are compile-time. The emitted CSS is a constant (unless you emit `calc()` on purpose).",
  how: "`@use 'sass:math'`. Prefer `calc()` in output when the browser must mix units (`100% - 2rem`).",
  usage: "`width: math.div(100%, 12) * $cols`.",
  extras: [
    {
      key: "slash",
      title: "Slash as separator",
      body: "`font: $size/$height` still compiles to CSS `font: 1rem/1.4` (shorthand). `math.div` for real division. `list.slash($a, $b)` if you need a slash-separated list.",
    },
  ],
  practices: "Use `math.div`. Emit `calc()` for runtime unit mix. Keep units on the first operand consistently.",
  mistakes: "`$a / $b` expecting division. Adding `px` to `%`. Multiplying two pixel values.",
  code: `@use "sass:math";

$cols: 4;
.col {
  width: math.div(100%, 12) * $cols;
}
`,
  examples: [
    {
      id: "calc",
      title: "Leave calc to the browser",
      about: "Incompatible units at runtime.",
      language: "css",
      code: `.main {
  width: calc(100% - #{$sidebar});
}
`,
    },
  ],
});
