import { reactTopic } from "./factory";

export const react19Topics = [
  reactTopic({
    slug: "react-19",
    title: "React 19 overview",
    order: 44,
    summary: "Actions, `use`, compiler-ready purity, ref-as-prop, document metadata, and tighter RSC.",
    prerequisites: ["react-server-components"],
    related: ["react-use", "react-actions", "react-compiler"],
    isHighYield: true,
    oneLiner:
      "React 19 is the release that productizes concurrent + RSC patterns: the `use` API, form Actions, `useActionState` / `useFormStatus` / `useOptimistic`, ref as a normal prop, built-in document metadata tags, resource preloading, and Context without `.Provider`. Treat it as a set of primitives, not a single feature.",
    beats: [
      "Full stack: Server Actions + RSC. Client: Actions still work with async functions.",
      "Many 18 experimental APIs graduated (`use`, document metadata).",
      "Upgrade notes: some deprecated APIs removed; check `forwardRef` optionality.",
    ],
    intro: "Don’t memorize a changelog — map each API to a job.",
    why: "Interviews in 2026 assume you have seen 19, not only 16 Hooks.",
    concept: "Less boilerplate around pending UI, forms, and the server/client split.",
    how: "Upgrade React + types. Enable Compiler when ready. Adopt Actions on mutations.",
    usage: "New Next App Router apps; incrementally in SPAs.",
    figures: [
      {
        src: "/diagrams/react/react-19-actions.png",
        alt: "Form submit flowing through a Server Action with pending and optimistic UI",
        caption: "Actions, pending, optimistic",
      },
    ],
    practices: "Learn `use` + Actions first; metadata and preloading second.",
    mistakes: "Calling everything ‘React 19’ without naming the API. Mixing old `useFormState` name (renamed to `useActionState`).",
    code: `import { use, useActionState, useOptimistic } from "react";
`,
    examples: [
      {
        id: "map",
        title: "Feature → job",
        about: "Study the following topics one by one.",
        language: "typescript",
        code: `// use → read promise/context in render
// Actions → mutations with pending UI
// useOptimistic → instant lists
// metadata → <title> in the tree
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-use",
    title: "use()",
    order: 45,
    summary: "Read a Promise or Context in render. Can be called conditionally.",
    prerequisites: ["react-suspense", "react-usecontext"],
    related: ["react-19", "react-handling-errors"],
    isHighYield: true,
    oneLiner:
      "`use(promise)` unwraps a cached thenable: if pending, the component suspends; if rejected, the nearest Error Boundary; if fulfilled, you get the value. `use(Context)` reads context and unlike other Hooks *may* be called behind `if`. Do not `use(fetch(...))` with a new promise every render.",
    beats: [
      "Unlike `useEffect` data loading, `use` is render-time and needs a stable promise (RSC, cache, or a parent-created thenable).",
      "Conditional `use(Context)` is the exception to ‘never Hooks in if’ — still don’t put `useState` in `if`.",
      "Works in Server and Client Components (promise unwrapping is the RSC-friendly path).",
    ],
    intro: "The Hook that isn’t quite a Hook.",
    why: "Replaces some `useContext` plus some suspense libraries’ `.read()`.",
    concept: "Throw thenable → Suspense; throw error → boundary; else return value.",
    how: "`const theme = use(ThemeContext); const data = use(dataPromise);`",
    usage: "RSC children, passing a promise from a server parent into a client child.",
    practices: "Create the promise above the client boundary. Pair with Error Boundary.",
    mistakes: "New `fetch` each render. Using `use` for mutations.",
    code: `function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);
  return <ul>{comments.map((c) => <li key={c.id}>{c.body}</li>)}</ul>;
}
`,
    examples: [
      {
        id: "ctx-if",
        title: "Conditional context",
        about: "Legal for `use`, not for `useState`.",
        language: "typescript",
        code: `function Label({ showHint }: { showHint: boolean }) {
  if (showHint) {
    const hint = use(HintContext);
    return <span>{hint}</span>;
  }
  return null;
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-actions",
    title: "Actions",
    order: 46,
    summary: "Async functions used as form `action` or event transitions, with pending UI built in.",
    prerequisites: ["react-19", "react-usetransition"],
    related: ["react-useactionstate", "react-server-actions"],
    isHighYield: true,
    oneLiner:
      "An Action is an async function React schedules in a transition when used as `<form action={fn}>` or `startTransition(() => fn())`. Pending state is automatic (`useFormStatus`, `isPending`). On the client, Actions are just async functions; on the server they can be Server Actions. They are the mutation counterpart to RSC data reads.",
    beats: [
      "Forms can work before JS hydrates if the action is a Server Action URL.",
      "Don’t `e.preventDefault()` just to `fetch` if an Action already submits the FormData.",
      "Errors: unhandled throws go to Error Boundaries; expected errors return from `useActionState`.",
    ],
    intro: "Mutations without a pile of `useState(isSubmitting)`.",
    why: "The 19-era form story.",
    concept: "Transition-wrapped async work + FormData.",
    how: "`<form action={createItem}>` where `createItem` is async.",
    usage: "Create/update/delete, login, settings.",
    practices: "Return serializable results. Revalidate data after success (framework helper).",
    mistakes: "Treating Actions as Redux. Forgetting `name` on inputs so FormData is empty.",
    code: `async function createNote(formData: FormData) {
  "use server";
  await db.notes.insert({ body: String(formData.get("body")) });
}
<form action={createNote}><textarea name="body" /><button>Save</button></form>
`,
    examples: [
      {
        id: "client-action",
        title: "Client Action",
        about: "No `'use server'` — still an Action if passed to `action`.",
        language: "typescript",
        code: `async function saveDraft(formData: FormData) {
  await api.put("/drafts", Object.fromEntries(formData));
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useactionstate",
    title: "useActionState",
    order: 47,
    summary: "Wire an Action to last result + pending flag. Replaces `useFormState`.",
    prerequisites: ["react-actions"],
    related: ["react-useformstatus", "react-handling-errors"],
    isHighYield: true,
    oneLiner:
      "`const [state, formAction, isPending] = useActionState(action, initialState)` wraps an Action so the UI receives the previous return value (errors, field messages) and a pending boolean. The `formAction` goes on `<form action={formAction}>`. Signature: `(prevState, formData) => nextState`.",
    beats: [
      "Renamed from experimental `useFormState`.",
      "Use for *expected* validation errors. Unexpected throws still need a boundary.",
      "`isPending` is the form-level pending; nested components may prefer `useFormStatus`.",
    ],
    intro: "The Hook that makes Actions observable.",
    why: "Show ‘email taken’ without a second client store.",
    concept: "Reducer over form submissions: prev state + FormData → next.",
    how: "Pass `formAction` to the form. Render `state.error`.",
    usage: "Validated forms, multi-step wizards.",
    practices: "Typed state `{ ok: true } | { error: string }`. Disable submit while pending.",
    mistakes: "Mutating `prevState`. Using it for GET search forms that should be links.",
    code: `const [state, action, pending] = useActionState(updateProfile, { error: null });
<form action={action}>
  {state.error && <p role="alert">{state.error}</p>}
  <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>
</form>
`,
    examples: [
      {
        id: "action-sig",
        title: "Action signature",
        about: "Prev state first.",
        language: "typescript",
        code: `async function updateProfile(prev: State, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "");
  if (!name) return { error: "Name required" };
  await api.patch({ name });
  return { error: null };
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useformstatus",
    title: "useFormStatus",
    order: 48,
    summary: "Read pending status of the *parent* form. For design-system submit buttons.",
    prerequisites: ["react-actions"],
    related: ["react-useactionstate"],
    isHighYield: true,
    oneLiner:
      "`useFormStatus()` returns `{ pending, data, method, action }` for the nearest parent `<form>`. It does **not** work in the same component that renders the `<form>` — extract a child (`SubmitButton`) that lives inside the form. Perfect for shared UI kits.",
    beats: [
      "Parent form only. Nested forms: nearest parent.",
      "No arguments. Not a replacement for `useActionState`’s returned state.",
      "Works with native `action` URLs and React Actions.",
    ],
    intro: "Pending UI without prop-drilling from the page.",
    why: "Reusable `Button` that disables while submitting.",
    concept: "Status is stored on the form; children subscribe.",
    how: "Split `SubmitButton` into its own component inside the form.",
    usage: "Design systems, checkout.",
    practices: "Keep the hook in a leaf. Announce pending to SR users.",
    mistakes: "Calling it in the form component itself (always idle). Using it outside any form.",
    code: `function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}
`,
    examples: [
      {
        id: "structure",
        title: "Required structure",
        about: "Child, not self.",
        language: "typescript",
        code: `function SaveForm() {
  return (
    <form action={save}>
      <input name="title" />
      <SubmitButton />
    </form>
  );
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-useoptimistic",
    title: "useOptimistic",
    order: 49,
    summary: "Show a temporary UI state while an Action is in flight, then snap to the server result.",
    prerequisites: ["react-actions", "react-immutability"],
    related: ["react-usetransition"],
    isHighYield: true,
    oneLiner:
      "`const [optimistic, addOptimistic] = useOptimistic(state, updateFn)` lets you render `optimistic` immediately. When the Action finishes, React discards the overlay and shows the confirmed `state`. `updateFn(current, optimisticValue)` must be pure and return the next optimistic snapshot.",
    beats: [
      "Always derive from the real `state` plus pending optimistic updates.",
      "Rollback is automatic on error if `state` never changed — still surface the error.",
      "Great for likes, chat, todos — not for money you cannot undo.",
    ],
    intro: "Perceived performance for mutations.",
    why: "Lists that feel instant without lying forever.",
    concept: "Base state + in-flight optimistic patches.",
    how: "Call `addOptimistic` inside the Action (or before awaiting).",
    usage: "Feeds, comments, checkboxes.",
    practices: "Idempotent updates. Match the server shape so the snap is invisible.",
    mistakes: "Optimistic stock trades. Mutating the array in `updateFn`.",
    code: `const [items, addOptimistic] = useOptimistic(todos, (list, title: string) => [
  ...list,
  { id: "tmp", title, done: false },
]);
`,
    examples: [
      {
        id: "form",
        title: "Inside an Action",
        about: "Add then await.",
        language: "typescript",
        code: `async function addTodo(formData: FormData) {
  const title = String(formData.get("title"));
  addOptimistic(title);
  await api.createTodo(title);
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-server-actions",
    title: "Server Actions",
    order: 50,
    summary: "`'use server'` functions the client can call. Mutations with a network round-trip.",
    prerequisites: ["react-actions", "react-server-components"],
    related: ["react-useactionstate"],
    isHighYield: true,
    oneLiner:
      "A Server Action is an async function marked `'use server'` (file or inline). The bundler exposes a POST endpoint. The client sends serializable arguments (often FormData). Authz must run *inside* the action — the URL is public. Closures can capture server variables; don’t capture secrets in a way that serializes to the client.",
    beats: [
      "Not a replacement for GET data loading — use RSC `await` or a router loader.",
      "Revalidate caches after writes (`revalidatePath` in Next).",
      "Validate inputs on the server even if the client already did.",
    ],
    intro: "RPC that looks like a function call.",
    why: "Interviewers will ask about security and progressive enhancement.",
    concept: "Serialized call over HTTP, not a magic in-process jump from the browser.",
    how: "`'use server'` at top of file or first line of the function. Pass to `action` or import in a client module.",
    usage: "CRUD, auth callbacks, webhooks-adjacent form posts.",
    extras: [
      {
        key: "security",
        title: "Security",
        body: "Anyone can invoke the endpoint. Check session, CSRF (frameworks often help), rate limits, and schema (Zod). Never trust `formData` types. Don’t put privileged IDs only on the client.",
      },
    ],
    practices: "Thin actions: parse, authorize, call a domain function, revalidate. Return `{ ok, error }`.",
    mistakes: "Exporting a server action that deletes by id with no auth. Importing server-only modules into client by accident.",
    code: `"use server";
export async function deletePost(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await db.posts.delete({ id, userId: session.userId });
}
`,
    examples: [
      {
        id: "inline",
        title: "Inline in a Server Component",
        about: "Bound to that tree.",
        language: "typescript",
        code: `async function toggle(formData: FormData) {
  "use server";
  await db.flags.toggle(String(formData.get("id")));
}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-ref-as-prop",
    title: "ref as a prop",
    order: 51,
    summary: "Function components receive `ref` like any other prop. `forwardRef` is optional.",
    prerequisites: ["react-useref"],
    related: ["react-useimperativehandle", "react-19"],
    isHighYield: true,
    oneLiner:
      "In React 19, `ref` is a normal prop on function components: `function Input({ ref }: { ref?: Ref<HTMLInputElement> })`. You no longer need `forwardRef` for that case. `forwardRef` still works for older libraries. Cleanup: a callback ref may return a function that runs when the node detaches.",
    beats: [
      "Types: `Ref<T>` on props. Don’t name another prop `ref` for something else.",
      "Callback ref cleanup replaces the ‘called with null’ only pattern for teardown.",
      "Class components still use `createRef` / callback refs as before.",
    ],
    intro: "The `forwardRef` tax is gone for new code.",
    why: "Design-system APIs get simpler.",
    concept: "`ref` is no longer reserved-only; it’s in `props`.",
    how: "Destructure `ref` and pass to the DOM node or `useImperativeHandle`.",
    usage: "Input wrappers, focusing a child.",
    extras: [
      {
        key: "cleanup",
        title: "Ref callback cleanup",
        body: "`ref={(node) => { observe(node); return () => unobserve(); }}` — React 19 calls the returned function on unmount/detach instead of (or in addition to) the old `null` callback. Prefer explicit cleanup.",
      },
    ],
    practices: "Type `ref` on public components. Keep imperative handles small.",
    mistakes: "Still wrapping every component in `forwardRef` without a compat need. Forgetting cleanup on observers.",
    code: `function TextField({ ref, ...props }: ComponentProps<"input">) {
  return <input ref={ref} {...props} />;
}
`,
    examples: [
      {
        id: "cb",
        title: "Callback ref with cleanup",
        about: "ResizeObserver.",
        language: "typescript",
        code: `<div
  ref={(node) => {
    if (!node) return;
    const ro = new ResizeObserver(onSize);
    ro.observe(node);
    return () => ro.disconnect();
  }}
/>
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-document-metadata",
    title: "Document metadata",
    order: 52,
    summary: "Render `<title>`, `<meta>`, `<link>` in the component tree; React hoists them to `document.head`.",
    prerequisites: ["react-19"],
    related: ["react-preloading"],
    isHighYield: true,
    oneLiner:
      "In React 19 you can drop `<title>`, `<meta name=\"description\">`, and `<link rel=\"canonical\">` in a component (even a client one) and React hoists them into `head`. Last write wins for title. Frameworks like Next still have `generateMetadata` for SSR/SEO — use both with a plan, don’t fight them.",
    beats: [
      "No more `react-helmet` for simple cases.",
      "Streaming: metadata can update as RSC payloads arrive.",
      "Accessibility: title should match the current view.",
    ],
    intro: "Head tags as components.",
    why: "Client-side route changes used to leave the old title.",
    concept: "Hoisting special components to the document head.",
    how: `return (<><title>Cart (3)</title><meta name="robots" content="noindex" /></>);`,
    usage: "SPA titles, noindex on app shells, OG tags in RSC pages.",
    practices: "One source of truth per route. Prefer framework metadata APIs for crawlers when they exist.",
    mistakes: "Duplicate conflicting titles from nested layouts without a convention.",
    code: `function CartPage({ count }: { count: number }) {
  return (
    <>
      <title>{count ? `Cart (${count})` : "Cart"}</title>
      <h1>Your cart</h1>
    </>
  );
}
`,
    examples: [
      {
        id: "meta",
        title: "Meta description",
        about: "Hoisted to head.",
        language: "typescript",
        code: `<meta name="description" content="Interview prep, one topic at a time." />
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-preloading",
    title: "Resource preloading",
    order: 53,
    summary: "`preload`, `prefetchDNS`, `preinit` — tell the browser what to fetch next.",
    prerequisites: ["react-19"],
    related: ["react-document-metadata"],
    oneLiner:
      "React 19 exports `preload`, `preloadModule`, `prefetchDNS`, `preconnect`, `preinit`, `preinitModule` to emit resource hints from render or event handlers. Use them when you *know* the next view needs a stylesheet, font, or script. They are hints — not a data-fetching library.",
    beats: [
      "`preinit` for styles/scripts you will use immediately (insert + load).",
      "`preload` for something you will need soon (next navigation, hover).",
      "Frameworks often wrap this; don’t double-hint the same URL.",
    ],
    intro: "Performance APIs next to your JSX.",
    why: "LCP fonts and CSS waterfalls.",
    concept: "Declarative resource hints from the React tree.",
    how: "`preload('/hero.webp', { as: 'image' })` in an event or render.",
    usage: "Hover to prefetch a route’s CSS. Fonts. Third-party scripts.",
    practices: "Prefetch on intent (hover/focus), not everything on load. Match `as` to the resource.",
    mistakes: "Preloading megabytes of JS on first paint. Wrong `as` / `type`.",
    code: `import { preload } from "react-dom";
function NavLink({ href }: { href: string }) {
  return (
    <a href={href} onMouseEnter={() => preload("/page.css", { as: "style" })}>
      Next
    </a>
  );
}
`,
    examples: [
      {
        id: "dns",
        title: "DNS prefetch",
        about: "Third-party origin.",
        language: "typescript",
        code: `import { prefetchDNS } from "react-dom";
prefetchDNS("https://cdn.example.com");
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-context-provider",
    title: "Context as provider",
    order: 54,
    summary: "React 19: `<ThemeContext value={theme}>` works; `.Provider` is optional.",
    prerequisites: ["react-usecontext", "react-19"],
    related: ["react-use"],
    oneLiner:
      "You can render the context object as a component: `<AuthContext value={user}>{children}</AuthContext>` instead of `<AuthContext.Provider value={user}>`. Same semantics. `use(Context)` or `useContext(Context)` still consume. Default value applies when no provider is above.",
    beats: [
      "Less noise in JSX. Types stay `Context<T>`.",
      "`.Provider` remains supported for older code and docs.",
      "Still memoize `value` when it is an object.",
    ],
    intro: "A small DX change that shows up in new snippets.",
    why: "You’ll see both styles in the wild.",
    concept: "The context object is a valid component type in 19.",
    how: "Replace `.Provider` when you are on 19+.",
    usage: "Theme, auth, i18n providers.",
    practices: "Split state and dispatch contexts as before.",
    mistakes: "Assuming this changes performance. Forgetting `value` (not `children` as the context value).",
    code: `const ThemeContext = createContext<"light" | "dark">("light");
<ThemeContext value={theme}>{children}</ThemeContext>
`,
    examples: [
      {
        id: "read",
        title: "Read it",
        about: "Either API.",
        language: "typescript",
        code: `const theme = useContext(ThemeContext);
// or: const theme = use(ThemeContext);
`,
      },
    ],
  }),
];
