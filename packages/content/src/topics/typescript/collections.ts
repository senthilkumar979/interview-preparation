import { tsTopic } from "./factory";

export const typescriptCollectionTopics = [
  tsTopic({
    slug: "typescript-typed-arrays",
    title: "Typed arrays and tuples",
    order: 17,
    summary: "`T[]`, `Array<T>`, tuples `[string, number]`, `readonly`, and JS typed arrays.",
    prerequisites: ["typescript-generics"],
    related: ["typescript-inference"],
    isHighYield: true,
    oneLiner:
      "`string[]` (or `Array<string>`) is a homogeneous list. A tuple `[string, number]` has fixed length and per-index types (`as const` makes it `readonly [\"a\", \"b\"]`). Optional tuple slots: `[string, number?]`. Rest in tuples: `[string, ...number[]]`. JS `Uint8Array` etc. are separate runtime types with numeric elements — not the same as `number[]`.",
    beats: [
      "`[string, number]` is not assignable to `string[]` in both directions without caveats; tuples are stricter.",
      "Empty array `[]` infers `never[]` until you annotate.",
      "`readonly T[]` (`ReadonlyArray<T>`) forbids `.push`. Prefer it on public APIs.",
    ],
    intro: "Interviews mix “typed array” (TS arrays/tuples) with `Uint8Array`. Cover both names.",
    why: "`useState([])` inference, CSV rows, `Promise.all` tuples.",
    concept:
      "Tuples are arrays with length in the type. Labels: `[x: number, y: number]`. Variadic tuples model `concat` types.",
    how: "`const pair: [string, number] = [\"age\", 2];`. Function `...args: [string, number]`.",
    usage: "React `useState<[string, number]>`. Binary protocols: `Uint8Array`.",
    extras: [
      {
        key: "uint8",
        title: "ECMAScript typed arrays",
        body: "`ArrayBuffer`, `Uint8Array`, `Float64Array` are runtime views of binary memory. Their TS types already exist in `lib`. Don’t confuse with `number[]` — methods and semantics differ (no holes, fixed length for the view).",
      },
    ],
    practices: "Annotate empty arrays. Use tuples for fixed columns. `readonly` for shared lists.",
    mistakes: "`Array<string | number>` when you needed a tuple. Pushing onto a tuple type. Treating `Uint8Array` as `number[]`.",
    code: `const tags: string[] = [];
const pair: [string, number] = ["count", 3];
const bytes: Uint8Array = new Uint8Array([0, 1, 255]);
`,
    examples: [
      {
        id: "tuple-fn",
        title: "Tuple as args",
        about: "Fixed arity.",
        language: "typescript",
        code: `function move(...delta: [number, number]) {
  const [dx, dy] = delta;
}
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-enums",
    title: "Enums",
    order: 18,
    summary: "Numeric and string enums emit runtime objects. Prefer unions + `as const` in new code.",
    prerequisites: ["typescript-unions"],
    related: ["typescript-namespaces", "typescript-typeof"],
    oneLiner:
      "`enum Role { Admin, User }` compiles to a runtime object (and reverse mapping for numeric enums). `enum Role { Admin = \"admin\" }` is a string enum (no reverse map). `const enum` inlines members and can break if you isolate modules. Many style guides ban enums: `type Role = \"admin\" | \"user\"` plus `as const` objects give types without TS-only runtime.",
    beats: [
      "Numeric enums are not type-safe against other numbers the way you think (`enum E { A }` accepts `E.A` and some number widening issues historically).",
      "String enums are stricter. Still a TS-specific emit.",
      "You cannot tree-shake enums as easily as a union.",
    ],
    intro: "Know them for codebases and interviews; don’t introduce them in greenfield without a reason.",
    why: "Legacy Angular/TS code. Trivia: reverse mapping.",
    concept: "Heterogeneous enums exist and are a trap. `const enum` + `preserveConstEnums`.",
    how: "If you must: string enums with explicit values. Otherwise union types.",
    usage: "Interop with APIs that already use TS enums.",
    practices: "Prefer `as const` maps. If enum, string + explicit values. Never numeric enum for HTTP codes you compare loosely.",
    mistakes: "Assuming enums vanish like types (they don’t, unless const enum). Using `const enum` with Babel incorrectly.",
    code: `enum LegacyRole {
  Admin = "admin",
  User = "user",
}

type Role = "admin" | "user";
const Roles = { Admin: "admin", User: "user" } as const;
`,
    examples: [
      {
        id: "reverse",
        title: "Numeric reverse map",
        about: "Emitted JS has both directions.",
        language: "typescript",
        code: `enum Direction { Up, Down }
Direction[0]; // "Up" at runtime
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-namespaces",
    title: "Namespaces",
    order: 19,
    summary: "`namespace` / `module` wrapping is legacy. Prefer ES modules. Know merging for `.d.ts`.",
    prerequisites: ["typescript-enums"],
    related: ["typescript-tsconfig"],
    oneLiner:
      "`namespace App { export function start() {} }` is a TS-era module before ES modules. It emits an IIFE/object. `export` inside a namespace is not `export` from a file. Today: one file = one ES module. You still see `declare namespace NodeJS` in types, and namespace merging in declaration files. Don’t write new `namespace` in app code.",
    beats: [
      "`export namespace` in a `.d.ts` groups types (e.g. `jest`).",
      "`/// <reference path />` is the old linker; ES `import` replaced it.",
      "A file with `import`/`export` is a module; without, it’s a script (global) — `moduleDetection` / `export {}` fixes accidental globals.",
    ],
    intro: "The handbook still documents them because `@types` uses the pattern.",
    why: "Reading Node types and old AngularJS TS. Interviews: “modules vs namespaces.”",
    concept: "Namespace merging: two `namespace Foo { export const a }` combine. Scripts vs modules.",
    how: "New code: `export function start()` from `app.ts`. Types: `export {}` in a file you want as a module.",
    usage: "DefinitelyTyped, migrating code.",
    practices: "ES modules everywhere. `isolatedModules` assumes that.",
    mistakes: "Mixing `namespace` and `import` in confusing ways. Forgetting a file without import is global.",
    code: `// modern
export function start() {}

// legacy — don’t add this
namespace Legacy {
  export function start() {}
}
`,
    examples: [
      {
        id: "script",
        title: "Force a module",
        about: "Empty export.",
        language: "typescript",
        code: `export {};
const local = 1;
`,
      },
    ],
  }),
];
