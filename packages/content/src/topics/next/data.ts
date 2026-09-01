import { nextTopic } from "./factory";

export const nextDataTopics = [
nextTopic({
  slug: "next-data-fetching",
  title: "Data fetching",
  order: 5,
  summary: "async Server Components, fetch cache, and request memoization in Next 15/16.",
  prerequisites: ["next-rsc-islands"],
  related: ["next-caching", "next-static-dynamic"],
  isHighYield: true,
  oneLiner: "Fetch in Server Components with async/await. Next extends fetch with caching and revalidate. In Next 15, fetch is uncached by default unless you opt into cache. cookies(), headers(), and params are async. Duplicate fetch() calls with the same URL are memoized in one render.",
  beats: ["Next 15: fetch is dynamic by default; use cache: 'force-cache' or 'use cache' when you want static.", "Don't waterfall: Promise.all sibling fetches.", "Never fetch only in useEffect for first paint."],
  intro: "Data fetching is routing + cache policy, not axios vs fetch trivia.",
  why: "TTFB and correctness (auth cookies) depend on where you read the request.",
  concept: "A cached fetch can be shared across prerenders. Uncached fetch opts the route into dynamic rendering.",
  how: "await fetch(url, { next: { revalidate: 60 } }) or the 'use cache' directive on a function.",
  usage: "Product pages, dashboards, CMS content.",
  practices: "Colocate fetch with the component that renders it. Deduplicate with React cache() for non-fetch sources.",
  mistakes: "Assuming getServerSideProps still exists. Forgetting await params in Next 15.",
  language: "typescript",
  caption: "Data fetching",
  code: "import { cache } from \"react\";\nexport const getUser = cache(async (id: string) => {\n  const res = await fetch(`${process.env.API}/users/${id}`);\n  if (!res.ok) throw new Error(\"user\");\n  return res.json();\n});\n",
  figures: [
    {
      src: "/diagrams/next/next-data.svg",
      alt: "async server component fetching in parallel",
      caption: "Fetch on the server, in parallel",
    },
  ],
  examples: [
    {
      id: "all",
      title: "Parallel fetches",
      about: "Avoid request waterfalls.",
      language: "typescript",
      code: "const [user, orgs] = await Promise.all([getUser(id), getOrgs(id)]);\n",
    }
  ],
}),

nextTopic({
  slug: "next-caching",
  title: "Caching layers",
  order: 6,
  summary: "Request memoization, Data Cache, Full Route Cache, Router Cache—four different layers.",
  prerequisites: ["next-data-fetching"],
  related: ["next-static-dynamic", "next-ppr"],
  isHighYield: true,
  oneLiner: "Next has four caches interviewers expect by name: (1) React memoization of fetch/cache() during one server render, (2) Data Cache for fetch across requests, (3) Full Route Cache of prerendered RSC payload + HTML, (4) Client Router Cache of prefetch. They fail independently. revalidatePath/revalidateTag invalidate server caches, not the user's RAM.",
  beats: ["Name the four layers.", "revalidateTag is surgical; revalidatePath is broader.", "Client Router Cache can show stale UI until a refresh."],
  intro: "Say 'which cache?' before prescribing cache: 'no-store'.",
  why: "Stale dashboards and 'I deployed but the page is old' bugs are cache-layer bugs.",
  concept: "Static routes hit Full Route Cache. Dynamic cookies() bypass it. Tag your fetches for CMS updates.",
  how: "fetch(url, { next: { tags: ['product'] } }); later revalidateTag('product') from a Server Action.",
  usage: "Marketing pages static; user dashboards dynamic; hybrid with PPR.",
  practices: "Tag mutable content. Document what is user-specific. Prefer tags over blasting revalidatePath('/').",
  mistakes: "Treating router.refresh() as a CDN purge. Caching personalized HTML at the Full Route layer.",
  language: "typescript",
  caption: "Caching layers",
  code: "import { revalidateTag } from \"next/cache\";\nexport async function updateTitle(formData: FormData) {\n  \"use server\";\n  await db.product.update({ title: String(formData.get(\"title\")) });\n  revalidateTag(\"product\");\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-cache.svg",
      alt: "four Next.js cache layers",
      caption: "Four caches, four invalidation stories",
    },
  ],
  examples: [
    {
      id: "force",
      title: "Opt into static fetch",
      about: "Next 15 default is uncached fetch.",
      language: "typescript",
      code: "await fetch(url, { cache: \"force-cache\", next: { revalidate: 3600 } });\n",
    }
  ],
}),

