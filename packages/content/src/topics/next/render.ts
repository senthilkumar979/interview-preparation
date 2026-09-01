import { nextTopic } from "./factory";

export const nextRenderTopics = [
nextTopic({
  slug: "next-ppr",
  title: "Partial Prerendering",
  order: 9,
  summary: "Static shell + dynamic holes in one route (Next 15+ experimental/stable depending on version).",
  prerequisites: ["next-static-dynamic", "next-streaming"],
  related: ["next-caching"],
  isHighYield: true,
  oneLiner: "PPR prerenders a static shell and leaves Suspense boundaries as dynamic holes that stream at request time. The CDN can cache the shell. User-specific bits (cart, auth) stay dynamic without dynamizing the whole page.",
  beats: ["Suspense is the hole.", "Static shell must not read cookies.", "This is the interview answer for 'static and personalized'."],
  intro: "The synthesis of static and dynamic, not a third renderer.",
  why: "Marketing + account widget on one URL.",
  concept: "Prerender until a dynamic API or uncached fetch inside a boundary.",
  how: "Wrap <Cart /> in Suspense; keep hero static.",
  usage: "Ecommerce PDP, dashboards with a static frame.",
  practices: "Holes should be small. Fallback should match size to avoid CLS.",
  mistakes: "Reading cookies in the shell. One giant Suspense around the page.",
  language: "typescript",
  caption: "Partial Prerendering",
  code: "export default function Page() {\n  return (\n    <>\n      <Hero />\n      <Suspense fallback={<CartSkeleton />}>\n        <Cart />\n      </Suspense>\n    </>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-ppr.svg",
      alt: "static shell with dynamic suspense holes",
      caption: "Static shell, dynamic holes",
    },
  ],
  examples: [
    {
      id: "flag",
      title: "Enable PPR",
      about: "Version-specific config.",
      language: "typescript",
      code: "// next.config.ts — follow the Next 15/16 PPR flag for your minor version\nconst nextConfig = { experimental: { ppr: true } };\n",
    }
  ],
}),

nextTopic({
  slug: "next-streaming",
  title: "Streaming SSR",
  order: 10,
  summary: "Suspense + RSC payload streaming HTML and flight data as it resolves.",
  prerequisites: ["next-file-conventions"],
  related: ["next-ppr"],
  isHighYield: false,
  oneLiner: "Next streams the document: the shell flush happens early; suspended Server Components send later chunks (HTML + RSC flight). loading.tsx is a convenience Suspense. The user sees chrome before slow queries finish.",
  beats: ["Streaming needs a boundary.", "Slow await above the first boundary blocks the shell.", "Client JS can hydrate islands independently."],
  intro: "TTFB vs time-to-first-byte-of-content: stream the shell.",
  why: "Perceived performance without giving up SSR.",
  concept: "React streams; Next's server adapter writes HTTP chunks.",
  how: "Await fast data outside; wrap slow panels in Suspense or loading.tsx.",
  usage: "Feeds, analytics widgets, related products.",
  practices: "Don't await a 800ms query in the root layout.",
  mistakes: "Blocking on all data then streaming nothing.",
  language: "typescript",
  caption: "Streaming SSR",
  code: "export default function Page() {\n  return (\n    <>\n      <Header />\n      <Suspense fallback={<FeedSkeleton />}>\n        <Feed />\n      </Suspense>\n    </>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-streaming.svg",
      alt: "HTML chunks streaming over time",
      caption: "Shell first, holes later",
    },
  ],
  examples: [
    {
      id: "load",
      title: "loading.tsx",
      about: "File-based boundary.",
      language: "typescript",
      code: "export default function Loading() {\n  return <p>Loading segment…</p>;\n}\n",
    }
  ],
}),

nextTopic({
  slug: "next-route-handlers",
  title: "Route Handlers",
  order: 11,
  summary: "app/api/**/route.ts: Web Request/Response on the server.",
  prerequisites: ["next-app-router"],
  related: ["next-middleware", "next-server-actions"],
  isHighYield: true,
  oneLiner: "Route Handlers replace Pages API routes. Export GET/POST/etc from route.ts. You receive a Web Request. Return Response or NextResponse. They run on Node or Edge depending on the segment config. Use them for webhooks, OAuth callbacks, and public HTTP APIs—not as a CRUD layer your own RSC could query directly.",
  beats: ["Same origin as the app.", "Prefer Server Components/Actions for first-party mutations.", "Set runtime = 'edge' only when you need it."],
  intro: "HTTP endpoints colocated with the App Router.",
  why: "Webhooks cannot call a Server Action.",
  concept: "File route.ts in a folder that has no page, or alongside if you want both (careful).",
  how: "export async function POST(req: Request) { ... }",
  usage: "Stripe webhooks, OG image, health checks.",
  practices: "Validate signatures. Don't expose secrets. Reuse domain functions with RSC.",
  mistakes: "Building a BFF that the page then fetch()s from the client, reintroducing waterfalls.",
  language: "typescript",
  caption: "Route Handlers",
  code: "import { NextResponse } from \"next/server\";\nexport async function GET() {\n  return NextResponse.json({ ok: true });\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-handlers.svg",
      alt: "route.ts handling HTTP methods",
      caption: "Route Handlers are HTTP, not RSC",
    },
  ],
  examples: [
    {
      id: "hook",
      title: "Webhook",
      about: "Read raw body for signatures.",
      language: "typescript",
      code: "export async function POST(req: Request) {\n  const raw = await req.text();\n  verify(raw, req.headers.get(\"stripe-signature\"));\n  return new Response(null, { status: 204 });\n}\n",
    }
  ],
}),
];
