import { reactTopic } from "./factory";

export const reactUiTopics = [
  reactTopic({
    slug: "react-events",
    title: "Events and synthetic events",
    order: 30,
    summary: "React wraps native events. Handlers receive a SyntheticEvent. Delegation lives on the root.",
    prerequisites: ["react-jsx"],
    related: ["react-controlled", "javascript-events"],
    isHighYield: true,
    oneLiner:
      "In React you pass `onClick={fn}`, not strings. The event is a SyntheticEvent that pools historically (React 17+ does not pool). Handlers close over the render that created them. Prefer `onClick={() => save(id)}` or `useCallback` — do not attach listeners in `useEffect` for elements React already owns.",
    beats: [
      "`e.preventDefault()` on submit. `e.stopPropagation()` is rarely needed if you structure the tree.",
      "Native: `addEventListener` for `window`/`document`; React for elements it renders.",
      "Pass data with closures or `data-*`, not `onclick=\"...\"`.",
    ],
    intro: "JSX events are camelCase and receive a function.",
    why: "Form submits reloading the page. Stale handlers in lists.",
    concept: "Delegation at the React root, not a handler on every DOM node in the old sense.",
    how: "`<form onSubmit={handleSubmit}>` with `preventDefault`.",
    usage: "Clicks, keys, drag, change.",
    practices: "Named handlers for tests. Keyboard: `onKeyDown` for shortcuts.",
    mistakes: "`onClick={save()}` calling immediately. Forgetting preventDefault on forms.",
    code: `function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  save(Object.fromEntries(data));
}
`,
    examples: [
      {
        id: "args",
        title: "Pass an id",
        about: "Closure, not HTML attributes.",
        language: "typescript",
        code: `<button type="button" onClick={() => remove(item.id)}>Remove</button>
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-lists",
    title: "Rendering lists",
    order: 31,
    summary: "Map data to elements. Keys on the outermost element returned from `map`.",
    prerequisites: ["react-keys", "react-jsx"],
    related: ["react-memo", "react-immutability"],
    isHighYield: true,
    oneLiner:
      "`items.map((item) => <Row key={item.id} item={item} />)`. Extract a component for the row when the JSX grows. Filter/sort *before* map (purely). Empty states are part of the UI contract.",
    beats: [
      "Don’t use `map` index as `key` if the list can reorder or insert.",
      "`Fragment` with a key when the row is several siblings.",
      "Virtualize long lists (`content-visibility`, `react-window`) — React will not magically skip offscreen work.",
    ],
    intro: "Most product UIs are lists.",
    why: "Wrong keys + inline objects = jank and ghost inputs.",
    concept: "Array → elements. Reconciliation uses keys.",
    how: "Derive `visible` with `filter`, then map.",
    usage: "Tables, feeds, nav.",
    practices: "Stable row components. Paginate or virtualize thousands of nodes.",
    mistakes: "Mutating the array in render. Nested `map` without unique keys at each level.",
    code: `{items.length === 0 ? (
  <p>No results</p>
) : (
  <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
)}
`,
    examples: [
      {
        id: "keyed-fragment",
        title: "Keyed fragment",
        about: "Two cells per row without a wrapper div.",
        language: "typescript",
        code: `{rows.map((r) => (
  <Fragment key={r.id}>
    <dt>{r.term}</dt>
    <dd>{r.def}</dd>
  </Fragment>
))}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-composition",
    title: "Composition",
    order: 32,
    summary: "Build UI by nesting components and `children`, not by inheritance.",
    prerequisites: ["react-props-children"],
    related: ["react-custom-hooks"],
    isHighYield: true,
    oneLiner:
      "React reuse is composition: a `Card` that renders `children`, slots (`title`, `footer` as props of type `ReactNode`), and specialized wrappers (`PrimaryButton` that renders `Button`). Avoid deep prop drilling by composing at the right level or using context sparingly.",
    beats: [
      "`children` is just a prop. Named slots beat boolean soup (`<Modal.Header>`).",
      "Containment vs specialization: wrap vs configure.",
      "Don’t cloneElement unless you must — pass props down explicitly.",
    ],
    intro: "The alternative to `extends Widget`.",
    why: "HOCs and inheritance trees age badly; composition scales.",
    concept: "The parent owns layout; the child owns internals.",
    how: "`<PageLayout sidebar={<Nav />}>{content}</PageLayout>`",
    usage: "Design systems, app shells.",
    practices: "Small presentational pieces. Compound components when the API is a set.",
    mistakes: "`if (type === 'a')` god components. Inheritance for theming.",
    code: `function Panel({ title, children }: { title: string; children: ReactNode }) {
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
        id: "slot",
        title: "Slot props",
        about: "More than one hole.",
        language: "typescript",
        code: `<Dialog footer={<Button>OK</Button>}>{body}</Dialog>
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-fragments",
    title: "Fragments",
    order: 33,
    summary: "Group children without an extra DOM node: `<>...</>` or `<Fragment>`.",
    prerequisites: ["react-jsx"],
    related: ["react-keys", "react-lists"],
    oneLiner:
      "A fragment lets a component return multiple siblings. Short syntax `<>` cannot take a `key` or attributes; `Fragment` can take `key`. Use them to avoid wrapper `div`s that break flex/grid or tables.",
    beats: [
      "Table rows: `td` cannot sit in a `div` — fragment or multiple components.",
      "Keyed fragments in lists of definition pairs.",
      "Fragments do not appear in the DOM inspector as a node.",
    ],
    intro: "The invisible wrapper.",
    why: "Layout bugs from extra divs.",
    concept: "React tree node with no host instance.",
    how: "`return (<><h1 /><p /></>);`",
    usage: "Layout, tables, returning two bits from a component.",
    practices: "Prefer short syntax; use `Fragment` when you need a key.",
    mistakes: "`<>` with `key=`. Styling a fragment (you can’t).",
    code: `return (
  <>
    <dt>{term}</dt>
    <dd>{definition}</dd>
  </>
);
`,
    examples: [
      {
        id: "table",
        title: "Table cells",
        about: "No wrapping div.",
        language: "typescript",
        code: `function Cells({ row }: { row: Row }) {
  return (
    <>
      <td>{row.name}</td>
      <td>{row.qty}</td>
    </>
  );
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-portals",
    title: "Portals",
    order: 34,
    summary: "Render children into a DOM node outside the parent hierarchy.",
    prerequisites: ["react-components"],
    related: ["react-error-boundary"],
    isHighYield: true,
    oneLiner:
      "`createPortal(child, domNode)` still parents the React tree for context and events, but the host nodes live under `domNode` (often `document.body`). Use portals for modals, toasts, and tooltips that must escape `overflow: hidden` or stacking contexts.",
    beats: [
      "Events bubble in the *React* tree, not necessarily the DOM parent — clicks inside a modal still bubble to React parents.",
      "SSR: the target node must exist; Next often portals on the client.",
      "Accessibility: focus trap, `role=\"dialog\"`, restore focus — portal is not enough.",
    ],
    intro: "When CSS stacking fights you.",
    why: "Dropdown clipped by a parent overflow.",
    concept: "React parent ≠ DOM parent.",
    how: "`createPortal(<Modal />, document.getElementById(\"overlay\")!)`",
    usage: "Dialogs, hovercards, full-screen loaders.",
    practices: "One overlay root. Lock body scroll. Return focus.",
    mistakes: "Assuming `stopPropagation` on DOM parents stops React bubbling from a portal.",
    code: `return createPortal(
  <div role="dialog" aria-modal="true">{children}</div>,
  document.body,
);
`,
    examples: [
      {
        id: "ssr",
        title: "Client-only portal",
        about: "Guard `document`.",
        language: "typescript",
        code: `if (typeof document === "undefined") return null;
return createPortal(node, document.body);
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-memo",
    title: "memo and pure renders",
    order: 35,
    summary: "`memo` skips a re-render when props are `Object.is` equal. Children still re-render if they subscribe to context.",
    prerequisites: ["react-immutability", "react-usememo"],
    related: ["react-usecallback", "react-compiler"],
    isHighYield: true,
    oneLiner:
      "`memo(Component)` does a shallow compare of props. It is not deep equal. New object/array/function props bust it. React Compiler can insert this automatically when components are pure. Context changes still re-render consumers even if memoized.",
    beats: [
      "Default: parent re-render re-renders children. `memo` opts out when props are equal.",
      "Custom compare as second arg — easy to get wrong; prefer stable props.",
      "Premature `memo` everywhere adds compare cost; profile first.",
    ],
    intro: "The classic performance interview.",
    why: "A table of 500 rows when one cell changes.",
    concept: "Bail out of render, not of commit of parents.",
    how: "`export const Row = memo(function Row(props) { ... });`",
    usage: "List rows, leaf icons, expensive charts.",
    practices: "Stabilize props. Let Compiler work. Don’t memo the world.",
    mistakes: "`memo` + inline `style={{}}` + inline `onClick`. Deep compare in render.",
    code: `const UserRow = memo(function UserRow({ user }: { user: User }) {
  return <tr><td>{user.name}</td></tr>;
});
`,
    examples: [
      {
        id: "bust",
        title: "What busts memo",
        about: "New function every time.",
        language: "typescript",
        code: `// busts: <Row onSelect={() => pick(id)} />
// ok: useCallback or pass id + one handler
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-strict-mode",
    title: "Strict Mode",
    order: 36,
    summary: "Dev-only checks: double-invoking render and effects to surface impure code.",
    prerequisites: ["react-useeffect", "react-fiber"],
    related: ["react-concurrency"],
    isHighYield: true,
    oneLiner:
      "`<StrictMode>` does not change production behavior. In development React 18+ remounts components and re-runs effects to prove your cleanup is correct and render is pure. ‘My effect runs twice’ in dev is expected — fix missing cleanup, don’t disable Strict Mode to hide it.",
    beats: [
      "Double `useEffect` mount: connect then disconnect then connect. Your cleanup must be real.",
      "Helps find deprecated APIs and unexpected side effects in render.",
      "Not a performance mode. Not a linter replacement.",
    ],
    intro: "The feature people turn off to ‘fix’ bugs.",
    why: "Race conditions and leaked subscriptions show up here first.",
    concept: "Intentional extra invocations in development only.",
    how: "Wrap the tree in `index` / root layout.",
    usage: "Every new app should keep it on.",
    practices: "Abort fetches in cleanup. Make reducers pure.",
    mistakes: "Guarding with a module-level `let ran = false`. Removing Strict Mode.",
    code: `createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
    examples: [
      {
        id: "cleanup",
        title: "What Strict Mode wants",
        about: "Symmetric setup/teardown.",
        language: "typescript",
        code: `useEffect(() => {
  const sub = store.subscribe(onChange);
  return () => sub.unsubscribe();
}, []);
`,
      },
    ],
  }),
];
