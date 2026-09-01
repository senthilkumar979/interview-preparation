import { architectureTopic } from "./factory";

export const architecturePatternTopicsB = [
  architectureTopic({
    slug: "arch-pattern-controlled",
    title: "Controlled vs uncontrolled",
    order: 7,
    summary: "Controlled: parent owns the value. Uncontrolled: the DOM (or inner state) owns it until read.",
    related: ["arch-pattern-state-reducer", "arch-unidirectional-flow"],
    isHighYield: true,
    oneLiner:
      "A controlled input takes `value` + `onChange`; React is the source of truth. An uncontrolled input uses `defaultValue` and a ref (`form.elements`). Libraries should support both or pick one and document it. Switching mid-life (`value` from undefined to string) is a classic bug.",
    beats: [
      "If `value` is passed, you must update it on every keystroke or the field freezes.",
      "Forms with native submit + FormData are often simpler than controlling every field.",
      "Design-system rule: `value !== undefined` means controlled.",
    ],
    intro: "This is not only inputs. Dropdowns, tabs, and accordions have the same fork.",
    why: "Interview whiteboards: “why won’t this input type?” — you passed `value` without `onChange`.",
    concept: "Who owns the source of truth: React state or the platform.",
    how: "Controlled: state up, events down. Uncontrolled: ref / FormData on submit.",
    usage: "Filters (controlled, URL-synced). One-off “name on a card” forms (uncontrolled).",
    practices: "Don’t mix. Syncing uncontrolled to state on every change is just a worse controlled.",
    mistakes: "`value={undefined}` then later a string. `null` as value (React warns; use `\"\"`).",
    code: `function ControlledName() {
  const [name, setName] = useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}

function UncontrolledName() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log(ref.current?.value); }}>
      <input ref={ref} defaultValue="Ada" name="name" />
    </form>
  );
}
`,
    examples: [
      {
        id: "both",
        title: "Component that supports both",
        about: "Same pattern as Radix/shadcn.",
        language: "typescript",
        code: `function TextField({ value, defaultValue, onChange }: FieldProps) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? "");
  const shown = isControlled ? value : inner;
  return (
    <input
      value={shown}
      onChange={(e) => {
        if (!isControlled) setInner(e.target.value);
        onChange?.(e.target.value);
      }}
    />
  );
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-state-reducer",
    title: "State reducer pattern",
    order: 8,
    summary: "Expose an internal reducer so callers can intercept transitions without forking the component.",
    related: ["arch-pattern-controlled", "arch-pattern-props-getter"],
    oneLiner:
      "The state reducer pattern (Downshift, Kent C. Dodds) lets a headless component run `state = props.stateReducer(state, action)` so products can block, rewrite, or log transitions. It is controlled-state for complex widgets.",
    beats: [
      "Internal reducer stays the default. `stateReducer` is an inversion-of-control hook.",
      "Useful when you cannot predict every product rule (`never close menu if filter query length > 0`).",
      "Type actions as a discriminated union.",
    ],
    intro: "When `onChange` is too late — you needed to prevent the transition.",
    why: "Open-source components stay fork-free. Interviews: “how do you make a dropdown extensible?”",
    concept: "User-provided reducer composes with yours: `(s, a) => user(defaultReduce(s, a), a)` or wrap.",
    how: "Call `stateReducer` after computing next state; if they return previous, skip.",
    usage: "Comboboxes, drag-and-drop, multi-step wizards.",
    practices: "Keep action types public. Don’t require a reducer for the happy path.",
    mistakes: "Making the reducer the only API (too much ceremony for a toggle).",
    code: `type Action = { type: "toggle" } | { type: "close" };

function reduce(state: { open: boolean }, action: Action) {
  switch (action.type) {
    case "toggle":
      return { open: !state.open };
    case "close":
      return { open: false };
  }
}

function Menu({ stateReducer = (_s, a, next) => next }: Props) {
  const [state, setState] = useState({ open: false });
  function dispatch(action: Action) {
    setState((s) => stateReducer(s, action, reduce(s, action)));
  }
  return <button type="button" onClick={() => dispatch({ type: "toggle" })}>Menu</button>;
}
`,
    examples: [
      {
        id: "block",
        title: "Product intercepts close",
        about: "Dirty form keeps the panel open.",
        language: "typescript",
        code: `<Menu
  stateReducer={(state, action, next) => {
    if (action.type === "close" && isDirty) return state;
    return next;
  }}
/>
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-props-getter",
    title: "Props getters",
    order: 9,
    summary: "Headless hooks return `getXProps()` that merge event handlers and a11y attributes onto your elements.",
    related: ["arch-pattern-headless", "arch-pattern-state-reducer"],
    oneLiner:
      "A props getter is a function (`getToggleButtonProps`) that returns the props you spread onto your own DOM node. It merges your `onClick` with the library’s and injects ARIA. Downshift named the pattern; TanStack Table uses it too.",
    beats: [
      "Always merge: call the getter’s handler then yours, or use a `composeEventHandlers` helper.",
      "Don’t destructure and drop `ref`. Forward it.",
      "Better than render props when you want full markup control.",
    ],
    intro: "Headless = behavior without markup. Getters are how behavior attaches.",
    why: "Design systems keep their DOM; accessibility still ships.",
    concept: "Library returns bag-of-props factories. You own className and structure.",
    how: "Getter takes user props, returns `{ ...aria, onClick: composed, ref: merged }`.",
    usage: "Combobox, table row selection, dropzone.",
    practices: "Document which getters are required. Test by spreading onto real buttons.",
    mistakes: "Spreading getter props onto a `div` that is not keyboard-accessible.",
    code: `function compose<E extends { onClick?: (e: MouseEvent) => void }>(a: E, b: E): E {
  return {
    ...a,
    ...b,
    onClick: (e: MouseEvent) => {
      a.onClick?.(e);
      if (!e.defaultPrevented) b.onClick?.(e);
    },
  };
}

function useToggle() {
  const [on, setOn] = useState(false);
  function getButtonProps(user: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) {
    return compose(user, {
      "aria-pressed": on,
      onClick: () => setOn((v) => !v),
    });
  }
  return { on, getButtonProps };
}
`,
    examples: [
      {
        id: "spread",
        title: "Product markup",
        about: "Your button, their a11y.",
        language: "typescript",
        code: `const { on, getButtonProps } = useToggle();
return <button type="button" className="gold" {...getButtonProps()}>{on ? "On" : "Off"}</button>;
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-slots",
    title: "Slots and children as function",
    order: 10,
    summary: "Named slots (`header`, `footer`) or function children let callers fill holes in a layout without 40 props.",
    related: ["arch-pattern-compound", "arch-pattern-render-props"],
    oneLiner:
      "A slot is a named place to inject UI (`modal.footer`). In React you pass `footer={<Buttons />}`, clone a `Slot` child, or use function children. Vue/Web Components have first-class slots; React simulates them with composition.",
    beats: [
      "Prefer `children` + compound parts over `title`, `subtitle`, `extraTitleAdornment`.",
      "Function children are a slot that receives layout data (`({ maxHeight }) => ...`).",
      "Radix `Slot` merges props onto the child (asChild pattern).",
    ],
    intro: "Cards, modals, and page shells are 90% slots.",
    why: "Avoids “boolean API” (`showFooter`, `footerAlign`).",
    concept: "The parent defines structure; the child defines contents of holes.",
    how: "Render `{header}` where the hole is. Or `Children.map` looking for `type === Header`.",
    usage: "Dialog, Table.Toolbar, AppShell.",
    practices: "Type slots as `ReactNode`. Don’t parse children unless you must.",
    mistakes: "Requiring a magic `displayName` to find slots. Fragile.",
    code: `function Dialog({ header, footer, children }: DialogProps) {
  return (
    <div role="dialog">
      <header>{header}</header>
      <div>{children}</div>
      {footer ? <footer>{footer}</footer> : null}
    </div>
  );
}
`,
    examples: [
      {
        id: "aschild",
        title: "asChild / Slot",
        about: "Button styles, child is a link.",
        language: "typescript",
        code: `// Radix-style: merge className onto <a>
<Button asChild>
  <a href="/checkout">Pay</a>
</Button>
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-observer",
    title: "Observer and useSyncExternalStore",
    order: 11,
    summary: "Subscribe to stores outside React with the concurrent-safe `useSyncExternalStore` API.",
    related: ["arch-unidirectional-flow", "arch-client-vs-server-state"],
    isHighYield: true,
    oneLiner:
      "`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` is the official way to read Zustand, Redux, browser APIs, and other external stores under concurrent rendering. A naive `useEffect` + `useState` subscription can tear (show mixed snapshots).",
    beats: [
      "`getSnapshot` must return a cached immutable snapshot; new object every call infinite-loops.",
      "`getServerSnapshot` is required for SSR so server HTML matches the first client paint.",
      "This is the Observer pattern: store is subject; React is observer.",
    ],
    intro: "React 18 concurrent features made “setState from store in useEffect” incorrect.",
    why: "Hydration mismatches and tearing. Interview: “why not subscribe in useEffect?”",
    concept: "External store + snapshot equality. React re-renders when snapshot changes.",
    how: "Store keeps listeners. `subscribe` registers. `getSnapshot` reads current.",
    usage: "Zustand, media query, `online` status, browser history.",
    practices: "Selector: subscribe to a slice, return primitive or memoized object.",
    mistakes: "Returning `store.getState()` object that is mutated in place.",
    code: `const listeners = new Set<() => void>();
let count = 0;

export const counterStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot() {
    return count;
  },
  increment() {
    count += 1;
    listeners.forEach((l) => l());
  },
};

export function useCount() {
  return useSyncExternalStore(counterStore.subscribe, counterStore.getSnapshot, () => 0);
}
`,
    examples: [
      {
        id: "media",
        title: "matchMedia without tearing",
        about: "Server snapshot: false (unknown).",
        language: "typescript",
        code: `function usePrefersDark() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-pattern-factory",
    title: "Component factory",
    order: 12,
    summary: "A function returns a configured component type — variants, branded buttons, or env-specific implementations.",
    related: ["arch-pattern-adapter", "arch-modular"],
    oneLiner:
      "A component factory is a function that closes over config and returns a component (`createButton({ variant })`). Use it for design-system variants, test doubles, and swapping implementations (maps provider) without scattering `if (env)` in JSX.",
    beats: [
      "Do not create component types inside render — identity resets state.",
      "Factories at module scope are fine. Factories in render are HOCs in disguise and break.",
      "Prefer `cva` / variant props for styling; factories for behavioral swaps.",
    ],
    intro: "Factories configure; they should run once per module or once per app boot.",
    why: "MFE and white-label apps inject brand. Tests inject fakes.",
    concept: "Closure over config → component. Same as `connect(mapState)(View)` historically.",
    how: "Call at init: `export const PrimaryButton = createButton({ tone: \"gold\" })`.",
    usage: "Icon sets, analytics-wrapped links, platform-specific DateField.",
    practices: "Return a named function. Freeze config.",
    mistakes: "`const Cmp = createX(props)` inside `Parent` — remount every time.",
    code: `function createIconButton(icon: ReactNode) {
  return function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button type="button" {...props}>
        {icon}
        {props.children}
      </button>
    );
  };
}

export const CloseButton = createIconButton(<XIcon />);
`,
    examples: [
      {
        id: "swap",
        title: "Env swap",
        about: "Tests never hit Stripe.js.",
        language: "typescript",
        code: `export const PaymentForm = process.env.NODE_ENV === "test" ? FakePayment : StripePayment;
`,
      },
    ],
  }),
];
