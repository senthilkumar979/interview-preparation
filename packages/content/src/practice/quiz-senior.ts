import type { QuizPackage } from "./types";

export const quizSenior: QuizPackage = {
  slug: "frontend-senior",
  title: "Hooks, rendering, and CSS layout",
  summary: "Reconciliation, memo, layout vs paint, and event phases.",
  difficulty: "senior",
  track: "mixed",
  topics: ["react", "javascript", "css"],
  questions: [
    {
      id: "s1",
      kind: "mcq",
      prompt: "React reuses a DOM node across updates primarily when:",
      choices: [
        { id: "a", label: "`type` (and `key` in lists) match", isCorrect: true },
        { id: "b", label: "The component function name is similar", isCorrect: false },
        { id: "c", label: "`className` is unchanged", isCorrect: false },
      ],
      explanation: "Different type → unmount/remount. Keys disambiguate siblings.",
    },
    {
      id: "s2",
      kind: "tf",
      prompt: "True or false: `useLayoutEffect` runs before the browser paints.",
      choices: [
        { id: "t", label: "True", isCorrect: true },
        { id: "f", label: "False", isCorrect: false },
      ],
      explanation: "After DOM updates, before paint. Prefer `useEffect` unless you measure.",
    },
    {
      id: "s3",
      kind: "output",
      prompt: "In bubbling, who runs last for a click on the button?",
      code: `// window -> form -> button (target)`,
      language: "javascript",
      choices: [
        { id: "a", label: "Button target listeners, then ancestors toward `window`", isCorrect: true },
        { id: "b", label: "`window` first always", isCorrect: false },
        { id: "c", label: "Only capturing listeners", isCorrect: false },
      ],
      explanation: "Capture down, target, bubble up (unless `stopPropagation`).",
    },
    {
      id: "s4",
      kind: "mcq",
      prompt: "`useMemo` caches:",
      choices: [
        { id: "a", label: "A value until dependencies `Object.is`-change", isCorrect: true },
        { id: "b", label: "The component tree forever", isCorrect: false },
        { id: "c", label: "Network responses", isCorrect: false },
      ],
      explanation: "React may discard the cache. Keep the factory pure.",
    },
    {
      id: "s5",
      kind: "tf",
      prompt: "True or false: mutating `ref.current` re-renders the component.",
      choices: [
        { id: "t", label: "True", isCorrect: false },
        { id: "f", label: "False", isCorrect: true },
      ],
      explanation: "Refs skip render. Use state when the UI must update.",
    },
    {
      id: "s6",
      kind: "mcq",
      prompt: "`flex-shrink` default is:",
      choices: [
        { id: "a", label: "`0`", isCorrect: false },
        { id: "b", label: "`1`", isCorrect: true },
        { id: "c", label: "`auto`", isCorrect: false },
      ],
      explanation: "Initial flex is `0 1 auto`.",
    },
    {
      id: "s7",
      kind: "output",
      prompt: "After this, what is `a.n`?",
      code: `const a = { n: 1 };
const b = a;
b.n = 2;`,
      language: "javascript",
      choices: [
        { id: "a", label: "`1`", isCorrect: false },
        { id: "b", label: "`2`", isCorrect: true },
      ],
      explanation: "Same object reference. Shallow copy if you need independence.",
    },
    {
      id: "s8",
      kind: "mcq",
      prompt: "`useCallback(fn, deps)` is mainly for:",
      choices: [
        { id: "a", label: "Making `fn` run on the server", isCorrect: false },
        { id: "b", label: "Stable function identity for memoized children / effect deps", isCorrect: true },
        { id: "c", label: "Avoiding closures", isCorrect: false },
      ],
      explanation: "Same as `useMemo(() => fn, deps)`.",
    },
    {
      id: "s9",
      kind: "tf",
      prompt: "True or false: batching means multiple `setState` in one event typically paint once.",
      choices: [
        { id: "t", label: "True", isCorrect: true },
        { id: "f", label: "False", isCorrect: false },
      ],
      explanation: "React 18+ batches more than just events (timeouts, promises) in the default root.",
    },
    {
      id: "s10",
      kind: "mcq",
      prompt: "A capturing listener is registered with:",
      choices: [
        { id: "a", label: "`addEventListener(type, fn, true)` or `{ capture: true }`", isCorrect: true },
        { id: "b", label: "`fn.capture()`", isCorrect: false },
        { id: "c", label: "It is the default", isCorrect: false },
      ],
      explanation: "Default is bubble (`false`).",
    },
  ],
};
