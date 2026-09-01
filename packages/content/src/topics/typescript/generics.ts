import { tsTopic } from "./factory";

export const typescriptGenericTopics = [
  tsTopic({
    slug: "typescript-generics",
    title: "Generics",
    order: 12,
    summary: "Type parameters: `T`, constraints, defaults, and inference at call sites.",
    prerequisites: ["typescript-typeof"],
    related: ["typescript-conditional-types", "typescript-utility-types"],
    isHighYield: true,
    oneLiner:
      "A generic is a function, type, or class parameterized by types: `function identity<T>(x: T): T`. Call-site inference usually fills `T`. `T extends Constraint` limits it. Defaults: `type Box<T = string>`. Multiple params: `Map<K, V>`. Generics are compile-time; they erase like everything else.",
    beats: [
      "Don’t invent `T` when a concrete type will do. Do use `T` when the output depends on the input type.",
      "`T extends keyof U` and `T extends { id: string }` are the two most common constraints.",
      "Generic inference fails on empty arrays and unused type params — annotate the call `id<string[]>([])`.",
    ],
    intro: "The feature that makes `Array`, `Promise`, and `Pick` possible. Interviews write `map` types.",
    why: "Without generics you write `any` or duplicate functions per type.",
    concept:
      "Variance: think “producer `T` vs consumer `T`” at a high level; TS function params are bivariant in some sloppy cases (methods). Defaults and constraints compose. `const` type params (TS 5.0+) infer literals more often.",
    how: "`function wrap<T>(x: T): { value: T } { return { value: x }; }`. Interfaces: `interface Repo<T> { get(id: string): Promise<T> }`.",
    usage: "React `useState<User>`, fetch helpers, collection wrappers.",
    extras: [
      {
        key: "defaults",
        title: "Defaults and inference",
        body: "`type Api<T = unknown> = { data: T }`. If inference cannot pick `T`, the default applies. For functions, unused `T` is a smell — you probably wanted a runtime argument.",
      },
    ],
    practices: "Name `T` for one param; `TInput`/`TResult` when several. Constrain early. Prefer inference over mandatory annotations.",
    mistakes: "`<T extends any>`. Returning `T` when you actually return `T | undefined` without saying so. Generic soup nobody can read.",
    figures: [
      {
        src: "/diagrams/ts/ts-generics.png",
        alt: "Generic identity T and Array Map type parameters",
        caption: "Same code, many types",
      },
    ],
    code: `function identity<T>(value: T): T {
  return value;
}

function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
`,
    examples: [
      {
        id: "default",
        title: "Default type param",
        about: "Optional specialization.",
        language: "typescript",
        code: `type Box<T = string> = { value: T };
const a: Box = { value: "ok" };
const b: Box<number> = { value: 1 };
`,
      },
    ],
  }),
];
