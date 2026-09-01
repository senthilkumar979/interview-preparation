import { nextTopic } from "./factory";

export const nextRoutingTopics = [
nextTopic({
  slug: "next-app-router",
  title: "App Router",
  order: 1,
  summary: "Next 15/16 App Router: the app/ tree, layouts, nested routes, and URL segments.",
  prerequisites: [],
  related: ["next-layouts", "next-file-conventions", "next-parallel-routes"],
  isHighYield: true,
  oneLiner: "The App Router maps folders under app/ to URL segments. Each folder can export page.tsx (the leaf UI), layout.tsx (shared chrome that preserves state across navigations), and special files. Nested folders nest both the URL and the React tree. This is routing as filesystem, not a client router config.",
  beats: ["app/ is the App Router; pages/ is the legacy Pages Router—do not mix patterns casually.", "Layouts wrap children and do not remount on sibling navigations; pages do.", "Dynamic segments use [slug], catch-alls [...slug], optional [[...slug]]."],
  intro: "Interviews expect App Router, not Pages Router trivia. Speak filesystem conventions, then rendering.",
  why: "Production React at companies shipping Next 15/16 is App Router: RSC by default, nested layouts, streaming.",
  concept: "A route is a folder. page.tsx is the UI for that URL. layout.tsx wraps that segment and all descendants. The root layout must include html and body. Parallel routes (@slot) and intercepting routes live in the same tree.",
  how: "Create app/dashboard/settings/page.tsx → /dashboard/settings. Add app/dashboard/layout.tsx to share a sidebar. Use generateStaticParams for known [slug] values.",
  usage: "Dashboards with persistent nav, marketing sites with nested docs, apps that stream above-the-fold chrome while data loads.",
  practices: "Keep layouts thin. Put data fetching in the smallest Server Component that needs it. Prefer colocation over dumping everything in root layout.",
  mistakes: "Fetching all user data in the root layout (it re-runs for every page under it). Expecting layout state to reset on navigation. Confusing App Router with React Router.",
  language: "typescript",
  caption: "App Router",
  code: "export default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <section className=\"grid grid-cols-[16rem_1fr]\">\n      <Sidebar />\n      {children}\n    </section>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-app-router.svg",
      alt: "app folder tree mapping to nested layouts and pages",
      caption: "Filesystem routes wrap nested layouts",
    },
  ],
  examples: [
    {
      id: "dyn",
      title: "Dynamic segment",
      about: "Folder [id] becomes params.id.",
      language: "typescript",
      code: "export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params;\n  return <h1>Product {id}</h1>;\n}\n",
    }
  ],
}),

nextTopic({
  slug: "next-layouts",
  title: "Layouts vs templates",
  order: 2,
  summary: "layout.tsx preserves state; template.tsx remounts on navigation.",
  prerequisites: ["next-app-router"],
  related: ["next-file-conventions"],
  isHighYield: true,
  oneLiner: "layout.tsx is a persistent React subtree: navigating between sibling pages does not remount the layout, so sidebar state, context, and fetched layout data survive. template.tsx wraps children but remounts on every navigation—use it for enter animations or resetting state you must not leak.",
  beats: ["Layouts keep state; templates reset.", "Root layout is required and owns <html>.", "Do not put a second <html> in nested layouts."],
  intro: "The interview trap is assuming every navigation is a full remount.",
  why: "Persistent chrome is why App Router feels like an SPA without a client router.",
  concept: "React tree: RootLayout → SegmentLayout → Page. Soft navigation swaps the page slot only.",
  how: "Default to layout. Reach for template when a CSS animation or form must remount.",
  usage: "Auth shell in layout; wizard step animation in template.",
  practices: "Don't store ephemeral page state in layout. Lift only what multiple pages share.",
  mistakes: "Auth checks only in layout without covering route handlers. Nested html/body tags.",
  language: "typescript",
  caption: "Layouts vs templates",
  code: "export default function Template({ children }: { children: React.ReactNode }) {\n  return <div className=\"animate-in fade-in\">{children}</div>;\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-layouts.svg",
      alt: "layout persists while page slot swaps",
      caption: "Layout persistence vs template remount",
    },
  ],
  examples: [
    {
      id: "root",
      title: "Root layout",
      about: "html and body live once.",
      language: "typescript",
      code: "export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n",
    }
  ],
}),

