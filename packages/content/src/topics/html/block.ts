import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlBlock: Topic = {
  slug: "html-block",
  title: "Block elements",
  technologySlug: "html",
  module: "HTML",
  order: 5,
  summary: "Flow / block-level boxes: they start on a new line and take available width by default.",
  prerequisites: ["html-paragraphs"],
  related: ["html-inline", "html-semantics"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-block-inline.png",
      alt: "Block elements stacking full width versus inline elements in a line",
      caption: "Block vs inline",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "In CSS terms, block-level boxes generate a block formatting context contribution: they stack vertically and stretch to the container’s width unless you change `display`. HTML’s “block elements” are the default rendering of most flow content (`div`, `p`, `ul`, `section`).",
    beats: [
      "HTML5 classifies content as flow vs phrasing, not strictly block vs inline—but interviews still use block/inline.",
      "Block containers can wrap other flow content. Putting a `div` inside a `p` is invalid; the parser will close the `p`.",
      "`display` can make a `span` behave like a block. Semantics stay with the tag, not the CSS.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Typical block-level structure",
    code: `<header>…</header>
<nav>…</nav>
<main>
  <article>
    <h1>Title</h1>
    <p>Body</p>
    <ul><li>Item</li></ul>
  </article>
</main>
<footer>…</footer>
`,
  },
  workedExamples: [
    {
      id: "p-div",
      title: "Why a div cannot live in a p",
      about: "Parser error recovery that changes your DOM.",
      language: "html",
      code: `<p>Hello <div>block</div> world</p>
<!-- Becomes roughly: <p>Hello </p><div>block</div> world<p></p> -->
`,
    },
    {
      id: "block-list",
      title: "Common block elements to name",
      about: "A recall list interviewers expect.",
      language: "html",
      code: `<!-- Document / sectioning -->
html, body, header, nav, main, article, section, aside, footer

<!-- Grouping -->
div, p, hr, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption

<!-- Forms / tables (also “block-ish” in default CSS) -->
form, fieldset, table
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Block vs inline is default CSS, taught in every HTML interview. Pair it with the HTML content model so you don’t nest illegally.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Flow content is the main document soup. Heading, sectioning, and grouping elements are block by default. `div` is the generic block with no meaning—use it for layout hooks when no semantic tag fits.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Illegal nesting, unexpected anonymous boxes, and “why is my span full width?” all come from this model.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "User-agent CSS sets `display: block` on these tags. Flex/grid children are blockified. `width: auto` block boxes fill the containing block.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Page chrome as sectioning blocks. Cards as `article` or `li`, not only `div`. Forms as `form` > `fieldset` > controls.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Never choose `div` when `main`/`nav`/`ul` is accurate. Don’t use extra wrapper `div`s until CSS needs a box.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Styling `span` as a column instead of using a block. `div` soup. Block elements inside `a` in old HTML4 (HTML5 allows flow in `a` if it is interactive-content valid—still don’t nest links or buttons).",
    },
  ],
};
