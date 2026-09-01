import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlElements: Topic = {
  slug: "html-elements",
  title: "HTML elements",
  technologySlug: "html",
  module: "HTML",
  order: 1,
  summary: "Tags, elements, the document tree, and how the browser builds a page.",
  prerequisites: [],
  related: ["html-attributes", "html-block", "html-semantics"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-document-tree.png",
      alt: "HTML document tree from html through head and body to nested content",
      caption: "Markup becomes a tree",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "An HTML element is a node in the document tree: usually an opening tag, optional content, and a closing tag. The browser parses markup into a DOM—not a visual layout.",
    beats: [
      "A tag is the syntax (`<p>`); the element is the DOM node including attributes and children.",
      "Void elements (`img`, `input`, `br`, `hr`, `meta`, `link`) have no closing tag and no children.",
      "Start from `<!DOCTYPE html>`, then `html` → `head` (metadata) and `body` (rendered content). Nesting must be valid: do not overlap tags.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Minimal valid document",
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PrepQuest</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is an element with a child text node.</p>
  </body>
</html>
`,
  },
  workedExamples: [
    {
      id: "tag-vs-element",
      title: "Tag vs element vs node",
      about: "What you type versus what ends up in the DOM.",
      language: "html",
      code: `<!-- You type tags -->
<p class="lead">Hello <strong>world</strong></p>

<!-- DOM: p element
       ├── text "Hello "
       └── strong element
             └── text "world" -->
`,
    },
    {
      id: "void-nesting",
      title: "Void elements and invalid nesting",
      about: "Interviewers catch overlapping tags and fake closers on void elements.",
      language: "html",
      code: `<!-- Valid void elements -->
<img src="/logo.webp" alt="PrepQuest" />
<input type="text" name="email" />
<br />

<!-- Invalid: overlapping -->
<p>Start <strong>bold</p></strong>

<!-- Invalid: closing a void element -->
<img src="/x.png" alt=""></img>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "HTML describes structure and meaning, not pixels. Interviews start here: can you name the document skeleton, distinguish tags from elements, and nest without breaking the tree?",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Elements are the building blocks. Container elements wrap content (`div`, `p`, `ul`). Void (empty) elements cannot have children. Custom elements exist in Web Components (`<my-card>`), but interviews expect the standard HTML vocabulary first. HTML is case-insensitive; write lowercase.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Invalid nesting, missing `lang`, and treating `div` as the only element are junior red flags. Screen readers, SEO, and CSS all consume this tree.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The parser tokenizes tags, builds a DOM, then CSSOM + layout. A missing `</p>` is auto-closed in many cases—do not rely on that. `head` is not rendered; `body` is. Comments (`<!-- -->`) are in the DOM as comment nodes but are not shown.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Every page: doctype, `html lang`, `head` with charset and title, `body` with a heading outline. Prefer semantic elements over anonymous `div`/`span` when the meaning exists in HTML.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Always set `lang` on `html`. Put `charset` in the first 1024 bytes. One `h1` that matches the page purpose. Validate nesting. Use the living standard (WHATWG), not XHTML myths (`/>` is allowed in HTML5 but not required except in SVG/MathML).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Putting visible content in `head`. Nesting interactive elements. Using `div` for everything. Forgetting that whitespace in inline contexts collapses. Assuming the file extension `.html` is required for the parser—`Content-Type: text/html` is.",
    },
  ],
};
