import { sassTopic } from "./factory";

export const sassPartials = sassTopic({
  slug: "sass-partials",
  title: "Partials",
  order: 7,
  summary: "`_file.scss` is a partial: compiled only when `@use`d, not as its own CSS file.",
  prerequisites: ["sass-preprocessing"],
  related: ["sass-modules"],
  isHighYield: true,
  oneLiner:
    "A partial is a Sass file whose name starts with `_` (`_tokens.scss`). Compilers skip emitting `_tokens.css`. You load it with `@use 'tokens'` (underscore and extension omitted). Partials are how you split a stylesheet without shipping a dozen CSS files.",
  beats: [
    "The underscore is a convention the compiler honors: “do not compile this as an entry.”",
    "Entry files (`styles.scss`, no underscore) `@use` partials and are the only compile targets.",
    "Partials can `@use` other partials. Cycles are errors.",
  ],
  intro: "Folders of `_button.scss`, `_card.scss` plus one `index` is the standard layout.",
  why: "Without partials, every file becomes a `<link>` or a competing CSS bundle.",
  concept:
    "`styles/settings/_tokens.scss`, `styles/components/_button.scss`, `styles/main.scss` as the graph root.",
  how: "Name `_*.scss`. Import via module system. Never compile partials as Vite entries.",
  usage: "One partial per component or concern.",
  practices: "Mirror the UI structure. Keep `_tokens` free of selectors so it emits no CSS.",
  mistakes: "Forgetting the underscore and generating empty extra CSS. `@use`ing a path that includes `_` incorrectly (`@use '_tokens'` works but is noisy).",
  code: `// _tokens.scss
$brand: #edae49;

// main.scss
@use "tokens";
body { color: tokens.$brand; }
`,
  examples: [
    {
      id: "tree",
      title: "Typical tree",
      about: "Only `main.scss` is compiled.",
      language: "css",
      code: `styles/
  main.scss
  _tokens.scss
  components/_button.scss
`,
    },
  ],
});