nextTopic({
  slug: "next-static-dynamic",
  title: "Static vs dynamic rendering",
  order: 7,
  summary: "Prerender at build vs render per request. What opts a route dynamic.",
  prerequisites: ["next-caching"],
  related: ["next-ppr", "next-generate-static-params"],
  isHighYield: true,
  oneLiner: "A route is static when Next can prerender it without request data. Reading cookies(), headers(), searchParams, or uncached fetch opts it into dynamic rendering. generateStaticParams prebuilds [slug] pages. connection() explicitly waits for a request. Interviews: list the APIs that switch the mode.",
  beats: ["Dynamic APIs: cookies, headers, searchParams, uncached fetch, connection().", "export const dynamic = 'force-static' is an escape hatch with caveats.", "Static HTML can still stream Client Component JS."],
  intro: "Rendering mode is a consequence of data access, not a config religion.",
  why: "Cost, TTFB, and personalization trade off here.",
  concept: "The compiler traces dynamic APIs. One cookies() in a layout dynamizes that subtree.",
  how: "Push cookies() into the smallest component. Keep the shell static.",
  usage: "Blogs static; account pages dynamic; product pages hybrid.",
  practices: "Audit layouts for accidental cookies(). Log 'DYNAMIC' in build output.",
  mistakes: "force-static while still reading cookies (you'll get empty/stale auth).",
  language: "typescript",
  caption: "Static vs dynamic rendering",
  code: "import { cookies } from \"next/headers\";\nexport default async function AccountPage() {\n  const token = (await cookies()).get(\"session\")?.value;\n  const me = await getMe(token);\n  return <Profile user={me} />;\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-static-dynamic.svg",
      alt: "static prerender vs per-request render",
      caption: "What makes a route dynamic",
    },
  ],
  examples: [
    {
      id: "sp",
      title: "searchParams is dynamic",
      about: "Await it in Next 15.",
      language: "typescript",
      code: "export default async function SearchPage({\n  searchParams,\n}: {\n  searchParams: Promise<{ q?: string }>;\n}) {\n  const { q } = await searchParams;\n  return <Results q={q ?? \"\"} />;\n}\n",
    }
  ],
}),

nextTopic({
  slug: "next-generate-static-params",
  title: "generateStaticParams",
  order: 8,
  summary: "Prebuild dynamic segments at build time; the rest on demand.",
  prerequisites: ["next-static-dynamic"],
  related: ["next-data-fetching"],
  isHighYield: false,
  oneLiner: "generateStaticParams returns the list of params to prerender for a [slug] route. Combined with dynamicParams (default true), unknown slugs can still render on demand. Return [] to generate nothing at build and ISR/on-demand later.",
  beats: ["Pairs with dynamic routes.", "dynamicParams: false 404s unknown slugs.", "Keep the function fast; it runs at build."],
  intro: "Static generation for dynamic paths without enumerating in next.config.",
  why: "Docs sites and catalogs need known URLs in the CDN at deploy.",
  concept: "Build-time map of params → HTML/RSC payload.",
  how: "Export generateStaticParams from the page or layout that owns the param.",
  usage: "Blog posts, product SKUs, i18n locales.",
  practices: "Generate top-N popular slugs; let the long tail be on-demand.",
  mistakes: "Awaiting cookies inside generateStaticParams. Huge unbounded DB dumps at build.",
  language: "typescript",
  caption: "generateStaticParams",
  code: "export async function generateStaticParams() {\n  const posts = await db.post.slugs();\n  return posts.map((slug) => ({ slug }));\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-gsp.svg",
      alt: "generateStaticParams producing static pages",
      caption: "Known slugs at build",
    },
  ],
  examples: [
    {
      id: "locale",
      title: "Nested params",
      about: "Multiple dynamic folders.",
      language: "typescript",
      code: "return [{ locale: \"en\", slug: \"intro\" }];\n",
    }
  ],
}),
];
