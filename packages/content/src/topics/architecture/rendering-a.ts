import { architectureTopic } from "./factory";

const renderingFigure = [
  {
    src: "/diagrams/architecture/arch-rendering-strategies.png",
    alt: "CSR SSR SSG ISR streaming islands RSC hydration edge",
    caption: "Rendering strategies at a glance",
  },
];

export const architectureRenderingTopicsA = [
  architectureTopic({
    slug: "arch-csr",
    title: "Client-side rendering (CSR)",
    order: 29,
    summary: "The server sends a shell and JS; the browser builds the UI after download and execute.",
    related: ["arch-ssr", "arch-islands"],
    isHighYield: true,
    oneLiner:
      "CSR (classic SPA): HTML is a near-empty shell, JS downloads, React mounts, then data fetches. Time-to-content depends on JS + waterfalls. Good for authenticated dashboards; weak for SEO and first paint on slow phones unless you add SSR/SSG.",
    beats: [
      "Vite SPA, `createRoot`, React Router — this is CSR.",
      "You still need a server for APIs. CSR is about HTML, not about having a backend.",
      "Code-split routes or you ship the whole app up front.",
    ],
    intro: "The 2015 default. Still correct for many admin tools.",
    why: "Interviews contrast it with SSR. Name TTFB (fast) vs TTI (slow).",
    concept: "Render happens on the client’s CPU after JS parse/compile.",
    how: "CDN → index.html → bundles → hydrate/mount → fetch JSON → setState.",
    usage: "Logged-in apps, internal tools, highly interactive canvases.",
    practices: "HTTP caching for hashed assets. Avoid request waterfalls (start fetches early).",
    mistakes: "Claiming CSR cannot be indexed — Google can, but social crawlers and perf still hurt.",
    figures: renderingFigure,
    code: `const root = createRoot(document.getElementById("root")!);
root.render(<BrowserRouter><App /></BrowserRouter>);
`,
    examples: [
      {
        id: "waterfall",
        title: "CSR waterfall",
        about: "JS then JSON then more JSON.",
        language: "typescript",
        code: `useEffect(() => {
  void api.me().then(setUser); // starts only after mount
}, []);
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-ssr",
    title: "Server-side rendering (SSR)",
    order: 30,
    summary: "HTML is generated per request on a server, then hydrated in the browser.",
    related: ["arch-csr", "arch-streaming-ssr", "arch-rsc"],
    isHighYield: true,
    oneLiner:
      "SSR renders React to HTML on each request (`renderToString` / `renderToPipeableStream`). The user sees content before JS finishes. Then hydration attaches listeners. You pay server CPU and must keep server/client trees equal or you hydrate-mismatch.",
    beats: [
      "SSR is not “no JavaScript.” Hydration still ships JS for interactivity.",
      "Cookies/session are available on the server — good for personalized HTML.",
      "Cache HTML at the edge only if it is not user-specific (or use vary/key).",
    ],
    intro: "Next.js Pages `getServerSideProps` and App Router dynamic `fetch({ cache: 'no-store' })`.",
    why: "First contentful paint and SEO for request-specific pages (account, search).",
    concept: "Same component tree, two runtimes. Data loaded where the first HTML is built.",
    how: "Request → load data → render HTML → stream/send → client hydrates.",
    usage: "Dashboards with session, product pages that change often, A/B HTML.",
    practices: "Don’t block the whole page on a slow third party — stream or defer.",
    mistakes: "Singletons leaking user data (see SSR singleton topic). `window` in render without guards.",
    figures: renderingFigure,
    code: `export default async function Page() {
  const user = await getUser(); // server
  return <Home user={user} />;
}
`,
    examples: [
      {
        id: "mismatch",
        title: "Hydration mismatch",
        about: "Date.now() in render differs.",
        language: "typescript",
        code: `// bad
<p>{Date.now()}</p>
// good: render a stable server value, update in useEffect
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-ssg",
    title: "Static site generation (SSG)",
    order: 31,
    summary: "HTML is built at build time (or on-demand once) and served as files from a CDN.",
    related: ["arch-isr", "arch-ssr"],
    isHighYield: true,
    oneLiner:
      "SSG pre-renders HTML at build (`getStaticProps`, `output: 'export'`, or cached `fetch` with a long lifetime). TTFB is CDN-fast. Data is as fresh as the last build. Perfect for docs, marketing, and catalogs that change on deploy.",
    beats: [
      "Not for per-user HTML (unless you static the shell and CSR the rest).",
      "Build time grows with page count — ISR and on-demand revalidate exist because of this.",
      "Still hydrate if you ship client components.",
    ],
    intro: "The cheapest correct architecture for mostly-public content.",
    why: "Perf and cost. Interview: when SSG is wrong (stock ticker, inbox).",
    concept: "Render ahead of time. Runtime is a file server.",
    how: "CI build crawls routes → HTML/JSON → object storage/CDN.",
    usage: "PrepQuest-style content, blogs, docs, landing pages.",
    practices: "Preview builds. Invalidate on CMS webhook (that’s ISR).",
    mistakes: "SSG a page that reads cookies. That’s a bug or a static lie.",
    figures: renderingFigure,
    code: `export async function generateStaticParams() {
  const slugs = await cms.allSlugs();
  return slugs.map((slug) => ({ slug }));
}
`,
    examples: [
      {
        id: "hybrid",
        title: "Static shell, client island",
        about: "Comments widget CSR on an SSG article.",
        language: "typescript",
        code: `export default function Article({ content }: { content: string }) {
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Comments /> {/* client */}
    </article>
  );
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-isr",
    title: "Incremental static regeneration (ISR)",
    order: 32,
    summary: "Serve static HTML, rebuild in the background after a TTL or on-demand webhook.",
    related: ["arch-ssg", "arch-edge-rendering"],
    isHighYield: true,
    oneLiner:
      "ISR (Next.js) serves a cached static page and regenerates it after `revalidate` seconds or `revalidatePath`/`revalidateTag`. Users rarely wait on the origin. Stale-while-revalidate: someone may see old HTML until regeneration finishes.",
    beats: [
      "On-demand revalidation (CMS webhook) is usually better than a 60s TTL for editorial.",
      "Tag-based invalidation (`fetch` tags) is the App Router model.",
      "Not magic: origin still runs React when regenerating.",
    ],
    intro: "SSG’s freshness problem, solved without SSR every hit.",
    why: "Large catalogs (e-commerce) cannot rebuild 100k pages every edit.",
    concept: "Cache with a policy. Regeneration is an async job keyed by path/tag.",
    how: "Hit cache → if stale, serve stale and rebuild → next hit gets new HTML.",
    usage: "Product pages, blog posts, marketing with a CMS.",
    practices: "Revalidate the tag, not the world. Handle failed regenerations.",
    mistakes: "ISR for per-user pages. Caching personalized HTML is a leak.",
    figures: renderingFigure,
    code: `export default async function Product({ params }: { params: { id: string } }) {
  const product = await fetch(\`https://api.example/products/\${params.id}\`, {
    next: { revalidate: 60, tags: [\`product:\${params.id}\`] },
  }).then((r) => r.json());
  return <ProductView product={product} />;
}
`,
    examples: [
      {
        id: "ondemand",
        title: "Webhook",
        about: "CMS calls your route.",
        language: "typescript",
        code: `export async function POST() {
  revalidateTag("product:42");
  return Response.json({ ok: true });
}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-streaming-ssr",
    title: "Streaming SSR",
    order: 33,
    summary: "HTML is flushed in chunks so the shell paints while slow data is still loading.",
    related: ["arch-ssr", "arch-selective-hydration", "arch-rsc"],
    isHighYield: true,
    oneLiner:
      "Streaming SSR (`renderToPipeableStream`, Next.js streaming) sends the document incrementally. Suspense fallbacks go out first; when the promise resolves, a chunk replaces them. TTFB drops because you do not wait for every query.",
    beats: [
      "Requires Suspense boundaries around slow slots.",
      "HTTP/1.1 still streams; HTTP/2/3 help. CDNs must not buffer the whole body.",
      "Errors can be sent as later chunks if you design fallbacks.",
    ],
    intro: "React 18’s answer to “SSR is slow because of data.”",
    why: "Product page: header and image first, reviews later.",
    concept: "Out-of-order streaming + placeholders. Framework wires the script to swap.",
    how: "Wrap async server components or `use()` in `<Suspense>`.",
    usage: "Next.js App Router default when you use Suspense.",
    practices: "Skeleton that matches layout to avoid CLS. Don’t stream PII into a shared cache.",
    mistakes: "One Suspense at the root — you stream nothing useful.",
    figures: renderingFigure,
    code: `export default function ProductPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
    </>
  );
}
`,
    examples: [
      {
        id: "async",
        title: "Async child",
        about: "Blocks only its boundary.",
        language: "typescript",
        code: `async function Reviews() {
  const rows = await db.reviews();
  return <ul>{rows.map((r) => <li key={r.id}>{r.body}</li>)}</ul>;
}
`,
      },
    ],
  }),
];
