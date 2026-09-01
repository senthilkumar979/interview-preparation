import { architectureTopic } from "./factory";

const renderingFigure = [
  {
    src: "/diagrams/architecture/arch-rendering-strategies.png",
    alt: "Rendering strategies comparison",
    caption: "Islands, RSC, hydration, edge",
  },
];

export const architectureRenderingTopicsB = [
  architectureTopic({
    slug: "arch-islands",
    title: "Islands and partial hydration",
    order: 34,
    summary: "Most of the page is static HTML; interactive widgets hydrate independently.",
    related: ["arch-selective-hydration", "arch-csr"],
    isHighYield: true,
    oneLiner:
      "Islands architecture (Astro, Fresh, Marko): the page is HTML with isolated interactive islands. Each island hydrates with its own JS. You do not hydrate a giant React tree for a marketing page with one carousel. Partial hydration is the technique; islands is the mental model.",
    beats: [
      "Next.js App Router is island-adjacent: Server Components static-ish, Client Components are islands.",
      "Astro made `client:visible` famous — hydrate on viewport.",
      "State does not automatically share across islands; use URL, events, or a tiny store.",
    ],
    intro: "The reaction to “we hydrated 300kB of React for a blog.”",
    why: "JS budget. INP. Marketing + a few widgets.",
    concept: "Static document + sparse interactivity. Hydration cost proportional to islands, not page length.",
    how: "Compiler emits HTML and per-island bundles. Directives choose when to hydrate.",
    usage: "Content sites, docs, e-commerce product info + add-to-cart island.",
    practices: "Keep island props serializable and small. Don’t island the whole app (then it’s CSR).",
    mistakes: "Passing a 2MB document as an island prop.",
    figures: renderingFigure,
    code: `// Astro-style thought
// <Carousel client:visible items={items} />
// rest of the markdown is zero JS
`,
    examples: [
      {
        id: "next",
        title: "Next analogue",
        about: "Server page + client cart button.",
        language: "typescript",
        code: `export default async function Page() {
  const product = await db.product();
  return (
    <main>
      <h1>{product.name}</h1>
      <AddToCart id={product.id} />
    </main>
  );
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-rsc",
    title: "React Server Components",
    order: 35,
    summary: "Components run on the server by default; client components opt in with `'use client'`.",
    related: ["arch-ssr", "arch-streaming-ssr", "arch-islands"],
    isHighYield: true,
    oneLiner:
      "RSC: the default component in App Router runs on the server, can `await` data, and sends a serialized UI payload — not a useState tree. `'use client'` marks a client subtree (an island) that hydrates. Server components cannot use hooks or browser APIs. They can import client components, not vice versa for server-only modules.",
    beats: [
      "RSC is a rendering and bundling strategy, not “SSR with extra steps.” SSR still exists for client components.",
      "Secrets and DB stay in server modules. Don’t leak them into client imports.",
      "Props from server to client must be serializable.",
    ],
    intro: "The 2024–2026 React architecture interview.",
    why: "Zero-JS for static parts. Colocated data without extra API routes.",
    concept: "Two module graphs. The flight protocol serializes server output.",
    how: "Server renders RSC payload + HTML. Client hydrates only client leaves.",
    usage: "Next.js App Router, Waku, experimental Vite RSC.",
    practices: "Push `'use client'` down. Keep leaves small.",
    mistakes: "Making the root a client component “to use context” and throwing away RSC.",
    figures: renderingFigure,
    code: `async function Note({ id }: { id: string }) {
  const note = await db.note(id);
  return (
    <article>
      <h1>{note.title}</h1>
      <Editor initial={note.body} />
    </article>
  );
}
`,
    examples: [
      {
        id: "boundary",
        title: "Import rule",
        about: "Client cannot import server db.",
        language: "typescript",
        code: `// Editor.tsx
"use client";
export function Editor({ initial }: { initial: string }) {
  const [body, setBody] = useState(initial);
  return <textarea value={body} onChange={(e) => setBody(e.target.value)} />;
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-selective-hydration",
    title: "Selective hydration",
    order: 36,
    summary: "React hydrates ready chunks first and can prioritize the island the user interacts with.",
    related: ["arch-streaming-ssr", "arch-islands"],
    isHighYield: true,
    oneLiner:
      "Selective hydration (React 18) hydrates Suspense-bounded subtrees independently. If the user clicks a component whose JS is ready, React can hydrate that tree first instead of waiting for the whole page. Combined with streaming, the shell is interactive earlier.",
    beats: [
      "Requires Suspense boundaries; a monolith tree hydrates as one unit.",
      "Not the same as islands in Astro, but the UX goal rhymes.",
      "Heavy client components below a boundary should not block the header.",
    ],
    intro: "Hydration used to be all-or-nothing. That blocked INP.",
    why: "Explain concurrent React without handwaving.",
    concept: "Hydration is interruptible and prioritisable per boundary.",
    how: "Stream HTML + JS per slot. React attaches when code and DOM match.",
    usage: "Next.js with Suspense. Any React 18 SSR stream.",
    practices: "Boundaries around independently useful UI. Avoid wrapping the world.",
    mistakes: "Confusing this with “no hydration” (that’s static HTML or islands with no React).",
    figures: renderingFigure,
    code: `<Suspense fallback={<HeaderSkeleton />}>
  <Header />
</Suspense>
<Suspense fallback={<MainSkeleton />}>
  <Main />
</Suspense>
`,
    examples: [
      {
        id: "click",
        title: "Click-driven priority",
        about: "User taps “Add to cart” while reviews JS still loads.",
        language: "typescript",
        code: `// React can hydrate AddToCart first if its boundary is ready
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-edge-rendering",
    title: "Edge rendering",
    order: 37,
    summary: "Run render or routing close to the user (CDN isolates), with tighter runtime limits.",
    related: ["arch-isr", "arch-ssr"],
    isHighYield: true,
    oneLiner:
      "Edge rendering runs code on CDN POPs (Cloudflare Workers, Vercel Edge, Netlify Edge). Good for geo routing, auth gates, A/B, and light HTML. Bad for huge Node APIs, long CPU, and most native addons. Middleware often runs at the edge even when the page runs on Node.",
    beats: [
      "Edge is a region story, not automatically faster SSR if you still hit a distant database.",
      "Bring data to the edge (KV, cached fetch) or you add a hop.",
      "Runtime: often no full Node. Check `process`, `fs`, and crypto APIs.",
    ],
    intro: "Architecture choice: where the CPU lives relative to the user and the DB.",
    why: "Interviews mix “edge” with ISR. Separate: location vs cache policy.",
    concept: "Split: edge middleware (rewrite, cookie) vs edge-rendered bodies vs origin SSR.",
    how: "Config `runtime = 'edge'` on a route. Cold starts are smaller; CPU time capped.",
    usage: "Auth redirect, localization, bot blocking, HTML for global marketing.",
    practices: "Don’t query Postgres from 300 workers without a pooler/HTTP API.",
    mistakes: "Putting Prisma on the edge without an adapter. Shipping secrets to every POP carelessly (still secrets).",
    figures: renderingFigure,
    code: `export const runtime = "edge";

export function GET(req: Request) {
  const country = req.headers.get("x-vercel-ip-country") ?? "US";
  return new Response(\`hello \${country}\`);
}
`,
    examples: [
      {
        id: "mw",
        title: "Middleware at the edge",
        about: "Gate, then Node page.",
        language: "typescript",
        code: `export function middleware(req: NextRequest) {
  if (!req.cookies.get("session") && req.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
`,
      },
    ],
  }),
];
