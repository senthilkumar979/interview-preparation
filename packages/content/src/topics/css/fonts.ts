import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssFonts: Topic = {
  slug: "css-fonts",
  title: "Fonts",
  technologySlug: "css",
  module: "CSS",
  order: 20,
  summary: "font-family, size, weight, style, face, loading, and metrics.",
  prerequisites: ["css-text"],
  related: ["css-units", "css-lists"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "`font` is a shorthand for style, variant, weight, size/line-height, and family. Families are stacks with a generic fallback (`sans-serif`). `@font-face` loads custom files; `font-display` controls FOIT/FOUT.",
    beats: [
      "Size: `font-size` (prefer `rem`). Weight: 100–900 or `bold`. Style: `italic` / `oblique`. Variant: `small-caps`. Stretch: `condensed`.",
      "`@font-face { src: url(...) format('woff2'); font-display: swap; }` plus unicode-range.",
      "System stack is fast and matches OS. Variable fonts: `font-variation-settings` / `wght` axis.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Stack, face, and a size ramp",
    code: `:root {
  font-family: ui-sans-serif, system-ui, sans-serif;
}

@font-face {
  font-family: "PrepQuest";
  src: url("/pq.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}

h1 { font-size: 2.25rem; font-weight: 600; }
`,
  },
  workedExamples: [
    {
      id: "shorthand",
      title: "font shorthand order",
      about: "size and family are required; line-height uses a slash.",
      language: "css",
      code: `p {
  font: italic 600 1rem/1.5 ui-sans-serif, system-ui, sans-serif;
}
`,
    },
    {
      id: "metrics",
      title: "Metric overrides",
      about: "Reduce CLS when fallback metrics differ.",
      language: "css",
      code: `@font-face {
  font-family: "PrepQuest";
  src: url("/pq.woff2") format("woff2");
  size-adjust: 100%;
  ascent-override: 90%;
  descent-override: 20%;
  line-gap-override: 0%;
}
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Fonts are files plus CSS. Interviews mix stacks, weights, and loading strategy.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`font-kerning`, `font-feature-settings` / `font-variant-ligatures`. `font-optical-sizing`. `font-synthesis` (fake bold/italic). `font-kerning`. Generic families: `serif` `sans-serif` `monospace` `system-ui` `ui-sans-serif`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "FOIT (invisible text) vs FOUT (flash of fallback). Layout shift from metric mismatch. Licensing and subsetting.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Browser matches family, then weight/style, then synthesizes. Fallback glyphs if the face lacks a character. `unicode-range` splits files.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "System UI for apps (PrepQuest). Marketing with a display face. `tabular-nums` for stats.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "woff2. `font-display: swap` or `optional` for secondary faces. Match fallback metrics. Don’t ship 12 weights unused.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Quoting generic `sans-serif`. `px` body size that ignores user settings. Missing fallback. `font: 16px Arial` without a generic family.",
    },
  ],
};
