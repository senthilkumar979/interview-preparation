import { reactTopic } from "./factory";

export const reactConcurrentTopics = [
  reactTopic({
    slug: "react-suspense",
    title: "Suspense",
    order: 39,
    summary: "Declarative loading UI while children wait on a promise (or a lazy import).",
    prerequisites: ["react-fiber"],
    related: ["react-use", "react-server-components"],
    isHighYield: true,
    oneLiner:
      "`<Suspense fallback={<Spinner />}>` catches children that *suspend* (throw a thenable, or `React.lazy`). React shows the fallback until the promise resolves, then commits the child. Nested boundaries let parts of the page stream independently. Data Suspense needs a cache (`use`, a framework loader) — throwing a new `fetch()` every render loops.",
    beats: [
      "`React.lazy` + Suspense for code splitting is the original use.",
      "Don’t fetch in render without a cache. Frameworks (Next, Relay) provide one.",
      "Error Boundaries still wrap Suspense for rejected promises.",
    ],
    intro: "Loading as a component, not a boolean pyramid.",
    why: "Waterfalls vs streaming HTML.",
    concept: "Throw promise → unwind to boundary → retry when ready.",
    how: "`<Suspense fallback={...}><LazyChart /></Suspense>`",
    usage: "Route chunks, RSC streaming holes, `use(promise)`.",
    practices: "Granular boundaries. Meaningful fallbacks (skeleton, not blank).",
    mistakes: "`fetch` inside render with no dedupe. One Suspense around the whole app.",
    code: `const Chart = lazy(() => import("./Chart"));
<Suspense fallback={<p>Loading chart…</p>}>
  <Chart />
</Suspense>
`,
    examples: [
      {
        id: "nested",
        title: "Nested boundaries",
        about: "Header stays; panel waits.",
        language: "typescript",
        code: `<Header />
<Suspense fallback={<PanelSkeleton />}>
  <SlowPanel />
</Suspense>
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-concurrency",
    title: "Concurrency and batching",
    order: 40,
    summary: "Interruptible render, priority lanes, automatic batching, transitions.",
    prerequisites: ["react-fiber", "react-usetransition"],
    related: ["react-usedeferredvalue", "react-strict-mode"],
    isHighYield: true,
    oneLiner:
      "Concurrent React can start rendering an update, pause, throw it away, or finish later. Urgent updates (typing, clicks) outrank transitions. React 18+ batches *all* `setState` in the same event (and timeouts/promises) by default. You opt into concurrent scheduling with `startTransition` / `useDeferredValue`, not a secret flag.",
    beats: [
      "Concurrent ≠ parallel threads in the browser. It is cooperative scheduling on the main thread.",
      "`flushSync` escapes batching when you must read DOM immediately — rare.",
      "Render must stay pure: concurrent features will call it extra times.",
    ],
    intro: "Why Fiber exists beyond ‘virtual DOM’.",
    why: "Keep typing fast while a huge tree updates.",
    concept: "Lanes, work-in-progress tree, discard vs commit.",
    how: "Default batching. Mark heavy `setState` as a transition.",
    usage: "Search, tabs, navigation.",
    figures: [
      {
        src: "/diagrams/react/react-concurrency.png",
        alt: "Urgent update interrupting a transition render",
        caption: "High-priority input vs interruptible render",
      },
    ],
    extras: [
      {
        key: "batching",
        title: "Automatic batching",
        body: "Two `setState`s in a click become one render. In React 17, `setState` in a `setTimeout` was not batched; in 18+ it is. `unstable_batchedUpdates` is obsolete for app code.",
      },
    ],
    practices: "Keep render cheap. Transitions for non-urgent UI. Don’t `flushSync` in a loop.",
    mistakes: "Side effects in render ‘because it ran twice’. Assuming concurrency uses Web Workers.",
    code: `setQuery(e.target.value); // urgent
startTransition(() => setResults(filter(e.target.value))); // interruptible
`,
    examples: [
      {
        id: "batch",
        title: "One render",
        about: "Both updates flush together.",
        language: "typescript",
        code: `function onSave() {
  setSaving(true);
  setError(null);
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-compiler",
    title: "React Compiler",
    order: 41,
    summary: "A build-time compiler that auto-memoizes pure components and Hooks.",
    prerequisites: ["react-memo", "react-immutability"],
    related: ["react-usecallback", "react-usememo"],
    isHighYield: true,
    oneLiner:
      "React Compiler (aka React Forget) analyzes your components and inserts memoization so you write fewer `useMemo`/`useCallback`/`memo` calls. It requires Rules of React: pure render, immutable props/state, Hooks called unconditionally. It is not a replacement for algorithmic cost (still don’t O(n²) in render).",
    beats: [
      "Purity is the contract. Mutations and hidden side effects in render break the model.",
      "You can still memo by hand at boundaries the compiler cannot see (external libraries).",
      "eslint-plugin-react-compiler / `react-hooks` compiler rules catch violations.",
    ],
    intro: "The answer to ‘do I memo everything?’ is increasingly ‘the compiler does’.",
    why: "Less boilerplate, fewer identity bugs — if you stay pure.",
    concept: "Static analysis → cached JSX and stable function identities.",
    how: "Enable the Babel plugin in the bundler (Next has a flag). Keep components pure.",
    usage: "New React 19 apps; migrating off hand-memo.",
    figures: [
      {
        src: "/diagrams/react/react-compiler.png",
        alt: "Source components flowing through a compiler that auto-memoizes output",
        caption: "Purity in, memoized output",
      },
    ],
    practices: "Delete redundant memos after verifying. Don’t disable the linter to ‘make it compile’.",
    mistakes: "Mutating props then blaming the compiler. Expecting it to fix data-fetching waterfalls.",
    code: `// Write this; the compiler may cache the list and the handler
function Cart({ lines }: { lines: Line[] }) {
  const total = lines.reduce((s, l) => s + l.price, 0);
  return <p>{total}</p>;
}
`,
    examples: [
      {
        id: "rule",
        title: "What breaks it",
        about: "Side effects in render.",
        language: "typescript",
        code: `// BAD: document.title = "x" during render
// GOOD: useEffect(() => { document.title = "x"; }, []);
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-server-components",
    title: "Server Components",
    order: 42,
    summary: "Components that run on the server, ship no client JS by default, and can await data.",
    prerequisites: ["react-components", "react-suspense"],
    related: ["react-server-actions", "react-hydration"],
    isHighYield: true,
    oneLiner:
      "A Server Component (RSC) executes on the server (or at build time), can `async`/`await` directly, and serializes a payload to the client. It cannot use state, effects, or browser APIs. Client Components (`'use client'`) are the islands that hydrate. Pass serializable props across the boundary — not functions (except Server Actions).",
    beats: [
      "Default in Next App Router files is Server Components.",
      "Compose: server page → client button. Don’t mark the whole tree `'use client'` without a reason.",
      "Secrets and DB stay on the server. Bundle size drops for the static parts.",
    ],
    intro: "The biggest mental-model shift since Hooks.",
    why: "Waterfalls, bundle weight, and where data is allowed to live.",
    concept: "Two module graphs. The client graph is a subset.",
    how: "No `'use client'` → server. Import a client child for interactivity.",
    usage: "Pages, layouts, data-heavy lists.",
    figures: [
      {
        src: "/diagrams/react/react-rsc.png",
        alt: "Server Components fetching data and passing serializable props to client islands",
        caption: "Server tree with client leaves",
      },
    ],
    extras: [
      {
        key: "boundary",
        title: "The client boundary",
        body: "`'use client'` is a file-level fence: that module and its imports become client JS (unless they are server-only and passed as children from a parent — children can still be server-rendered slots). Passing a server component as `children` into a client wrapper is the recommended pattern.",
      },
    ],
    practices: "Push `'use client'` down. Serialize dates as strings. Don’t leak server modules into client imports.",
    mistakes: "`useState` in a server file. Importing a server module from a client file. Passing a class instance as a prop.",
    code: `// page.tsx — Server Component
export default async function Page() {
  const catalog = await db.catalog();
  return <ProductGrid products={catalog} />; // ProductGrid may be a client island
}
`,
    examples: [
      {
        id: "slot",
        title: "Server children, client shell",
        about: "Keep data on the server.",
        language: "typescript",
        code: `// ClientShell.tsx
"use client";
export function ClientShell({ children }: { children: ReactNode }) {
  return <div className="shell">{children}</div>;
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-hydration",
    title: "Hydration",
    order: 43,
    summary: "Client React attaches listeners to server-rendered HTML. Markup must match.",
    prerequisites: ["react-server-components"],
    related: ["react-useid", "react-strict-mode"],
    isHighYield: true,
    oneLiner:
      "Hydration is React walking existing DOM from SSR/RSC and attaching fibers + events. If the client render does not match the server HTML (`Date.now()`, `typeof window`, invalid HTML, random IDs), you get a hydration mismatch. `useId` and rendering the same tree on both sides fix most issues. `suppressHydrationWarning` is a last resort on tiny text nodes like timestamps.",
    beats: [
      "Invalid HTML (interactive content inside `<p>`) gets ‘fixed’ by the browser before React hydrates — mismatch.",
      "Client-only widgets: render a placeholder on the server, mount on `useEffect`.",
      "Partial hydration / streaming: later RSC chunks hydrate as they arrive.",
    ],
    intro: "SSR is not done until hydration succeeds.",
    why: "Flicker, broken events, React warnings in the console.",
    concept: "Reuse DOM nodes; don’t throw them away unless you `render` client-only.",
    how: "Same component tree. No `window` in render. Stable IDs.",
    usage: "Every SSR/RSC app.",
    practices: "View source vs client. Fix invalid markup. Prefer CSS for locale dates if they must differ.",
    mistakes: "`if (typeof window)` changing JSX. `Math.random()` in render. `key={index}` that differs after sort on client.",
    code: `const id = useId();
return <input id={id} defaultValue={serverValue} />;
`,
    examples: [
      {
        id: "client-only",
        title: "Browser-only widget",
        about: "Avoid mismatch.",
        language: "typescript",
        code: `const [ready, setReady] = useState(false);
useEffect(() => setReady(true), []);
if (!ready) return <div style={{ height: 320 }} />;
return <Map />;
`,
      },
    ],
  }),
];
