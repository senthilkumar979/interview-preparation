import { architectureTopic } from "./factory";

export const architecturePatternTopicsC = [
  architectureTopic({
    slug: "arch-pattern-facade",
    title: "Facade (API module)",
    order: 13,
    summary: "One module hides fetch, URLs, and DTO mapping so features talk to functions, not `axios` soup.",
    related: ["arch-api-strategy", "arch-layered"],
    isHighYield: true,
    oneLiner:
      "A facade is a narrow API (`catalogApi.listBooks()`) that hides HTTP, headers, and mapping. UI and hooks never construct URLs. You can change REST to tRPC behind the facade without rewriting pages.",
    beats: [
      "Not a god `api.ts` with 200 functions — split by bounded context.",
      "Return domain types, not `AxiosResponse`.",
      "Errors should be typed (`UnauthorizedError`) so UI can branch.",
    ],
    intro: "Architecture interviews: “where does fetch live?” — not in the button.",
    why: "Prevents copy-paste base URLs and auth headers. Enables MSW at one seam.",
    concept: "GoF Facade: unify a subsystem. Here the subsystem is the network.",
    how: "Feature `api.ts` exports functions. React Query `queryFn` calls them. Components call hooks.",
    usage: "Every production app. BFF still deserves a client facade.",
    practices: "No `any`. Zod-parse at the boundary if the contract is sloppy.",
    mistakes: "Facade that re-exports the axios instance. That’s not a facade.",
    code: `export const catalogApi = {
  async listBooks(signal?: AbortSignal): Promise<Book[]> {
    const res = await fetch("/api/books", { signal });
    if (!res.ok) throw new CatalogError(res.status);
    const json: unknown = await res.json();
    return parseBooks(json);
  },
};
`,
    examples: [
      {
        id: "hook",
        title: "Hook stays dumb",
        about: "queryFn is one line.",
        language: "typescript",
        code: `export function useBooks() {
  return useQuery({ queryKey: ["books"], queryFn: ({ signal }) => catalogApi.listBooks(signal) });
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-adapter",
    title: "Adapter (third-party widgets)",
    order: 14,
    summary: "Wrap foreign APIs (maps, charts, analytics) so your domain never imports vendor types.",
    related: ["arch-pattern-facade", "arch-pattern-factory"],
    oneLiner:
      "An adapter translates your app’s model to a vendor’s (`DatePicker` that speaks `Temporal.PlainDate` internally but maps to `dayjs` for the widget). If you swap vendors, you rewrite one file.",
    beats: [
      "Never sprinkle `google.maps` types in features.",
      "Imperative widgets: mount in `useEffect`, destroy on cleanup — the adapter owns that.",
      "This is Hexagonal “port + adapter” at the UI edge.",
    ],
    intro: "Charts, maps, rich text, and payment elements all need adapters.",
    why: "Vendor lock-in shows up as 40 files importing Chart.js options.",
    concept: "Your port (interface) vs their SDK. Adapter implements the port.",
    how: "Define `MapViewProps` in domain/UI terms. Implementation file imports the SDK.",
    usage: "Stripe Elements, Mapbox, analytics `track(event)`.",
    practices: "Lazy-load the heavy SDK inside the adapter.",
    mistakes: "Passing vendor option objects through the whole tree.",
    code: `export interface MapPin { id: string; lat: number; lng: number }

export function StoreMap({ pins }: { pins: MapPin[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = new mapboxgl.Map({ container: ref.current, style: "mapbox://styles/light" });
    for (const pin of pins) new mapboxgl.Marker().setLngLat([pin.lng, pin.lat]).addTo(map);
    return () => map.remove();
  }, [pins]);
  return <div ref={ref} className="h-64" />;
}
`,
    examples: [
      {
        id: "port",
        title: "Port type",
        about: "Features depend on this, not Mapbox.",
        language: "typescript",
        code: `export interface MapPort {
  render(el: HTMLElement, pins: MapPin[]): () => void;
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-singleton",
    title: "Singleton caveats in SSR",
    order: 15,
    summary: "Module-level singletons leak across requests on the server. Isolate per request.",
    related: ["arch-ssr", "arch-rsc"],
    isHighYield: true,
    oneLiner:
      "A module singleton (`let cache = {}` at top level) is shared by every user on a Node SSR server. That is a data leak. In browsers it is “one tab.” In Next.js, use `React.cache`, `AsyncLocalStorage`, or request-scoped constructors — never a global Map of user data.",
    beats: [
      "QueryClient: create per request on the server; one in the browser is OK.",
      "`new PrismaClient()` as a singleton is OK (connection pool), user session as singleton is not.",
      "Interviews love this. Mention request isolation.",
    ],
    intro: "Singletons are a lifecycle question, not a GoF trivia answer.",
    why: "Security and correctness under SSR/RSC.",
    concept: "Process-wide mutable state vs request-wide. Node reuses the process.",
    how: "Browser: module state lasts until refresh. Server: module state lasts until deploy.",
    usage: "Analytics queue (browser OK). i18n dictionaries (immutable singleton OK).",
    practices: "Lint for `let` caches in `app/` server files. Prefer `cache()` for dedupe.",
    mistakes: "Global `currentUser`. In-memory rate limiter keyed poorly in serverless (also wrong).",
    code: `const globalForQuery = globalThis as unknown as { queryClient?: QueryClient };

export function getQueryClient() {
  if (typeof window === "undefined") return new QueryClient();
  globalForQuery.queryClient ??= new QueryClient();
  return globalForQuery.queryClient;
}
`,
    examples: [
      {
        id: "als",
        title: "Request scope sketch",
        about: "AsyncLocalStorage for correlation ids.",
        language: "typescript",
        code: `const requestContext = new AsyncLocalStorage<{ requestId: string }>();
export function withRequest<T>(id: string, fn: () => T) {
  return requestContext.run({ requestId: id }, fn);
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-module",
    title: "Module pattern and barrel files",
    order: 16,
    summary: "ES modules are the unit of architecture. Barrel `index.ts` files can destroy tree-shaking and create cycles.",
    related: ["arch-dependency-direction", "arch-folder-structure"],
    oneLiner:
      "The module pattern here means: public API of a folder vs private files. `index.ts` barrels that re-export everything often pull unused code and circular imports. Prefer deep imports (`features/cart/price.ts`) or explicit `public.ts`.",
    beats: [
      "A barrel is not encapsulation. Anyone can still import a deep path unless you lint it.",
      "Next.js/Turbopack: giant barrels slow compiles.",
      "“I,IFE module pattern” in 2010 JS is obsolete; ES modules replaced it.",
    ],
    intro: "Interviews mix “module pattern” (old JS) with “feature modules” (folders). Separate them.",
    why: "Cycles (`a → b → a`) break initialization. Barrels hide the cycle until runtime.",
    concept: "One file, one reason to change. Public surface is small.",
    how: "Feature folder: `index.ts` exports 3–5 symbols. Internals are not re-exported.",
    usage: "Design system `Button` public; `ButtonRipple` private.",
    practices: "eslint `import/no-cycle`. Avoid `export *`.",
    mistakes: "A root `components/index.ts` that exports the entire app.",
    code: `// features/checkout/public.ts — small surface
export { CheckoutPage } from "./ui/CheckoutPage";
export { useCheckout } from "./model/useCheckout";

// avoid: components/index.ts export * from "./Button"; export * from "./Modal"; ...
`,
    examples: [
      {
        id: "cycle",
        title: "Cycle smell",
        about: "Split a types file both can import.",
        language: "typescript",
        code: `// cart.ts imports user.ts which imports cart.ts — extract types/ids.ts
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-error-boundary",
    title: "Error boundary as a pattern",
    order: 17,
    summary: "Class (or `react-error-boundary`) catches render errors in a subtree so the rest of the app lives.",
    related: ["arch-boundaries", "react-error-boundaries"],
    isHighYield: true,
    oneLiner:
      "An error boundary is a React component that implements `getDerivedStateFromError` / `componentDidCatch` (or a wrapper library) and renders fallback UI. It catches render/lifecycle errors in descendants — not events, not async, not server components unless you use the framework’s error.js.",
    beats: [
      "Hooks cannot do this; you need a class or a packaged boundary.",
      "Next.js App Router: `error.tsx` is a boundary per segment.",
      "Log in `componentDidCatch` / `onError`; don’t only `console.log` in production.",
    ],
    intro: "A thrown render should not white-screen the spa. Isolate blast radius.",
    why: "Third-party widgets fail. One chart must not kill checkout.",
    concept: "Try/catch for the React tree, with a fallback element.",
    how: "Wrap risky subtrees. Reset with a key when the user navigates.",
    usage: "Widget slots, MFE remotes, markdown renderers.",
    practices: "Pair with observability. Offer retry.",
    mistakes: "One boundary at the root only. Catching then ignoring.",
    code: `class ChartBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  render() {
    if (this.state.err) return <p>Chart failed.</p>;
    return this.props.children;
  }
}
`,
    examples: [
      {
        id: "lib",
        title: "react-error-boundary",
        about: "Reset keys after route change.",
        language: "typescript",
        code: `<ErrorBoundary fallback={<p>Failed</p>} onError={report} resetKeys={[pathname]}>
  {children}
</ErrorBoundary>
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-headless",
    title: "Headless components",
    order: 18,
    summary: "Behavior and a11y without markup: hooks or renderless components; you bring the DOM.",
    related: ["arch-pattern-props-getter", "arch-component-driven"],
    isHighYield: true,
    oneLiner:
      "Headless UI (Radix, React Aria, Downshift, TanStack Table) ships state machines and accessibility, not CSS. Your design system styles the elements. Architecture: separate “how it works” from “how it looks.”",
    beats: [
      "Headless ≠ unstyled CSS framework only — it is also keyboard and ARIA.",
      "You can write your own with props getters + reducer.",
      "Don’t wrap headless in another abstraction that removes a11y props.",
    ],
    intro: "Component-driven teams still want one visual language. Headless is the behavior layer.",
    why: "Avoid rewriting combobox from scratch every year.",
    concept: "Two layers: behavior module + visual atoms.",
    how: "Hook returns state + getters. Visual components spread getters.",
    usage: "Every serious design system in 2026.",
    practices: "Test behavior without CSS. Visual regression separately.",
    mistakes: "Forking Radix internals. Styling by wrapping in a way that breaks `asChild`.",
    code: `function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);
  return {
    open,
    getButtonProps: () => ({ "aria-expanded": open, onClick: () => setOpen((o) => !o) }),
    getPanelProps: () => ({ hidden: !open }),
  };
}
`,
    examples: [
      {
        id: "radix",
        title: "Radix as headless",
        about: "You own Tailwind classes.",
        language: "typescript",
        code: `<DropdownMenu.Root>
  <DropdownMenu.Trigger className="btn-gold">Open</DropdownMenu.Trigger>
  <DropdownMenu.Content className="menu">{/* items */}</DropdownMenu.Content>
</DropdownMenu.Root>
`,
      },
    ],
  }),
];
