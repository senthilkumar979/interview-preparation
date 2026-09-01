import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlInline: Topic = {
  slug: "html-inline",
  title: "Inline elements",
  technologySlug: "html",
  module: "HTML",
  order: 6,
  summary: "Phrasing content that flows with text: span, a, img, strong, input in a line.",
  prerequisites: ["html-block"],
  related: ["html-formatting", "html-links"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-block-inline.png",
      alt: "Inline elements sitting in a line of text next to stacked block boxes",
      caption: "Inline sits in the line",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Inline (phrasing) elements sit in the text flow. They do not, by default, start a new line or take full width. `span` is the generic inline box with no meaning.",
    beats: [
      "Replaced inlines (`img`, `iframe`, `video`, form controls) have intrinsic size; they still participate as inline-level unless `display` changes.",
      "You cannot put a `p` or `div` inside `span`. Phrasing content only.",
      "Whitespace between inline boxes matters; newlines in source can become spaces.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Phrasing content in a paragraph",
    code: `<p>
  Read the <a href="/html-links">links</a> lesson,
  then <strong>practice</strong>
  <img src="/star.svg" alt="" width="12" height="12" />
</p>
`,
  },
  workedExamples: [
    {
      id: "inline-gap",
      title: "Source whitespace between inlines",
      about: "Why two buttons have a gap you didn’t put in CSS.",
      language: "html",
      code: `<!-- Gap from the newline/space between tags -->
<button type="button">One</button>
<button type="button">Two</button>

<!-- No gap: no whitespace in source -->
<button type="button">One</button><button type="button">Two</button>
`,
    },
    {
      id: "inline-list",
      title: "Common inline / phrasing elements",
      about: "Name these under pressure.",
      language: "html",
      code: `a, span, strong, em, mark, small, code, kbd, samp, var,
abbr, time, data, q, cite, b, i, u, s, sub, sup, br, wbr,
img, picture, svg (in HTML), iframe, object,
input, textarea, select, button, label, output, meter, progress
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Inline vs block is default presentation. Phrasing vs flow is the HTML nesting rule. Interviews want both vocabularies.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`span` is to inline what `div` is to block: no semantics. Prefer `strong`/`em`/`a`/`time` when they match. `display: inline-block` is CSS, not an HTML category.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Invalid phrasing nesting, mystery gaps, and using `span` for buttons (not keyboard accessible) show up in reviews.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Inline boxes are laid out in line boxes. Images sit on the baseline by default (`vertical-align`). `br` forces a line break inside phrasing content.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Links, emphasis, icons beside labels, `code` in sentences, `label` + `input` on one line.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Don’t use `span`+click instead of `button`. Don’t stretch inlines with CSS when you needed a block. Keep `alt` on inline images.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<span><p>` invalid. `a` wrapping `a`. Setting width on `span` without `display` change and wondering why it is ignored (non-replaced inlines ignore width/height).",
    },
  ],
};
