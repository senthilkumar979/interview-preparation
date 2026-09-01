import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlStyling: Topic = {
  slug: "html-styling",
  title: "Styling",
  technologySlug: "html",
  module: "HTML",
  order: 11,
  summary: "style attribute, style element, link rel=stylesheet—and why inline styles lose.",
  prerequisites: ["html-attributes"],
  related: ["html-colors", "html-formatting"],
  levels: htmlLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "HTML can apply CSS via `link rel=\"stylesheet\"`, a `<style>` block, or the `style` attribute. External stylesheets win for cache, cascade, and CSP; inline styles are highest specificity besides `!important`.",
    beats: [
      "`link` in `head`: `rel=\"stylesheet\"`, `href`, optional `media`. `rel=\"preload\" as=\"style\"` for critical CSS.",
      "`<style>` is document-level CSS. Prefer one bundled file in apps.",
      "`style=\"color: red\"` is an attribute, not a class. Interviews: don’t build UIs with inline styles except dynamic one-offs.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Three styling hooks",
    code: `<head>
  <link rel="stylesheet" href="/app.css" />
  <style>
    .note { color: #1f2937; }
  </style>
</head>
<p class="note" style="margin-top: 0">Body copy</p>
`,
  },
  workedExamples: [
    {
      id: "csp",
      title: "Inline style vs Content-Security-Policy",
      about: "style-src 'unsafe-inline' is a security smell.",
      language: "html",
      code: `<!-- Often blocked under strict CSP -->
<p style="color: crimson">Alert</p>

<!-- Prefer classes from an allowed stylesheet -->
<p class="text-danger">Alert</p>
`,
    },
    {
      id: "media-link",
      title: "Conditional stylesheet",
      about: "media on link still downloads in modern browsers unless you use print or JS.",
      language: "html",
      code: `<link rel="stylesheet" href="/print.css" media="print" />
<link rel="stylesheet" href="/wide.css" media="(min-width: 960px)" />
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Styling belongs in CSS. HTML only points at stylesheets or carries an escape hatch.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`link rel=\"stylesheet\"` vs `rel=\"alternate stylesheet\"`. `disabled` on link. `@import` in CSS is slower than extra `link`. `scoped` style is dead; Shadow DOM encapsulates instead.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Inline styles break theming, dark mode, and CSP. Blocking CSS in `head` without care delays FCP.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "UA stylesheet < author sheets < inline style < !important. Classes beat tags. Specificity: inline is (1,0,0,0).",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Frameworks inject CSS modules or Tailwind classes, not `style=` for layout. Email HTML still uses inline styles because many clients strip `<style>`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Keep `link` in `head`. Avoid `@import`. Don’t duplicate huge `<style>` per component on the server without a strategy.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<style>` in `body` (works, messy). `align`/`bgcolor` presentational attributes (obsolete). Styling with `font` tags.",
    },
  ],
};
