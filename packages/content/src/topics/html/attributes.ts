import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlAttributes: Topic = {
  slug: "html-attributes",
  title: "Attributes",
  technologySlug: "html",
  module: "HTML",
  order: 2,
  summary: "Global attributes, boolean attributes, data-* and how names map to the DOM.",
  prerequisites: ["html-elements"],
  related: ["html-input-attributes", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "Attributes are name/value metadata on an element. Some are global (`id`, `class`, `hidden`); some are element-specific (`href`, `src`). Boolean attributes are true when present.",
    beats: [
      "`id` must be unique in the document. `class` is a space-separated list. `data-*` is for custom data, not `data_name`.",
      "Boolean attributes: `disabled`, `required`, `checked`, `hidden`. Write `disabled` or `disabled=\"disabled\"`—never `disabled=\"false\"` (that is still true).",
      "HTML is case-insensitive for attribute names; `className` in JS is the DOM property, `class` is the attribute.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Global and boolean attributes",
    code: `<button id="save" class="btn primary" type="button" disabled hidden>
  Save
</button>
<p title="Native tooltip" data-user-id="42">Hover me</p>
`,
  },
  workedExamples: [
    {
      id: "boolean-false",
      title: "Boolean attributes are not strings",
      about: "Why disabled=\"false\" still disables the control.",
      language: "html",
      code: `<!-- Still disabled: the attribute is present -->
<button type="button" disabled="false">Looks enabled, is not</button>

<!-- Actually enabled -->
<button type="button">Send</button>
`,
    },
    {
      id: "data-attr",
      title: "data-* vs invalid custom attributes",
      about: "dataset in JavaScript comes from data-* only.",
      language: "html",
      code: `<article data-post-id="89" data-published="true">...</article>
<!-- element.dataset.postId === "89" -->

<!-- Avoid: made-up attributes without data- -->
<article postid="89">...</article>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Attributes configure elements: identity, state, and behavior. Interviews mix HTML attributes with the DOM API (`getAttribute` vs properties).",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Global attributes include `id`, `class`, `style`, `title`, `lang`, `dir`, `hidden`, `tabindex`, `contenteditable`, `draggable`, `spellcheck`, `accesskey`, `inert`, and event handler names (`onclick`—prefer JS listeners). Element-specific attributes live on that element's interface (`a[href]`, `img[alt]`).",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Duplicate ids break `getElementById` and fragment links. `tabindex=\"1\"` wrecks keyboard order. `style` attributes fight the cascade.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The parser stores attributes on the element. Some reflect as properties (`id`, `hidden`). `class` reflects as `className` / `classList`. Unknown attributes are still in the DOM and can be read with `getAttribute`.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Use `id` for skip links and label `for`. Use `class` for CSS and tests. Use `data-*` for progressive enhancement hooks. Prefer `hidden` or CSS over `display:none` inline when you mean “not relevant”.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "One `id` per document. No inline `onclick`. Do not use `tabindex` greater than 0. Quote attribute values. Prefer properties in JS (`el.hidden = true`) when they exist.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`id` starting with a number in old CSS. Spaces in `id`. Using `name` on a `div`. Assuming `hidden=\"false\"` shows the element. Confusing `contenteditable` with a form control.",
    },
  ],
};
