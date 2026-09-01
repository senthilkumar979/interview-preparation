import { reactTopic } from "./factory";
import type { Topic } from "../../types";

function hook(opts: {
  slug: string;
  title: string;
  order: number;
  summary: string;
  prereq: string[];
  related?: string[];
  oneLiner: string;
  beats: [string, string, string];
  intro: string;
  why: string;
  concept: string;
  how: string;
  usage: string;
  practices: string;
  mistakes: string;
  code: string;
  examples: Topic["workedExamples"];
}): Topic {
  return reactTopic({
    slug: opts.slug,
    title: opts.title,
    order: opts.order,
    summary: opts.summary,
    prerequisites: opts.prereq,
    related: opts.related ?? [],
    isHighYield: true,
    oneLiner: opts.oneLiner,
    beats: [...opts.beats],
    intro: opts.intro,
    why: opts.why,
    concept: opts.concept,
    how: opts.how,
    usage: opts.usage,
    practices: opts.practices,
    mistakes: opts.mistakes,
    code: opts.code,
    examples: opts.examples ?? [],
  });
}

export const reactHookTopics = [
  reactTopic({
    slug: "react-hooks-rules",
    title: "Rules of Hooks",
    order: 13,
    summary: "Only call Hooks at the top level of a React function, in the same order, every render.",
    prerequisites: ["react-fiber"],
    related: ["react-usestate", "react-custom-hooks"],
    isHighYield: true,
    oneLiner:
      "Hooks are an ordered list on the fiber. Call them only from React function components or custom Hooks — not from loops, conditions, or nested functions. Same number and order every render. ESLint `eslint-plugin-react-hooks` enforces this.",
    beats: [
      "`if (x) useState()` breaks the list when `x` changes.",
      "Custom Hooks (names `useXxx`) can call other Hooks — they run as part of the same list.",
      "Class components don’t use Hooks; don’t mix `this.setState` with Hooks in one component.",
    ],
    figures: [
      {
        src: "/diagrams/react/react-hooks.png",
        alt: "Hooks stored in order on a fiber node",
        caption: "Same calls, same order, every render",
      },
    ],
    intro: "The compiler of your brain + eslint. Fiber stores hook slots by index.",
    why: "‘Rendered more hooks than during the previous render.’",
    concept: "Index = identity of that `useState` cell.",
    how: "Early return AFTER hooks, never before a hook. Extract `useThing()` instead of conditional hooks.",
    usage: "Every hook topic.",
    practices: "eslint-plugin-react-hooks. Put hooks together at the top.",
    mistakes: "Hooks in `map`. Hooks after `if (!data) return null`.",
    code: `function Profile({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    load(id).then(setUser);
  }, [id]);
  if (!user) return null;
  return <h1>{user.name}</h1>;
}
`,
    examples: [
      {
        id: "extract",
        title: "Conditional logic inside a hook",
        about: "Not around the hook call.",
        language: "typescript",
        code: `function useTitle(enabled: boolean, title: string) {
  useEffect(() => {
    if (!enabled) return;
    document.title = title;
  }, [enabled, title]);
}
`,
      },
    ],
  }),

  hook({
    slug: "react-usestate",
    title: "useState",
    order: 14,
    summary: "Local state: `[value, setValue]`. Updater functions. Lazy init.",
    prereq: ["react-hooks-rules", "react-immutability"],
    oneLiner:
      "`useState(initial)` returns the current snapshot and a setter. Setting with the same `Object.is` value bails out. When next state depends on previous, use `setX((prev) => next)`. Lazy init: `useState(() => expensive())` runs once.",
    beats: [
      "Each render sees its own `value`. Closures in async handlers can be stale — use updater or `useEffect`.",
      "Batching: multiple `setState` in an event flush together (React 18+ all defaults).",
      "Objects/arrays: replace, don’t mutate.",
    ],
    intro: "The first Hook. All local interactivity.",
    why: "Toggles, inputs, pagination.",
    concept: "State is a queue of updates processed before the next render.",
    how: "`const [n, setN] = useState(0); setN(n + 1)` vs `setN((c) => c + 1)` for double-clicks.",
    usage: "Forms, modals, accordions.",
    practices: "Updater when based on prev. Lazy init for `JSON.parse`. Split unrelated state.",
    mistakes: "`setN(n + 1)` twice expecting +2. Storing derived data. Mutating then set.",
    code: `const [count, setCount] = useState(0);
<button onClick={() => setCount((c) => c + 1)}>{count}</button>
`,
    examples: [
      {
        id: "lazy",
        title: "Lazy initial state",
        about: "Read localStorage once.",
        language: "typescript",
        code: `const [theme, setTheme] = useState(() => localStorage.getItem("theme") ?? "light");
`,
      },
    ],
  }),

  hook({
    slug: "react-useeffect",
    title: "useEffect",
    order: 15,
    summary: "Synchronize with the world after paint. Dependencies. Cleanup.",
    prereq: ["react-usestate"],
    related: ["react-uselayouteffect"],
    oneLiner:
      "`useEffect(fn, deps)` runs `fn` after commit when deps `Object.is`-change (or every render if omitted — rare). Return a cleanup to unsubscribe/abort. Effects are for *syncing* (DOM, network, timers), not for transforming data for the next render (that belongs in render).",
    beats: [
      "Empty `[]`: mount (+ Strict Mode remount in dev). Missing deps: stale closures / eslint warning.",
      "Cleanup runs before the next effect and on unmount. Abort `fetch` there.",
      "Don’t `setState` unconditionally in an effect without a guard — loops.",
    ],
    intro: "The most overused Hook. Interviews: ‘when not to useEffect.’",
    why: "Subscriptions, analytics, integrating non-React widgets.",
    concept: "You describe a synchronization; React retries it when deps change.",
    how: "`useEffect(() => { const id = connect(); return () => disconnect(id); }, [roomId]);`",
    usage: "WebSocket, document.title, IntersectionObserver.",
    practices: "AbortController. List deps. Derive in render instead of effect when possible.",
    mistakes: "Fetching in effect without handling race (old response wins). Using effect to compute `fullName`.",
    code: `useEffect(() => {
  const ac = new AbortController();
  loadUser(id, { signal: ac.signal }).then(setUser).catch(ignoreAbort);
  return () => ac.abort();
}, [id]);
`,
    examples: [
      {
        id: "title",
        title: "Document title",
        about: "Sync outward.",
        language: "typescript",
        code: `useEffect(() => {
  document.title = ` + "`${count} items`" + `;
}, [count]);
`,
      },
    ],
  }),

  hook({
    slug: "react-usecontext",
    title: "useContext",
    order: 16,
    summary: "Read a context value. Subscribe the component to that context.",
    prereq: ["react-usestate", "react-lifting-state"],
    oneLiner:
      "`useContext(MyContext)` returns the current value from the nearest `MyContext.Provider` (React 19: `<MyContext>` works as provider). Changing the value re-renders all consumers. Create with `createContext(default)`. Default is used only if no provider exists.",
    beats: [
      "Put state in a provider component; pass stable value objects (`useMemo`) or split contexts to avoid extra renders.",
      "Not a replacement for all props — use for theme, auth, i18n, not for every leaf prop.",
      "Server Components: pass data as props; context on the client still works below a client provider.",
    ],
    intro: "Escape from prop drilling.",
    why: "Theme, current user, feature flags.",
    concept: "Provider value identity matters. New `{user}` object every render busts consumers.",
    how: "`const theme = useContext(ThemeContext);`",
    usage: "Design system, auth gate.",
    practices: "Split `StateContext` and `DispatchContext`. Memo provider value.",
    mistakes: "Giant app context. Creating context inside render. Using context for one child (just props).",
    code: `const ThemeContext = createContext<"light" | "dark">("light");
function useTheme() {
  return useContext(ThemeContext);
}
`,
    examples: [
      {
        id: "provider",
        title: "Provider",
        about: "React 19 can use `<ThemeContext value={theme}>`.",
        language: "typescript",
        code: `<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
`,
      },
    ],
  }),

  hook({
    slug: "react-usereducer",
    title: "useReducer",
    order: 17,
    summary: "State + event → next state. Better than many related `useState`s.",
    prereq: ["react-usestate", "react-immutability"],
    oneLiner:
      "`useReducer(reducer, init)` is `useState` with a reducer: `(state, action) => nextState`. Dispatch is stable. Use when updates are complex or the next state depends on a vocabulary of events (`{ type: \"add\", sku }`).",
    beats: [
      "Reducers must be pure. Same as Redux reducers.",
      "Lazy init: `useReducer(reducer, arg, initFn)`.",
      "Can pass `dispatch` down without `useCallback`.",
    ],
    intro: "Mini-Redux in a component.",
    why: "Checkout wizard, complex forms, game boards.",
    concept: "Event sourcing-lite: UI dispatches, reducer is the source of truth.",
    how: "`const [state, dispatch] = useReducer(cartReducer, { lines: [] });`",
    usage: "Multi-step flows.",
    practices: "Discriminated union actions. Exhaustive switch + `never`.",
    mistakes: "Side effects in the reducer. Mutating `state`.",
    code: `function reducer(s: number, a: "inc" | "dec") {
  return a === "inc" ? s + 1 : s - 1;
}
const [n, dispatch] = useReducer(reducer, 0);
`,
    examples: [
      {
        id: "cart",
        title: "Cart action",
        about: "Named events.",
        language: "typescript",
        code: `dispatch({ type: "add", sku: "tee" });
`,
      },
    ],
  }),
];
