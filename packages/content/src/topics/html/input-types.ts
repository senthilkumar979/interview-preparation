import type { Topic } from "../../types";
import { htmlLevels } from "./levels";

export const htmlInputTypes: Topic = {
  slug: "html-input-types",
  title: "Input types",
  technologySlug: "html",
  module: "HTML",
  order: 16,
  summary: "text, email, password, number, search, tel, url, date/time, file, checkbox, radio, hidden, and more.",
  prerequisites: ["html-forms"],
  related: ["html-input-attributes", "html-colors"],
  levels: htmlLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "`input type` chooses keyboard, validation, and UI. Wrong type is a mobile and a11y bug: emails need `email`, secrets need `password`, exclusive choices need `radio` with the same `name`.",
    beats: [
      "Text-like: `text`, `search`, `email`, `url`, `tel`, `password`, `number` (not for credit cards—use `text` + `inputmode`).",
      "Picks: `checkbox` (independent), `radio` (same `name`), `range`, `color`. Dates: `date`, `time`, `datetime-local`, `month`, `week`—support varies.",
      "`file`, `hidden`, `submit`/`reset`/`image`/`button`. Prefer `<button>` over `input type=submit` for content inside the control.",
    ],
  },
  codeExample: {
    language: "html",
    caption: "Common types with matching names",
    code: `<label for="q">Search</label>
<input id="q" name="q" type="search" />

<label for="mail">Email</label>
<input id="mail" name="email" type="email" autocomplete="email" />

<fieldset>
  <legend>Level</legend>
  <label><input type="radio" name="level" value="junior" /> Junior</label>
  <label><input type="radio" name="level" value="senior" /> Senior</label>
</fieldset>

<label><input type="checkbox" name="notify" value="1" /> Email me</label>
`,
  },
  workedExamples: [
    {
      id: "number-vs-tel",
      title: "number is not for IDs or phones",
      about: "Spinners, scientific notation, and leading zeros break identifiers.",
      language: "html",
      code: `<!-- Bad: employee id, OTP, credit card -->
<input type="number" name="otp" />

<!-- Better -->
<input type="text" name="otp" inputmode="numeric" autocomplete="one-time-code" />
<input type="tel" name="phone" autocomplete="tel" />
`,
    },
    {
      id: "file-accept",
      title: "file with accept and capture",
      about: "Hints the picker; never a security boundary.",
      language: "html",
      code: `<input type="file" name="resume" accept=".pdf,application/pdf" />
<input type="file" name="photos" accept="image/*" multiple />
<input type="file" name="selfie" accept="image/*" capture="user" />
`,
    },
    {
      id: "datetime",
      title: "datetime-local vs separate date and time",
      about: "Timezone is local; send ISO yourself if the API needs UTC.",
      language: "html",
      code: `<label for="when">Interview slot</label>
<input id="when" name="when" type="datetime-local" />

<label for="day">Day</label>
<input id="day" name="day" type="date" min="2026-01-01" />
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "The `type` attribute is the cheapest UX upgrade in HTML. It changes the virtual keyboard, built-in validation, and what gets submitted.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Unknown types fall back to `text`. `number` maps to a floating value; empty can be invalid with `required`. Checkboxes submit only when checked. Radio groups share `name`; one value is sent. `hidden` is still in the DOM and in the payload—not a secret.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Correct types help password managers, autofill, and screen readers. `type=\"email\"` gives format hints; it is not full RFC validation. Date widgets differ across browsers—always have a fallback story.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The UA applies a default `inputmode`, pattern-like checks for `email`/`url`, and a picker for date/color/file. Constraint validation API: `checkValidity()`, `:valid`/`:invalid`.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Login: `email` + `password`. Filters: `search`. Settings: checkbox. Quizzes: radio. Uploads: file. Feature flags admin: hidden ids.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Match `autocomplete` tokens to the type. Use `inputmode` when `type=text` is required. Don’t use `number` for anything that is not a quantity. Test date inputs on Safari.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Radios with unique `name`s (they don’t group). `type=text` for email on mobile. Using `range` without a visible numeric value. Assuming `file` `accept` blocks malicious uploads.",
    },
  ],
};
