import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlLinks: Topic = {
  slug: "html-links",
  title: "Links",
  technologySlug: "html",
  module: "HTML",
  order: 8,
  summary: "a[href], targets, download, rel, fragments, and when a link is actually a button.",
  prerequisites: ["html-inline"],
  related: ["html-button", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "An `a` element with `href` is a hyperlink: it navigates. Without `href` it is a placeholder, not a link. Don’t use `a` for in-page JS actions—that is a `button`.",
    beats: [
      "`href` can be URL, `mailto:`, `tel:`, or `#fragment`. Empty `href=\"\"` reloads the page.",
      "`target=\"_blank\"` requires `rel=\"noopener\"` (modern browsers default noopener, still set `noreferrer`/`noopener` in interviews).",
      "Link text must make sense out of context. Never “click here”. Images as links need `alt` that describes the destination.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Absolute, relative, fragment, new tab",
    code: `<a href="/roadmap">Roadmap</a>
<a href="#wcag">Skip to WCAG</a>
<a href="https://html.spec.whatwg.org/" rel="noopener noreferrer" target="_blank">
  HTML Standard
</a>
`,
  },
  workedExamples: [
    {
      id: "button-vs-link",
      title: "Link vs button",
      about: "Navigation vs action—the classic interview trap.",
      language: "html",
      code: `<!-- Navigates: use a link -->
<a href="/login">Sign in</a>

<!-- Does something on this page: use a button -->
<button type="button">Open dialog</button>

<!-- Bad: fake link -->
<a href="#" onclick="openModal()">Open dialog</a>
`,
    },
    {
      id: "skip-link",
      title: "Skip link and fragment",
      about: "id on the target, href with hash.",
      language: "html",
      code: `<a href="#main">Skip to content</a>
<main id="main" tabindex="-1">
  <h1>Dashboard</h1>
</main>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Links are the web. Interviews test `href`, accessibility of link text, and `target` security.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`rel` values: `nofollow`, `sponsored`, `ugc`, `next`/`prev`, `me`, `alternate`. `download` suggests a download (same-origin). `hreflang` hints language of the destination. `ping` is tracking—usually avoid.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "`target=_blank` without noopener allowed tab-nabbing historically. `href=\"#\"` pollutes history. Unusable link text fails WCAG 2.4.4.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Activation follows `href`. `mailto:` opens a mail client. In-page fragments scroll to `id` (or `name` on old `<a>`). SPA routers still should render real `href`s for open-in-new-tab.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Nav lists of `a`. Breadcrumbs. Card titles as links wrapping heading text. Footer legal links.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Visible focus styles. Don’t nest interactive content in `a`. Prefer full URLs in emails. Use `aria-current=\"page\"` on the active nav link.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<a onclick>` without href. `javascript:` URLs. `target=_blank` on every link. Links with only an icon and empty `alt`. `a` around a `button`.",
    },
  ],
};
