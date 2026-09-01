import { tsTopic } from "./factory";

export const typescriptAliasTopics = [
  tsTopic({
    slug: "typescript-type",
    title: "`type` aliases",
    order: 5,
    summary: "`type Name = …` names a union, tuple, function, or mapped type — not only objects.",
    prerequisites: ["typescript-inference"],
    related: ["typescript-interface", "typescript-unions"],
    isHighYield: true,
    oneLiner:
      "`type` gives a name to any type: primitives, unions, tuples, functions, mapped types. `type UserId = string`. `type Result<T> = { ok: true; value: T } | { ok: false }`. Aliases do not create a new runtime value. They cannot be merged (unlike interfaces) and can use unions freely.",
    beats: [
      "Use `type` for unions, tuples, and computed types (`keyof`, mapped).",
      "Use `interface` for object shapes you may extend or merge (public object APIs, React props often).",
      "`type` can alias an interface; both are erased.",
    ],
    intro: "`type` vs `interface` is a style question with real rules: unions need `type`.",
    why: "You cannot `interface A | B`. That is the one-liner.",
    concept: "Aliases are lazy-ish in recursive types (`type Json = string | Json[]`). No declaration merging.",
    how: "`export type Foo = …`. Import as a type-only `import type { Foo }` to avoid emit.",
    usage: "Discriminated unions, helper aliases, `type Props = React.ComponentProps<typeof Btn>`.",
    practices: "`import type` for type-only imports. Don’t namespace aliases with `I` prefixes.",
    mistakes: "Trying to `extends` a union `type` like an interface. Declaration-merging a `type` (you can’t).",
    code: `type Id = string;
type Point = { x: number; y: number };
type Result<T> = { ok: true; data: T } | { ok: false; error: string };
`,
    examples: [
      {
        id: "import-type",
        title: "Type-only import",
        about: "Erased from JS output.",
        language: "typescript",
        code: `import type { Result } from "./result";
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-interface",
    title: "Interfaces",
    order: 6,
    summary: "Named object (and function) shapes. `extends`, optional merging, `implements`.",
    prerequisites: ["typescript-type"],
    related: ["typescript-inheritance"],
    isHighYield: true,
    oneLiner:
      "`interface` describes an object’s contract: properties, optional (`?`), readonly, methods, call/construct signatures. `extends` composes interfaces. Multiple `interface User` in the same scope merge (declaration merging) — useful for lib augmentation, dangerous in app code. Classes `implements` an interface (compile-time only).",
    beats: [
      "Excess property checks fire on object literals assigned to an interface.",
      "Merging: two `interface Window { }` blocks combine — that is how `@types` grow `Window`.",
      "Prefer `interface` for public object APIs; `type` for unions. Both are fine for props.",
    ],
    intro: "The classic OOP-looking syntax. Still structural — `implements` is not a runtime brand.",
    why: "Merging and `extends` are the interview deltas vs `type`.",
    concept:
      "Index signatures `[key: string]: unknown`. Function types as `interface Fn { (x: number): string }`. Generic interfaces `interface Box<T> { value: T }`.",
    how: "`interface User { id: string }`. Extend: `interface Admin extends User { role: \"admin\" }`.",
    usage: "DOM lib, component props, repository ports.",
    practices: "Don’t merge interfaces in app code by accident (duplicate names). Use `implements` to keep classes honest.",
    mistakes: "Expecting `implements` to exist at runtime. Optional `id?: string` vs `id: string | undefined` (the second requires the key).",
    code: `interface User {
  readonly id: string;
  email: string;
  nick?: string;
}

interface Admin extends User {
  role: "admin";
}
`,
    examples: [
      {
        id: "merge",
        title: "Declaration merging",
        about: "Same name, combined members.",
        language: "typescript",
        code: `interface Box { x: number; }
interface Box { y: number; }
const b: Box = { x: 1, y: 2 };
`,
      },
    ],
  }),
];
