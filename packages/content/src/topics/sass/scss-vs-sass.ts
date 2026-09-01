import { sassTopic } from "./factory";

export const sassScssVsSass = sassTopic({
  slug: "sass-scss-vs-sass",
  title: "SCSS vs Sass",
  order: 2,
  summary: "Two syntaxes, one language: braces (SCSS) vs indentation (indented Sass).",
  prerequisites: ["sass-preprocessing"],
  related: ["sass-nesting"],
  isHighYield: true,
  oneLiner:
    "SCSS (`.scss`) is a CSS superset: braces, semicolons, you can paste CSS in. The original indented syntax (`.sass`) uses indentation instead of `{}` and newlines instead of `;`. Same features (`$`, `@mixin`, `@use`). Teams almost always choose SCSS.",
  beats: [
    "Valid CSS is valid SCSS. It is not valid indented Sass (missing structure).",
    "File extension chooses the parser. You can `@use` a `.sass` file from SCSS.",
    "“Sass” is the language; “SCSS” is the syntax you will write in interviews unless they say indented.",
  ],
  intro: "The naming trap: people say Sass and mean SCSS.",
  why: "A `.sass` file in a SCSS codebase is a parse error waiting. Docs and Stack Overflow mix both.",
  concept:
    "SCSS: CSS-like. Indented: Python-like, no braces, nested properties (`font: size 1rem family sans-serif` historically). Mixins and rest of the language are identical after parse.",
  how: "Pick one per project. Convert with the Sass migrator if needed. Prefer SCSS for hiring-loop consistency.",
  usage: "New work: SCSS. Legacy Ruby tutorials: indented.",
  practices: "Standardize on `.scss`. Configure the linter for one syntax.",
  mistakes: "Calling SCSS “not real Sass.” Mixing indentation and braces in one file.",
  figures: [
    {
      src: "/diagrams/sass/sass-scss-vs-sass.png",
      alt: "SCSS with braces versus indented Sass syntax",
      caption: "Same output CSS, two writings",
    },
  ],
  code: `/* SCSS */
.card {
  padding: 1rem;
  h2 { margin: 0; }
}
`,
  examples: [
    {
      id: "indented",
      title: "Indented Sass",
      about: "Same idea, significant whitespace.",
      language: "css",
      code: `.card
  padding: 1rem
  h2
    margin: 0
`,
    },
  ],
});
