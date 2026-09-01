import { webTopic } from "./factory";

export const webRenderingPipeline = webTopic({
  slug: "web-rendering-pipeline",
  title: "Rendering pipeline",
  order: 8,
  summary: "Bytes to pixels: parse, DOM, CSSOM, render tree, layout, paint, composite — each stage.",
  prerequisites: ["web-browser-architecture"],
  related: ["web-critical-rendering-path", "css-cascade", "html-elements"],
  isHighYield: true,
  oneLiner:
    "The renderer turns HTML/CSS/JS into frames: tokenize HTML → DOM; parse CSS → CSSOM; combine into a render tree; layout (reflow) assigns geometry; paint records draw lists; composite (and GPU) turns layers into pixels. JS and fonts can stall or invalidate earlier stages.",
  beats: [
    "DOM is the content tree; CSSOM is the style rules tree; neither is what you see until layout and paint.",
    "Layout is geometry (expensive). Paint is pixels per layer. Composite can scroll some layers without re-layout.",
    "Changing `left`/`top` or reading `offsetHeight` mid-script can force synchronous layout (thrashing).",
  ],
  intro: "This is the renderer’s inner pipeline. Architecture was processes; this is stages on the renderer main thread (plus compositor).",
  why: "Every performance interview about CLS, INP, or “why did this CSS jank” maps onto a stage you can name.",
  concept:
    "Incremental and speculative: HTML can yield a partial DOM and first paint before the document is complete. Preload scanner tokenizes ahead for `img`/`script`/`link`. JS `document.write` can wreck the speculation.",
  how: "Network bytes → encoding → tokenizer → tree builder → style → layout → paint → compositor commit → GPU. Invalidations mark dirty subtrees so later frames skip clean work.",
  usage: "DevTools Performance panel: purple (layout), green (paint), gray (composite). CSS `will-change` and transforms as compositor-only hints (use sparingly).",
  extras: [
    {
      key: "bytes",
      title: "1. Bytes and decoding",
      body: "The network process delivers a byte stream with a MIME type (`text/html`) and charset (`Content-Type` or `<meta charset>` — put charset in the first 1024 bytes). The renderer decodes to Unicode. Compression (gzip/br) was already stripped.",
    },
    {
      key: "parse-html",
      title: "2. HTML parse → DOM",
      body: "Tokenizer emits start/end tags, text, comments. Tree builder builds the DOM, running the adoption agency and foster parenting for broken markup. `script` without `defer`/`async`/`type=module` blocks the tokenizer until the script fetches (unless already loaded) and runs — so later HTML is not in the DOM yet. `defer`/`module` run after the document is parsed, in order.",
    },
    {
      key: "parse-css",
      title: "3. CSS parse → CSSOM",
      body: "CSS is parsed into a CSSOM (rules, selectors, cascade inputs). `@import` is extra network and delays the CSSOM. Render-blocking: the parser may pause first paint until CSS in the `<head>` is available so you do not flash unstyled content (FOUC). Media-query-mismatched stylesheets can be non-blocking.",
    },
    {
      key: "render-tree",
      title: "4. Render tree (style)",
      body: "Style resolution matches selectors, runs the cascade and inheritance, computes used values. The render/accessibility-relevant tree typically omits `display: none` (not in layout) but includes visually empty boxes that still take space. `visibility: hidden` is in the tree, just not painted. This stage is “recalc style” in traces.",
    },
    {
      key: "layout",
      title: "5. Layout (reflow)",
      body: "For each box: containing block, width/height, position, line wrapping, flex/grid algorithms, scrollable overflow. Output is a box tree with coordinates. Geometry changes (content, fonts, window size, inserting DOM) invalidate layout. Reading layout APIs (`getBoundingClientRect`, `offsetWidth`) can flush pending layout synchronously.",
    },
    {
      key: "paint",
      title: "6. Paint",
      body: "Walks the layout tree and records drawing: backgrounds, borders, text, images, outlines. Painting is often split by layers. Changing color may paint without layout; changing width does both. Paint order follows stacking contexts (z-index, opacity, transforms).",
    },
    {
      key: "composite",
      title: "7. Composite",
      body: "Layers (compositor layers) are rasterized into tiles, then combined with GPU textures. Transforms, opacity, and some filters on their own layer can animate on the compositor thread — scrolling can avoid the main thread if nothing else is dirty. Too many layers wastes memory; too few forces main-thread paint on scroll.",
    },
    {
      key: "js-fonts",
      title: "JS, images, and fonts in the pipeline",
      body: "JS can mutate DOM/CSS at any time and restart style/layout/paint. Images decode async; they may cause reflow if sizes were not reserved (CLS). Web fonts: FOIT/FOUT depending on `font-display`; late fonts retrigger layout of text.",
    },
  ],
  practices: "Reserve image sizes. Batch DOM writes. Prefer transform/opacity for animation. Avoid layout reads mixed into write loops.",
  mistakes: "Calling the DOM “what you see.” Animating `top`/`left` for 60fps. Forgetting that `display:none` skips layout. Thinking paint and composite are the same.",
  figures: [
    {
      src: "/diagrams/web/web-rendering-pipeline.png",
      alt: "Pipeline from HTML bytes through DOM CSSOM render tree layout paint composite",
      caption: "Renderer pipeline stages",
    },
  ],
  language: "html",
  code: `<link rel="stylesheet" href="/app.css" />
<script src="/app.js" defer></script>
`,
  examples: [
    {
      id: "thrash",
      title: "Layout thrashing",
      about: "Read after write in a loop forces extra layouts.",
      language: "javascript",
      code: `for (const el of els) {
  el.style.width = "100px";      // write
  total += el.offsetWidth;       // forced layout
}
`,
    },
    {
      id: "composite",
      title: "Compositor-friendly motion",
      about: "Transform instead of left.",
      language: "css",
      code: `.toast { transform: translateY(0); transition: transform 200ms; }
.toast.is-out { transform: translateY(100%); }
`,
    },
  ],
});
