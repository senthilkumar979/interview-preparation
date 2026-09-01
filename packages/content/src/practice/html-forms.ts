import type { PracticeSet } from "./types";

export const htmlFormsPractice: PracticeSet = {
  topicSlug: "html-forms",
  title: "HTML forms",
  summary: "Labels, methods, and native validation.",
  timedSeconds: 120,
  questions: [
    {
      id: "q1",
      prompt: "The accessible name for an input is best associated with:",
      options: [
        { id: "a", label: "`<label for>` matching the input `id`, or wrapping the control", isCorrect: true },
        { id: "b", label: "Placeholder text only", isCorrect: false },
        { id: "c", label: "A nearby `<p>` with no programmatic link", isCorrect: false },
      ],
      explanation: "Placeholder is a hint, not a label. `for`/`id` or wrapping is the spec pattern.",
      seconds: 60,
    },
  ],
  preview: {
    id: "preview-form",
    title: "Sandbox: labeled field",
    prompt: "Edit markup/CSS. Preview runs in a sandboxed iframe (scripts allowed, not same-origin).",
    html: `<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Join</button>
</form>`,
    css: `form { font: 16px/1.4 system-ui; display: grid; gap: 8px; max-width: 16rem; }
button { background: #edae49; border: 0; padding: 8px 12px; border-radius: 8px; }`,
    js: "",
  },
  badPractice: {
    id: "bad-div-btn",
    title: "Bad Practice Finder",
    prompt: "What fails interview-level HTML here?",
    language: "html",
    snippet: `<div onclick="submit()">Save</div>
<input placeholder="Email">`,
    options: [
      { id: "p1", label: "Div is not a focusable submit control; no keyboard semantics", isCorrect: true },
      { id: "p2", label: "Placeholder used as the only label", isCorrect: true },
      { id: "p3", label: "`type=\"email\"` is illegal", isCorrect: false },
    ],
    explanation: "Use `<button type=\"submit\">` and a real `<label>`.",
  },
};
