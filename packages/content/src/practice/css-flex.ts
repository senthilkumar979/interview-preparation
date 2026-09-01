import type { PracticeSet } from "./types";

export const cssFlexPractice: PracticeSet = {
  topicSlug: "css-flex",
  title: "Flexbox",
  summary: "Main axis, shrink, and wrapping.",
  timedSeconds: 90,
  questions: [
    {
      id: "q1",
      prompt: "Default `flex-shrink` on a flex item is:",
      options: [
        { id: "a", label: "0", isCorrect: false },
        { id: "b", label: "1", isCorrect: true },
        { id: "c", label: "auto", isCorrect: false },
      ],
      explanation: "`flex: 0 1 auto` is the initial value. Items may shrink below their max-content size.",
      seconds: 45,
    },
  ],
  preview: {
    id: "preview-flex",
    title: "Sandbox: three items",
    prompt: "Change `flex` and `gap`. Preview is sandboxed.",
    html: `<div class="row"><div>A</div><div>B</div><div>C</div></div>`,
    css: `.row { display: flex; gap: 8px; background: #fffdf8; padding: 12px; }
.row > div { flex: 1; background: #edae49; padding: 16px; border-radius: 8px; text-align: center; }`,
    js: "",
  },
  bugFinder: {
    id: "bug-nowrap",
    title: "Bug Finder: overflow",
    prompt: "Why might items overflow the flex container?",
    language: "css",
    snippet: `.row { display: flex; }
.item { flex: 0 0 400px; }`,
    options: [
      { id: "b1", label: "`flex-shrink: 0` plus a fixed basis can overflow if the container is narrower", isCorrect: true },
      { id: "b2", label: "`display:flex` always wraps by default", isCorrect: false },
      { id: "b3", label: "`flex-wrap: wrap` or allowing shrink would mitigate", isCorrect: true },
    ],
    explanation: "Initial wrap is `nowrap`. `flex: 0 0 400px` refuses to shrink.",
  },
};
