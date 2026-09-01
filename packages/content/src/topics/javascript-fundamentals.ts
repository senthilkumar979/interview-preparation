import type { Topic } from "../types";

export const fundamentals: Topic = {
  slug: "javascript-fundamentals",
  title: "JavaScript Fundamentals",
  technologySlug: "javascript",
  module: "Fundamentals",
  order: 1,
  summary: "Values, types, coercion, and how JavaScript evaluates expressions.",
  prerequisites: [],
  related: ["javascript-functions", "javascript-objects"],
  levels: ["junior", "medior", "senior", "expert"],
  isHighYield: false,
  codeExample: {
    language: "javascript",
    caption: "Equality, NaN, and reference vs value",
    code: `console.log(0 == false); // true — avoid
console.log(0 === false); // false

console.log(typeof null); // "object"
console.log(Number.isNaN(NaN)); // true
console.log(NaN === NaN); // false

const original = { count: 1 };
const alias = original;
alias.count += 1;
console.log(original.count); // 2
`,
  },
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Interviews rarely start with frameworks. They start with whether you can reason about values, equality, and how the language actually runs your code.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "JavaScript is dynamically typed. Primitives (string, number, boolean, null, undefined, symbol, bigint) are copied by value. Objects are referenced. Equality (`===` vs `==`) and truthiness drive a large share of junior questions.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Bugs that look like React problems are often type coercion, accidental globals, or misunderstanding of `undefined` vs `null`. Interviewers use this layer to test precision.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "The engine parses source, creates an execution context, and resolves identifiers through the scope chain. Expressions produce values; statements orchestrate control flow. Hoisting moves declarations, not initializations, which is why `const` temporal dead zones exist.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Prefer `const`, use `===`, avoid implicit coercion in conditionals, and name types in your head even when the syntax does not require them.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Treat `==` as a smell. Normalize input at boundaries. Never rely on `typeof null === 'object'` quirks—guard explicitly.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Confusing `undefined` with undeclared, mutating objects you thought were copies, and assuming `NaN === NaN`.",
    },
  ],
};
