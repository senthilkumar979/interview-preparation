import { sassTopic } from "./factory";

export const sassBuiltIn = sassTopic({
  slug: "sass-built-in",
  title: "Built-in modules",
  order: 15,
  summary: "`sass:math`, `sass:color`, `sass:string`, `sass:list`, `sass:map`, `sass:meta`.",
  prerequisites: ["sass-functions", "sass-maps"],
  related: ["sass-operators"],
  oneLiner:
    "Dart Sass ships namespaced built-ins. `@use 'sass:math'` for `div`, `round`, `clamp` helpers. `@use 'sass:color'` for `scale`, `adjust`, `channel` (legacy `darken`/`lighten` globals are deprecated). `sass:meta` inspects types (`meta.type-of`) and loads modules dynamically. There is no `sass:css` runtime — output is still CSS.",
  beats: [
    "Always `@use` the module; don’t rely on old global functions in new code.",
    "`color.adjust($c, $lightness: -10%)` vs guessing hex math.",
    "`meta.inspect` is for debugging compile output, not for production CSS.",
  ],
  intro: "The standard library you should name in interviews instead of copy-pasting mixins.",
  why: "Color and math are where homemade Sass goes wrong (unit errors, contrast).",
  concept: "Each built-in is a module with functions (and some mixins like `meta.load-css`).",
  how: "`@use 'sass:color';` then `color.scale($brand, $lightness: -20%)`.",
  usage: "Hover states from one brand color. Rounding grid math.",
  extras: [
    {
      key: "load-css",
      title: "`meta.load-css`",
      body: "Includes another module’s CSS with a configurable wrapper (e.g. nest third-party CSS under `.legacy`). Use sparingly; it is a power tool.",
    },
  ],
  practices: "Prefer `color.scale` for relative tweaks. Use `math.div`. Check types with `meta.type-of` in public functions.",
  mistakes: "`darken($c, 10%)` as the only color story in 2026. `math.div` without `@use`. Mixing RGB strings with color objects carelessly.",
  code: `@use "sass:color";

$brand: #edae49;

.btn:hover {
  background: color.scale($brand, $lightness: -12%);
}
`,
  examples: [
    {
      id: "math",
      title: "Round",
      about: "Built-in math.",
      language: "css",
      code: `@use "sass:math";
.col { width: math.round(math.div(100%, 3)); }
`,
    },
  ],
});
