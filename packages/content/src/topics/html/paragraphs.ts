import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlParagraphs: Topic = {
  slug: "html-paragraphs",
  title: "Paragraphs",
  technologySlug: "html",
  module: "HTML",
  order: 4,
  summary: "p, br, hr, pre, blockquote—and when a paragraph is the wrong element.",
  prerequisites: ["html-headings"],
  related: ["html-formatting", "html-block"],
  levels: htmlLevels,
  isHighYield: false,
  interviewAnswer: {
    oneLiner:
      "A `p` element represents a paragraph of phrasing content. Line breaks inside source collapse to spaces; use `br` only for meaningful breaks (addresses, poems), not for spacing.",
    beats: [
      "Do not wrap every sentence in `p` plus `br` for layout. Margin on `p` is CSS.",
      "`pre` preserves whitespace; `blockquote` cites a quotation (use `cite` / `footer` for attribution).",
      "Lists, headings, and form controls are not paragraphs. Don’t nest `p` in `p`.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Paragraphs vs breaks",
    code: `<p>HTML is for meaning. CSS is for layout.</p>
<address>
  Ada Lovelace<br />
  12 Analytical Engine Way
</address>
`,
  },
  workedExamples: [
    {
      id: "br-spacing",
      title: "br is not a spacer",
      about: "Why stacked br tags fail in interviews.",
      language: "html",
      code: `<!-- Bad -->
<p>Hello</p>
<br /><br /><br />
<p>World</p>

<!-- Good: CSS gap/margin -->
<div class="stack">
  <p>Hello</p>
  <p>World</p>
</div>
`,
    },
    {
      id: "blockquote",
      title: "blockquote with attribution",
      about: "cite attribute is a URL; visible credit is content.",
      language: "html",
      code: `<blockquote cite="https://html.spec.whatwg.org/">
  <p>The p element represents a paragraph.</p>
  <footer>— <cite>HTML Living Standard</cite></footer>
</blockquote>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Paragraphs are the default for running text. Misusing `br` and `p` is a classic markup smell.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`p` can contain phrasing content (`span`, `a`, `strong`), not other `p` or most flow sections. `hr` is a thematic break, not a visual line only. `pre` + `code` is for code samples.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Screen readers announce paragraph boundaries. Layout `br`s break zoom and translation. SEO prefers real text blocks.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Browsers imply `</p>` when a block starts inside a `p`. That’s why `<p><div>` is repaired. Don’t depend on error recovery.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Article body as a sequence of `p`. Use `ul`/`ol` for lists of items, not `p` + bullets in text.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "One idea per paragraph. `br` for postal addresses and poetry. `pre` for ASCII/code, never for “keep my Figma spacing”.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<p><h2>` (invalid). Empty `<p>&nbsp;</p>` for gaps. Using `p` around a `button` group. Forgetting that `p` cannot contain lists.",
    },
  ],
};
