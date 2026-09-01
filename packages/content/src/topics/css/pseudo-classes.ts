import type { Topic } from "../../types";
import { cssLevels } from "./levels";

export const cssPseudoClasses: Topic = {
  slug: "css-pseudo-classes",
  title: "Pseudo-classes",
  technologySlug: "css",
  module: "CSS",
  order: 25,
  summary: "State, structure, input, linguistic, and functional pseudo-classes.",
  prerequisites: ["css-selectors"],
  related: ["css-pseudo-elements", "css-focus"],
  levels: cssLevels,
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "A pseudo-class selects an element in a particular state or relation (`:hover`, `:nth-child`, `:disabled`) without extra markup. It counts as a class for specificity (except `:where()`, and `:is()`/`:not()`/`:has()` take the max of their arguments).",
    beats: [
      "User action: `:hover` `:active` `:focus` `:focus-visible` `:focus-within`.",
      "Structural: `:first-child` `:last-child` `:nth-child()` `:only-of-type` `:empty`.",
      "Input: `:checked` `:disabled` `:required` `:valid` `:user-invalid` `:placeholder-shown`.",
    ],
  },
  codeExample: {
    language: "css",
    caption: "Interactive + structural",
    code: `a:hover { text-decoration-thickness: 2px; }

.list > :nth-child(odd) { background: #fffdf8; }

input:user-invalid {
  outline: 2px solid crimson;
}

form:has(:invalid:not(:placeholder-shown)) .hint {
  display: block;
}
`,
  },
  workedExamples: [
    {
      id: "nth",
      title: "nth-child vs nth-of-type",
      about: "Child counts all siblings; of-type counts that tag.",
      language: "css",
      code: `p:nth-child(2) {}     /* second child, and it must be a p */
p:nth-of-type(2) {}   /* second p among siblings */
:nth-child(2 of .card) {} /* An+B of S */
`,
    },
    {
      id: "where",
      title: ":is and :not",
      about: "Forgiving lists; :not(.a, .b) is not :not(.a):not(.b) in older mental models—modern :not() accepts lists.",
      language: "css",
      code: `:is(h1, h2, h3):not(.hero) { line-height: 1.2; }
`,
    },
  ],
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Pseudo-classes are the CSS way to react to state. Pair them with ARIA only when HTML state does not exist.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "They never match a different element than the subject (except `:has()`, which still styles the subject). Location `:any-link` `:link` `:visited` (visited is privacy-limited). Linguistic `:lang()` `:dir()`. Shadow `:host` `:host-context()`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Hover-only affordances fail on touch. `:visited` styling is restricted. `:has()` replaced a generation of JS parent selectors.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The engine invalidates style when state changes. `:has()` is powerful and can be slower; keep it shallow.",
    },
    {
      key: "pc-user",
      title: "User-action and location",
      body: "`:hover` — pointing device over the element (and often ancestors). Unreliable as the only cue on touch.\n\n`:active` — during activation (click/tap).\n\n`:focus` — has focus. `:focus-visible` — UA thinks a focus ring should show (keyboard). `:focus-within` — this element or a descendant has focus.\n\n`:any-link` — `a[href]` and `<area href>`. `:link` unvisited. `:visited` visited (limited properties).\n\n`:target` — the element whose `id` matches the URL hash.\n\n`:target-within` / `:popover-open` / `:open` — open `<details>`, dialogs, popovers (support evolving).\n\n`:fullscreen` `:picture-in-picture` `:modal`.",
    },
    {
      key: "pc-input",
      title: "Form and resource state",
      body: "`:enabled` `:disabled` — based on disabled attribute / fieldset.\n\n`:read-only` `:read-write`.\n\n`:placeholder-shown` — empty with placeholder.\n\n`:default` — default submit or default checked.\n\n`:checked` — checkbox, radio, option, selected.\n\n`:indeterminate` — checkbox or radio group.\n\n`:required` `:optional`.\n\n`:valid` `:invalid` `:user-valid` `:user-invalid` — user-* wait until interaction (better UX than `:invalid` on page load).\n\n`:in-range` `:out-of-range` — min/max.\n\n`:blank` (newer) — empty value.\n\n`:autofill` (`:-webkit-autofill`).\n\n`:buffering` `:muted` `:paused` `:playing` `:seeking` `:stalled` `:volume-locked` — media.",
    },
    {
      key: "pc-tree",
      title: "Tree-structural and typed",
      body: "`:root` — document element (higher specificity than `html`).\n\n`:empty` — no children except maybe some whitespace rules.\n\n`:first-child` `:last-child` `:only-child`.\n\n`:first-of-type` `:last-of-type` `:only-of-type`.\n\n`:nth-child(An+B [of S])` `:nth-last-child()`.\n\n`:nth-of-type()` `:nth-last-of-type()`.\n\n`:nth-col()` `:nth-last-col()` — tables, limited support.\n\n`:defined` — custom elements upgraded.\n\n`:scope` — relative to a scope root.",
    },
    {
      key: "pc-functional",
      title: "Functional and linguistic",
      body: "`:is()` `:where()` `:not()` `:has()` — covered in Selectors; they are pseudo-classes.\n\n`:lang(en)` — language.\n\n`:dir(rtl)` — directionality.\n\n`:state()` — custom state on ElementInternals.\n\n`:heading()` / `:heading` — proposals/limited.\n\n`:modal` — top-layer modal dialog.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Button hover. Odd rows. Invalid inputs after submit. `:focus-visible` rings. `:has(input:checked)` on cards.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Don’t ship hover-only. Prefer `:user-invalid`. Use `:focus-visible`. Keep `:has()` close to the subject.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Styling `:focus` so mouse clicks always show a fat ring (or never). `:nth-child` when you meant `:nth-of-type`. `:empty` failing because of a whitespace text node. Relying on `:visited` for `background-image`.",
    },
  ],
};
