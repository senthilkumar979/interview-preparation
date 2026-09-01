import { tsTopic } from "./factory";

export const typescriptIntroTopics = [
  tsTopic({
    slug: "typescript-basics",
    title: "TypeScript basics",
    order: 1,
    summary: "A typed superset of JavaScript that compiles to JS. Types exist at compile time only.",
    prerequisites: ["javascript-vanilla"],
    related: ["typescript-why", "typescript-tsconfig"],
    isHighYield: true,
    oneLiner:
      "TypeScript is JavaScript plus a type system. `tsc` (or a bundler) erases types and emits JS the browser or Node already runs. `.ts` / `.tsx` are source; `.d.ts` are types without runtime. If it is valid JS, it is often valid TS — until `strict` catches you.",
    beats: [
      "Types are erased: `interface User` is gone at runtime. Runtime checks are still JS (`typeof`, Zod, etc.).",
      "You can rename a file to `.ts` and add annotations gradually (`allowJs`, `checkJs`).",
      "The compiler is not the browser. Target (`ES2022`) and module (`ESNext`/`CommonJS`) decide the emit.",
    ],
    intro: "Interviews: “what happens to types in production?” — they disappear. TS is a build-time tool and a documentation language the compiler enforces.",
    why: "Every later topic is a way to say more to `tsc` so it can refuse bad programs before they ship.",
    concept:
      "Gradual typing. Structural typing (duck typing): extra properties are OK when passing object literals only under excess-property checks; assignability is about shape, not `implements` names.",
    how: "`npm i -D typescript`. `npx tsc --init`. `npx tsc` emits JS next to TS or to `outDir`. Vite/Next typecheck separately from bundle.",
    usage: "Apps, libraries (`declaration: true`), CLIs.",
    extras: [
      {
        key: "tsx",
        title: "`.tsx`",
        body: "JSX in TypeScript. `jsx: react-jsx` for the modern transform. Generic arrows need a trailing comma or `extends` so `<T>` is not parsed as a tag: `const id = <T,>(x: T) => x`.",
      },
    ],
    practices: "Treat `tsc --noEmit` in CI as the source of truth. Don’t ship unsound `as any` to silence the build.",
    mistakes: "Thinking TypeScript runs in the browser. Expecting `interface` to exist in `typeof` at runtime. Skipping emit/module settings.",
    figures: [
      {
        src: "/diagrams/ts/ts-compile.png",
        alt: "TypeScript source compiled to JavaScript with types erased",
        caption: "Compile time only",
      },
    ],
    code: `function greet(name: string): string {
  return \`Hello, \${name}\`;
}

greet("PrepQuest");
`,
    examples: [
      {
        id: "erase",
        title: "Emitted JS",
        about: "Annotations gone.",
        language: "javascript",
        code: `function greet(name) {
  return "Hello, " + name;
}
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-why",
    title: "Why TypeScript",
    order: 2,
    summary: "Advantages over untyped JS: catch errors early, document APIs, refactor with the compiler.",
    prerequisites: ["typescript-basics"],
    related: ["typescript-types", "typescript-tsconfig"],
    isHighYield: true,
    oneLiner:
      "TypeScript does not make JS faster in the browser. It makes incorrect programs fail at compile time, makes editor autocomplete real, and makes refactors (rename a property across 200 files) mechanical. The cost is learning the type system and a build step. You still write JS semantics.",
    beats: [
      "Advantage: exhaustive `switch` on unions, typed fetch wrappers, safer public APIs.",
      "Not an advantage: runtime validation of API JSON — types lie unless you parse (Zod).",
      "`any` opts out; a JS file with no checks is the same escape hatch.",
    ],
    intro: "“Why not just JS?” is the opener. Answer with feedback loops, not slogans.",
    why: "Hiring loops expect this pitch plus the honesty about erasure and `any`.",
    concept:
      "Soundness vs productivity: TS is not fully sound (`as`, `any`, variance holes). It is practical. Advantages compound in teams and libraries.",
    how: "Enable `strict`. Type public functions. Infer locals. Add Zod at trust boundaries (network, localStorage).",
    usage: "Every serious frontend/Node codebase in this decade’s interviews.",
    extras: [
      {
        key: "vs-js",
        title: "Compared to JavaScript",
        body: "JS: dynamic, runtime TypeErrors, “undefined is not a function.” TS: those become red squiggles if you typed the data. JS: JSDoc can help `checkJs`. TS: first-class syntax. JS: no enums/namespaces (TS extra runtime if you use those poorly). TS: better IDE navigation. Neither replaces tests.",
      },
    ],
    practices: "Sell TS as a compiler-checked spec for functions. Keep runtime checks where data is untrusted.",
    mistakes: "Claiming TS prevents all bugs. Using TS enums as the reason to adopt TS. Disabling `strict` to “move faster.”",
    code: `type User = { id: string; email: string };

function emailOf(user: User) {
  return user.email;
}

// emailOf({ id: "1" }); // compile error — caught before prod
`,
    examples: [
      {
        id: "boundary",
        title: "Types are not validators",
        about: "JSON is `unknown` until parsed.",
        language: "typescript",
        code: `const data: unknown = JSON.parse(text);
// still need a runtime schema — types won’t run
`,
      },
    ],
  }),
];
