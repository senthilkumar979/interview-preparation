import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlSemantics: Topic = {
  slug: "html-semantics",
  title: "Semantics",
  technologySlug: "html",
  module: "HTML",
  order: 14,
  summary: "header, nav, main, article, section, aside, footer, figure—landmarks with meaning.",
  prerequisites: ["html-block", "html-headings"],
  related: ["html-aria", "html-wcag"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-landmarks.png",
      alt: "Page wireframe labeled header, nav, main, aside, and footer",
      caption: "Landmark regions",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Semantic HTML names regions and articles so browsers, SRs, and crawlers know what the box is for—without ARIA. `div` has no role; `nav` does.",
    beats: [
      "Landmarks: `header`, `nav`, `main` (one per page), `aside`, `footer`. `search` exists as an element in modern HTML.",
      "`article` is independently syndicatable (blog post, comment, card with complete meaning). `section` is a thematic grouping with a heading.",
      "Don’t wrap the whole page in `article`. Don’t use `section` as a styled `div` without a heading.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Landmark skeleton",
    code: `<body>
  <header>
    <p>PrepQuest</p>
    <nav aria-label="Primary">…</nav>
  </header>
  <main>
    <article>
      <h1>Semantics</h1>
      <p>…</p>
    </article>
    <aside>Related tracks</aside>
  </main>
  <footer>© 2026</footer>
</body>
`,
  },
  workedExamples: [
    {
      id: "article-vs-section",
      title: "article vs section vs div",
      about: "The triad interviewers love.",
      language: "html",
      code: `<!-- Complete piece of content -->
<article>
  <h2>Why closures matter</h2>
  <p>…</p>
</article>

<!-- Thematic group, needs heading -->
<section>
  <h2>Examples</h2>
  …
</section>

<!-- No meaning, layout only -->
<div class="grid">…</div>
`,
    },
    {
      id: "multiple-nav",
      title: "Label multiple navs",
      about: "Two navs without names are ambiguous.",
      language: "html",
      code: `<nav aria-label="Primary">…</nav>
<nav aria-label="Footer">…</nav>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Semantics is the difference between a website and a pile of boxes. It is the core of “accessible by default”.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Also: `address`, `figure`, `time`, `search`, `hgroup`, `menu` (semantic list of commands). Tables: `table`, `thead`, `th scope`. Lists: `ul`/`ol`/`dl`—don’t fake lists with `div`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "SR rotor lists landmarks. SEO uses structure. Keyboard users skip to `main`. ARIA is a last resort when HTML cannot express it.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Each semantic tag maps to an implicit ARIA role (`nav` → `navigation`, `main` → `main`). Duplicate landmarks should be distinguished with names.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "App shell: header/nav/main/footer. Blog: article. Dashboard widgets: often `section` with `h2`, not nested `main`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Exactly one `main`. Don’t nest `main`. Headings inside sections. Prefer lists for navigation links.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<section>` for every CSS box. `header` inside every card unnecessarily. Using `aside` for primary content. `div role=main` instead of `main`.",
    },
  ],
};
