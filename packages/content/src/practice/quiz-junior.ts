import type { QuizPackage } from "./types";

export const quizJunior: QuizPackage = {
  slug: "frontend-junior",
  title: "Frontend fundamentals",
  summary: "HTML, CSS, and JS recall: output, true/false, and definitions.",
  difficulty: "junior",
  track: "mixed",
  topics: ["html", "css", "javascript"],
  questions: [
    {
      id: "j1",
      kind: "mcq",
      prompt: "Which attribute associates a `<label>` with an `<input>`?",
      choices: [
        { id: "a", label: "`name`", isCorrect: false },
        { id: "b", label: "`for` matching the input’s `id`", isCorrect: true },
        { id: "c", label: "`placeholder`", isCorrect: false },
      ],
      explanation:
        "`<label for>` must match the control’s `id`, or the label must wrap the input. `name` submits the field; `placeholder` is not an accessible name.",
    },
    {
      id: "j2",
      kind: "tf",
      prompt: "True or false: `typeof null === \"object\"` in JavaScript.",
      choices: [
        { id: "t", label: "True", isCorrect: true },
        { id: "f", label: "False", isCorrect: false },
      ],
      explanation:
        "This is a long-standing language bug: `typeof null` is `\"object\"`. Check null with `=== null` (or `== null` if you also want `undefined`).",
    },
    {
      id: "j3",
      kind: "output",
      prompt: "What does this log?",
      code: `console.log(1 + "2" + 3);`,
      language: "javascript",
      choices: [
        { id: "a", label: "`6`", isCorrect: false },
        { id: "b", label: "`123`", isCorrect: true },
        { id: "c", label: "`15`", isCorrect: false },
      ],
      explanation:
        "`+` is left-associative. `1 + \"2\"` coerces to the string `\"12\"`, then `\"12\" + 3` becomes `\"123\"`. It is not numeric addition.",
    },
    {
      id: "j4",
      kind: "mcq",
      prompt: "Default `flex-direction` is:",
      choices: [
        { id: "a", label: "`column`", isCorrect: false },
        { id: "b", label: "`row`", isCorrect: true },
        { id: "c", label: "`row-reverse`", isCorrect: false },
      ],
      explanation:
        "The initial `flex-direction` is `row`, so the main axis runs inline (left-to-right in LTR). Set `column` when you want a vertical stack.",
    },
    {
      id: "j5",
      kind: "tf",
      prompt: "True or false: `const` arrays cannot have elements pushed.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation:
        "`const` prevents rebinding the variable (`list = []` fails). Mutating the array with `push` is allowed because the binding still points at the same object.",
    },
    {
      id: "j6",
      kind: "output",
      prompt: "What is logged?",
      code: `console.log(typeof []);`,
      language: "javascript",
      choices: [
        { id: "a", label: "`array`", isCorrect: false },
        { id: "b", label: "`object`", isCorrect: true },
        { id: "c", label: "`list`", isCorrect: false },
      ],
      explanation:
        "`typeof []` is `\"object\"` because arrays are objects. Use `Array.isArray(value)` when you need to distinguish arrays from plain objects.",
    },
    {
      id: "j7",
      kind: "mcq",
      prompt: "`position: absolute` is positioned against:",
      choices: [
        { id: "a", label: "The viewport always", isCorrect: false },
        { id: "b", label: "The nearest positioned ancestor (or initial containing block)", isCorrect: true },
        { id: "c", label: "The next sibling", isCorrect: false },
      ],
      explanation:
        "`absolute` is positioned against the nearest ancestor with a `position` other than `static` (`relative`, `absolute`, `fixed`, `sticky`). If none exists, it uses the initial containing block.",
    },
    {
      id: "j8",
      kind: "tf",
      prompt: "True or false: `==` compares without coercion.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation:
        "`==` applies abstract equality and type coercion (`0 == \"0\"` is true). `===` is strict: same type and value. Prefer `===` in interviews unless you mean `== null`.",
    },
    {
      id: "j9",
      kind: "mcq",
      prompt: "Which HTTP method is used by a form with no `method` attribute?",
      choices: [
        { id: "a", label: "POST", isCorrect: false },
        { id: "b", label: "GET", isCorrect: true },
        { id: "c", label: "PUT", isCorrect: false },
      ],
      explanation:
        "If you omit `method`, HTML forms submit with GET: query string on the URL. POST is only used when you set `method=\"post\"`. PUT is not a form method.",
    },
    {
      id: "j10",
      kind: "output",
      prompt: "What is the length?",
      code: `console.log([1, 2, 3].length);`,
      language: "javascript",
      choices: [
        { id: "a", label: "`3`", isCorrect: true },
        { id: "b", label: "`2`", isCorrect: false },
        { id: "c", label: "`4`", isCorrect: false },
      ],
      explanation:
        "For a dense array, `length` is one more than the highest index. `[1, 2, 3]` has indexes 0–2, so `length` is 3. Holes can make `length` larger than the number of defined items.",
    },
  ],
};
