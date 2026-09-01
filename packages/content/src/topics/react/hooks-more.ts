import { reactTopic } from "./factory";

export const reactHookMoreTopics = [
  reactTopic({
    slug: "react-usecallback",
    title: "useCallback",
    order: 18,
    summary: "Memoize a function identity so children and effects do not churn.",
    prerequisites: ["react-usestate"],
    related: ["react-usememo", "react-memo"],
    isHighYield: true,
    oneLiner:
      "`useCallback(fn, deps)` returns a stable function until deps change. Use it when you pass callbacks to memoized children or put functions in effect deps. Without the React Compiler, inline functions are new every render.",
    beats: [
      "Not a performance magic wand — measure. Prefer Compiler when available.",
      "Deps must include everything the function closes over.",
      "`useCallback(fn, deps)` is `useMemo(() => fn, deps)`.",
    ],
    intro: "Identity of callbacks is a common interview trap.",
    why: "Stops `useEffect` loops and wasted `memo` children.",
    concept: "Functions are objects. New object → `Object.is` fails.",
    how: "`const onSave = useCallback(() => save(id), [id]);`",
    usage: "List item handlers, context dispatch wrappers.",
    practices: "Pair with `memo`. Let Compiler do this when enabled.",
    mistakes: "Wrapping every function. Empty deps with stale `id`.",
    code: `const onSelect = useCallback((sku: string) => {
  setCart((c) => add(c, sku));
}, []);
`,
    examples: [
      {
        id: "child",
        title: "With memo child",
        about: "Stable handler keeps the row from re-rendering.",
        language: "typescript",
        code: `const Row = memo(function Row({ onSelect, sku }: Props) {
  return <button onClick={() => onSelect(sku)}>{sku}</button>;
});
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-usememo",
    title: "useMemo",
    order: 19,
    summary: "Cache an expensive derived value between renders.",
    prerequisites: ["react-usestate", "react-immutability"],
    related: ["react-usecallback", "react-compiler"],
    isHighYield: true,
    oneLiner:
      "`useMemo(() => compute(a, b), [a, b])` recomputes only when deps change. Use for heavy work or to stabilize object/array identities passed as props. Do not useMemo for trivial math.",
    beats: [
      "The callback must be pure. React may discard the cache.",
      "Stabilize `{ theme }` objects for context.",
      "React Compiler often removes the need to write this by hand.",
    ],
    intro: "Derived data belongs in render — memoize only when it is expensive or identity-sensitive.",
    why: "Filter 10k rows; keep context value stable.",
    concept: "Cache keyed by deps, not a second source of truth.",
    how: "`const visible = useMemo(() => items.filter(ok), [items]);`",
    usage: "Selectors, chart datasets, expensive formatters.",
    practices: "Profile first. Prefer deriving without memo when cheap.",
    mistakes: "useMemo to hide impure work. Missing deps.",
    code: `const total = useMemo(() => lines.reduce((s, l) => s + l.price, 0), [lines]);
`,
    examples: [
      {
        id: "ctx",
        title: "Stable context value",
        about: "Avoid re-rendering every consumer.",
        language: "typescript",
        code: `const value = useMemo(() => ({ user, logout }), [user, logout]);
return <AuthContext value={value}>{children}</AuthContext>;
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useref",
    title: "useRef",
    order: 20,
    summary: "A mutable box that survives renders without causing them.",
    prerequisites: ["react-usestate"],
    related: ["react-useimperativehandle"],
    isHighYield: true,
    oneLiner:
      "`useRef(initial)` returns `{ current }` that React does not watch. Use it for DOM nodes (`ref={el}`), timers, previous values, and instance fields. Changing `current` does not re-render.",
    beats: [
      "React 19: `ref` is a regular prop on function components.",
      "Do not read/write `ref.current` during render for output (except initializing).",
      "`useState` when the UI must update; `useRef` when it must not.",
    ],
    intro: "Escape hatch from declarative render.",
    why: "Focus, measure, ignore stale closures with a latest-ref.",
    concept: "Same object identity every render; mutate `.current`.",
    how: "`const inputRef = useRef<HTMLInputElement>(null); inputRef.current?.focus();`",
    usage: "Uncontrolled inputs, third-party widgets, abort handles.",
    practices: "Callback refs when you need to run on attach. Type the generic.",
    mistakes: "Storing UI state in a ref and wondering why nothing paints.",
    code: `const countRef = useRef(0);
function ping() {
  countRef.current += 1;
}
`,
    examples: [
      {
        id: "prev",
        title: "Previous value",
        about: "Keep last render’s value.",
        language: "typescript",
        code: `const prev = useRef(value);
useEffect(() => {
  prev.current = value;
}, [value]);
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useimperativehandle",
    title: "useImperativeHandle",
    order: 21,
    summary: "Customize the instance a parent sees through `ref`.",
    prerequisites: ["react-useref"],
    related: ["react-ref-as-prop"],
    oneLiner:
      "`useImperativeHandle(ref, () => ({ focus, reset }), deps)` exposes a narrow API instead of the raw DOM node. Pair with `forwardRef` (or React 19 `ref` prop).",
    beats: [
      "Prefer declarative props. Imperative APIs are for focus, scroll, play.",
      "Keep the handle small. Do not dump the whole component.",
      "Parents should not reach into internals for data — use state/callbacks.",
    ],
    intro: "Rare, but interviews mention it with `forwardRef`.",
    why: "Design-system inputs that wrap a native `<input>`.",
    concept: "You control what `ref.current` is.",
    how: "Receive `ref`, pass to `useImperativeHandle`.",
    usage: "Modal `open()`, video `play()`.",
    practices: "Document the handle type. Test via the public methods.",
    mistakes: "Exposing `setState`. Using this instead of lifting state.",
    code: `useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
}));
`,
    examples: [
      {
        id: "parent",
        title: "Parent calls focus",
        about: "After an error.",
        language: "typescript",
        code: `fieldRef.current?.focus();
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-uselayouteffect",
    title: "useLayoutEffect",
    order: 22,
    summary: "Run synchronously after DOM updates, before the browser paints.",
    prerequisites: ["react-useeffect"],
    related: ["react-useinsertioneffect"],
    isHighYield: true,
    oneLiner:
      "`useLayoutEffect` fires after commit, before paint. Use it to measure DOM and apply a visual adjustment without a flash. Prefer `useEffect` — layout effects block paint and can hurt INP.",
    beats: [
      "SSR: `useLayoutEffect` warns on the server — gate or use `useEffect`.",
      "Tooltip position, scroll restoration, hiding a flicker.",
      "Same cleanup rules as `useEffect`.",
    ],
    intro: "The ‘no flicker’ hook.",
    why: "Measure then set style before the user sees the wrong frame.",
    concept: "Commit → layout effects → paint → passive effects.",
    how: "`useLayoutEffect(() => { const r = el.getBoundingClientRect(); ... }, [open]);`",
    usage: "Popovers, caret, canvas size.",
    practices: "Keep work tiny. Prefer CSS when possible.",
    mistakes: "Data fetching in layout effect. Using it by default.",
    code: `useLayoutEffect(() => {
  if (!el.current) return;
  setWidth(el.current.offsetWidth);
}, [children]);
`,
    examples: [
      {
        id: "ssr",
        title: "SSR note",
        about: "Layout effects do not run on the server.",
        language: "typescript",
        code: `const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useinsertioneffect",
    title: "useInsertionEffect",
    order: 23,
    summary: "Inject CSS before layout — for CSS-in-JS libraries, not app code.",
    prerequisites: ["react-uselayouteffect"],
    oneLiner:
      "`useInsertionEffect` runs even earlier than layout effects, so stylesheets exist before `useLayoutEffect` reads layout. Almost never used in product components — used by styled-components / Emotion / StyleX runtimes.",
    beats: [
      "If you are not writing a styling library, you do not need this.",
      "Cannot schedule updates the way `useEffect` can in the same way — keep it CSS-only.",
      "Order: insertion → layout → paint → passive effects.",
    ],
    intro: "Library-author hook.",
    why: "Explains why CSS-in-JS can still win the race against measure.",
    concept: "DOM style tags inserted before layout.",
    how: "Call from a `css()` runtime, not from a Button.",
    usage: "Style engines.",
    practices: "Prefer CSS modules / Tailwind in apps.",
    mistakes: "Using it to fetch data or setState for UI.",
    code: `useInsertionEffect(() => {
  if (!sheet.has(id)) sheet.insert(id, rules);
}, [id, rules]);
`,
    examples: [
      {
        id: "when",
        title: "When to skip",
        about: "App developers use classes.",
        language: "typescript",
        code: `return <button className="btn-primary">Save</button>;
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useid",
    title: "useId",
    order: 24,
    summary: "Stable unique IDs that match between server and client HTML.",
    prerequisites: ["react-hooks-rules"],
    related: ["react-hydration"],
    isHighYield: true,
    oneLiner:
      "`useId()` generates an ID that is unique in the tree and consistent across SSR/hydration. Use it for `htmlFor` / `aria-*` pairing. Do not use it as a list `key` (keys come from data).",
    beats: [
      "Prefix is stable; you can concatenate `:error`.",
      "Fixes hydration mismatches from `Math.random()` IDs.",
      "Multiple IDs: call `useId` once and suffix.",
    ],
    intro: "Accessibility + SSR.",
    why: "Label/input pairing without global counters.",
    concept: "Tree-position based identifier.",
    how: "`const id = useId(); <label htmlFor={id}>`",
    usage: "Forms, dialogs, describedby.",
    practices: "One `useId` per component, suffixes for siblings.",
    mistakes: "`key={useId()}` in maps.",
    code: `const id = useId();
return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} />
  </>
);
`,
    examples: [
      {
        id: "suffix",
        title: "Suffixes",
        about: "Related controls.",
        language: "typescript",
        code: `const base = useId();
const hintId = \`\${base}-hint\`;
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-usedeferredvalue",
    title: "useDeferredValue",
    order: 25,
    summary: "Keep showing the previous value while a heavy update catches up.",
    prerequisites: ["react-usestate"],
    related: ["react-usetransition", "react-concurrency"],
    isHighYield: true,
    oneLiner:
      "`useDeferredValue(value)` returns a lagging copy that React may update at lower priority. Type into an input at full speed; filter a huge list with the deferred query so the keystroke stays snappy.",
    beats: [
      "The input stays controlled with the urgent value; the list uses deferred.",
      "Wrap the slow child in `memo` so it skips when deferred has not changed.",
      "Related to `startTransition` — defer is for a value you already have.",
    ],
    intro: "Concurrent rendering for search UIs.",
    why: "Typing should not wait for 20k-row filter.",
    concept: "Two versions of state: urgent vs deferred.",
    how: "`const q = useDeferredValue(query); <List filter={q} />`",
    usage: "Search, charts, markdown preview.",
    practices: "`isStale = query !== deferred` for a pending hint.",
    mistakes: "Deferring the input itself (feels laggy).",
    code: `const deferred = useDeferredValue(query);
const isStale = query !== deferred;
`,
    examples: [
      {
        id: "list",
        title: "Slow list",
        about: "memo + deferred.",
        language: "typescript",
        code: `const List = memo(function List({ q }: { q: string }) {
  return <ul>{filter(items, q).map(row)}</ul>;
});
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-usetransition",
    title: "useTransition",
    order: 26,
    summary: "Mark state updates as non-urgent so React can keep the UI responsive.",
    prerequisites: ["react-usestate"],
    related: ["react-usedeferredvalue", "react-concurrency", "react-useoptimistic"],
    isHighYield: true,
    oneLiner:
      "`const [isPending, startTransition] = useTransition()`. Updates inside `startTransition` can be interrupted. Use for tab switches, filters, navigation — not for typing in a text field (that must stay urgent).",
    beats: [
      "`isPending` is true while the transition has not committed.",
      "React 19 Actions wrap form submissions in transitions.",
      "`useTransition` vs `useDeferredValue`: you wrap the setState vs you lag a value.",
    ],
    intro: "The public API of concurrent rendering.",
    why: "Heavy re-renders should not freeze the spinner click.",
    concept: "Priority lanes on Fiber.",
    how: "`startTransition(() => setTab(next));`",
    usage: "Route-sized updates, selecting a big dataset.",
    practices: "Show pending UI. Do not put controlled input setState in a transition.",
    mistakes: "Wrapping everything. Nested transitions confusion.",
    code: `const [isPending, startTransition] = useTransition();
<button onClick={() => startTransition(() => setPage(p + 1))}>
  {isPending ? "Loading…" : "Next"}
</button>
`,
    examples: [
      {
        id: "nav",
        title: "Tab change",
        about: "Urgent highlight, deferred panel.",
        language: "typescript",
        code: `startTransition(() => setPanel(id));
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-usesyncexternalstore",
    title: "useSyncExternalStore",
    order: 27,
    summary: "Subscribe to an external store with concurrent-safe snapshots.",
    prerequisites: ["react-useeffect"],
    related: ["react-concurrency"],
    isHighYield: true,
    oneLiner:
      "`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` is the correct way to read Redux, Zustand, browser APIs, or any store outside React. It avoids tearing under concurrent rendering. Libraries should use this; apps often use the library’s hook.",
    beats: [
      "`getSnapshot` must return an immutable snapshot (`Object.is` cached).",
      "`getServerSnapshot` for SSR — match the server HTML.",
      "Do not `useEffect` + `useState` to mirror `window` if you can use this.",
    ],
    intro: "The hook that replaced naive store subscriptions.",
    why: "Concurrent React can render twice with different store versions otherwise.",
    concept: "Subscribe + snapshot; React re-renders when snapshot identity/value changes.",
    how: "`const width = useSyncExternalStore(subscribeResize, () => window.innerWidth, () => 0);`",
    usage: "Media queries, online status, external state libs.",
    practices: "Cache snapshot. Server snapshot must be deterministic.",
    mistakes: "Returning a new object from `getSnapshot` every call (infinite loop).",
    code: `function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}
const w = useSyncExternalStore(subscribe, () => window.innerWidth, () => 1024);
`,
    examples: [
      {
        id: "redux",
        title: "Library pattern",
        about: "react-redux uses this internally.",
        language: "typescript",
        code: `useSyncExternalStore(store.subscribe, store.getState, store.getState);
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-usedebugvalue",
    title: "useDebugValue",
    order: 28,
    summary: "Label custom Hooks in React DevTools.",
    prerequisites: ["react-hooks-rules"],
    related: ["react-custom-hooks"],
    oneLiner:
      "`useDebugValue(value)` (optional formatter) shows a badge next to your custom Hook in DevTools. Skip it in app components; use it in reusable Hooks you ship.",
    beats: [
      "Does not affect production UI.",
      "Formatter runs only when DevTools are open.",
      "Second argument: `useDebugValue(date, (d) => d.toISOString())`.",
    ],
    intro: "DX for Hook authors.",
    why: "Debugging `useAuth` in a giant tree.",
    concept: "DevTools-only metadata.",
    how: "Call inside the custom Hook.",
    usage: "Shared libraries.",
    practices: "Keep the label short.",
    mistakes: "Expecting it to log in production.",
    code: `function useOnline() {
  const online = useSyncExternalStore(...);
  useDebugValue(online ? "online" : "offline");
  return online;
}
`,
    examples: [
      {
        id: "fmt",
        title: "Formatter",
        about: "Defer expensive stringify.",
        language: "typescript",
        code: `useDebugValue(user, (u) => u?.email ?? "anon");
`,
      },
    ],
  }),
];
