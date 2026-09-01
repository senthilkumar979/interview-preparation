import { architectureTopic } from "./factory";

export const architecturePatternTopicsA = [
  architectureTopic({
    slug: "arch-pattern-container",
    title: "Container / presentational",
    order: 1,
    summary: "Split data-fetching “smart” containers from pure UI “dumb” views. Less fashionable with hooks, still useful at boundaries.",
    related: ["arch-pattern-custom-hooks", "arch-pattern-headless"],
    isHighYield: true,
    oneLiner:
      "A container owns data, loading, and events; a presentational component only renders props. Hooks made colocating data in the same file cheap, but the split still pays off when you reuse UI in Storybook, tests, or multiple data sources.",
    beats: [
      "Today the “container” is often a custom hook (`useCart()`) plus a view — same idea, better composition.",
      "Do not invent a `containers/` folder for every page. Split at a real seam: API vs pixels.",
      "Presentational components should not import fetchers or stores.",
    ],
    intro: "Classic React interviews still ask smart vs dumb. Answer with the modern translation: hooks + views.",
    why: "Tests become: hook with MSW vs screenshot of props. Redesigns do not rewrite queries.",
    concept: "Separate what the UI looks like from where data lives. The dependency points one way: view ← container.",
    how: "Container calls Query/store, maps DTOs to view-model props, handles callbacks. View is a function of props.",
    usage: "Design systems, marketing vs app shells, swapping mock data in Storybook.",
    practices: "Prefer `useX` + `XView` in the same feature folder over global `containers/`.",
    mistakes: "Empty wrapper named Container that only forwards props. Fetching inside a “dumb” button.",
    code: `function CartContainer() {
  const { data, isPending } = useCartQuery();
  if (isPending) return <CartSkeleton />;
  return <CartView items={data.items} onRemove={removeLine} />;
}

function CartView({ items, onRemove }: CartViewProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
`,
    examples: [
      {
        id: "hook-split",
        title: "Modern split: hook is the container",
        about: "Same pattern without a class named Container.",
        language: "typescript",
        code: `export function useCart() {
  const query = useCartQuery();
  return { items: query.data?.items ?? [], isPending: query.isPending, remove: removeLine };
}

export function CartPage() {
  const cart = useCart();
  return <CartView {...cart} />;
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-compound",
    title: "Compound components",
    order: 2,
    summary: "A parent owns shared state; children communicate via context so callers compose the API like HTML.",
    related: ["arch-pattern-provider", "arch-pattern-slots"],
    isHighYield: true,
    oneLiner:
      "Compound components expose a set of related pieces (`Tabs`, `Tabs.List`, `Tabs.Panel`) that share implicit state through context. Callers own layout; the library owns behavior.",
    beats: [
      "Better than a giant `tabs={[{label, panel}]}` prop when layout must be flexible.",
      "Each child can be optional. Missing `Tabs.Panel` is a product choice, not a crash if you guard.",
      "Radix, Headless UI, and Reach popularized this. Interviewers want “implicit state via context.”",
    ],
    intro: "HTML is compound: `select` + `option`. React libraries copy that.",
    why: "One component with 20 boolean props does not scale. Composition does.",
    concept: "Parent provides context (selected id, setters). Children read it. Public API is nested JSX.",
    how: "Create context in parent. Children `useContext`. Optionally cloneElement for index, but context is cleaner.",
    usage: "Tabs, accordion, menus, form field + label + error clusters.",
    practices: "Document the required parent. Throw a clear error if a child is used outside.",
    mistakes: "Using cloneElement to inject 15 props. Forgetting a unique `value` per tab.",
    code: `const TabsCtx = createContext<TabsCtxValue | null>(null);

export function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return <TabsCtx.Provider value={{ value, setValue }}>{children}</TabsCtx.Provider>;
}

export function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = use(TabsCtx);
  if (!ctx) throw new Error("Tab must be inside Tabs");
  return (
    <button type="button" aria-selected={ctx.value === id} onClick={() => ctx.setValue(id)}>
      {children}
    </button>
  );
}
`,
    examples: [
      {
        id: "compose",
        title: "Caller owns layout",
        about: "Toolbar on the left, panels on the right — no extra API.",
        language: "typescript",
        code: `<Tabs defaultValue="a">
  <aside><Tab id="a">A</Tab><Tab id="b">B</Tab></aside>
  <TabPanel id="a">Alpha</TabPanel>
  <TabPanel id="b">Beta</TabPanel>
</Tabs>
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-render-props",
    title: "Render props",
    order: 3,
    summary: "A component takes a function as `children` or `render` and calls it with state, inverting control of the UI.",
    related: ["arch-pattern-slots", "arch-pattern-hoc"],
    oneLiner:
      "A render prop is a function the component calls with its internals (`(state) => <UI />`). It shares behavior without inheritance. Hooks replaced most use cases; you still see it in Downshift, Formik-era APIs, and headless lists.",
    beats: [
      "`children` as a function is the same pattern as `render={...}`.",
      "Nesting many render props creates “callback hell.” Prefer hooks unless you need a component boundary (error, suspense, DOM measure).",
      "Type the function: `children: (api: MouseApi) => ReactNode`.",
    ],
    intro: "Before hooks, this was how you reused `mousemove` without HOCs wrapping wrappers.",
    why: "You still need it when the reusable unit must be a component (portal, measurement, third-party class API).",
    concept: "Inversion of control: the library owns state/effects; the caller owns JSX.",
    how: "Run hooks/effects in the parent, invoke `children(value)` in render.",
    usage: "Mouse position, virtual lists, “headless” autocomplete.",
    practices: "If the only consumer is your app, write a hook instead.",
    mistakes: "New function identity every render causing child memo to bust — stabilize if you memo children.",
    code: `function Mouse({ children }: { children: (p: { x: number; y: number }) => ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}
    </div>
  );
}
`,
    examples: [
      {
        id: "use",
        title: "Call site",
        about: "UI stays in the product; tracking stays in Mouse.",
        language: "typescript",
        code: `<Mouse>{({ x, y }) => <CursorGhost left={x} top={y} />}</Mouse>
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-hoc",
    title: "Higher-order components",
    order: 4,
    summary: "A function takes a component and returns a wrapped component that injects props or gates render.",
    related: ["arch-pattern-render-props", "arch-authentication"],
    oneLiner:
      "An HOC is `withX(Component) => Wrapped`. It injects props or adds a wrapper (auth gate, analytics). Hooks killed most data HOCs; they remain for cross-cutting wrappers and some class-era libraries.",
    beats: [
      "Static: `displayName = withAuth(Profile)`. Forward refs with `forwardRef`.",
      "Prop collisions: prefix injected props or pick names carefully (`authUser` not `user`).",
      "Prefer hooks for data. Prefer a layout/guard component for auth instead of `withAuth` soup.",
    ],
    intro: "Redux `connect` was the HOC everyone met. Know it so you can say when not to write a new one.",
    why: "Legacy codebases and interview trivia. Composition of HOCs is hard to type and debug.",
    concept: "Decorator for components: extra behavior at the component type level.",
    how: "Return a function component that renders `Component` with extra props or a redirect.",
    usage: "Feature-flag wrapping, legacy `connect`, error logging wrappers.",
    practices: "Don’t nest six HOCs. Don’t hide required props.",
    mistakes: "Not copying statics (`defaultProps`). Breaking memo by creating the HOC inside render.",
    code: `function withAuth<P extends { user: User }>(Component: ComponentType<P>) {
  function Wrapped(props: Omit<P, "user">) {
    const user = useCurrentUser();
    if (!user) return <Navigate to="/login" />;
    return <Component {...(props as P)} user={user} />;
  }
  Wrapped.displayName = \`withAuth(\${Component.displayName ?? Component.name})\`;
  return Wrapped;
}
`,
    examples: [
      {
        id: "guard",
        title: "Prefer a guard component in App Router",
        about: "Same idea, explicit tree.",
        language: "typescript",
        code: `export function AuthGate({ children }: { children: ReactNode }) {
  const user = useCurrentUser();
  if (!user) return <LoginRedirect />;
  return children;
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-provider",
    title: "Provider / context pattern",
    order: 5,
    summary: "Put rarely changing or widely needed values in context so the tree does not prop-drill.",
    related: ["arch-pattern-compound", "arch-client-vs-server-state"],
    isHighYield: true,
    oneLiner:
      "A Provider publishes a value to descendants via context. Use it for theme, i18n, auth session, and DI of a store — not for high-frequency mouse coordinates. Split contexts so a theme toggle does not rerender the whole app.",
    beats: [
      "Default value is a footgun: missing provider silently “works” with a dummy. Throw if `useX` sees null.",
      "Context is not a Redux replacement for normalized server lists.",
      "React 19 `use(Context)` works in conditionals; `useContext` does not.",
    ],
    intro: "Prop drilling is not a crime. Context is a tool when many distant nodes need the same handle.",
    why: "Wrong context usage is the #1 reason “the whole page rerenders.”",
    concept: "Publish/subscribe in the React tree. Subscribers re-render when the value identity changes.",
    how: "createContext, Provider at a layout, hook that reads and narrows.",
    usage: "Theme, current user id, feature-flag bag, query client.",
    practices: "Memo the value object. Split `StateContext` and `DispatchContext`.",
    mistakes: "Putting the entire Redux-like store in one context. Creating Provider inside a child every render.",
    code: `const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = use(ThemeContext);
  if (!ctx) throw new Error("useTheme needs ThemeProvider");
  return ctx;
}
`,
    examples: [
      {
        id: "split",
        title: "Split read vs write",
        about: "Buttons that only dispatch skip theme-value rerenders.",
        language: "typescript",
        code: `const ThemeValue = createContext("light");
const ThemeSet = createContext<(t: Theme) => void>(() => {});
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-custom-hooks",
    title: "Custom hooks as composition",
    order: 6,
    summary: "Extract stateful logic into `use*` functions so UI stays declarative and logic is testable.",
    related: ["arch-pattern-container", "arch-pattern-headless"],
    isHighYield: true,
    oneLiner:
      "A custom hook is the default composition unit in React: same rules of hooks, reusable state/effects, no JSX required. Prefer `useCheckout()` over mixins, HOCs, and deep render-prop trees.",
    beats: [
      "Name with `use`. Call only at the top level of a component or another hook.",
      "Return a stable API: values + functions. Document side effects.",
      "One hook, one job. `usePage` that does auth+query+analytics is a god hook.",
    ],
    intro: "Hooks replaced almost every 2017 pattern for sharing logic.",
    why: "Interviewers want you to extract, not copy `useEffect` fetch into six pages.",
    concept: "Functions that may call other hooks. They are not components; they return data, not elements.",
    how: "Cut the stateful block from a component, name it, pass arguments instead of closing over 12 locals.",
    usage: "Debounce, media query, form field, query wrappers, Zustand selectors.",
    practices: "Keep hooks in the feature folder. Don’t put React Query keys inside random UI files.",
    mistakes: "Conditional `useX`. Returning JSX from a “hook.” Fetching in a hook used by ten list items (N+1).",
    code: `export function useDebounced<T>(value: T, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}
`,
    examples: [
      {
        id: "compose",
        title: "Compose hooks, not giant components",
        about: "Search page stays thin.",
        language: "typescript",
        code: `function SearchBox() {
  const [q, setQ] = useState("");
  const debounced = useDebounced(q, 300);
  const results = useSearchQuery(debounced);
  return <Typeahead value={q} onChange={setQ} items={results.data} />;
}
`,
      },
    ],
  }),
];
