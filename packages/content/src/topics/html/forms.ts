import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlForms: Topic = {
  slug: "html-forms",
  title: "Form elements",
  technologySlug: "html",
  module: "HTML",
  order: 15,
  summary: "form, fieldset, legend, label, select, textarea, output, and how data is submitted.",
  prerequisites: ["html-button", "html-semantics"],
  related: ["html-input-types", "html-input-attributes", "html-aria"],
  levels: htmlLevels,
  isHighYield: true,
  figures: [
    {
      src: "/diagrams/html/html-form-anatomy.png",
      alt: "Form with fieldset, legend, labels associated to inputs, and a submit button",
      caption: "Labels, fieldsets, and controls",
    },
  ],
  interviewAnswer: {
    oneLiner:
      "A `form` groups controls, names them, and submits `name=value` pairs via `method` and `action`. Labels, fieldsets, and native validation beat custom divs with `onClick`.",
    beats: [
      "`method=\"get\"` puts fields in the query string; `post` puts them in the body. `enctype=\"multipart/form-data\"` is required for file uploads.",
      "Every control that should submit needs a `name`. `label for` must match `id`. `fieldset` + `legend` groups radio sets.",
      "`select`/`option`/`optgroup`, `textarea`, `datalist`, `output`, `progress`, `meter`. `form=\"id\"` associates a control outside the form.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Labeled form with fieldset",
    code: `<form action="/apply" method="post">
  <fieldset>
    <legend>Account</legend>
    <p>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required autocomplete="email" />
    </p>
    <p>
      <label for="role">Role</label>
      <select id="role" name="role">
        <option value="">Choose…</option>
        <option value="frontend">Frontend</option>
        <option value="fullstack">Full stack</option>
      </select>
    </p>
  </fieldset>
  <button type="submit">Apply</button>
</form>
`,
  },
  workedExamples: [
    {
      id: "label-wrapping",
      title: "Implicit vs explicit labels",
      about: "Both work; explicit `for`/`id` is clearer with complex layouts.",
      language: "html",
      code: `<!-- Implicit: control inside label -->
<label>
  Bio
  <textarea name="bio" rows="4"></textarea>
</label>

<!-- Explicit -->
<label for="bio">Bio</label>
<textarea id="bio" name="bio" rows="4"></textarea>
`,
    },
    {
      id: "multipart",
      title: "File upload encoding",
      about: "Missing enctype silently drops the file on many servers.",
      language: "html",
      code: `<form action="/avatar" method="post" enctype="multipart/form-data">
  <label for="file">Photo</label>
  <input id="file" name="avatar" type="file" accept="image/*" />
  <button type="submit">Upload</button>
</form>
`,
    },
    {
      id: "datalist-output",
      title: "datalist and output",
      about: "Suggestions without forcing a closed list; live computed values.",
      language: "html",
      code: `<label for="stack">Stack</label>
<input id="stack" name="stack" list="stacks" />
<datalist id="stacks">
  <option value="React"></option>
  <option value="Vue"></option>
</datalist>

<form oninput="sum.value = +a.value + +b.value">
  <input name="a" type="number" /> +
  <input name="b" type="number" /> =
  <output name="sum" for="a b">0</output>
</form>
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Forms are how HTML talks to servers. Interviews test names, methods, labels, and constraint validation—not just pretty inputs.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "`novalidate` skips built-in checks. `target` on form is like links. `autocomplete` on the form sets a default for children. Hidden inputs carry CSRF tokens and stable ids. `button` outside a form can still submit via `form=\"formId\"`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Unlabeled controls fail WCAG 1.3.1 / 4.1.2. GET vs POST changes caching, history, and PII in URLs. SPA apps still need native semantics even when `preventDefault` stops navigation.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "On submit the browser builds a form data set: successful controls (named, not disabled, checked radios/checkboxes). Constraint validation runs unless `novalidate` or `formnovalidate`. Enter in a text field often submits the first submit button.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Login, search (`role` search or `<search>` wrapping a GET form), multi-step wizards with one form or several. React: controlled inputs still need `name` if you ever fall back to native submit.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "One primary submit. Visible labels, not placeholder-only. Group related radios in a fieldset. Use GET for search so results are shareable. HTTPS for credentials.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Divs instead of `form`. Missing `name`. `label` with no `for` and no wrapping. Nested forms (invalid). `method` on the button only—`formmethod` exists but the form still needs a method default.",
    },
  ],
};
