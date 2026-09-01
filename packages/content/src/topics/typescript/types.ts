import { tsTopic } from "./factory";

export const typescriptTypeTopics = [
  tsTopic({
    slug: "typescript-types",
    title: "Types",
    order: 3,
    summary: "Primitives, arrays, objects, `any`, `unknown`, `never`, `void`, and structural typing.",
    prerequisites: ["typescript-why"],
    related: ["typescript-inference", "typescript-unions"],
    isHighYield: true,
    oneLiner:
      "A type describes what values are allowed. Primitives: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`. Objects are property bags. `void` is “no useful return.” `never` is “this cannot happen.” `unknown` is the safe top type; `any` turns the checker off. TS is structural: if it has the fields, it matches.",
    beats: [
      "`strictNullChecks`: `null` and `undefined` are not assignable to `string` unless you union them.",
      "`unknown` must be narrowed before use. `any` is assignable everywhere — avoid it.",
      "`object` means non-primitive; it is almost never what you want. Prefer a shape or `Record<string, unknown>`.",
    ],
    intro: "The vocabulary. Everything else (unions, generics) composes these.",
    why: "Wrong `any` vs `unknown` is a senior/junior tell.",
    concept:
      "Type vs value spaces. Some names exist in both (`class Foo`). Arrays: `T[]` or `Array<T>`. Tuples later. Functions have parameter and return types; unused return is `void`.",
    how: "Annotate public APIs. Let inference fill locals. Prefer `unknown` for untrusted input.",
    usage: "Function signatures, API models, event maps.",
    extras: [
      {
        key: "never",
        title: "`never`",
        body: "Empty set. Functions that always throw return `never`. Remaining union member in an exhaustive `switch` should be `never` — assign to `const _x: never = x` to fail compiles when a variant is added.",
      },
    ],
    practices: "`noImplicitAny`. Ban `any` in eslint. Use `unknown` + narrowing at edges.",
    mistakes: "`string | undefined` forgotten on optional values. `Function` as a type. `Object` (capital O) vs a literal type.",
    code: `function parse(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("expected string");
  return raw;
}

function fail(msg: string): never {
  throw new Error(msg);
}
`,
    examples: [
      {
        id: "structural",
        title: "Structural typing",
        about: "Name does not matter; shape does.",
        language: "typescript",
        code: `type Point = { x: number; y: number };
const p = { x: 1, y: 2, z: 3 };
const q: Point = p; // OK (freshness rules differ for object literals)
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-inference",
    title: "Type inference",
    order: 4,
    summary: "The compiler guesses types from initialization, return, and context.",
    prerequisites: ["typescript-types"],
    related: ["typescript-generics", "typescript-satisfies"],
    isHighYield: true,
    oneLiner:
      "If you write `const n = 1`, TS infers `1` (literal) or `number` depending on widening. Function return types are inferred from `return`. Contextual typing infers a callback parameter from the host (`array.map(x => …)`). You annotate when inference is too wide (`[]` is `never[]`) or when the public API should not drift.",
    beats: [
      "`let x = 1` infers `number` (widened). `const x = 1` infers `1`.",
      "Empty array: annotate `const xs: string[] = []` or use `satisfies`.",
      "Don’t annotate every local — noise. Do annotate exported functions.",
    ],
    intro: "TS is usable because you do not type every variable. Interviews ask when inference fails.",
    why: "Over-annotation hides bugs (you fight the initializer). Under-annotation leaks `any`.",
    concept:
      "Best common type for heterogeneous arrays. Return type of multiple `return`s is a union. Contextual typing from arguments of `addEventListener`, React props, etc.",
    how: "Hover in the IDE. If you see `any`, fix the root (missing types on a library, implicit any param).",
    usage: "Locals, generics (`identity(1)` infers `number`), `as const` to freeze literals.",
    practices: "Exported API: explicit return types when the function is non-trivial. Prefer `as const` over `as Theme`.",
    mistakes: "Annotating `const x: number = 1` everywhere. Leaving `files: []` as `never[]`. `as number` to bully inference.",
    code: `const title = "PrepQuest"; // string (widened from const string? actually literal "PrepQuest" for const)
const counts = [1, 2]; // number[]

function add(a: number, b: number) {
  return a + b; // inferred number
}
`,
    examples: [
      {
        id: "as-const",
        title: "`as const`",
        about: "Narrow to literal tuple/object.",
        language: "typescript",
        code: `const roles = ["admin", "user"] as const;
type Role = (typeof roles)[number]; // "admin" | "user"
`,
      },
    ],
  }),
];
