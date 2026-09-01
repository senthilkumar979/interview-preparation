import { tsTopic } from "./factory";

export const typescriptClassTopics = [
  tsTopic({
    slug: "typescript-inheritance",
    title: "Classes and inheritance",
    order: 20,
    summary: "`extends`, `implements`, visibility, `abstract`, and the difference from interface extends.",
    prerequisites: ["typescript-interface"],
    related: ["typescript-generics"],
    isHighYield: true,
    oneLiner:
      "TS classes are JS classes plus types. `extends` inherits members (runtime). `implements Interface` is a compile-time check only. Visibility: `public` (default), `private` (TS-only, still on the object), `protected`, `#` true JS private. `abstract class` cannot be constructed; subclasses must implement abstract members. Parameter properties: `constructor(private id: string) {}`.",
    beats: [
      "Interface `extends` is a type composition. Class `extends` is a prototype chain.",
      "`private` is erased — it is not `#field`. Don’t treat it as a security boundary.",
      "`override` keyword catches missed superclass methods when renaming.",
    ],
    intro: "OOP interviews still happen. TS adds types on top of ES classes.",
    why: "Angular/React class components (legacy), error hierarchies, DI tokens.",
    concept:
      "Structural typing: two classes with the same public shape may be assignable. `protected` is visible in subclasses. Static members are on the constructor type (`typeof C`).",
    how: "`class Admin extends User implements Auditable`. Prefer composition when inheritance trees grow.",
    usage: "Framework base classes. Domain entities if you already use classes.",
    extras: [
      {
        key: "vs-interface",
        title: "Class vs interface inheritance",
        body: "`interface A extends B` — no runtime. `class A extends B` — `super()`, instanceof. A class can `implements` multiple interfaces; it can `extends` only one class (mixins are a pattern on top).",
      },
    ],
    practices: "`override`. Prefer `#` for real privacy. Keep constructors thin. Don’t model every type as a class.",
    mistakes: "Expecting `private` to hide fields from JS consumers. Deep class hierarchies for data bags. Forgetting `super()` in constructors.",
    code: `interface Identified {
  id: string;
}

class User implements Identified {
  constructor(public readonly id: string) {}
}

class Admin extends User {
  override toString() {
    return \`admin:\${this.id}\`;
  }
}
`,
    examples: [
      {
        id: "abstract",
        title: "Abstract class",
        about: "Must subclass.",
        language: "typescript",
        code: `abstract class Store<T> {
  abstract get(id: string): T;
}
`,
      },
    ],
  }),
];
