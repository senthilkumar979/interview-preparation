import type { Topic } from "../types";

export const functionsTopic: Topic = {
  slug: "javascript-functions",
  title: "Functions",
  technologySlug: "javascript",
  module: "Functions",
  order: 2,
  summary: "Declarations, expressions, arrow functions, this, and first-class behavior.",
  prerequisites: ["javascript-fundamentals"],
  related: ["javascript-closures", "javascript-objects"],
  levels: ["junior", "medior", "senior", "expert"],
  isHighYield: true,
  codeExample: {
    language: "javascript",
    caption: "this at the call site vs lexical arrows",
    code: `const api = {
  token: "abc",
  read() {
    return this.token;
  },
};

const detached = api.read;
console.log(detached()); // undefined in strict mode

const bound = api.read.bind(api);
console.log(bound()); // "abc"

const delayed = () => api.token;
console.log(delayed()); // "abc" — lexical, not this
`,
  },
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Functions are values. How you create them changes `this`, hoisting, and whether the function can be used as a constructor.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "Function declarations are hoisted. Function expressions and arrow functions are not. Arrow functions lexically capture `this` and cannot be used with `new`.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Callbacks, event handlers, and React function components all depend on this model. Interviewers ask you to predict `this` and to rewrite a method as an arrow vs a bound function.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "Calling `fn()` uses the default/global `this` (undefined in strict mode). `obj.fn()` binds `this` to `obj`. `.call`, `.apply`, and `.bind` override that. Closures capture the lexical environment, not the call site.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Use declarations for named utilities, arrows for short callbacks, and explicit `.bind` or class fields when methods are passed as callbacks.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Avoid relying on `arguments`; use rest parameters. Keep functions small and named. Prefer pure functions unless mutation is the point.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Losing `this` when passing methods, using arrows as object methods that need `this`, and confusing default parameters with `undefined` vs omitted args.",
    },
  ],
};
