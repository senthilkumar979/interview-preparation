import { sassTopic } from "./factory";

export const sassModules = sassTopic({
  slug: "sass-modules",
  title: "Modules",
  order: 8,
  summary: "`@use` and `@forward` replaced `@import`. Namespaces, `with`, and load-once.",
  prerequisites: ["sass-partials", "sass-variables"],
  related: ["sass-mixins"],
  isHighYield: true,
  oneLiner:
    "Modern Sass is a module system. `@use 'tokens'` loads a file once, prefixes members with a namespace (`tokens.$brand`, `tokens.stack()`), and hides private members (`$-inner` or `_` prefix). `@forward 'tokens'` re-exports a module from a barrel file. `@import` is deprecated: it was global, copied CSS, and loaded files many times.",
  beats: [
    "`@use` is first in the file (before rules except `@charset`/`@forward`).",
    "`as` renames: `@use 'tokens' as t` → `t.$brand`. `@use 'tokens' as *` dumps names into the current module (use sparingly).",
    "`with ($brand: #000)` configures `!default` variables of that module, only on the first load.",
  ],
  intro: "This is the Sass interview after “what is a mixin”: how do files share tokens without globals?",
  why: "Name collisions and duplicated CSS were the `@import` tax. Modules fix both.",
  concept:
    "Each file is a module. Members: variables, mixins, functions. CSS in a module is included once in the output, at the point of the first `@use` that pulls it in. `@forward` with `hide`/`show` builds public APIs.",
  how: "`@use 'sass:math'`; `@use '../tokens';` relative URLs. Load paths (`includePaths`) for `~` packages like `@use 'bootstrap'`.",
  usage: "Design-system packages. `index.scss` that only `@forward`s.",
  extras: [
    {
      key: "import",
      title: "Why not `@import`",
      body: "`@import` inlined the file every time, shared a global namespace, and allowed use after CSS rules. Dart Sass still accepts it with deprecation. New code: `@use`/`@forward` only.",
    },
    {
      key: "forward",
      title: "`@forward`",
      body: "`@forward 'tokens';` makes `tokens` members available to whoever `@use`s *this* file. `@forward 'tokens' as tokens-*;` prefixes. Use a `_index.scss` in a folder so `@use 'components'` loads the barrel.",
    },
  ],
  practices: "One `@use 'tokens'` per file that needs tokens. Keep a public `api` file that `@forward`s. Prefix private vars with `-`.",
  mistakes: "Using `$brand` after `@use 'tokens'` without the namespace. `@use` after a CSS rule. Configuring a module twice with different `with`.",
  figures: [
    {
      src: "/diagrams/sass/sass-modules.png",
      alt: "@use loads partials into main.scss with namespaces",
      caption: "Module graph, one CSS bundle",
    },
  ],
  code: `@use "tokens";
@use "mixins";

.btn {
  background: tokens.$brand;
  @include mixins.stack(0.5rem);
}
`,
  examples: [
    {
      id: "forward",
      title: "Barrel",
      about: "Consumers `@use 'lib'`.",
      language: "css",
      code: `// lib/_index.scss
@forward "tokens";
@forward "mixins";
`,
    },
  ],
});
