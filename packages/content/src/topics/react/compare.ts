import { reactTopic } from "./factory";

export const reactCompare = reactTopic({
  slug: "react-vs-angular-vue",
  title: "React vs Angular vs Vue",
  order: 12,
  summary: "Library vs framework, rendering models, templates, and where interviews want a fair comparison.",
  prerequisites: ["react-virtual-dom"],
  related: ["react-jsx", "react-server-components"],
  isHighYield: true,
  oneLiner:
    "React is a UI library (you pick router, data, bundler) with JSX and a one-way explicit model; Fiber + (now) compiler/RSC. Angular is a batteries-included framework: DI, templates, RxJS/signals, compiler. Vue is a progressive framework: SFCs, templates or JSX, reactivity (Proxy) that tracks dependencies. None is ‘faster’ in the abstract — pick ecosystem, team, and rendering story (RSC vs Angular SSR vs Nuxt).",
  beats: [
    "React: JS-centric, function components + Hooks, virtual DOM (compiler can memoize). Angular: HTML-centric templates, zones/signals. Vue: template + script setup, fine-grained reactivity.",
    "State: React re-renders the component; Vue/Angular can update finer nodes. React Compiler and Signals close some gaps.",
    "Jobs: React still dominates frontend listings; Angular is common in enterprise; Vue is strong in some regions and Laravel stacks.",
  ],
  intro: "Don’t trash-talk. Compare architecture.",
  why: "Hiring loops ask ‘why React?’ with a comparison.",
  concept: "Library vs framework. Change detection: dirty-check/VDOM vs dependency tracking.",
  how: "Map: components, routing, forms, HTTP, SSR. React needs more choices (Next fills that).",
  usage: "Architecture interviews, migrations.",
  extras: [
    {
      key: "table",
      title: "Cheat sheet",
      body: "Templates: JSX vs Angular HTML+directives vs Vue SFC. DI: Angular first-class; React context; Vue provide/inject. Forms: Angular reactive forms vs React controlled vs Vue v-model. Mobile: RN vs Ionic vs NativeScript-ish. Learning: Vue often gentlest; Angular steepest; React middle + ecosystem sprawl.",
    },
  ],
  figures: [
    {
      src: "/diagrams/react/react-vs-frameworks.png",
      alt: "React, Angular, and Vue compared as library vs frameworks",
      caption: "Same UI problem, three architectures",
    },
  ],
  practices: "Argue from constraints (SSR, team skill, design system). Mention RSC honestly as React/Next-specific.",
  mistakes: "‘React has no structure.’ ‘Vue is only for small apps.’ ‘Angular is dead.’",
  code: `// Same UI, three mental models
// React: const [n, setN] = useState(0); onClick={() => setN(n + 1)}
// Vue: const n = ref(0); @click="n++"
// Angular: count = signal(0); (click)="count.update(c => c + 1)"
`,
  examples: [
    {
      id: "data",
      title: "Data fetching stereotype",
      about: "Reality is overlapping.",
      language: "typescript",
      code: `// React 19 / Next: async Server Component fetch
// Angular: HttpClient + signals/rxjs
// Vue: useFetch / Pinia
`,
    },
  ],
});
