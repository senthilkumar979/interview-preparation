import { reactTopic } from "./factory";

export const reactVdomTopics = [
  reactTopic({
    slug: "react-virtual-dom",
    title: "Virtual DOM",
    order: 4,
    summary: "A JS tree of React elements that describes UI. Cheap to create; the host DOM is the expensive part.",
    prerequisites: ["react-components"],
    related: ["react-reconciliation"],
    isHighYield: true,
    oneLiner:
      "The Virtual DOM is an in-memory tree of React elements (`type`, `props`, `key`). Render produces a new tree. React compares it to the previous tree and applies the smallest host updates (DOM, native). It is not faster than ‘touching the DOM’ in the abstract — it is a model that batches and diffs so you write declarative UI.",
    beats: [
      "`<div />` is an object, not a DOM node, until commit.",
      "Re-render ≠ re-paint the whole page. Diff + commit of host instances.",
      "Server Components skip shipping a client VDOM for that subtree; they still serialize a tree.",
    ],
    intro: "The interview diagram: Component → elements → diff → DOM.",
    why: "Explains why `key` and purity matter, and why `innerHTML` fights React.",
    concept: "Host tree (DOM) vs React tree. Render phase (pure, interruptible in concurrent mode) vs commit phase (DOM mutations).",
    how: "You return JSX. React stores the last tree, diffs, updates `textContent`/attributes/inserts.",
    usage: "Every client component.",
    figures: [
      {
        src: "/diagrams/react/react-vdom.png",
        alt: "Component tree to virtual DOM to real DOM",
        caption: "Describe UI; React updates the host",
      },
    ],
    practices: "Treat the DOM as owned by React in that subtree. Use refs for escape hatches.",
    mistakes: "‘VDOM is always faster than vanilla.’ Direct DOM writes that React then overwrites.",
    code: `const el = { type: "button", props: { className: "btn", children: "Save" } };
// JSX compiles toward this shape — not document.createElement yet
`,
    examples: [
      {
        id: "element",
        title: "An element is data",
        about: "Inspect type/props.",
        language: "typescript",
        code: `const node = <button type="submit">Save</button>;
console.log(node.type); // "button"
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-reconciliation",
    title: "Reconciliation",
    order: 5,
    summary: "How React diffs trees: same type + key → update; different type → tear down; lists need keys.",
    prerequisites: ["react-virtual-dom"],
    related: ["react-keys", "react-fiber"],
    isHighYield: true,
    oneLiner:
      "Reconciliation (diffing) walks old and new element trees. If `type` matches (and `key` for lists), React updates the existing instance. If `type` changes (`div` → `span`, or `UserCard` → `AdminCard`), React unmounts the old subtree and mounts a new one (state is lost). Lists are matched by `key`, not index, when order changes.",
    beats: [
      "Heuristic: O(n) by level, not a general tree-edit distance.",
      "State lives on the fiber for that component position + type + key.",
      "Index as `key` is OK for static lists, broken for inserts/reorder.",
    ],
    intro: "This is why toggling a component type resets a form.",
    why: "Bugs that look like ‘state is stuck’ are usually keys/types.",
    concept: "Same position, same type, same key → reuse. Otherwise reset.",
    how: "Keep stable keys from ids. Don’t use random keys every render.",
    usage: "Tabs, lists, conditional `A ? <Edit /> : <View />` (state resets — sometimes what you want).",
    figures: [
      {
        src: "/diagrams/react/react-reconciliation.png",
        alt: "Old vs new VDOM trees with changed nodes and keyed list reorder",
        caption: "Diff by type and key",
      },
    ],
    practices: "Ids as keys. Lift state if you must keep it across type changes.",
    mistakes: "`key={index}` on a sortable list. `key={Math.random()}`.",
    code: `{todos.map((t) => (
  <TodoItem key={t.id} todo={t} />
))}
`,
    examples: [
      {
        id: "reset",
        title: "Type change resets state",
        about: "Different component type = new fiber.",
        language: "typescript",
        code: `{mode === "edit" ? <Editor key={doc.id} /> : <Preview />}
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-fiber",
    title: "Fiber",
    order: 6,
    summary: "The unit of work: a fiber per component instance. Enables concurrent rendering.",
    prerequisites: ["react-reconciliation"],
    related: ["react-concurrency"],
    isHighYield: true,
    oneLiner:
      "Fiber is React’s internal linked tree: each component instance is a fiber (type, pending props, hooks list, children). Render can pause between fibers (time slicing). Commit still applies DOM updates in one go. You don’t create fibers yourself.",
    beats: [
      "Hooks are stored on the fiber in call order — that’s the Rules of Hooks.",
      "Double render in Strict Mode is a fiber/dev check, not a production commit twice for DOM in the same way.",
      "Priorities (lanes) let transitions yield to urgent updates.",
    ],
    intro: "Stack reconciler (React 15) vs Fiber (16+). Interviews: ‘what is Fiber?’",
    why: "Concurrency, Suspense, and Hook order all sit on this data structure.",
    concept: "Work-in-progress fiber vs current fiber. Swap on commit.",
    how: "React builds a wip tree, may discard it if a higher-priority update comes.",
    usage: "Mental model for jank, transitions, and ‘why did my effect run twice in dev.’",
    practices: "Keep render cheap so yielding helps. Don’t fight Fiber with layout reads in render.",
    mistakes: "Treating Fiber as a public API. Depending on render count.",
    code: `// Mental model, not public API
// Fiber { type: Button, hooks: [state, effect], child, sibling, return }
`,
    examples: [
      {
        id: "hooks-list",
        title: "Hooks on the fiber",
        about: "Call order must be stable.",
        language: "typescript",
        code: `// first render: useState, useEffect
// next render: same two calls in the same order
`,
      },
    ],
  }),

  reactTopic({
    slug: "react-keys",
    title: "Keys",
    order: 7,
    summary: "Keys identify a child among siblings so reconciliation can match items.",
    prerequisites: ["react-reconciliation"],
    related: ["react-lists"],
    isHighYield: true,
    oneLiner:
      "`key` is a string (or number) unique among siblings. It is not a prop you use inside the child. React uses it to match list items across renders. Stable ids beat indexes when the list mutates.",
    beats: [
      "Keys only matter among siblings, not globally.",
      "Changing a key remounts that child (useful to reset a form: `key={userId}`).",
      "Fragments can have keys: `<Fragment key={id}>`.",
    ],
    intro: "The most practical reconciliation lever.",
    why: "Wrong keys = wrong input values in a list of fields.",
    concept: "Identity for the reconciler.",
    how: "`key={item.id}`. Reset: `<Player key={trackId} />`.",
    usage: "Tables, tabs, animated lists.",
    practices: "Server ids. Don’t derive keys from index+title unless static.",
    mistakes: "Using the array index for reorderable rows. Duplicate keys (React warning).",
    code: `{users.map((u) => (
  <UserRow key={u.id} user={u} />
))}
`,
    examples: [
      {
        id: "reset-form",
        title: "Reset state with a key",
        about: "Switching records.",
        language: "typescript",
        code: `<EditUserForm key={selectedId} userId={selectedId} />
`,
      },
    ],
  }),
];
