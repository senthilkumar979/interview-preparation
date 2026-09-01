import { architectureTopic } from "./factory";

export const architectureOtherTopics = [
  architectureTopic({
    slug: "arch-boundaries",
    title: "Runtime boundaries",
    order: 45,
    summary: "Error, Suspense, auth, and server/client boundaries as first-class architecture.",
    related: ["arch-pattern-error-boundary", "arch-rsc"],
    isHighYield: true,
    oneLiner:
      "Boundaries isolate failure and loading: error boundaries, Suspense, auth gates, and the `'use client'` line. Draw them on the tree before you write fetch. A missing boundary turns one timeout into a white screen.",
    beats: [
      "Suspense: loading. Error boundary: render crash. Auth gate: missing principal. Route `notFound`: missing resource.",
      "Next: `error.tsx`, `loading.tsx`, `not-found.tsx` per segment.",
      "Don’t catch errors so high that the user loses the whole shell.",
    ],
    intro: "Architecture is where you put the walls.",
    why: "Blast radius. Perceived performance. Security UX.",
    concept: "Each boundary converts a class of failure into UI.",
    how: "Map routes to segments. Wrap third parties. Keep the chrome outside the risky inner tree.",
    usage: "App Router layouts. Widget slots. MFE remotes.",
    practices: "Retry + report. Skeletons that match. Don’t swallow errors.",
    mistakes: "Try/catch around JSX in a function component — that does not catch render errors in children.",
    code: `export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <ErrorBoundary fallback={<p>Section failed</p>}>
        <Suspense fallback={<Skeleton />}>{children}</Suspense>
      </ErrorBoundary>
    </AuthGate>
  );
}
`,
    examples: [
      {
        id: "rsc",
        title: "Server/client boundary",
        about: "Secrets stay above `'use client'`.",
        language: "typescript",
        code: `// server file may import db
// client file must not
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-folder-structure",
    title: "Folder structure at scale",
    order: 46,
    summary: "How to lay out a growing React/Next app without a 400-file `components/` dump.",
    related: ["arch-feature-based", "arch-pattern-module"],
    oneLiner:
      "At scale: `app/` for routes, `features/*` for product, `shared/ui` for the design system, `server/` for server-only, `lib/` tiny. Colocate `_components` under a route if they are not reused. Name folders after the domain. Encode public APIs.",
    beats: [
      "Route groups `(shop)` are URL-invisible. Use them for layouts, not for dumping code.",
      "Don’t fight Next conventions — put files where the framework looks, extract logic to features.",
      "A `types/` folder at root is a smell if each feature can own types.",
    ],
    intro: "The question is never “what does Kent recommend?” It is “can a new hire delete checkout?”",
    why: "Merge conflicts and onboarding.",
    concept: "Locality of change. Screaming architecture.",
    how: "Start feature-based. Extract shared on the second copy. Lint import directions.",
    usage: "Any repo past 20 routes.",
    practices: "README per feature if the team is large. Kill empty folders.",
    mistakes: "Mirror the backend’s 40 microservice folders in the frontend on day one.",
    code: `// src/
//   app/(marketing)/page.tsx
//   app/(app)/checkout/page.tsx
//   features/checkout/...
//   shared/ui/Button.tsx
//   server/db.ts
`,
    examples: [
      {
        id: "colocate",
        title: "Route-private",
        about: "Not everything is shared.",
        language: "typescript",
        code: `// app/checkout/_components/PromoBanner.tsx  — only this route
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-dependency-direction",
    title: "Dependency direction",
    order: 47,
    summary: "Acyclic import graph: domain does not import UI; features do not import each other casually.",
    related: ["arch-clean", "arch-pattern-module"],
    isHighYield: true,
    oneLiner:
      "Draw arrows: `app → features → shared → domain`. Features may not import sibling internals. Cycles mean you extracted the wrong type or need an event/port. ESLint `import/no-restricted-paths` makes this real.",
    beats: [
      "Shared that imports a feature is an inversion — promote or duplicate a type.",
      "Runtime cycles can `undefined` a const during init.",
      "This is the Clean Architecture dependency rule in folder form.",
    ],
    intro: "Architecture is the legal import graph.",
    why: "Build times, testability, delete-ability.",
    concept: "Stable vs volatile. Depend toward stable.",
    how: "Define layers. CI fails illegal imports. Extract `contracts/` if two features must talk.",
    usage: "Monorepos with packages per feature.",
    practices: "Prefer types-only imports across boundaries. Events over direct calls for decoupling.",
    mistakes: "Barrel files that re-export both directions and hide the cycle.",
    code: `// eslint example thought
// features/checkout cannot import features/catalog/ui/*
// both may import shared/money
`,
    examples: [
      {
        id: "event",
        title: "Decouple with a contract",
        about: "catalog publishes ItemAdded; checkout listens.",
        language: "typescript",
        code: `export type ItemAdded = { type: "catalog/itemAdded"; sku: string };
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-feature-flags",
    title: "Feature flags",
    order: 48,
    summary: "Decouple deploy from release; target users; never leave forever-flags.",
    related: ["arch-observability", "arch-config-tenancy"],
    oneLiner:
      "Feature flags are runtime config that turns code paths on per user, cohort, or percent. Architecture: evaluate flags at a boundary (server, BFF, or edge) and pass booleans into UI. Kill flags after rollout. Don’t wrap every line — flag capabilities, not CSS.",
    beats: [
      "Server evaluation prevents peeking at unfinished UI via React state.",
      "Flags need observability: which variant did they see?",
      "Flags in the client bundle can leak unfinished features — use a server gate for sensitive launches.",
    ],
    intro: "Ship dark, light up with a flag. That’s architecture, not a growth hack only.",
    why: "Reduce risk. Experiment. Instant rollback without redeploy.",
    concept: "Toggle, experiment, permission, ops kill-switch — different lifetimes.",
    how: "SDK → evaluate → expose `flags.checkoutV2`. Both code paths until cleanup.",
    usage: "Gradual rollout, entitlements (`plan === pro`), incident kill switches.",
    practices: "Expiry dates on flags. Test both sides. Don’t nest flags five deep.",
    mistakes: "Permanent `if (flag)` archaeology. Flagging in 20 components instead of one facade.",
    code: `export async function CheckoutPage() {
  const flags = await evaluateFlags();
  return flags.checkoutV2 ? <CheckoutV2 /> : <CheckoutV1 />;
}
`,
    examples: [
      {
        id: "kill",
        title: "Ops switch",
        about: "Disable payments without a build.",
        language: "typescript",
        code: `if (!flags.paymentsEnabled) return <Maintenance />;
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-config-tenancy",
    title: "Config and multi-tenancy",
    order: 49,
    summary: "Environment config, white-label, and tenant isolation as architectural constraints.",
    related: ["arch-feature-flags", "arch-authorization"],
    oneLiner:
      "Config: build-time `NEXT_PUBLIC_*` vs server secrets. Multi-tenant: one deploy, many customers — isolate data by `tenantId` on every query, not by hoping the UI picked the right org. White-label: theme tokens and host-based tenant resolution at the edge.",
    beats: [
      "Never put secrets in `NEXT_PUBLIC_`. That’s the browser.",
      "Tenant from hostname/subdomain or path. Don’t trust a client-sent `orgId` without membership check.",
      "Connection pooling per tenant vs shared DB with a column — pick and document.",
    ],
    intro: "SaaS interviews: how do you not leak tenant B’s invoices?",
    why: "Wrong isolation is a career-ending bug.",
    concept: "Resolution (which tenant) + isolation (data plane) + branding (presentation).",
    how: "Middleware reads host → tenant → load config from KV. RLS in Postgres if possible.",
    usage: "B2B apps, agencies, PrepQuest-like multi-org later.",
    practices: "Automated tests that switch tenant and assert 404. Audit logs include tenant.",
    mistakes: "Global cache key `products` without tenant. SSO without tenant binding.",
    code: `const tenant = await tenantFromHost(req.headers.get("host"));
const invoices = await db.invoice.findMany({ where: { tenantId: tenant.id } });
`,
    examples: [
      {
        id: "cache",
        title: "Cache keys",
        about: "Always include tenant.",
        language: "typescript",
        code: `queryKey: ["invoices", tenantId]
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-security-architecture",
    title: "Security architecture (frontend)",
    order: 50,
    summary: "XSS, CSRF, CSP, supply chain — how they shape the app, not just headers.",
    related: ["arch-authentication", "arch-pattern-singleton"],
    oneLiner:
      "Frontend security architecture: treat every string as untrusted until encoded, cookies as CSRF surface, dependencies as supply chain, and CSP as a backstop. Architecture choices (dangerouslySetInnerHTML, markdown, third-party scripts, token storage) dominate over “we added a header.”",
    beats: [
      "XSS: React encodes text nodes; `dangerouslySetInnerHTML` and `href={user}` javascript: are sinks.",
      "CSRF: cookie sessions need SameSite + anti-CSRF for state-changing POST. Bearer-from-header is less CSRF-prone.",
      "Lockfile + audit. Don’t load random CDNs in prod.",
    ],
    intro: "Point to the Security track for depth; here is how it constrains design.",
    why: "You cannot bolt this on after choosing localStorage JWTs and a markdown renderer.",
    concept: "Trusted vs untrusted boundaries. Capability reduction (iframe sandbox, CSP).",
    how: "Default encode. Sanitize HTML with a real sanitizer. CSP nonce for scripts. Subresource integrity if CDN.",
    usage: "Any public form, any user-generated content, any OAuth redirect.",
    practices: "Threat model the BFF. Review `eval` and `new Function`.",
    mistakes: "DOMPurify then concatenating into a script. CSP `unsafe-inline` as a lifestyle.",
    code: `// safe
<p>{userComment}</p>
// dangerous
<div dangerouslySetInnerHTML={{ __html: userComment }} />
`,
    examples: [
      {
        id: "csp",
        title: "CSP thought",
        about: "Nonce per request on the document.",
        language: "typescript",
        code: `Content-Security-Policy: default-src 'self'; script-src 'nonce-abc'
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-performance-budgets",
    title: "Performance budgets",
    order: 51,
    summary: "Budgets as architecture: JS KB, LCP, INP, and who may add a dependency.",
    related: ["arch-observability", "arch-islands"],
    oneLiner:
      "A performance budget is a contract: max JS on checkout, LCP < 2.5s p75, INP < 200ms. Architecture enforces it with islands/RSC, code-split, image policy, and CI that fails oversized PRs. Without a budget, “we’ll optimize later” never happens.",
    beats: [
      "Budgets are per route, not one global number.",
      "Third-party tags need a budget of their own — they blow INP.",
      "Measure RUM, not only Lighthouse on cable.",
    ],
    intro: "Perf is a product requirement expressed as numbers.",
    why: "Otherwise architecture debates are taste.",
    concept: "Constraint-driven design. The budget chooses SSR vs CSR.",
    how: "Set numbers. Bundle analyzer in CI. RUM dashboard. Review new deps.",
    usage: "E-commerce, news, any SEO surface.",
    practices: "Owner per metric. Regression alerts.",
    mistakes: "Budget on localhost only. Ignoring images/fonts.",
    code: `// ci thought: fail if route /checkout client JS > 180kB gzip
`,
    examples: [
      {
        id: "split",
        title: "Meet the budget",
        about: "Dynamic import the chart.",
        language: "typescript",
        code: `const Chart = dynamic(() => import("./RevenueChart"), { ssr: false });
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-testing-pyramid",
    title: "Testing pyramid vs trophy",
    order: 52,
    summary: "Unit, integration, E2E: what architecture makes cheap to test.",
    related: ["arch-layered", "arch-pattern-container"],
    oneLiner:
      "The pyramid (many unit, fewer integration, few E2E) vs the testing trophy (more integration): architecture decides cost. Pure domain functions are cheap unit tests. If all logic is in coupled components, you are forced into slow E2E. Design seams (facades, ports) so RTL integration tests can MSW the network.",
    beats: [
      "Trophy (Kent C. Dodds): integration tests that render like the user give more confidence per minute.",
      "E2E only for critical journeys (pay, login). They are not a design system test runner.",
      "If you cannot unit-test pricing, your layers are fake.",
    ],
    intro: "Testing strategy is an architecture outcome.",
    why: "A brittle suite freezes refactors — the opposite of architecture.",
    concept: "Seams. Determinism. Time/network as injected ports.",
    how: "Domain unit tests. Component tests with fake hooks. Playwright for checkout.",
    usage: "Every track after this one (Testing) goes deeper — here is the why.",
    practices: "Don’t snapshot entire pages. Don’t mock `useState`.",
    mistakes: "100% coverage as a goal. E2E for every CSS tweak.",
    code: `test("lineTotal", () => {
  expect(lineTotal(2, 199)).toBe(398);
});
`,
    examples: [
      {
        id: "msw",
        title: "Integration seam",
        about: "Facade + MSW.",
        language: "typescript",
        code: `http.get("/api/books", () => HttpResponse.json([{ id: "1", title: "Dune" }]));
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-microfrontends",
    title: "Micro-frontends",
    order: 53,
    summary: "Independent deployable UI slices — Module Federation, when it is worth the tax.",
    related: ["arch-modular", "arch-pattern-adapter"],
    oneLiner:
      "Micro-frontends split a UI into independently built/deployed slices (Module Federation, native federation, iframes, web components). Use them for org boundaries (separate teams, separate release trains), not because the repo is large. Cost: duplicate deps, UX drift, shared auth, and operational complexity.",
    beats: [
      "A monorepo with packages is often enough. MFE is an org-structure tool.",
      "Share design tokens and auth via a contract. Do not share a singleton Redux across remotes without a protocol.",
      "SSR + Module Federation is still hard — know that.",
    ],
    intro: "User rules mention MFE. Interviews want “when not to.”",
    why: "Independent teams shipping checkout vs catalog weekly.",
    concept: "Vertical slices with runtime composition vs build-time composition.",
    how: "Host loads remotes. Shared singleton React. Versioning policy for shared libs.",
    usage: "Large orgs, acquisitions, multiple frameworks (last resort).",
    practices: "Contract tests at the seam. Observability per remote. Design system as a shared package.",
    mistakes: "MFE for a 5-person team. iframe soup without a11y or SEO plan.",
    code: `// host thought
const Checkout = lazy(() => import("checkout/App"));
`,
    examples: [
      {
        id: "auth",
        title: "Shared session",
        about: "Cookie on parent domain or token broker.",
        language: "typescript",
        code: `// remotes must not each invent login
`,
      },
    ],
  }),
];
