import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlHeadings: Topic = {
  slug: "html-headings",
  title: "Headings",
  technologySlug: "html",
  module: "HTML",
  order: 3,
  summary: "h1–h6 as an outline, not a font size picker.",
  prerequisites: ["html-elements"],
  related: ["html-paragraphs", "html-semantics"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-headings.png",
      alt: "Nested heading outline from h1 through h2 and h3 without skipped levels",
      caption: "Headings are an outline",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "Headings `h1`–`h6` define the document outline. Rank is meaning, not appearance—CSS can style a visual size without changing the heading level.",
    beats: [
      "Do not skip levels for look (`h1` then `h4`). Screen readers announce the rank.",
      "One primary `h1` per page (or per distinct view) that names the page. Sectioning content can contain its own headings.",
      "`hgroup` groups a heading plus subheading (`p`) without creating extra outline entries for the subtitle.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "A sensible outline",
    code: `<main>
  <h1>Interview prep</h1>
  <section>
    <h2>HTML</h2>
    <h3>Headings</h3>
    <h3>Forms</h3>
  </section>
  <section>
    <h2>CSS</h2>
  </section>
</main>
`,
  },
  workedExamples: [
    {
      id: "skip-levels",
      title: "Do not skip ranks for styling",
      about: "Why h1 → h4 is an a11y and SEO smell.",
      language: "html",
      code: `<!-- Bad: skipped h2/h3 because “it looked smaller” -->
<h1>Dashboard</h1>
<h4>Revenue</h4>

<!-- Good: correct rank, CSS for size -->
<h1>Dashboard</h1>
<h2 class="text-sm">Revenue</h2>
`,
    },
    {
      id: "hgroup",
      title: "Subheading with hgroup",
      about: "A subtitle should not be another h1/h2.",
      language: "html",
      code: `<hgroup>
  <h1>Closures</h1>
  <p>Live bindings, not snapshots</p>
</hgroup>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Heading rank is one of the first things accessibility reviewers and SEO crawlers read. Treat it as structure.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`h1`–`h6` are ranking, not six fonts. There is no `h7`. `header` is not a heading. Using `role=\"heading\"` plus `aria-level` is for cases HTML cannot express—prefer real heading tags.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Keyboard and SR users jump by heading. Google uses headings as hints. Designers changing font size in Figma is not a reason to change the tag.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The outline is implied by heading rank in tree order. HTML5’s old “outline algorithm” for `section` resetting `h1` is not how browsers expose headings today—use explicit ranks.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Page title as `h1`. Major regions as `h2`. Subsections `h3`. Card titles inside a list are often `h3` under a section `h2`, not another `h1`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Don’t use headings only for bold. Don’t put headings inside `button` as the only label without a text alternative. Keep heading text unique when possible.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Multiple unrelated `h1`s. Styling `p` to look like `h1`. Empty headings. Using `h1` in every React card because “it’s the title of the card”.",
    },
  ],
};
