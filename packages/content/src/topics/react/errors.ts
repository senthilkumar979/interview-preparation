import { reactTopic } from "./factory";

export const reactErrorTopics = [
  reactTopic({
    slug: "react-error-boundary",
    title: "Error Boundaries",
    order: 37,
    summary: "Class components that catch render errors in the subtree and show a fallback.",
    prerequisites: ["react-components"],
    related: ["react-handling-errors", "react-portals"],
    isHighYield: true,
    oneLiner:
      "An Error Boundary implements `static getDerivedStateFromError` and/or `componentDidCatch`. It catches errors in *render*, lifecycle, and constructors of children — not in event handlers, async code, or the boundary itself. Function components still need a class (or `react-error-boundary`) to declare one.",
    beats: [
      "Place boundaries around independent widgets so one chart crash doesn’t blank the app.",
      "`componentDidCatch` is for logging (Sentry); `getDerivedStateFromError` is for UI fallback.",
      "React 18: errors in render can recover on next navigation; still wrap risky leaves.",
    ],
    intro: "The last line of defense for a white screen.",
    why: "Interviews: what they catch vs `try/catch` in `onClick`.",
    concept: "Error bubbles to the nearest boundary, like exceptions up the stack.",
    how: "Class with `state = { hasError }`. Fallback JSX when true. Reset via `key` or a retry callback.",
    usage: "Route-level and widget-level fences.",
    figures: [
      {
        src: "/diagrams/react/react-error-boundary.png",
        alt: "Error boundary catching a child throw and showing fallback UI",
        caption: "Isolate failures to a subtree",
      },
    ],
    extras: [
      {
        key: "library",
        title: "react-error-boundary",
        body: "The community package wraps the class in a function-friendly API (`FallbackComponent`, `onReset`, `resetKeys`). Fine in production; still the same rules about what is caught.",
      },
    ],
    practices: "Log with a correlation id. Offer retry. Don’t swallow then render a lie.",
    mistakes: "Expecting it to catch `fetch` in `useEffect`. Putting the throw inside the boundary component’s own render without a child.",
    code: `class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  render() {
    if (this.state.err) return <p>Something broke.</p>;
    return this.props.children;
  }
}
`,
    examples: [
      {
        id: "not-caught",
        title: "Not caught",
        about: "Handle in the handler.",
        language: "typescript",
        code: `function handleClick() {
  try {
    risky();
  } catch (e) {
    setBanner(String(e));
  }
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-handling-errors",
    title: "Handling errors",
    order: 38,
    summary: "Render errors, async errors, and UI recovery — Error Boundaries are only one layer.",
    prerequisites: ["react-error-boundary", "react-useeffect"],
    related: ["react-use", "react-actions"],
    isHighYield: true,
    oneLiner:
      "Split: (1) render/lifecycle → Error Boundary, (2) event handlers → `try/catch` + local state, (3) promises in effects → `.catch` / abort, (4) data libraries → error UI from the query, (5) React 19 `use()` + `throw promise` → nearest boundary or Suspense. Never leave a rejected promise unhandled.",
    beats: [
      "Map HTTP failures to user copy, not stack traces.",
      "`error.tsx` in Next App Router is a route-level boundary.",
      "Retry with backoff; don’t retry 4xx blindly.",
    ],
    intro: "Production apps fail in more ways than `throw` in JSX.",
    why: "Sentry noise vs a user who can continue.",
    concept: "Each async boundary needs an explicit error channel.",
    how: "Query `isError` UI. Form `useActionState` error field. Boundary fallback for panics.",
    usage: "Checkout, editors, dashboards.",
    extras: [
      {
        key: "layers",
        title: "A practical stack",
        body: "Network: TanStack Query / router loaders. Mutations: action state + toast. Unexpected: Error Boundary + log. Invariants: fail fast in dev (`throw` if id missing).",
      },
    ],
    practices: "Typed error objects. Empty vs error vs loading as first-class UI.",
    mistakes: "Empty `catch {}`. Showing raw `e.message` from the server. One giant boundary for the whole app only.",
    code: `const { data, error, refetch } = useQuery({ queryKey: ["user", id], queryFn: () => loadUser(id) });
if (error) return <p role="alert">Couldn’t load. <button onClick={() => refetch()}>Retry</button></p>;
`,
    examples: [
      {
        id: "effect",
        title: "Effect race + error",
        about: "Abort and set error state.",
        language: "typescript",
        code: `useEffect(() => {
  const ac = new AbortController();
  load(id, { signal: ac.signal })
    .then(setData)
    .catch((e) => {
      if (e.name === "AbortError") return;
      setError(e);
    });
  return () => ac.abort();
}, [id]);
`,
      },
    ],
  }),
];
