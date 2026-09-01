import { architectureTopic } from "./factory";

export const architectureAtomicAndStateTopics = [
  architectureTopic({
    slug: "arch-atomic-design",
    title: "Atomic structure",
    order: 24,
    summary: "Atoms → molecules → organisms → templates → pages — and how that fights feature folders.",
    related: ["arch-component-driven", "arch-feature-based"],
    isHighYield: true,
    oneLiner:
      "Atomic Design (Brad Frost) names five levels: atoms (button), molecules (search field), organisms (header), templates (layout), pages (real data). It is a vocabulary for a design system, not a mandatory `atoms/` folder tree. Feature-based apps often keep atoms in `shared/ui` and organisms inside features.",
    beats: [
      "Pages have real data; templates have placeholders. That distinction still helps Storybook.",
      "A global `organisms/` dump becomes a junk drawer — same failure as `components/`.",
      "Interview take: use atomic language in the design system; use features in the product.",
    ],
    intro: "User asked for atomic structure as its own topic. Treat it as a map, not a religion.",
    why: "Designers and engineers share words. Conflicts appear when both atomic and feature taxonomies are enforced as folder law.",
    concept: "Composition hierarchy of UI, independent of business folders.",
    how: "Tokens feed atoms. Atoms compose molecules. Features compose organisms into pages.",
    usage: "Design-system repos. Marketing sites. Multi-brand.",
    practices: "If an organism is checkout-only, it lives in `features/checkout`, not `organisms/`.",
    mistakes: "Putting API calls in atoms. Atoms must not know routes.",
    figures: [
      {
        src: "/diagrams/architecture/arch-atomic-design.png",
        alt: "Atomic Design pyramid",
        caption: "Atoms up to pages",
      },
    ],
    code: `// shared/ui/atoms/Button.tsx
// shared/ui/molecules/SearchField.tsx  = Input + Button
// features/catalog/ui/ProductHeader.tsx = organism owned by the feature
`,
    examples: [
      {
        id: "conflict",
        title: "Where does Header live?",
        about: "If every app has a different header, it is a feature organism.",
        language: "typescript",
        code: `// app-specific: features/shell/ui/AppHeader.tsx
// truly shared: shared/ui/AppHeader.tsx
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-unidirectional-flow",
    title: "Unidirectional data flow",
    order: 25,
    summary: "State down, events up. Derived data is computed, not stored twice.",
    related: ["arch-lifting-state", "arch-client-vs-server-state"],
    isHighYield: true,
    oneLiner:
      "React’s model is unidirectional: state lives in an owner, views render it, events request the next state. You do not two-way bind. Derived values (`fullName`, filtered lists) are computed during render or with `useMemo` — storing them causes drift.",
    beats: [
      "Flux/Redux made this explicit with actions. Hooks still follow it.",
      "Context and stores are still one-way if updates go through a dispatcher.",
      "Two-way `v-model` in Vue is syntactic sugar over the same idea; in React you write both sides.",
    ],
    intro: "If you cannot draw the arrow, the bug is architecture, not a missing `useEffect`.",
    why: "Time-travel, debugging, fewer ping-pong updates.",
    concept: "Single writer for a piece of state. Readers are pure functions of that state.",
    how: "Event → setState/dispatch/mutation → new snapshot → render.",
    usage: "Every form, every list filter, every Redux slice.",
    practices: "Lift only as high as the lowest common owner. Derive the rest.",
    mistakes: "`useEffect` that copies props into state “to keep them in sync.” That’s two sources of truth.",
    figures: [
      {
        src: "/diagrams/architecture/arch-unidirectional-flow.png",
        alt: "View to event to store to view",
        caption: "Unidirectional cycle",
      },
    ],
    code: `function Cart({ lines }: { lines: Line[] }) {
  const total = lines.reduce((s, l) => s + l.cents, 0); // derived
  return (
    <>
      <ul>{lines.map((l) => <li key={l.id}>{l.name}</li>)}</ul>
      <p>{total}</p>
    </>
  );
}
`,
    examples: [
      {
        id: "filter",
        title: "Do not store filtered list",
        about: "Filter is a function of query + items.",
        language: "typescript",
        code: `const visible = items.filter((i) => i.name.includes(query));
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-lifting-state",
    title: "Lifting state vs stores",
    order: 26,
    summary: "Lift to the closest parent until the tree is ugly; then a store or URL.",
    related: ["arch-unidirectional-flow", "arch-pattern-provider"],
    oneLiner:
      "Lift state to the nearest common ancestor of readers and writers. If that ancestor is the app root, you have an implicit global store — use Context, Zustand, or the URL instead of 12 layers of props. Do not reach for Redux because two siblings need a boolean.",
    beats: [
      "URL is a store: filters, tabs, pagination belong there for shareability.",
      "Sibling communication: lift, or a tiny store, or composition (children as function).",
      "Prop drilling 2–3 levels is fine. 8 levels is a smell.",
    ],
    intro: "The React docs still start here. Seniors know when lifting failed.",
    why: "Wrong lift = god component. Wrong store = invisible coupling.",
    concept: "Ownership. Who is allowed to `set`?",
    how: "Draw the tree. Mark who reads/writes. Move state to LCA or extract a store for distant nodes.",
    usage: "Wizards (lift in the wizard). Theme (store). Table selection (lift in table organism).",
    practices: "Colocate first. Measure rerenders before adding a store.",
    mistakes: "Global Zustand for a modal open flag used once.",
    code: `function Wizard() {
  const [step, setStep] = useState(0);
  return (
    <>
      <Stepper step={step} />
      {step === 0 ? <Address onNext={() => setStep(1)} /> : <Pay onBack={() => setStep(0)} />}
    </>
  );
}
`,
    examples: [
      {
        id: "url",
        title: "URL as lifted state",
        about: "Next.js searchParams.",
        language: "typescript",
        code: `const q = searchParams.get("q") ?? "";
// setQ writes router.push("?q=" + value)
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-client-vs-server-state",
    title: "Client state vs server state",
    order: 27,
    summary: "Server state is a cache of the network. Client state is UI that the server never saw.",
    related: ["arch-flux-redux-query", "arch-api-strategy"],
    isHighYield: true,
    oneLiner:
      "Server state (user, cart, catalog) is asynchronous, stale-able, and owned by the backend. TanStack Query / SWR / RSC fetch cache it. Client state (modal open, wizard step, draft text) is ephemeral and local. Putting server lists in Redux duplicates a cache you will get wrong.",
    beats: [
      "React Query is not “state management vs Redux” — it is a server-cache. You can use both.",
      "Optimistic updates are still server state with a pending overlay.",
      "RSC can skip a client cache for read-mostly pages.",
    ],
    intro: "The 2020s architecture interview question.",
    why: "Cache invalidation is the problem. One library should own it.",
    concept: "Source of truth: DB vs browser memory vs URL.",
    how: "Query keys identify server snapshots. Mutations invalidate. Local `useState` for chrome.",
    usage: "Almost every SPA. Forms: draft is client until submit becomes server.",
    practices: "Don’t copy Query data into Zustand “for convenience.”",
    mistakes: "Fetching in Redux thunks in 2026 without a reason (offline write model, maybe).",
    code: `function ProductPage({ id }: { id: string }) {
  const product = useQuery({ queryKey: ["product", id], queryFn: () => api.product(id) });
  const [size, setSize] = useState<string>("M"); // client
  return (
    <div>
      <h1>{product.data?.name}</h1>
      <SizePicker value={size} onChange={setSize} />
    </div>
  );
}
`,
    examples: [
      {
        id: "split",
        title: "Where it lives",
        about: "Cheat sheet.",
        language: "typescript",
        code: `// server: useQuery / fetch in RSC
// url: searchParams
// client: useState / zustand for UI chrome
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-flux-redux-query",
    title: "Flux, Redux, Context, and Query",
    order: 28,
    summary: "Action → dispatcher → store vs Context vs a dedicated server cache.",
    related: ["arch-client-vs-server-state", "arch-unidirectional-flow"],
    oneLiner:
      "Flux (and Redux) made unidirectional flow operational: actions are facts, reducers are pure, the store is the snapshot. Context is a transport, not an architecture. TanStack Query owns server cache. Pick: Redux/Zustand for complex client workflows; Query for REST/GraphQL; Context for DI and rare reads.",
    beats: [
      "Redux Toolkit + Query is a valid combo: RTK Query is their cache.",
      "Context + useReducer is Redux-shaped for a subtree.",
      "Don’t implement Flux by hand in 2026 unless asked historically.",
    ],
    intro: "Name the problem each tool solves or you sound dated.",
    why: "Interviewers still say Redux to see if you know when not to use it.",
    concept: "Event sourcing lite (actions) vs cache (query keys) vs implicit tree (context).",
    how: "Draw data: if it comes from HTTP GET, Query. If it’s a state machine spanning pages, a store.",
    usage: "Undo stacks, collaborative CRDT (specialized). Shopping UI chrome.",
    practices: "Normalize only when you have real identity graphs.",
    mistakes: "One Redux slice per form input.",
    code: `function reducer(state: { items: Item[] }, action: { type: "add"; item: Item }) {
  switch (action.type) {
    case "add":
      return { items: [...state.items, action.item] };
  }
}
`,
    examples: [
      {
        id: "choose",
        title: "Decision",
        about: "Say this out loud.",
        language: "typescript",
        code: `// GET /cart → useQuery
// isDrawerOpen → useState
// multi-step booking with undo → zustand/redux
`,
      },
    ],
  }),
];
