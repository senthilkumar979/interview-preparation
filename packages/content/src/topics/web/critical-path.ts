import { webTopic } from "./factory";

export const webCriticalRenderingPath = webTopic({
  slug: "web-critical-rendering-path",
  title: "Critical rendering path",
  order: 9,
  summary: "The minimum HTML/CSS/JS that blocks first paint — and how to shorten it.",
  prerequisites: ["web-rendering-pipeline"],
  related: ["web-cdn", "javascript-dom"],
  isHighYield: true,
  oneLiner:
    "The critical rendering path is the chain of downloads and work required before the first meaningful paint: HTML, render-blocking CSS, and any JS that blocks parse. You shorten it with fewer blocking resources, preload of key assets, inlining tiny critical CSS, and `defer`/`async`/modules for scripts.",
  beats: [
    "First paint needs DOM + CSSOM for the viewport (plus webfonts if text is shown).",
    "`async` scripts do not block HTML parse but run whenever they finish (order not guaranteed). `defer` and `type=module` wait for parse, then run in order.",
    "Preload (`<link rel=preload>`) fetches early without blocking like a stylesheet unless you misuse it.",
  ],
  intro: "Pipeline names the stages. CRP asks: what is on the critical path for *this* page’s first paint?",
  why: "LCP and FCP interviews. “Why did we inline CSS in the head?”",
  concept:
    "Everything not required for first viewport paint should be delayed: below-the-fold images, analytics, chat widgets. HTTP/2 helps multiplexing but does not make blocking CSS free.",
  how: "Measure with Lighthouse and a performance trace. Identify blocking CSS/JS. Split CSS; preload hero image and font with `font-display`. Server-timing and CDN TTFB are part of the path too.",
  usage: "Landing pages, SSR shells, marketing sites.",
  extras: [
    {
      key: "blocking",
      title: "What blocks first paint",
      body: "HTML document (must start). CSS in head that applies to the viewport. Sync scripts in head. Fonts if you wait to paint text. Slow TTFB (DNS/TLS/server). Images do not block HTML parse; they can delay LCP.",
    },
  ],
  practices: "Defer non-critical JS. Preload LCP image. Avoid `@import` in CSS. Keep the document small enough to parse quickly.",
  mistakes: "Preloading everything (contends with critical bytes). Giant inlined CSS. Sync scripts at the top of `<head>`.",
  language: "html",
  code: `<link rel="preload" as="image" href="/hero.webp" />
<link rel="stylesheet" href="/critical.css" />
<script type="module" src="/app.js"></script>
`,
  examples: [
    {
      id: "async-defer",
      title: "async vs defer",
      about: "Both download in parallel with parse; execution timing differs.",
      language: "html",
      code: `<script src="/analytics.js" async></script>
<script src="/app.js" defer></script>
`,
    },
  ],
});
