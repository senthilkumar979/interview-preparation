import { tsTopic } from "./factory";

export const typescriptToolingTopics = [
  tsTopic({
    slug: "typescript-tsconfig",
    title: "tsconfig and modules",
    order: 21,
    summary: "`compilerOptions`, `strict`, module systems, `paths`, and project references.",
    prerequisites: ["typescript-basics", "typescript-namespaces"],
    related: ["typescript-declaration-files"],
    isHighYield: true,
    oneLiner:
      "`tsconfig.json` tells `tsc` what to compile and how. `strict` (and its flags) is the interview default. `module` / `moduleResolution` (`NodeNext`, `Bundler`) decide import emit and how `exports` in `package.json` resolve. `target` is the JS language level. `noEmit` for apps that only typecheck. `paths` are compile-time aliases — bundlers need matching aliases. `include`/`exclude` set the file graph.",
    beats: [
      "`strict` turns on `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc.",
      "`esModuleInterop` / `verbatimModuleSyntax` / `isolatedModules` matter for Vite/Babel (each file must be a module).",
      "`skipLibCheck` skips `.d.ts` speed vs safety. `incremental` / `composite` for monorepos.",
    ],
    intro: "A TS codebase is a tsconfig. Wrong `moduleResolution` is “cannot find module.”",
    why: "Every frontend interview that uses Vite/Next hits this file.",
    concept:
      "Root files vs project references (`references: [{ path: \"../ui\" }]`). `extends` a base config. `jsx`. `lib` (`DOM`, `ES2022`) vs `target`.",
    how: "`npx tsc --init`. Apps: `noEmit: true` + bundler. Libraries: `declaration: true`, `outDir`, `module: NodeNext`.",
    usage: "Monorepo packages, path aliases `@/components`.",
    extras: [
      {
        key: "modules",
        title: "Modules in 2026",
        body: "Write `import`/`export` ESM. `\"type\": \"module\"` in package.json. `moduleResolution: Bundler` for Vite. `NodeNext` for Node libraries (need `.js` extensions in relative imports in emit). Don’t mix `require` and `import` without knowing CJS interop. `import type` with `verbatimModuleSyntax` is mandatory for type-only imports.",
      },
    ],
    practices: "Keep `strict` on. Match `paths` to Vite/`jsconfig`. CI `tsc --noEmit`. Don’t commit `skipLibCheck` as a way to ignore your own broken types.",
    mistakes: "`target: ES5` for a modern app by cargo cult. `paths` without bundler config. Compiling tests with the app `include` accidentally.",
    language: "json",
    code: `{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "jsx": "react-jsx",
    "skipLibCheck": true
  },
  "include": ["src"]
}
`,
    examples: [
      {
        id: "paths",
        title: "paths",
        about: "Must match the bundler.",
        language: "typescript",
        code: `// tsconfig.json compilerOptions excerpt
// "baseUrl": ".",
// "paths": { "@/*": ["src/*"] }
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-declaration-files",
    title: "Declaration files",
    order: 22,
    summary: "`.d.ts` describe JS for the checker. `declare`, `@types`, `export {}`.",
    prerequisites: ["typescript-tsconfig"],
    related: ["typescript-types"],
    oneLiner:
      "A declaration file (`.d.ts`) has types and `declare`d values, no emit. Libraries ship `index.d.ts` (`types`/`exports` in package.json). Ambient `declare module \"foo\"` types untyped packages. `@types/node` is DefinitelyTyped. `allowJs` + `checkJs` is an alternative to writing `.d.ts` for your own JS.",
    beats: [
      "`declare const API_URL: string` for compile-time globals (still inject at runtime).",
      "`export as namespace` and UMD types exist for old libraries.",
      "`skipLibCheck` does not skip your own `.d.ts` in `include`.",
    ],
    intro: "How TS understands lodash without converting lodash to TS.",
    why: "You’ll write `vite-env.d.ts` (`/// <reference types=\"vite/client\" />`) on day one.",
    concept: "Ambient vs module `.d.ts`. Triple-slash references. `types` vs `typeRoots`.",
    how: "`declaration: true` on a TS library generates `.d.ts`. For a JS lib, author them by hand or with `tsc`.",
    usage: "CSS modules (`declare module \"*.module.css\"`). Env vars.",
    practices: "Minimal `declare module` that you own. Prefer `@types` over hand-rolling Node. Don’t `declare module \"*\"`.",
    mistakes: "Putting runtime code in `.d.ts`. Duplicate identifiers vs `@types` and a bundled `types`.",
    code: `declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API: string;
}
`,
    examples: [
      {
        id: "declare-mod",
        title: "Untyped package",
        about: "Last-resort shim.",
        language: "typescript",
        code: `declare module "legacy-widget" {
  export function mount(el: HTMLElement): void;
}
`,
      },
    ],
  }),

  tsTopic({
    slug: "typescript-satisfies",
    title: "`satisfies` and `as const`",
    order: 23,
    summary: "Check a value against a type without widening it. Literal inference for objects.",
    prerequisites: ["typescript-inference", "typescript-typeof"],
    related: ["typescript-enums"],
    oneLiner:
      "`as const` infers the narrowest literals and readonly tuples. `satisfies T` checks that a value matches `T` but keeps the inferred literal type — unlike `const x: T = …`, which widens. Use both: `const routes = { home: \"/\" } as const satisfies Record<string, \`/\${string}\`>`. `as T` is an assertion (unsafe); `satisfies` is a check.",
    beats: [
      "`:` annotation can lose literal keys. `satisfies` keeps them for `keyof typeof`.",
      "`as const` on arrays gives readonly tuples.",
      "`as` is the escape hatch; `satisfies` is the seatbelt.",
    ],
    intro: "TS 4.9 feature interviewers like because it shows you care about inference.",
    why: "Config objects that must match a shape and remain `as const`.",
    concept: "Validation vs widening vs assertion.",
    how: "Write the object, `satisfies Theme`, hover to confirm literals remain.",
    usage: "Route maps, design tokens, command palettes.",
    practices: "Prefer `satisfies` over `as Theme`. Combine with `as const` when you need literals.",
    mistakes: "`as Theme` on a typo’d object (you silenced the error). Forgetting `as const` then `keyof` is `string`.",
    code: `const routes = {
  home: "/",
  learn: "/learn",
} as const satisfies Record<string, \`/\${string}\`>;

type RouteId = keyof typeof routes;
`,
    examples: [
      {
        id: "vs-annot",
        title: "Annotation widens",
        about: "`keyof` becomes string.",
        language: "typescript",
        code: `const wide: Record<string, string> = { home: "/" };
type K = keyof typeof wide; // string | number
`,
      },
    ],
  }),
];
