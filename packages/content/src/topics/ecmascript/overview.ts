import { esTopic } from "./factory";

export const esOverview = esTopic({
  slug: "es-overview",
  title: "ECMAScript editions",
  order: 1,
  summary: "ECMA-262 is the language. ES6 is ES2015. Since 2016 the spec ships every June.",
  prerequisites: ["javascript-ecmascript"],
  related: ["es2015", "javascript-vanilla"],
  isHighYield: true,
  oneLiner:
    "JavaScript is the common name; ECMAScript (ECMA-262) is the language standard TC39 edits. ES6 = 6th edition = ES2015 (June 2015). From ES2016 onward, editions are yearly. Stage 4 proposals enter the next June spec. Engines lag; `fetch` and the DOM are host APIs, not ECMAScript.",
  beats: [
    "Cite the year (ES2020), not “ES7” — after ES6 the marketing numbers and years diverge (ES2016 is the 7th edition).",
    "Syntax needs a parser (transpile). Many methods can be polyfilled (`core-js`).",
    "This track is language-only, edition by edition, with product-shaped examples.",
  ],
  intro: "The JS track teaches concepts. This track is a version map so you can answer “since when?” and pick a browserslist.",
  why: "Interviews still say ES6. Production asks “can we use `?.` without Babel?”",
  concept:
    "TC39: stage 0–4. Stage 4 → next ECMA-262. `es-overview` is the table of contents; each following topic is one edition.",
  how: "Read MDN compat, not blog titles. Node and browsers ship independently of the June PDF.",
  usage: "Baseline targets, interview timelines, reading changelogs.",
  practices: "Name ES2015 as ES6 once, then use years. Separate language from HTML/CSS/Web APIs.",
  mistakes: "Calling optional chaining ES6. Assuming Node 18 has every ES2024 method.",
  figures: [
    {
      src: "/diagrams/es/es-timeline.png",
      alt: "Timeline of ECMAScript yearly editions from ES2015 to ES2026",
      caption: "Yearly cadence after ES6",
    },
  ],
  code: `// Language (this track): Promise, modules, ?.
const port = config?.server?.port ?? 3000;

// Host (not ECMA-262): document, fetch, process
`,
  examples: [
    {
      id: "alias",
      title: "Edition aliases",
      about: "ES6 is the last number people still use.",
      language: "javascript",
      code: `// ES6  === ES2015 === 6th edition
// ES7  === ES2016 === 7th edition  (don't say ES7 in interviews)
// ES2020 === 11th edition
`,
    },
  ],
});
