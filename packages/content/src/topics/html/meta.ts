import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlMeta: Topic = {
  slug: "html-meta",
  title: "Meta tags",
  technologySlug: "html",
  module: "HTML",
  order: 13,
  summary: "charset, viewport, description, robots, Open Graph, theme-color, and http-equiv.",
  prerequisites: ["html-elements"],
  related: ["html-semantics", "html-styling"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "`meta` and `title` live in `head`. They do not render. Charset and viewport must be correct or you get mojibake and a “tiny page” on mobile.",
    beats: [
      "`<meta charset=\"utf-8\">` first in `head`. `<title>` is required for usability and SEO.",
      "`viewport` `width=device-width, initial-scale=1` is the modern default. Don’t disable zoom (`user-scalable=no`)—it harms a11y.",
      "SEO: `description`. Social: `og:title`, `og:image` (`property`). `robots` `noindex` when needed. `theme-color` for UI chrome.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Essential head",
    code: `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Closures — PrepQuest</title>
  <meta name="description" content="Live bindings, not snapshots." />
  <meta property="og:title" content="Closures" />
  <meta name="theme-color" content="#edae49" />
</head>
`,
  },
  workedExamples: [
    {
      id: "http-equiv",
      title: "http-equiv refresh is a trap",
      about: "Prefer HTTP headers; refresh can break history and a11y.",
      language: "html",
      code: `<!-- Avoid for redirects -->
<meta http-equiv="refresh" content="0;url=/new" />

<!-- Prefer 301/302 from the server -->
`,
    },
    {
      id: "robots",
      title: "robots and referrer",
      about: "Indexing and privacy knobs.",
      language: "html",
      code: `<meta name="robots" content="noindex, nofollow" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "If `head` is wrong, the body never gets a fair chance. Interviews expect charset, viewport, title, and OG basics.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`meta` uses `name`+`content` or `property`+`content` (OG) or `http-equiv`+`content` or `charset`. `link rel=\"icon\"`, `canonical`, `manifest`. `base href` changes relative URLs—use sparingly.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Missing viewport = horizontal scroll on phones. Duplicate title/description across pages weakens SEO. `noindex` accidentally shipped to production is a disaster.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Crawlers and social scrapers read `head` without executing much JS—SSR or prerender titles. Charset sniffing is limited; declare it early.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Next.js `generateMetadata`. Per-route titles. Preview images 1200×630 for OG.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Unique title ~50–60 chars. Description as a pitch, not keyword stuffing. Don’t block zoom. HTTPS canonical URLs.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`charset` in the middle of `head`. `viewport` maximum-scale=1. Empty title. HTTP-equiv content-type instead of charset. Forgetting `lang` on `html` (not a meta tag, still required).",
    },
  ],
};
