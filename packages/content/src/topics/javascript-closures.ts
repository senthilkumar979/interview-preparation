import type { Topic } from "../types";

export const closuresTopic: Topic = {
  slug: "javascript-closures",
  title: "Closures",
  technologySlug: "javascript",
  module: "Closures",
  order: 4,
  summary: "Functions that remember the environment in which they were created.",
  prerequisites: ["javascript-objects"],
  related: ["javascript-functions", "javascript-async"],
  levels: ["junior", "medior", "senior", "expert"],
  isHighYield: true,
  interviewAnswer: {
    oneLiner:
      "A closure is a function plus the lexical environment it was created in: it keeps a live binding to outer variables even after the outer function has returned.",
    beats: [
      "It is a live binding, not a snapshot. If the outer variable changes, the inner function sees the new value.",
      "Each call to a factory creates a new environment. Two counters from `makeCounter()` do not share `count`.",
      "Interviewers use this to explain private state, the `var` loop trap, and stale React `useEffect` handlers.",
    ],
  },
  workedExamples: [
    {
      id: "private-counter",
      title: "Private counter factory",
      about: "Why two counters created from the same function do not share state.",
      language: "javascript",
      code: `function makeCounter() {
  let count = 0;
  return function next() {
    count += 1;
    return count;
  };
}

const likes = makeCounter();
const views = makeCounter();

console.log(likes()); // 1
console.log(likes()); // 2
console.log(views()); // 1 — separate [[Environment]]
`,
    },
    {
      id: "loop-trap",
      title: "The loop + setTimeout trap",
      about: "Why `var` logs 3, 3, 3 and `let` logs 0, 1, 2.",
      language: "javascript",
      code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
// var 3, var 3, var 3 — one shared binding

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
// let 0, let 1, let 2 — a binding per iteration
`,
    },
    {
      id: "stale-handler",
      title: "Stale event handler",
      about: "A callback closed over an old value—the same bug as a stale React effect.",
      language: "javascript",
      code: `function watchSearch(getQuery) {
  const query = getQuery(); // captured once
  return function onType() {
    console.log("searching", query);
  };
}

let current = "hooks";
const handler = watchSearch(() => current);
current = "closures";
handler(); // "searching hooks" — closed over the first read
`,
    },
  ],
  codeExample: {
    language: "javascript",
    caption: "A factory closes over live bindings",
    code: `function makeCounter() {
  let count = 0;
  return function next() {
    count += 1;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();

console.log(a()); // 1
console.log(a()); // 2
console.log(b()); // 1 — separate environment
`,
  },
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "A closure is not a trick. It is the default: an inner function keeps a live binding to outer variables after the outer function has returned.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Each function has a `[[Environment]]` pointer. When the function runs, identifier lookup walks that chain. Loops with `var` share one binding; `let` creates per-iteration bindings.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Module privacy, React hooks, event handlers, and stale-state bugs are all closure problems. This is one of the highest-frequency interview topics.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Factory functions return inner functions that close over `count`. The inner function reads the current value, not a snapshot—unless you captured a primitive copy at a point in time.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Use closures for private state, partial application, and callbacks. In React, `useEffect` closures must list the values they read or they go stale.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Name the captured state. Prefer `let` in loops. When a callback must see latest state, use refs or functional updates rather than hoping the closure refreshed.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "The classic `var i` in a loop, stale React event handlers, and accidental memory retention by holding large closed-over objects.",
    },
  ],
};
