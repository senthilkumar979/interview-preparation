import { reactTopic } from "./factory";

export const reactIntroTopics = [
  reactTopic({
    slug: "react-jsx",
    title: "JSX",
    order: 1,
    summary: "JSX is syntactic sugar for `React.createElement` / the jsx runtime — not HTML.",
    related: ["react-components", "html-elements"],
    isHighYield: true,
    oneLiner:
      "JSX looks like HTML in JS but compiles to function calls (`jsxDEV` / `jsx`). Attributes are camelCase (`className`, `onClick`). Expressions go in `{}`. One parent (or a fragment). It is not a string — XSS via `dangerouslySetInnerHTML` is the exception.",
    beats: [
      "`class` is `className`. `for` is `htmlFor`. SVG `stroke-width` stays kebab in React as `strokeWidth`.",
      "Booleans: `disabled={isOff}` not `disabled=\"false\"` (that string is truthy).",
      "Components must start with a capital letter or the compiler thinks they’re HTML tags.",
    ],
    intro: "Every React interview starts here: JSX is JS.",
    why: "Wrong `class` vs `className` and injecting HTML are junior tells.",
    concept: "The transform is `jsx('div', { className: 'x', children: 'Hi' })`. Children can be arrays.",
    how: "`.tsx` + `jsx: react-jsx`. Babel/TS emit the runtime import automatically.",
    usage: "Every component file.",
    practices: "Keep JSX expressions small. Extract variables. Don’t build HTML strings.",
    mistakes: "`class=` in React. Adjacent elements without a wrapper. Lowercase custom components.",
    code: `const title = "PrepQuest";
return <h1 className="hero">{title}</h1>;
`,
    examples: [
      {
        id: "expr",
        title: "Expressions, not statements",
        about: "Ternary or &&, not if inside JSX.",
        language: "typescript",
        code: `{isOn ? <On /> : <Off />}
{count > 0 && <Badge>{count}</Badge>}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-components",
    title: "Components",
    order: 2,
    summary: "Functions that return React elements. Props in, UI out. Composition over inheritance.",
    prerequisites: ["react-jsx"],
    related: ["react-props-children", "react-virtual-dom"],
    isHighYield: true,
    oneLiner:
      "A React component is a function (or rare class) that receives props and returns a description of UI (elements). React calls it during render; you do not call it as `Component()`. Composition: nest components, pass `children`, don’t extend `React.Component` for reuse.",
    beats: [
      "Render must be pure with respect to props/state: same inputs → same elements (aside from allowed Hooks).",
      "Don’t mutate props. Don’t hide side effects in render — `useEffect` or event handlers.",
      "One component, one job. Split when JSX or state gets noisy.",
    ],
    intro: "UI is a tree of components, not a pile of `innerHTML`.",
    why: "Interviews: ‘what is a component?’ plus purity.",
    concept: "Function components + Hooks are the 2026 default. Class components still exist in legacy code (`this.setState`).",
    how: "`export function Button({ label }: { label: string }) { return <button>{label}</button>; }`",
    usage: "Pages, layouts, design-system atoms.",
    practices: "Named function components (better stacks). Colocate state with the UI that owns it.",
    mistakes: "`Component()` instead of `<Component />`. Side effects in the function body. Inheritance trees of UI classes.",
    code: `interface CardProps {
  title: string;
}

export function Card({ title }: CardProps) {
  return <section className="card">{title}</section>;
}
`,
    examples: [
      {
        id: "pure",
        title: "Purity",
        about: "No fetch in render.",
        language: "typescript",
        code: `function Price({ cents }: { cents: number }) {
  return <span>{(cents / 100).toFixed(2)}</span>;
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-props-children",
    title: "Props and children",
    order: 3,
    summary: "Props are inputs. `children` is the nested JSX. Default, rest, and discriminated props.",
    prerequisites: ["react-components"],
    related: ["react-composition"],
    isHighYield: true,
    oneLiner:
      "Props are a single object argument. `children` is the special prop for nested nodes. Props are read-only. Optional props use `?` or defaults. Spread `{...rest}` onto DOM nodes carefully (don’t leak `className` twice). In React 19, `ref` is also a prop.",
    beats: [
      "`children` can be anything renderable: string, elements, function (slot pattern).",
      "Updating props from a parent re-renders the child. The child cannot ‘set’ props.",
      "Type props with an interface. `React.PropsWithChildren<P>` or `{ children?: React.ReactNode }`.",
    ],
    intro: "Data down. Events up (`onSave` callbacks).",
    why: "The entire composition model.",
    concept: "One-way data flow. Callbacks are props too.",
    how: "`function Modal({ children, onClose }: Props)`",
    usage: "Layouts, lists, buttons.",
    practices: "Destructure. Don’t mutate `props`. Prefer `children` over `bodyHtml` strings.",
    mistakes: "Mutating `props.title`. Forgetting `key` is not a prop you read (almost).",
    code: `function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
`,
    examples: [
      {
        id: "callback",
        title: "Events up",
        about: "Parent owns the data.",
        language: "typescript",
        code: `function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return <button onClick={onDelete}>Delete</button>;
}
`,
      },
    ],
  }),
];
