import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlColors: Topic = {
  slug: "html-colors",
  title: "Colors",
  technologySlug: "html",
  module: "HTML",
  order: 12,
  summary: "Named colors, hex, rgb/hsl, currentColor, and color on HTML vs CSS.",
  prerequisites: ["html-styling"],
  related: ["html-wcag"],
  levels: htmlLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "Color in modern pages is CSS (`color`, `background-color`, `opacity`), not the obsolete `bgcolor`/`text` attributes. Values: named keywords, `#RRGGBB`, `rgb()`, `hsl()`, `color-mix()`, and system colors.",
    beats: [
      "`currentColor` uses the element’s computed `color`—useful for SVG `fill`.",
      "Contrast is a WCAG requirement (1.4.3). Gold on cream can fail; check ratios.",
      "`color` on `html`/`body` inherits. `opacity` fades the whole subtree including text.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Color is CSS, hooked from HTML",
    code: `<style>
  :root { --primary: #edae49; --text: #1f2937; }
  .hint { color: var(--text); }
  .badge { background: var(--primary); color: #1f2937; }
</style>
<span class="badge">High-yield</span>
<p class="hint">Inherited text color</p>
`,
  },
  workedExamples: [
    {
      id: "obsolete-attrs",
      title: "Obsolete presentational attributes",
      about: "What not to write in 2026.",
      language: "html",
      code: `<!-- Obsolete -->
<body bgcolor="#000000" text="#ffffff">
<font color="red">No</font>
<table bgcolor="silver">

<!-- Use CSS -->
<body class="theme-dark">
`,
    },
    {
      id: "input-color",
      title: "input type=color",
      about: "The native color picker control.",
      language: "html",
      code: `<label>
  Brand
  <input type="color" name="brand" value="#edae49" />
</label>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Color questions mix CSS syntax and accessibility. HTML only hosts the hooks.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "sRGB is the web default. `transparent` is `rgba(0,0,0,0)`. 8-digit hex includes alpha (`#11223380`). `canvas`/`color` inputs produce `#rrggbb`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Low contrast fails legal a11y. Color-only status (red/green) fails 1.4.1 Use of Color.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Specified color → computed → used. Inheritance for `color`. Backgrounds do not inherit; they show through if transparent.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Design tokens as CSS variables on `:root`. Semantic names (`--danger`) not `--red`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Pair color with icon/text. Test contrast in light/dark. Don’t encode meaning only in chart colors.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`font color`. Assuming named `gray` vs `grey` (both exist). Using opacity on a button and wondering why the label faded.",
    },
  ],
};
