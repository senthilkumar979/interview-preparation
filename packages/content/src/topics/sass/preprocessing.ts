import { sassTopic } from "./factory";

export const sassPreprocessing = sassTopic({
  slug: "sass-preprocessing",
  title: "Preprocessing",
  order: 1,
  summary: "Sass compiles to CSS before the browser. The browser never sees $variables or @mixin.",
  prerequisites: ["css-syntax"],
  related: ["sass-scss-vs-sass", "css-nesting"],
  isHighYield: true,
  oneLiner:
    "Sass is a CSS preprocessor: a compiler (Dart Sass) turns `.scss`/`.sass` into plain CSS. Features like variables, nesting, mixins, and modules exist only at compile time. The browser still receives CSS — there is no Sass runtime in the page.",
  beats: [
    "Dart Sass is the current implementation. LibSass/node-sass is deprecated.",
    "Build tools (Vite, webpack, `sass` CLI) run the compiler. Source maps map generated CSS back to SCSS.",
    "CSS custom properties (`--token`) exist in the browser; Sass `$vars` do not unless you emit them.",
  ],
  intro: "Interviews start here: why Sass if CSS now has nesting and variables? Answer: compile-time modules, mixins with arguments, maps, and a stable design-token pipeline — plus a lot of existing codebases.",
  why: "If you debug in DevTools you see CSS. If you search the repo you see SCSS. That split is the whole job.",
  concept:
    "Input files → load `@use` graph → evaluate → emit CSS. Unused mixins/functions emit nothing. Syntax errors fail the build, not the browser.",
  how: "`sass src/styles.scss dist/styles.css`. Vite: `lang=\"scss\"` or `import './styles.scss'`. Output style: expanded vs compressed.",
  usage: "Design systems, large CSS codebases, theming at build time.",
  extras: [
    {
      key: "vs-css",
      title: "Sass vs native CSS",
      body: "Custom properties cascade and can change at runtime (theming, JS). Sass variables are computed once. Native nesting is similar but has no `#{$}` interpolation and no mixin libraries. Prefer CSS when the value must react in the browser; prefer Sass when the value is a build-time token or repeated snippet.",
    },
  ],
  practices: "Commit to Dart Sass. Ship source maps in dev. Do not hand-edit generated CSS.",
  mistakes: "Expecting `$color` in the browser. Running node-sass in 2026. Importing Sass into a page with a `<link>` without compiling.",
  figures: [
    {
      src: "/diagrams/sass/sass-preprocess.png",
      alt: "SCSS source compiled by Dart Sass to CSS the browser reads",
      caption: "Compile time, not runtime",
    },
  ],
  code: `// styles.scss — compiled, never sent as-is
$brand: #edae49;
.btn { background: $brand; }
`,
  examples: [
    {
      id: "cli",
      title: "CLI",
      about: "Watch compiles on save.",
      language: "javascript",
      code: `npx sass --watch src/styles.scss:dist/styles.css
`,
    },
  ],
});
