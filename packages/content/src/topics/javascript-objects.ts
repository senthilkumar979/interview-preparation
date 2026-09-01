import type { Topic } from "../types";

export const objectsTopic: Topic = {
  slug: "javascript-objects",
  title: "Objects",
  technologySlug: "javascript",
  module: "Objects",
  order: 3,
  summary: "References, prototypes, property access, and structural sharing.",
  prerequisites: ["javascript-functions"],
  related: ["javascript-closures", "javascript-fundamentals"],
  levels: ["junior", "medior", "senior", "expert"],
  isHighYield: true,
  codeExample: {
    language: "javascript",
    caption: "Same reference vs shallow copy vs prototype lookup",
    code: `const user = { name: "Ada", role: "engineer" };

const teammate = user;
teammate.role = "staff";
console.log(user.role); // "staff" — same object

const snapshot = { ...user };
snapshot.role = "principal";
console.log(user.role); // "staff" — shallow copy of top level

const proto = { kind: "person" };
const ada = Object.create(proto);
ada.name = "Ada";

console.log(ada.kind); // "person" via [[Prototype]]
console.log(Object.hasOwn(ada, "kind")); // false
`,
  },
  sections: [
    {
      key: "introduction",
      title: "Introduction",
      body: "Almost everything non-primitive in JavaScript is an object. Interviews probe whether you can reason about prototypes, copying, and shared references—because those are the bugs that show up in production state.",
    },
    {
      key: "concept",
      title: "Concept",
      body: "An object is a collection of properties plus a hidden [[Prototype]] link. Own properties live on the object; missing keys walk the prototype chain. Object.create, class instances, and object literals all sit on this same model. Assignment copies a reference, not a value.",
    },
    {
      key: "why-it-matters",
      title: "Why it matters",
      body: "Accidental shared config, for...in enumerating inherited keys, and React state that mutates in place all come from mixing own vs inherited, and copy vs reference.",
    },
    {
      key: "how-it-works",
      title: "How it works",
      body: "obj.a and obj['a'] both start a prototype walk. Spread and Object.assign copy enumerable own properties one level deep. Nested objects stay shared unless you clone them (structuredClone, or a reducer that replaces the nested node). hasOwn / Object.hasOwn tell you what is actually on the instance.",
    },
    {
      key: "common-usage",
      title: "Common usage",
      body: "Prefer object literals and composition over deep inheritance. Use Map when keys are not strings. Freeze configuration in tests when mutation would hide a bug. In UI state, treat objects as immutable at the boundary that owns them.",
    },
    {
      key: "best-practices",
      title: "Best practices",
      body: "Do not mutate arguments. Copy at the boundary that owns the data. Use optional chaining for nested reads, not as a substitute for modeling. Prefer Object.hasOwn over obj.hasOwnProperty when the prototype may be unusual.",
    },
    {
      key: "common-mistakes",
      title: "Common mistakes",
      body: "Shallow-copying nested state and thinking it is isolated. Using arrays as maps. Assuming { ...obj } clones methods bound to the original. Mutating a prop or Redux/React state object in place.",
    },
  ],
};