nextTopic({
  slug: "next-file-conventions",
  title: "loading, error, not-found",
  order: 3,
  summary: "Special files wrap a segment: streaming fallbacks, error UI, and 404s.",
  prerequisites: ["next-app-router"],
  related: ["next-streaming", "eh-next-error"],
  isHighYield: true,
  oneLiner: "loading.tsx wraps the segment in <Suspense> automatically. error.tsx is a Client Component error boundary for that segment. not-found.tsx renders when you call notFound(). These files compose with nested layouts so a failing panel does not crash the chrome.",
  beats: ["loading.tsx = Suspense fallback for the segment.", "error.tsx must be a Client Component.", "notFound() vs redirect() are different outcomes."],
  intro: "Framework conventions encode React primitives you would wire by hand.",
  why: "Interviewers want recovery, not a white screen.",
  concept: "Each segment can have its own loading/error/not-found. Nested files isolate failure.",
  how: "Add app/dashboard/loading.tsx. Throw notFound() when a slug is missing. Reset from error.tsx via reset().",
  usage: "Product pages, settings panels, search results.",
  practices: "Skeletons that match layout. Log in error.tsx, then show a retry.",
  mistakes: "error.tsx as a Server Component. Catching everything in the root error only.",
  language: "typescript",
  caption: "loading, error, not-found",
  code: "\"use client\";\nexport default function Error({ error, reset }: { error: Error; reset: () => void }) {\n  return (\n    <div>\n      <p>{error.message}</p>\n      <button type=\"button\" onClick={() => reset()}>Retry</button>\n    </div>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-conventions.svg",
      alt: "loading error not-found wrapping a page",
      caption: "Segment special files",
    },
  ],
  examples: [
    {
      id: "nf",
      title: "notFound",
      about: "Trigger the nearest not-found.tsx.",
      language: "typescript",
      code: "import { notFound } from \"next/navigation\";\nconst item = await db.item.find(id);\nif (!item) notFound();\n",
    }
  ],
}),

nextTopic({
  slug: "next-rsc-islands",
  title: "Server Components and client islands",
  order: 4,
  summary: "Default Server Components; 'use client' carves interactive islands. Payload, not React theory.",
  prerequisites: ["next-app-router"],
  related: ["next-data-fetching", "next-server-actions"],
  isHighYield: true,
  oneLiner: "In the App Router, files are Server Components unless they start with 'use client'. Server Components can be async, read secrets, and talk to the DB. They cannot use hooks or browser APIs. Client Components hydrate. Pass serializable props from server to client; never import a server module into a client file.",
  beats: ["Default is server. 'use client' is a boundary for the module graph.", "Keep client leaves small; fetch on the server.", "Functions and Dates need care across the wire."],
  intro: "This is Next's composition model, not a recap of React 19 RSC theory.",
  why: "Bundle size and data access live or die on where the boundary sits.",
  concept: "The bundler splits at 'use client'. Children of a client component cannot be Server Components unless passed as props (slots).",
  how: "Fetch in page.tsx. Pass data into <LikeButton initial={count} />. Pass children so a client shell can wrap server-rendered HTML.",
  usage: "Forms, charts, and editors as islands; lists and markdown as server.",
  practices: "Push 'use client' to leaves. Prefer children slots over converting a whole layout.",
  mistakes: "Marking the root layout 'use client'. Fetching in useEffect because the page is a Client Component.",
  language: "typescript",
  caption: "Server Components and client islands",
  code: "// page.tsx (Server Component)\nimport { LikeButton } from \"./like-button\";\nexport default async function Page() {\n  const post = await db.post.get();\n  return (\n    <article>\n      <p>{post.body}</p>\n      <LikeButton postId={post.id} initial={post.likes} />\n    </article>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-rsc-islands.svg",
      alt: "server tree with client islands",
      caption: "Server tree, client leaves",
    },
  ],
  examples: [
    {
      id: "slot",
      title: "Server children into a client shell",
      about: "Pass children so the inner tree stays on the server.",
      language: "typescript",
      code: "\"use client\";\nexport function Modal({ children }: { children: React.ReactNode }) {\n  return <dialog open>{children}</dialog>;\n}\n",
    }
  ],
}),
];
