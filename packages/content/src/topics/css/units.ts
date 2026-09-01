import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssUnits: Topic = {
  slug: "css-units",
  title: "Sizing units",
  technologySlug: "css",
  module: "CSS",
  order: 5,
  summary: "Absolute, relative, viewport, container, and keyword sizes—and when to use each.",
  prerequisites: ["css-syntax"],
  related: ["css-box-model", "css-layout", "css-fonts"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "Lengths are numbers plus a unit (or `0`). Absolute units (`px`, print units) don’t scale with font or viewport. Relative units (`em`, `rem`, `%`, viewport, container) do. Keywords (`auto`, `min-content`, `fr`) are not `<length>` but they size boxes.",
    beats: [
      "`px` is a CSS pixel (reference device pixel at 96dpi conceptually), not a hardware pixel. `rem` is the root `font-size`; `em` is the element’s (or parent’s, for `font-size`) font-size.",
      "Viewport: `vw`/`vh`/`vmin`/`vmax` plus `sv*`, `lv*`, `dv*` for mobile browser chrome. Container: `cqw`/`cqh`/`cqi`/`cqb`/`cqmin`/`cqmax`.",
      "`calc()`, `min()`, `max()`, `clamp()` mix units. `%` is relative to a containing-block size that depends on the property.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "rem, clamp, and container units",
    code: `:root { font-size: 100%; } /* typically 16px */

.prose {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  width: min(65ch, 100%);
}

@container (min-width: 24rem) {
  .card { padding: 2cqi; }
}
`,
  },
  workedExamples: [
    {
      id: "em-rem",
      title: "em vs rem compounding",
      about: "Nested em on font-size multiplies; rem does not.",
      language: "css",
      code: `html { font-size: 16px; }
.a { font-size: 1.25em; } /* 20px */
.a .b { font-size: 1.25em; } /* 25px — compounded */
.c { font-size: 1.25rem; } /* always 20px if root is 16px */
`,
    },
    {
      id: "percent",
      title: "% depends on the property",
      about: "Width % vs padding % vs line-height unitless.",
      language: "css",
      code: `.box {
  width: 50%;           /* 50% of containing block width */
  padding: 10%;         /* 10% of containing block *width* even for top/bottom */
  line-height: 1.5;     /* unitless multiplier of font-size — not % */
  height: 50%;          /* often auto if parent height is auto */
}
`,
    },
    {
      id: "clamp",
      title: "clamp for fluid type",
      about: "min, preferred, max — preferred can be a calc/vw expression.",
      language: "css",
      code: `h1 {
  font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Units are how CSS talks about size, time, angles, and resolution. Interviews expect `em`/`rem`/`px`/`%`/`vw`/`ch`/`fr` and increasingly container and dynamic viewport units.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "A dimension is `number + unit`. `0` may omit the unit for lengths. `calc(100% - 2rem)` needs spaces around `+`/`-`. Invalid units drop the declaration.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Wrong unit breaks zoom, nested components, and mobile `100vh` (browser chrome). `ch`/`lh` make typography-aware layout. `fr` only works in grid tracks.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Specified → computed (relative lengths resolve, often to px) → used (layout) → actual (rounding). `em` on `font-size` uses parent font-size; `em` on margin uses the element’s own font-size.",
    },
    {
      key: "css-units-absolute",
      title: "Absolute length units",
      body: "`px` — CSS pixel. The default for borders and hairlines. Anchored so that 96px ≈ 1 CSS inch. Does not scale when the user changes root font size unless you avoid fixing type in px.\n\n`cm`, `mm`, `Q` (quarter-millimeter), `in`, `pt` (1/72 in), `pc` (12pt) — physical units. On screens they map through the CSS inch. Prefer them for print (`@media print`), not UI.\n\nUse `px` for hairline borders and shadows when you want device-stable strokes. Use `rem` for type and spacing that should follow user font settings.",
    },
    {
      key: "css-units-font",
      title: "Font-relative units",
      body: "`em` — Equal to the computed `font-size` of the element (except when used on `font-size` itself, then the parent). Nested `em` compounds.\n\n`rem` — Root em: `html` / `:root` font-size. Stable for spacing scales and type ramps.\n\n`ex` — x-height of the font (height of “x”). Rare; useful for optical tweaks.\n\n`ch` — Width of the `0` glyph. `65ch` is a readable measure for prose.\n\n`cap` — Cap-height (roughly capital letters).\n\n`ic` — Water ideograph width (`水`); useful for CJK.\n\n`lh` — Computed `line-height` of the element. Size boxes to whole lines.\n\n`rlh` — Root line-height.\n\n`rex` / `rch` / `rcap` / `ric` — Root variants of `ex`/`ch`/`cap`/`ic` (newer; check support).\n\nNever use `em` on `font-size` in deep trees if you don’t want compounding. Prefer `rem` for global spacing; `em` for padding that should scale with a component’s type.",
    },
    {
      key: "css-units-percent",
      title: "Percentages",
      body: "`%` — Relative to a reference that depends on the property. `width`/`left`/`margin-left` → containing-block width. `height`/`top` → containing-block height (fails if that height is auto). `padding`/`margin` percentages on all sides use width, not height. `font-size: 150%` → parent font-size. `border-radius: 50%` → the box’s own size. `translate(50%)` → the element’s own size. `line-height: 150%` is relative to font-size but computed to an absolute—unitless `1.5` is usually safer for inheritance.",
    },
    {
      key: "css-units-viewport",
      title: "Viewport units",
      body: "`vw` / `vh` — 1% of viewport width / height.\n\n`vmin` / `vmax` — 1% of the smaller / larger viewport side.\n\n`vi` / `vb` — 1% of viewport inline / block size (writing-mode aware).\n\n`svw` `svh` `svi` `svb` `svmin` `svmax` — Small viewport (browser chrome expanded—the “smallest” UI).\n\n`lvw` `lvh` … — Large viewport (chrome retracted).\n\n`dvw` `dvh` … — Dynamic viewport (updates as chrome shows/hides). `100dvh` is the usual fix for mobile full-screen sections.\n\nClassic bug: `height: 100vh` is taller than the visible area on iOS. Prefer `dvh` or `svh` plus `min-height`.\n\n`vw` includes the scrollbar in some engines, which can cause accidental horizontal overflow (`100vw`). Prefer `100%` on the root or `100dvw` with overflow awareness.",
    },
    {
      key: "css-units-container",
      title: "Container query units",
      body: "Require a containment context (`container-type: inline-size` or `size` on an ancestor).\n\n`cqw` / `cqh` — 1% of container width / height.\n\n`cqi` / `cqb` — 1% of container inline / block size.\n\n`cqmin` / `cqmax` — smaller / larger of those.\n\nUse these for card padding and type that should follow the card, not the viewport. `@container` queries pair with them. If no container exists, they fall back like `sv*` in some cases—always define a container.",
    },
    {
      key: "css-units-flex-grid",
      title: "Flex, grid, and intrinsic keywords",
      body: "`fr` — Fraction of remaining space in CSS Grid tracks only (`1fr 2fr`). Not a length on `width` of a block.\n\n`auto` — Fill available, shrink to min-content as needed (property-specific).\n\n`min-content` — Smallest size without overflowing overflowing unbreakable content (longest word / image).\n\n`max-content` — Size to fit content without wrapping (one long line).\n\n`fit-content` / `fit-content()` — min(max-content, max(min-content, available)).\n\n`stretch` — Stretch to the containing block (newer; similar to `stretch` alignment).\n\n`min()` `max()` `clamp(MIN, VAL, MAX)` — Comparison functions; `clamp` is `max(MIN, min(VAL, MAX))`.\n\n`calc()` — Arithmetic; mixed units OK. Nested `calc` allowed. Division by 0 is invalid.",
    },
    {
      key: "css-units-other",
      title: "Angles, time, frequency, resolution, numbers",
      body: "Angles: `deg` (360), `rad`, `grad` (400), `turn` (1 = full circle). Used in `rotate()`, `hsl()`, conic gradients.\n\nTime: `s`, `ms` — `transition-duration`, `animation`. `500ms` = `0.5s`.\n\nFrequency: `Hz`, `kHz` — almost unused in UI CSS.\n\nResolution: `dpi`, `dpcm`, `dppx` (`1dppx` = 96dpi). `@media (min-resolution: 2dppx)` for retina assets.\n\nUnitless numbers: `opacity`, `line-height` (recommended), `flex-grow`, `z-index`, `font-weight`.\n\nRatios: `aspect-ratio: 16 / 9`.\n\n`lh` as a length vs unitless line-height: don’t mix them blindly when inheriting.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Type: `rem` + `clamp`. Layout widths: `%`, `minmax(0, 1fr)`, `min(100%, 65ch)`. Icons: `em` so they scale with text. Borders: `1px`. Full-bleed hero: `min-height: 100dvh`. Cards in a grid: `cqi`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Root `font-size` in `%` or `rem` so user zoom works. Spacing scale in `rem`. Use `ch` for measure. Prefer `dvh` over `vh` for mobile shells. `minmax(0, 1fr)` to let grid items shrink below content.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`100vh` mobile overflow. `height: 100%` with auto parent. Padding `%` expected to use height. `em` compounding on nested `font-size`. `1fr` on a non-grid `width`. `100vw` causing a horizontal scrollbar. `px` type that ignores browser font settings.",
    },
  ],
};
