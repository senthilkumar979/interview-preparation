import { reactTopic } from "./factory";

export const reactStateTopics = [
  reactTopic({
    slug: "react-immutability",
    title: "Immutability in React",
    order: 8,
    summary: "State updates must replace objects/arrays. Mutating hides changes from `Object.is`.",
    prerequisites: ["react-components"],
    related: ["react-usestate", "es2023"],
    isHighYield: true,
    oneLiner:
      "React compares state with `Object.is`. If you mutate an array/object in place (`push`, `obj.x = 1`) and `setState` the same reference, React may skip the re-render. Always copy: spread, `map`, `filter`, `toSorted`, `structuredClone` for deep clones when needed.",
    beats: [
      "Nested updates: copy every level you change (`{ ...state, user: { ...state.user, name } }`) or use a library (Immer).",
      "`const next = [...items]; next[i].done = true` still mutates the item — copy the item too.",
      "Refs can hold mutable boxes without triggering render — don’t mix that up with state.",
    ],
    intro: "The #1 ‘setState did nothing’ bug.",
    why: "Memo, PureComponent, and `useMemo` all assume immutable snapshots.",
    concept: "State is a snapshot for this render. Next render gets a new snapshot.",
    how: "`setTodos((t) => t.map(...))`. `setUser((u) => ({ ...u, name }))`.",
    usage: "Todos, forms, Redux-style stores.",
    practices: "Updater functions when next depends on prev. ES2023 copy methods. Immer if nests are deep.",
    mistakes: "`items.push` then `setItems(items)`. Mutating props. Spreading then mutating the clone’s nested object.",
    code: `setCart((lines) =>
  lines.map((l) => (l.sku === sku ? { ...l, qty: l.qty + 1 } : l)),
);
`,
    examples: [
      {
        id: "sort",
        title: "Don’t sort in place",
        about: "`toSorted` keeps the previous array for the last render.",
        language: "typescript",
        code: `setRows((rows) => rows.toSorted((a, b) => a.name.localeCompare(b.name)));
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-state-vs-props",
    title: "State vs props",
    order: 9,
    summary: "Props come from outside. State is owned here. Don’t copy props into state unless you sync.",
    prerequisites: ["react-immutability"],
    related: ["react-lifting-state", "react-usestate"],
    isHighYield: true,
    oneLiner:
      "Props are inputs from the parent (or RSC). State is data that changes over time in this component. If the parent already owns it, pass it down — don’t duplicate in `useState(props.x)` unless you handle updates (`key` remount or an effect, last resort).",
    beats: [
      "Derived values: compute in render (`const full = first + last`), don’t store.",
      "Lifting state: move state to the closest common parent.",
      "URL/search params can be the source of truth instead of local state.",
    ],
    intro: "Single source of truth.",
    why: "Stale copies of props are a classic bug.",
    concept: "Unidirectional flow. State is private; props are the public API of the component.",
    how: "Ask: ‘who needs to change this?’ That owner holds state.",
    usage: "Forms (local) vs selected id (parent) vs theme (context).",
    practices: "Derive. Lift. Reset with `key`.",
    mistakes: "`useState(props.value)` and never updating. Putting server data in state without a key.",
    code: `function Price({ cents }: { cents: number }) {
  const label = (cents / 100).toFixed(2); // derived, not state
  return <span>{label}</span>;
}
`,
    examples: [
      {
        id: "stale",
        title: "Anti-pattern",
        about: "Copying props once.",
        language: "typescript",
        code: `const [name, setName] = useState(user.name); // stale when user changes
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-lifting-state",
    title: "Lifting state",
    order: 10,
    summary: "Move state up to the nearest parent that both children need.",
    prerequisites: ["react-state-vs-props"],
    related: ["react-usecontext"],
    isHighYield: true,
    oneLiner:
      "When two siblings need the same data, the parent holds `useState` and passes value + setter (or an `onChange`). Don’t sync two `useState`s with effects. If many distant trees need it, use context or a store — that’s lifting plus distribution.",
    beats: [
      "Closest common ancestor, not the app root by default.",
      "Callback props: `onSelect(id)` keeps the child dumb.",
      "Too much lifting = prop drilling → context.",
    ],
    intro: "Shared selection, shared filters.",
    why: "Search box + results list.",
    concept: "One state, many views.",
    how: "Parent: `const [q, setQ] = useState(\"\")`. Children receive `q` / `onChange`.",
    usage: "Wizards, filters, tabs.",
    practices: "Colocate first. Lift only when sharing. Context for theme/auth.",
    mistakes: "Two sources of truth. Lifting everything to Redux on day one.",
    code: `function Catalog() {
  const [query, setQuery] = useState("");
  return (
    <>
      <Search value={query} onChange={setQuery} />
      <Results query={query} />
    </>
  );
}
`,
    examples: [
      {
        id: "tabs",
        title: "Tabs",
        about: "Parent owns `active`.",
        language: "typescript",
        code: `const [tab, setTab] = useState<"info" | "reviews">("info");
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-controlled",
    title: "Controlled vs uncontrolled",
    order: 11,
    summary: "Controlled: value + onChange from React. Uncontrolled: DOM holds the value (`ref`, `defaultValue`).",
    prerequisites: ["react-lifting-state"],
    related: ["react-useref", "react-19-use-form-status"],
    isHighYield: true,
    oneLiner:
      "A controlled input has `value={x}` and `onChange`. React is the source of truth. Uncontrolled uses `defaultValue` and you read via `ref` on submit. Mixing (`value` without `onChange`) makes a read-only field. Forms in React 19 can also use Actions (progressive enhancement).",
    beats: [
      "Controlled: validate as you type, disable submit, format input.",
      "Uncontrolled: less re-renders, file inputs often stay uncontrolled.",
      "`defaultValue` is initial only; later `value` switches to controlled (don’t).",
    ],
    intro: "Every form interview.",
    why: "Search-as-you-type vs ‘submit the file’.",
    concept: "Who owns the cursor’s string?",
    how: "`<input value={q} onChange={(e) => setQ(e.target.value)} />`",
    usage: "Checkout, settings, file upload.",
    practices: "Pick one mode per field. Controlled for money/formatting.",
    mistakes: "Controlled without `onChange`. `value={undefined}` flipping modes.",
    code: `function Search({ value, onChange }: { value: string; onChange: (q: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
`,
    examples: [
      {
        id: "file",
        title: "Uncontrolled file",
        about: "Read on submit.",
        language: "typescript",
        code: `const ref = useRef<HTMLInputElement>(null);
function onSubmit() {
  const file = ref.current?.files?.[0];
}
return <input ref={ref} type="file" />;
`,
      },
    ],
  }),
];
