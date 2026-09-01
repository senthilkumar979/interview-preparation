import { architectureTopic } from "./factory";

export const architectureStyleTopics = [
  architectureTopic({
    slug: "arch-modular",
    title: "Modular architecture",
    order: 19,
    summary: "The app is a graph of modules with explicit public APIs, not a pile of files that import anything.",
    related: ["arch-feature-based", "arch-dependency-direction"],
    isHighYield: true,
    oneLiner:
      "Modular architecture means each module owns a capability, publishes a small API, and hides internals. In React that is folders + import rules, not Java packages. Modules compose in the app shell.",
    beats: [
      "A module is not “utils.” Utils are a junk drawer.",
      "Enforce with ESLint boundaries or Nx tags if the team is large.",
      "Shared kernel stays tiny: design tokens, auth session type, logger.",
    ],
    intro: "Scale is an import graph problem. Modules are how you keep the graph acyclic.",
    why: "Without modules, every feature couples to every other through `components/Button` god folders.",
    concept: "High cohesion inside, low coupling outside. Public vs private paths.",
    how: "Draw bounded contexts. One folder per context. Shell imports modules; modules do not import the shell.",
    usage: "Monorepos (`packages/checkout`), or `src/modules/*` in a SPA.",
    practices: "No circular module deps. Version shared packages if truly separate deployables.",
    mistakes: "Calling every folder a “module” without an API.",
    figures: [
      {
        src: "/diagrams/architecture/arch-feature-folders.png",
        alt: "Feature folders as modules",
        caption: "Modules as folders with a small public surface",
      },
    ],
    code: `// app/shell.ts
import { CheckoutRoutes } from "@/modules/checkout";
import { CatalogRoutes } from "@/modules/catalog";

export const routes = [...CatalogRoutes, ...CheckoutRoutes];
`,
    examples: [
      {
        id: "eslint",
        title: "Boundary thought",
        about: "catalog must not import checkout internals.",
        language: "typescript",
        code: `// allowed: import { formatMoney } from "@/modules/money"
// forbidden: import { CartLine } from "@/modules/checkout/ui/Line"
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-feature-based",
    title: "Feature-based architecture",
    order: 20,
    summary: "Screaming architecture: folders named after the business (`checkout`, not `redux`).",
    related: ["arch-modular", "arch-atomic-design", "arch-folder-structure"],
    isHighYield: true,
    oneLiner:
      "Feature-based (screaming) architecture groups by product capability: `features/checkout/{ui,api,model}`. You open the repo and see what the product does. Type folders (`hooks/`, `components/`) scream “React,” not “commerce.”",
    beats: [
      "Colocate tests and CSS with the feature.",
      "Shared UI lives in `shared/ui` only after the second use.",
      "Conflicts with strict Atomic Design if atoms are a global dump.",
    ],
    intro: "Uncle Bob’s screaming architecture applied to SPAs.",
    why: "Onboarding: find checkout in 10 seconds. Delete a feature by deleting a folder.",
    concept: "Vertical slices over horizontal technical layers — or layers inside the feature.",
    how: "Each feature may have `ui`, `hooks`, `api`, `model`. The app router points at feature pages.",
    usage: "Next.js `app/(shop)/checkout` plus `src/features/checkout`.",
    practices: "Promote to shared only with a reviewer. Kill unused shared immediately.",
    mistakes: "A `features/common` bigger than all features combined.",
    figures: [
      {
        src: "/diagrams/architecture/arch-feature-folders.png",
        alt: "src/features/checkout, catalog, auth",
        caption: "Feature folders scream the domain",
      },
    ],
    code: `// src/features/checkout/
//   ui/CheckoutPage.tsx
//   api/checkoutApi.ts
//   model/totals.ts
//   hooks/useCheckout.ts
`,
    examples: [
      {
        id: "route",
        title: "Thin route file",
        about: "Next app router composes the feature.",
        language: "typescript",
        code: `import { CheckoutPage } from "@/features/checkout/ui/CheckoutPage";
export default CheckoutPage;
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-layered",
    title: "Layered architecture",
    order: 21,
    summary: "UI, application, domain, and infrastructure layers with a one-way dependency rule.",
    related: ["arch-clean", "arch-pattern-facade"],
    isHighYield: true,
    oneLiner:
      "Layered architecture stacks UI → application (use cases) → domain (pure rules) → infrastructure (HTTP, storage). Inner layers must not import outer ones. In React, the domain is often TypeScript functions with no React import.",
    beats: [
      "If `totals.ts` imports `useQuery`, it is not domain.",
      "Infrastructure implements interfaces defined inward (dependency inversion).",
      "Don’t build 8 layers for a landing page.",
    ],
    intro: "This is the classic enterprise diagram. Frontend still benefits at the money-math boundary.",
    why: "You can unit-test pricing without JSDOM. You can swap REST for GraphQL in infra.",
    concept: "Direction of dependencies. Stability increases toward the domain.",
    how: "UI calls application services. Application calls domain + ports. Adapters implement ports.",
    usage: "Checkout, tax, entitlements, offline sync engines.",
    practices: "Keep layers inside a feature if the app is not huge.",
    mistakes: "Anemic “service” that is just fetch. Fake layers.",
    figures: [
      {
        src: "/diagrams/architecture/arch-layered-clean.png",
        alt: "UI, application, domain, infrastructure layers",
        caption: "Dependencies point inward",
      },
    ],
    code: `// domain — no React
export function lineTotal(qty: number, unitCents: number) {
  if (qty < 0) throw new RangeError("qty");
  return qty * unitCents;
}

// application
export async function quoteCart(port: CartPort, id: string) {
  const cart = await port.load(id);
  return cart.lines.reduce((sum, l) => sum + lineTotal(l.qty, l.unitCents), 0);
}
`,
    examples: [
      {
        id: "ui",
        title: "UI only formats",
        about: "Does not reimplement tax.",
        language: "typescript",
        code: `function Total({ cents }: { cents: number }) {
  return <p>{new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(cents / 100)}</p>;
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-component-driven",
    title: "Component-driven architecture",
    order: 22,
    summary: "Build UI bottom-up in isolation (Storybook), then compose pages from proven components.",
    related: ["arch-atomic-design", "arch-pattern-headless"],
    oneLiner:
      "Component-driven development (CDD) builds screens from cataloged components with states (empty, loading, error, RTL) in Storybook. Architecture: the design system is a product; pages are compositions. It complements features: features own page wiring; the system owns atoms.",
    beats: [
      "Stories are the contract. If it isn’t in Storybook, it isn’t reusable.",
      "Page-level stories still need mocked data — don’t fetch in every atom.",
      "CDD fails when every feature invents a new Button.",
    ],
    intro: "Brad Frost + Storybook culture. Interview: how do frontends scale visually?",
    why: "Parallel work: design system team vs feature team. Visual regression.",
    concept: "Bottom-up construction. Isolation. Explicit states.",
    how: "Token → atom → composition. Pages import from the system + feature composites.",
    usage: "Design systems, multi-brand, MFE shared UI.",
    practices: "State matrix in stories. a11y addon. Don’t snapshot everything blindly.",
    mistakes: "Storybook for every internal one-off. That’s ceremony.",
    code: `const meta = { component: Button, args: { children: "Pay" } } satisfies Meta<typeof Button>;
export const Gold: Story = { args: { variant: "gold" } };
export const Disabled: Story = { args: { disabled: true } };
`,
    examples: [
      {
        id: "compose",
        title: "Page composes catalog",
        about: "Feature still owns data.",
        language: "typescript",
        code: `export function CheckoutPage() {
  const cart = useCheckout();
  return (
    <Page>
      <LineList lines={cart.lines} />
      <Button variant="gold" onClick={cart.pay}>Pay</Button>
    </Page>
  );
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-clean",
    title: "Clean Architecture in React",
    order: 23,
    summary: "Dependency rule, entities, use cases, interface adapters — honest about SPA limits.",
    related: ["arch-layered", "arch-pattern-adapter"],
    isHighYield: true,
    oneLiner:
      "Clean Architecture (Uncle Bob) says source-code dependencies point toward policy: entities and use cases do not know React or HTTP. In a SPA you apply it where rules are expensive to get wrong (money, permissions). You do not wrap every `useState` in a use-case class.",
    beats: [
      "Entities: enterprise rules. Use cases: app-specific. Adapters: React, fetch, Clerk.",
      "Frameworks are details. Next.js in the outer ring.",
      "Over-applying creates Java-in-TypeScript ceremony. Say that in interviews.",
    ],
    intro: "Interviewers who read the book want the dependency rule, not a UML cargo cult.",
    why: "Survive a Next → TanStack Start move. Survive REST → GraphQL.",
    concept: "Concentric rings. DIP: inner defines interfaces; outer implements.",
    how: "Pure functions for policy. Ports as TS interfaces. React hooks as adapters that call use cases.",
    usage: "Billing, entitlements, complex wizards, offline write models.",
    practices: "Start with a `domain/` folder, not 12 packages. Grow when pain is real.",
    mistakes: "UseCase classes with one method that calls axios. That’s a service with extra files.",
    figures: [
      {
        src: "/diagrams/architecture/arch-layered-clean.png",
        alt: "Clean/layered rings",
        caption: "Inner policy, outer frameworks",
      },
    ],
    code: `export interface PaymentPort {
  charge(input: { orderId: string; cents: number }): Promise<{ ok: true } | { ok: false; reason: string }>;
}

export async function placeOrder(cart: Cart, payments: PaymentPort) {
  const cents = cart.totalCents();
  if (cents <= 0) return { ok: false as const, reason: "empty" };
  return payments.charge({ orderId: cart.id, cents });
}
`,
    examples: [
      {
        id: "adapter",
        title: "React adapter",
        about: "Hook is not the use case.",
        language: "typescript",
        code: `export function usePlaceOrder() {
  const payments = usePaymentAdapter();
  return useMutation({ mutationFn: (cart: Cart) => placeOrder(cart, payments) });
}
`,
      },
    ],
  }),
];
