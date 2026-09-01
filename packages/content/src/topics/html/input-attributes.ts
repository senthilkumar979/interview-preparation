import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlInputAttributes: Topic = {
  slug: "html-input-attributes",
  title: "Input attributes",
  technologySlug: "html",
  module: "HTML",
  order: 17,
  summary: "name, value, required, min/max, pattern, autocomplete, disabled vs readonly, and constraint validation.",
  prerequisites: ["html-input-types"],
  related: ["html-forms", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "Attributes configure validation, autofill, and what is submitted. `disabled` controls are skipped; `readonly` still submit. `required` and `pattern` are UX, not security.",
    beats: [
      "`name` + `value` build the payload. `checked`/`selected` set defaults. `placeholder` is a hint, not a label.",
      "Constraints: `required`, `min`/`max`/`step`, `minlength`/`maxlength`, `pattern`, `multiple`. `title` can explain `pattern` to some browsers.",
      "`autocomplete` tokens (`name`, `email`, `current-password`). `disabled` vs `readonly` vs `aria-disabled`. `inputmode` and `enterkeyhint` for mobile.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Constraints and autocomplete",
    code: `<label for="pwd">Password</label>
<input
  id="pwd"
  name="password"
  type="password"
  required
  minlength="10"
  autocomplete="current-password"
  aria-describedby="pwd-hint"
/>
<p id="pwd-hint">At least 10 characters.</p>
`,
  },
  workedExamples: [
    {
      id: "disabled-readonly",
      title: "disabled vs readonly",
      about: "Only readonly values are posted.",
      language: "html",
      code: `<input name="locked" value="nope" disabled />
<input name="visible" value="yes" readonly />
<!-- Submit includes visible=yes only -->
`,
    },
    {
      id: "pattern",
      title: "pattern is a full-string regex",
      about: "Anchors are implied; flags are not JS flags.",
      language: "html",
      code: `<label for="slug">Slug</label>
<input
  id="slug"
  name="slug"
  required
  pattern="[a-z0-9-]+"
  title="Lowercase letters, numbers, and hyphens"
/>
`,
    },
    {
      id: "min-step",
      title: "number min, max, step",
      about: "step mismatch makes the control :invalid even if it looks fine.",
      language: "html",
      code: `<label for="xp">XP</label>
<input id="xp" name="xp" type="number" min="0" max="100" step="5" value="10" />
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Types pick the widget; attributes pick the rules. Senior answers mention constraint validation and autofill tokens by name.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`formaction`/`formenctype`/`formmethod`/`formnovalidate`/`formtarget` on submit buttons override the form. `dirname` submits text direction. `list` points at a `datalist`. `size` is visual for text, not max length.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Wrong `autocomplete` breaks password managers. `disabled` fields disappearing from POST is a classic “why is the id null” bug. Client `required` is trivial to bypass.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Constraint validation: if a control is suffering, submit is cancelled and the UA shows a message unless `novalidate`. `setCustomValidity` adds app-specific errors. CSS `:user-invalid` is kinder than `:invalid` on first paint.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Auth forms: autocomplete + required. Quantity: min 1. Promo codes: pattern. Search: no required, `name=q`.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Describe errors with `aria-describedby` / `aria-invalid` after submit. Keep `maxlength` aligned with the database. Never use `placeholder` as the only label.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "`required` on a checkbox meaning “must stay checked” without a message. `pattern` copied from JS with `^$` doubled. `autocomplete=off` fighting the browser. Styling away the invalid outline without another cue.",
    },
  ],
};
