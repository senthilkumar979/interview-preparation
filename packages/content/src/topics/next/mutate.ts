import { nextTopic } from "./factory";

export const nextMutateTopics = [
nextTopic({
  slug: "next-server-actions",
  title: "Server Actions",
  order: 12,
  summary: "'use server' functions as POST endpoints with progressive enhancement.",
  prerequisites: ["next-rsc-islands"],
  related: ["next-caching", "next-route-handlers"],
  isHighYield: true,
  oneLiner: "A Server Action is an async function marked 'use server' that Next exposes as a POST endpoint. Forms can call it without client JS. You can also invoke it from Client Components. Always re-check auth inside the action. Pair with revalidateTag. Treat extra hidden fields as attacker-controlled.",
  beats: ["Auth inside the action, not only the page.", "Validate with Zod. Return serializable results.", "Actions are POST; they are not GET-safe."],
  intro: "Mutations without standing up /api/.",
  why: "Less client state for forms; still a public HTTP surface.",
  concept: "The bundler creates an ID. The client posts the FormData or encoded args.",
  how: "Bind IDs with .bind or hidden inputs. Use useActionState for pending + errors.",
  usage: "Create/update/delete, sign-in, like buttons.",
  practices: "CSRF is origin-checked by Next; still authz every row. Idempotency for payments.",
  mistakes: "Trusting the id from the client. Calling actions from GET-like clicks without confirmation.",
  language: "typescript",
  caption: "Server Actions",
  code: "\"use server\";\nimport { z } from \"zod\";\nconst Schema = z.object({ title: z.string().min(1) });\nexport async function createPost(formData: FormData) {\n  const parsed = Schema.parse({ title: formData.get(\"title\") });\n  await db.post.create(parsed);\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-actions.svg",
      alt: "form posting to a server action",
      caption: "Form POST to a server function",
    },
  ],
  examples: [
    {
      id: "state",
      title: "useActionState",
      about: "Pending and field errors.",
      language: "typescript",
      code: "\"use client\";\nimport { useActionState } from \"react\";\nexport function Form({ action }: { action: (s: unknown, f: FormData) => Promise<{ error?: string }> }) {\n  const [state, formAction, pending] = useActionState(action, {});\n  return (\n    <form action={formAction}>\n      <button disabled={pending}>Save</button>\n      {state.error}\n    </form>\n  );\n}\n",
    }
  ],
}),

nextTopic({
  slug: "next-middleware",
  title: "Middleware and proxies",
  order: 13,
  summary: "Edge middleware: rewrites, redirects, auth gates. Runs before the route.",
  prerequisites: ["next-app-router"],
  related: ["next-route-handlers", "sec-auth"],
  isHighYield: true,
  oneLiner: "middleware.ts (or the Next 16 proxy convention) runs on the Edge before a request hits a route. Use it for redirects, A/B rewrites, geolocation, and coarse auth gates. Keep it tiny: it runs on a large matcher. Do not do DB work. Prefer checking a session cookie existence, then enforce real authz in Server Components.",
  beats: ["Matcher scope matters for cost and loops.", "Rewrites change the destination without changing the URL.", "Middleware is not your authorization layer."],
  intro: "A gate on the request, not a place for business logic.",
  why: "Login walls and locale prefixes are classic interview tasks.",
  concept: "Returns NextResponse.next/redirect/rewrite. Can set cookies.",
  how: "Export middleware and a matcher config. Avoid matching static files.",
  usage: "Auth redirect, locale, feature-flag rewrite.",
  practices: "Exclude _next/static. Fail open vs closed deliberately.",
  mistakes: "JWT verify with a heavy library on every image request. Infinite redirect loops.",
  language: "typescript",
  caption: "Middleware and proxies",
  code: "import { NextResponse } from \"next/server\";\nimport type { NextRequest } from \"next/server\";\nexport function middleware(req: NextRequest) {\n  if (!req.cookies.get(\"session\") && req.nextUrl.pathname.startsWith(\"/app\")) {\n    return NextResponse.redirect(new URL(\"/login\", req.url));\n  }\n  return NextResponse.next();\n}\nexport const config = { matcher: [\"/app/:path*\"] };\n",
  figures: [
    {
      src: "/diagrams/next/next-middleware.svg",
      alt: "request passing through middleware then route",
      caption: "Middleware sits in front of the route",
    },
  ],
  examples: [
    {
      id: "rewrite",
      title: "Rewrite",
      about: "Internal destination.",
      language: "typescript",
      code: "return NextResponse.rewrite(new URL(\"/marketing\", req.url));\n",
    }
  ],
}),

nextTopic({
  slug: "next-parallel-routes",
  title: "Parallel and intercepting routes",
  order: 14,
  summary: "@slots for simultaneous pages; (.) intercepts for modals.",
  prerequisites: ["next-app-router"],
  related: ["next-layouts"],
  isHighYield: false,
  oneLiner: "Parallel routes use named slots (@analytics, @team) that a layout receives as props so independent pages can stream and error independently. Intercepting routes (., (..), (..), ...) let you show a modal on the current URL while keeping a full page at the real URL for refresh/share.",
  beats: ["Slots need a default.tsx for hard navigation.", "Intercepting is for UX, not security.", "Hard reload should still render the full page."],
  intro: "Advanced filesystem routing interviewers love to draw.",
  why: "Dashboards and photo modals without losing URL semantics.",
  concept: "Layout({ children, analytics, team }). Missing slot uses default.tsx.",
  how: "app/@modal/(.)photos/[id]/page.tsx intercepts /photos/[id].",
  usage: "Admin split views, intercepted dialogs.",
  practices: "Always implement the non-intercepted page. Provide default.tsx.",
  mistakes: "Forgetting default.tsx (build/runtime hole).",
  language: "typescript",
  caption: "Parallel and intercepting routes",
  code: "export default function Layout({\n  children,\n  modal,\n}: {\n  children: React.ReactNode;\n  modal: React.ReactNode;\n}) {\n  return (\n    <>\n      {children}\n      {modal}\n    </>\n  );\n}\n",
  figures: [
    {
      src: "/diagrams/next/next-parallel.svg",
      alt: "layout with named parallel slots",
      caption: "Named slots in one layout",
    },
  ],
  examples: [
    {
      id: "default",
      title: "default.tsx",
      about: "Required for unmatched slots.",
      language: "typescript",
      code: "export default function Default() {\n  return null;\n}\n",
    }
  ],
}),
];
