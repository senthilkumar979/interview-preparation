import { sassTopic } from "./factory";

export const sassInheritance = sassTopic({
  slug: "sass-inheritance",
  title: "Inheritance (`@extend`)",
  order: 11,
  summary: "`@extend` groups selectors. Placeholder `%name` avoids unused classes. Mixins are usually safer.",
  prerequisites: ["sass-mixins"],
  related: ["sass-nesting"],
  isHighYield: true,
  oneLiner:
    "`@extend .btn` means “this selector should get `.btn`’s declarations” by merging selectors: `.btn, .btn-ok { ... }`. `%placeholder` selectors exist only for extend and emit no class unless extended. `@extend` cannot pass arguments, can create unexpected selector combinations, and is banned in many style guides in favor of mixins.",
  beats: [
    "Output is selector grouping, not a copy of declarations (unlike mixins).",
    "`@extend` is not allowed from inside `@media` to a selector outside in the way people expect — it has rules; this surprises people.",
    "Optional extend: `@extend .btn !optional` if the target might be missing.",
  ],
  intro: "OOP word, CSS mechanism. Interviews want the mixin vs extend trade-off.",
  why: "Silent selector blow-up (`.a .b, .c .b`) is a classic Sass footgun.",
  concept:
    "Sass finds the extender and the extender’s “simple selector” and unions them wherever the target appears. Placeholders `%foo` keep HTML free of utility classes you never wanted.",
  how: "Define `%btn-base { ... }` then `.btn { @extend %btn-base; }`. Prefer mixins if you need parameters or isolated output.",
  usage: "Error/success variants that truly share one declaration block.",
  extras: [
    {
      key: "when",
      title: "Mixin vs extend",
      body: "Mixin — duplicates CSS, arguments, `@content`, predictable output. Extend — smaller CSS if many selectors share one block, no parameters, risk of combinatorial selectors. Default recommendation in 2026: mixins + composition in HTML, extend only for placeholders you control.",
    },
  ],
  practices: "Extend placeholders, not deep nested classes. Never `@extend` a complex selector you do not own.",
  mistakes: "Extending `.btn` from a nested `.modal .ok` and shipping `.modal .btn`. Using extend for spacing utilities.",
  figures: [
    {
      src: "/diagrams/sass/sass-mixin-extend.png",
      alt: "Mixins copy declarations; extend groups selectors",
      caption: "Copy vs group",
    },
  ],
  code: `%btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.btn-ok {
  @extend %btn;
  background: #edae49;
}
`,
  examples: [
    {
      id: "output",
      title: "Compiled grouping",
      about: "One declaration block, two selectors.",
      language: "css",
      code: `.btn-ok {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #edae49;
}
/* with another extender, Sass may emit
   .btn-ok, .btn-cancel { padding: ... } */
`,
    },
  ],
});
