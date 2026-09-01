import { tsTopic } from "./factory";

export const typescriptAdvancedTopics = [
  tsTopic({
    slug: "typescript-utility-types",
    title: "Utility types",
    order: 13,
    summary: "`Partial`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`, and friends.",
    prerequisites: ["typescript-generics"],
    related: ["typescript-mapped-types"],
    isHighYield: true,
    oneLiner:
      "Utility types are built-in generic aliases. `Partial<T>` makes every property optional. `Required<T>` the opposite. `Pick<T, K>` / `Omit<T, K>` subset keys. `Record<K, V>` is a dict. `Readonly<T>`. `NonNullable<T>`. Function: `Parameters<F>`, `ReturnType<F>`, `ConstructorParameters`. They are all expressible as mapped/conditional types — the handbook names save you writing them.",
    beats: [
      "`Omit` is `Pick` of the remaining keys. `K` must be `keyof T` (or a union thereof).",
      "`Record<string, User>` allows any string key. `Record<\"a\" | \"b\", User>` is closed.",
      "`Awaited<Promise<T>>` unwraps promises. `NoInfer<T>` (newer) blocks unwanted inference.",
    ],
    intro: "Whiteboard: implement `Partial` — then you understand mapped types.",
    why: "Everyday refactors: DTO vs entity, optional patch bodies.",
    concept: "Utilities are not runtime. `Partial` does not make JSON fields optional at runtime.",
    how: "`type Patch = Partial<User>`. `type UserId = User[\"id\"]` (indexed access, not a utility name).",
    usage: "React `ComponentProps`, form patches, test factories.",
    practices: "Prefer `Pick`/`Omit` over copying interfaces. Don’t `Partial` a whole API if only two fields are optional.",
    mistakes: "`Omit<User, \"password\">` thinking it strips the field at runtime. `Record<string, any>`.",
    code: `type User = { id: string; email: string; role: "admin" | "user" };
type Patch = Partial<User>;
type Public = Omit<User, "email">;
type ById = Record<string, User>;
`,
    examples: [
      {
        id: "returntype",
        title: "`ReturnType`",
        about: "From a function value’s type.",
        language: "typescript",
        code: `declare function loadUser(): Promise<User>;
type Loaded = Awaited<ReturnType<typeof loadUser>>;
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-mapped-types",
    title: "Mapped types",
    order: 14,
    summary: `{ [K in keyof T]: … } — transform every property. \`readonly\` and \`?\` modifiers.`,
    prerequisites: ["typescript-utility-types", "typescript-keyof"],
    related: ["typescript-conditional-types"],
    isHighYield: true,
    oneLiner:
      "A mapped type loops keys: `{ [K in keyof T]: T[K] | null }`. Modifiers: `readonly`, `-readonly`, `?`, `-?`. Key remapping: `{ [K in keyof T as `get${Capitalize<string & K>}`]: T[K] }` (TS 4.1+). `Partial` is `{ [K in keyof T]?: T[K] }`. Homomorphic mapped types copy modifiers from `T`.",
    beats: [
      "`in` iterates a key union, not only `keyof T` — `in \"a\" | \"b\"`.",
      "`as` clause can filter keys by mapping to `never`.",
      "You cannot map over a union of objects that way without `T extends any` distribution tricks.",
    ],
    intro: "The engine under utilities. Interviews: write `Readonly` or a getter map.",
    why: "Design-system props, form dirty flags, API serialization types.",
    concept: "Homomorphic vs fresh mapped types. Template literal keys for `getX` style APIs.",
    how: "`type Nullable<T> = { [K in keyof T]: T[K] | null };`",
    usage: "Zustand/Redux field flags. GraphQL codegen patterns.",
    practices: "Start from `keyof T`. Use `-?` when you need all keys required. Keep remaps readable.",
    mistakes: "Forgetting `keyof`. Using mapped types where a union of functions was needed. Mutating via mapped type and expecting runtime effect.",
    figures: [
      {
        src: "/diagrams/ts/ts-mapped.png",
        alt: "User object transformed by a mapped type over keyof T",
        caption: "[K in keyof T]",
      },
    ],
    code: `type Nullable<T> = { [K in keyof T]: T[K] | null };
type Flags<T> = { [K in keyof T]: boolean };
`,
    examples: [
      {
        id: "remap",
        title: "Key remapping",
        about: "Prefix getters; drop keys with never.",
        language: "typescript",
        code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-conditional-types",
    title: "Conditional types",
    order: 15,
    summary: "`T extends U ? X : Y`, `infer`, and distributivity over unions.",
    prerequisites: ["typescript-mapped-types"],
    related: ["typescript-template-literals"],
    isHighYield: true,
    oneLiner:
      "`T extends U ? X : Y` picks a type from a constraint. Naked `T` in `T extends …` distributes over unions: `string | number extends string ? …` becomes a union of results. `infer R` pulls a piece out (`T extends Promise<infer U> ? U : T`). `NonNullable` and `ReturnType` are conditionals. `never` in a distributed branch filters unions.",
    beats: [
      "Wrap in `[T] extends [U]` to disable distributivity.",
      "`infer` only in the true branch of `extends`. Multiple `infer` allowed.",
      "Recursive conditionals have depth limits — keep them shallow in interviews.",
    ],
    intro: "The “logic” of the type system. Senior interviews live here.",
    why: "Library types (`Flatten`, `ElementOf`) and filtering `null` from unions.",
    concept: "Distributive vs non-distributive. `infer` as a pattern match on structure.",
    how: "`type Flatten<T> = T extends (infer E)[] ? E : T;`",
    usage: "Unwrap promises, extract function params, filter unions (`Exclude`).",
    extras: [
      {
        key: "filter",
        title: "Filter a union",
        body: "`type NotString<T> = T extends string ? never : T` then `NotString<string | number>` is `number` because `string` branch is `never` and vanishes.",
      },
    ],
    practices: "Name intermediate aliases. Add a non-distributive tuple wrap when the union should stay whole.",
    mistakes: "Forgetting distributivity and “why did my union explode?” Using `infer` in the false branch.",
    code: `type Flatten<T> = T extends Array<infer E> ? E : T;
type Ex1 = Flatten<string[]>; // string
type Ex2 = Flatten<string>; // string
`,
    examples: [
      {
        id: "awaited",
        title: "Simplify Promise",
        about: "One `infer` layer.",
        language: "typescript",
        code: `type MyAwaited<T> = T extends Promise<infer U> ? U : T;
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-template-literals",
    title: "Template literal types",
    order: 16,
    summary: "`\`a|\${Union}|\` ` builds string types. `Uppercase`, `Capitalize`, pattern matching.",
    prerequisites: ["typescript-conditional-types"],
    related: ["typescript-mapped-types"],
    isHighYield: true,
    oneLiner:
      "Template literal types concatenate string literals and distribute over unions: `` `on${Capitalize<Event>}` ``. Intrinsic helpers: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. You can `infer` inside templates: `T extends `get${infer K}` ? K : never`. They are types, not runtime strings, until you write a matching value.",
    beats: [
      "`` `${A}-${B}` `` with unions A, B is a cartesian product — can explode.",
      "CSS-in-JS and event names (`onClick`) are the motivating examples.",
      "Combine with mapped `as` remapping for `getX` APIs.",
    ],
    intro: "TS 4.1 feature that made typed CSS and routers nicer.",
    why: "Catch `onClik` typos. Extract ids from pattern strings.",
    concept: "String unions × templates. Inference from patterns like extract path params (simplified).",
    how: "`type Ev = \"click\" | \"focus\"; type Handler = `on${Capitalize<Ev>}`;`",
    usage: "Kebab-case converters, i18n keys, query param names.",
    practices: "Keep unions small. Don’t generate every CSS color. Prefer `as const` objects when the set is known.",
    mistakes: "Infinite recursive templates. Using template types where an enum-like object was clearer.",
    code: `type EventName = "click" | "focus";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus"
`,
    examples: [
      {
        id: "infer",
        title: "Infer from a pattern",
        about: "Strip a prefix.",
        language: "typescript",
        code: `type StripGet<T> = T extends \`get\${infer Rest}\` ? Uncapitalize<Rest> : T;
type F = StripGet<"getUser">; // "user"
`,
      },
    ],
  }),
];
