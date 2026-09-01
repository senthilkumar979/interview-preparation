import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlButton: Topic = {
  slug: "html-button",
  title: "Button",
  technologySlug: "html",
  module: "HTML",
  order: 10,
  summary: "button types, default submit behavior, disabled, and why div-click is wrong.",
  prerequisites: ["html-inline"],
  related: ["html-links", "html-forms", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "`button` is for actions. Default `type` inside a form is `submit`—always set `type=\"button\"` for non-submit actions. A `div` with `onclick` is not a button.",
    beats: [
      "`type=\"submit\" | \"reset\" | \"button\"`. Missing type in a form submits and reloads.",
      "Native keyboard: Enter/Space, focus ring, form association. `disabled` removes it from the tab order.",
      "Accessible name from text content, `aria-label`, or `aria-labelledby`. Icon-only buttons need a name.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Explicit types",
    code: `<form action="/save" method="post">
  <button type="submit">Save</button>
  <button type="reset">Reset</button>
  <button type="button" id="preview">Preview</button>
</form>
`,
  },
  workedExamples: [
    {
      id: "default-submit",
      title: "The implicit submit trap",
      about: "A “cancel” button that still posts the form.",
      language: "html",
      code: `<form method="post">
  <!-- This SUBMITS because type defaults to submit -->
  <button>Cancel</button>
</form>

<form method="post">
  <button type="button">Cancel</button>
  <button type="submit">Save</button>
</form>
`,
    },
    {
      id: "icon-button",
      title: "Icon-only button name",
      about: "Visible text or aria-label is required.",
      language: "html",
      code: `<button type="button" aria-label="Close">
  <svg aria-hidden="true" focusable="false" width="16" height="16">…</svg>
</button>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Buttons vs links vs fake clickable divs is one of the highest-frequency HTML interview topics.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`button` can contain phrasing content (and in HTML5 more), but not interactive descendants. `input type=\"submit\"` is a replaced button with a `value` as label—prefer `<button>` for richer content.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Wrong `type` causes accidental submits. Div-buttons fail keyboard and SR. `disabled` vs `aria-disabled` (latter can still be focusable—know the difference).",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "In a form, submit buttons include their `name`/`value` in the payload. `formaction`, `formmethod`, `formenctype`, `formtarget`, `formnovalidate` override the form on that button.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Primary submit, secondary type=button, destructive with confirm. `menu` buttons toggle `aria-expanded`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Always set `type`. Visible label. Don’t disable submit without explaining why. Keep hit area ≥ 24px (WCAG 2.5.8 target size).",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`<div role=\"button\">` without keyboard handlers. Nested buttons. `button` wrapping a whole card that also contains links. Relying on `onclick` only.",
    },
  ],
};
