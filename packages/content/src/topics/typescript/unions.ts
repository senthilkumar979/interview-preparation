import { tsTopic } from "./factory";

export const typescriptUnionTopics = [
  tsTopic({
    slug: "typescript-unions",
    title: "Unions",
    order: 7,
    summary: "`A | B` means one of the members. Discriminated unions are the interview pattern.",
    prerequisites: ["typescript-interface"],
    related: ["typescript-narrowing", "typescript-intersections"],
    isHighYield: true,
    oneLiner:
      "A union `string | number` accepts either. You may only use members common to all variants until you narrow. Discriminated unions share a literal tag (`kind: \"ok\" | \"err\"`) so `switch (x.kind)` is exhaustive. `|` is not “and” — that is `&`.",
    beats: [
      "Optional `x?: string` is roughly `string | undefined` on the property.",
      "`string | string` collapses. Literal unions: `\"get\" | \"post\"`.",
      "Unions of objects without a discriminant become a mess — add a `type`/`kind` field.",
    ],
    intro: "Most real APIs are unions (success/fail, loading states). This is the TS superpower vs JS.",
    why: "UI state machines and reducer actions are discriminated unions.",
    concept:
      "Widening vs union of literals. `non-null` assertion `x!` is a union escape — last resort.",
    how: "Model results as `{ ok: true, value: T } | { ok: false, error: E }`. Never `data: T | null` plus `error: string | null` without a tag if both can be set.",
    usage: "Redux actions, network results, React component state.",
    practices: "One discriminant. Exhaustive `switch` with `never`. Prefer unions over booleans that can contradict.",
    mistakes: "`user | null | undefined` everywhere without narrowing. Using `|` when you meant intersection of props.",
    code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function unwrap<T>(r: Result<T>): T {
  if (!r.ok) throw new Error(r.error);
  return r.value;
}
`,
    examples: [
      {
        id: "literal",
        title: "Literal union",
        about: "Autocomplete and exhaustiveness.",
        language: "typescript",
        code: `type Method = "GET" | "POST";
function send(method: Method) {}
send("GET");
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-intersections",
    title: "Intersections",
    order: 8,
    summary: "`A & B` must satisfy both. Combining objects vs impossible primitive intersects.",
    prerequisites: ["typescript-unions"],
    related: ["typescript-interface"],
    oneLiner:
      "`A & B` is the intersection: a value assignable to both. For objects, that is roughly “all properties of A and B.” `string & number` is `never`. Mixins and `Props & { className?: string }` use `&`. Conflicting properties (`id: string & number`) collapse toward `never`.",
    beats: [
      "`interface` `extends` is similar to `&` for objects, with slightly different conflict rules.",
      "Order of `&` does not matter for objects (commutative).",
      "Do not “intersect away” errors with `T & {}` unless you know the trick (recent TS uses it for some inference).",
    ],
    intro: "The other combinator. Interviews mix `|` and `&` on purpose.",
    why: "HOC props, plugin options, `RequestInit & { url: string }`.",
    concept: "Intersection of unions distributes in some positions. Keep mental model: `&` and, `|` or.",
    how: "`type Admin = User & { role: \"admin\" }`. Prefer `extends` on interfaces when both are objects you own.",
    usage: "Merging option objects. Constraining generics (`T & { id: string }`).",
    practices: "If two interfaces fight over a field type, fix the model — don’t hide with `&`.",
    mistakes: "`string | number & boolean` precedence (`&` before `|`). Intersecting unrelated primitives.",
    code: `type User = { id: string };
type Timestamps = { createdAt: Date };
type Row = User & Timestamps;
`,
    examples: [
      {
        id: "never",
        title: "Impossible intersect",
        about: "Becomes never.",
        language: "typescript",
        code: `type Impossible = string & number;
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-narrowing",
    title: "Narrowing",
    order: 9,
    summary: "Control-flow analysis: `typeof`, `in`, `instanceof`, equality, predicates, discriminants.",
    prerequisites: ["typescript-unions"],
    related: ["typescript-generics"],
    isHighYield: true,
    oneLiner:
      "Narrowing is how TS shrinks a union inside an `if`. `typeof x === \"string\"`, `x instanceof Date`, `\"id\" in x`, `x != null`, true equality, and discriminated `x.kind`. Custom `function isUser(x: unknown): x is User` is a type predicate. After a successful check, the type in that block is the narrowed one.",
    beats: [
      "`else` gets the remaining union. Assignment can re-widen.",
      "`Boolean(x)` does not always narrow the way `!!x` / `if (x)` does for some types — prefer explicit checks.",
      "`switch` on a discriminant + `never` default is exhaustiveness checking.",
    ],
    intro: "The most common on-site coding: take `unknown` or a union and make it safe.",
    why: "Without narrowing you fight the checker with `as`. With it, the compiler is an ally.",
    concept:
      "Control flow analysis (CFA). Assertions `as T` and `!` skip CFA — they are not narrowing, they are overrides.",
    how: "Write the runtime check that is actually true; TS follows a catalog of forms. For objects, prefer discriminants.",
    usage: "Error handling, DOM (`el instanceof HTMLInputElement`), JSON.",
    extras: [
      {
        key: "predicate",
        title: "Type predicates",
        body: "`function isString(x: unknown): x is string { return typeof x === \"string\"; }`. The `is` return tells CFA to narrow the argument. Assertion functions: `asserts x is string` for throwing guards.",
      },
    ],
    practices: "Narrow at the edge, then pass a concrete type inward. Don’t `as` after a check you already have.",
    mistakes: "`typeof null === \"object\"` in JS — `null` is not an instance. Checking `typeof x === \"array\"` (use `Array.isArray`).",
    figures: [
      {
        src: "/diagrams/ts/ts-narrowing.png",
        alt: "typeof narrowing a string | number union into two branches",
        caption: "Control-flow narrowing",
      },
    ],
    code: `function len(x: string | string[]) {
  if (Array.isArray(x)) return x.length;
  return x.length;
}
`,
    examples: [
      {
        id: "in",
        title: "`in` narrowing",
        about: "Property presence.",
        language: "typescript",
        code: `type Cat = { meow: () => void };
type Dog = { bark: () => void };
function speak(a: Cat | Dog) {
  if ("meow" in a) a.meow();
  else a.bark();
}
`,
      },
    ],
  }),
];
