import { tsTopic } from "./factory";

export const typescriptOperatorTopics = [
  tsTopic({
    slug: "typescript-keyof",
    title: "`keyof`",
    order: 10,
    summary: "`keyof T` is a union of T’s property names. Used with indexed access `T[K]`.",
    prerequisites: ["typescript-narrowing"],
    related: ["typescript-typeof", "typescript-mapped-types"],
    isHighYield: true,
    oneLiner:
      "`keyof T` produces a string (or number/symbol) union of keys of `T`. `keyof { a: 1; b: 2 }` is `\"a\" | \"b\"`. Indexed access `T[K]` is the property type. `K extends keyof T` is the generic constraint for safe `obj[key]`. `keyof any` is `string | number | symbol`.",
    beats: [
      "`keyof` an interface includes optional keys. `keyof` a class includes public keys, not private.",
      "`T[keyof T]` is a union of all value types (a poor man’s `ValueOf`).",
      "Mapped types iterate `keyof T`. `Pick`/`Omit` are built on this.",
    ],
    intro: "The operator that makes type-safe dictionaries and form libraries possible.",
    why: "`pluck(obj, key)` without `keyof` is `any`.",
    concept: "Keys of arrays include `number` and methods unless you use tuples. `keyof string` is number-like indexes — prefer not to keyof primitives.",
    how: "`function get<T, K extends keyof T>(o: T, k: K): T[K] { return o[k]; }`",
    usage: "i18n keys, table columns, `Object.keys` is `string[]` — not `keyof T[]` without a generic helper.",
    practices: "Constrain `K extends keyof T`. Don’t `as keyof T` after `Object.keys` without a documented hole.",
    mistakes: "Assuming `Object.keys(user)` is `(keyof User)[]` (it is `string[]` by design). Using `keyof` on a union (it intersects keys).",
    code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const name = get({ id: "1", name: "Ada" }, "name");
`,
    examples: [
      {
        id: "union-keys",
        title: "`keyof` a union",
        about: "Only common keys.",
        language: "typescript",
        code: `type A = { a: 1; c: 3 };
type B = { b: 2; c: 3 };
type K = keyof (A | B); // "c"
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-typeof",
    title: "`typeof`",
    order: 11,
    summary: "In type position, `typeof value` is the type of a runtime value. Not JS `typeof`.",
    prerequisites: ["typescript-keyof"],
    related: ["typescript-inference"],
    isHighYield: true,
    oneLiner:
      "JS `typeof x` returns a string at runtime. TS `typeof x` in a *type* position queries the static type of a value: `const cfg = { url: \"/\" }; type Cfg = typeof cfg`. Combine with `keyof` (`keyof typeof cfg`) and indexed access `(typeof roles)[number]` for arrays. `ReturnType<typeof fn>` is a utility built on this idea.",
    beats: [
      "Works on functions, classes (`typeof Foo` is the constructor type; `InstanceType<typeof Foo>` is the instance).",
      "Needs a value in scope — you cannot `typeof` a type alias.",
      "`as const` + `typeof` is how you derive unions from runtime arrays.",
    ],
    intro: "Two `typeof`s in one language. Say “type query” in interviews.",
    why: "DRY: one runtime object is the source of keys and types.",
    concept: "Type query vs JS operator. In `const x: typeof y = y` you copy a type from a value.",
    how: "Define `const Routes = { home: \"/\", learn: \"/learn\" } as const` then `type RouteHref = (typeof Routes)[keyof typeof Routes]`.",
    usage: "Config objects, action maps, enum-like objects (prefer these over TS enums).",
    practices: "Prefer `as const` objects over numeric enums. Use `typeof fn` for `Parameters`/`ReturnType`.",
    mistakes: "Writing `typeof User` when `User` is an interface (error). Confusing with JS typeof in a type annotation (`x: typeof \"hi\"` is invalid — use `typeof x` on a value named x).",
    code: `const tokens = { brand: "#EDAE49", ink: "#1F2937" } as const;
type TokenName = keyof typeof tokens;
type Token = (typeof tokens)[TokenName];
`,
    examples: [
      {
        id: "fn",
        title: "`typeof` a function",
        about: "Feed utility types.",
        language: "typescript",
        code: `function add(a: number, b: number) {
  return a + b;
}
type Add = typeof add;
type Out = ReturnType<Add>;
`,
      },
    ],
  }),
];
