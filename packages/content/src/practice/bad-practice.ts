import type { FinderPackage } from "./types";

export const badPracticePacks: FinderPackage[] = [
  {
    slug: "react-hooks-state",
    title: "Hooks and state",
    summary: "One snippet at a time. Reveal the bad practice — no hints.",
    kind: "component",
    items: [
      {
        id: "needless-state",
        title: "Needless state",
        kind: "component",
        language: "javascript",
        snippet: `function FullName({ first, last }) {
  const [full, setFull] = useState('');
  useEffect(() => {
    setFull(first + ' ' + last);
  }, [first, last]);
  return <p>{full}</p>;
}
`,
        answers: ["Creating state when the value is derived — compute `first + ' ' + last` in render."],
      },
      {
        id: "ref-rerender",
        title: "Ref as render source",
        kind: "component",
        language: "javascript",
        snippet: `function Counter() {
  const n = useRef(0);
  const bump = () => {
    n.current += 1;
  };
  return <button onClick={bump}>{n.current}</button>;
}
`,
        answers: ["Updating a ref does not re-render; the label will stay at 0. Use `useState` for UI."],
      },
      {
        id: "listener",
        title: "Window listener",
        kind: "component",
        language: "javascript",
        snippet: `function Width() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setW(window.innerWidth));
  }, []);
  return <span>{w}</span>;
}
`,
        answers: [
          "Listener is never removed on unmount.",
          "Inline function means you cannot `removeEventListener` the same reference; store the handler and return a cleanup.",
        ],
      },
      {
        id: "index-key",
        title: "Todo list",
        kind: "component",
        language: "javascript",
        snippet: `function Todos({ items, onToggle }) {
  return items.map((item, index) => (
    <Todo key={index} item={item} onToggle={onToggle} />
  ));
}
`,
        answers: ["Index as `key` on a list that can reorder or insert — identity follows position."],
      },
      {
        id: "missing-deps",
        title: "Search effect",
        kind: "component",
        language: "javascript",
        snippet: `function Search({ query }) {
  const [hits, setHits] = useState([]);
  useEffect(() => {
    fetch('/api?q=' + query).then((r) => r.json()).then(setHits);
  }, []);
  return <ul>{hits.map((h) => <li key={h.id}>{h.title}</li>)}</ul>;
}
`,
        answers: [
          "`query` is used inside the effect but omitted from the dependency array, so later searches never run.",
        ],
      },
      {
        id: "stale-closure",
        title: "Interval counter",
        kind: "component",
        language: "javascript",
        snippet: `function Tick() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN(n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{n}</p>;
}
`,
        answers: [
          "Stale closure: the interval always sees `n === 0`. Use `setN((prev) => prev + 1)` or include `n` and reset the timer.",
        ],
      },
      {
        id: "effect-for-event",
        title: "Submit side effect",
        kind: "component",
        language: "javascript",
        snippet: `function Save({ draft }) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!submitted) return;
    fetch('/save', { method: 'POST', body: draft });
    setSubmitted(false);
  }, [submitted, draft]);
  return <button onClick={() => setSubmitted(true)}>Save</button>;
}
`,
        answers: [
          "User actions belong in the click handler, not an effect that re-fires when `draft` changes. Call `fetch` from `onClick`.",
        ],
      },
      {
        id: "object-deps",
        title: "Options fetch",
        kind: "component",
        language: "javascript",
        snippet: `function Users({ teamId }) {
  const opts = { teamId, limit: 20 };
  useEffect(() => {
    load(opts);
  }, [opts]);
  return null;
}
`,
        answers: [
          "`opts` is a new object every render, so the effect runs every time. Depend on `teamId` (and `limit`) or memoize.",
        ],
      },
      {
        id: "setstate-render",
        title: "Clamp count",
        kind: "component",
        language: "javascript",
        snippet: `function Clamp({ max }) {
  const [n, setN] = useState(0);
  if (n > max) setN(max);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
`,
        answers: [
          "Calling `setState` during render is only safe as a pattern when adjusting from props with a condition that stops looping; here it is easy to loop. Derive `Math.min(n, max)` or update in the click handler.",
        ],
      },
      {
        id: "context-inline",
        title: "Theme provider",
        kind: "component",
        language: "javascript",
        snippet: `function App({ theme, setTheme, children }) {
  return (
    <Theme.Provider value={{ theme, setTheme }}>
      {children}
    </Theme.Provider>
  );
}
`,
        answers: [
          "Inline `{ theme, setTheme }` is a new object every render, so every consumer re-renders. Memoize the value.",
        ],
      },
    ],
  },
  {
    slug: "js-async-copy",
    title: "Async, events, copies",
    summary: "Language-level bad practices, one function at a time.",
    kind: "js-function",
    items: [
      {
        id: "bubble",
        title: "Menu click",
        kind: "js-function",
        language: "javascript",
        snippet: `document.body.addEventListener('click', () => closeMenu());
button.addEventListener('click', () => openMenu());
`,
        answers: [
          "Click on the button bubbles to `body` and closes immediately after open unless you `stopPropagation` or check `event.target`.",
        ],
      },
      {
        id: "micro-macro",
        title: "Yield",
        kind: "js-function",
        language: "javascript",
        snippet: `function work() {
  Promise.resolve().then(work);
}
work();
`,
        answers: [
          "Priority: recursive microtasks starve macrotasks (paint/timers). Yield with `setTimeout`/`queue` a task, not only microtasks.",
        ],
      },
      {
        id: "prev-state",
        title: "Double increment",
        kind: "component",
        language: "javascript",
        snippet: `function bumpTwice() {
  setCount(count + 1);
  setCount(count + 1);
}
`,
        answers: [
          "Both updates read the same render’s `count`. Use `setCount((prev) => prev + 1)` twice (or once +2).",
        ],
      },
      {
        id: "jquery",
        title: "Toggle",
        kind: "js-function",
        language: "javascript",
        snippet: `function toggle(id) {
  $('#' + id).toggleClass('open');
}
`,
        answers: ["Using jQuery to poke the DOM fights React/Vue/your renderer. Toggle class in state or a className."],
      },
      {
        id: "shallow",
        title: "Clone user",
        kind: "js-function",
        language: "javascript",
        snippet: `function updateCity(user, city) {
  const next = { ...user };
  next.address.city = city;
  return next;
}
`,
        answers: [
          "Shallow copy: `address` is still shared. Nested mutation affects the original. Copy `address` too or use a structural share helper.",
        ],
      },
      {
        id: "loose-eq",
        title: "Empty check",
        kind: "js-function",
        language: "javascript",
        snippet: `function isMissing(value) {
  return value == null || value == '';
}
`,
        answers: [
          "`==` is intentional for `null`/`undefined` here, but `value == ''` also treats `0` and `false` as missing. Prefer `value == null || value === ''`.",
        ],
      },
      {
        id: "await-loop",
        title: "Fetch all ids",
        kind: "js-function",
        language: "javascript",
        snippet: `async function loadAll(ids) {
  const rows = [];
  for (const id of ids) {
    rows.push(await fetch('/u/' + id).then((r) => r.json()));
  }
  return rows;
}
`,
        answers: [
          "Sequential awaits serialize independent requests. Use `Promise.all(ids.map(...))` unless order/backpressure is required.",
        ],
      },
      {
        id: "mutate-arg",
        title: "Normalize user",
        kind: "js-function",
        language: "javascript",
        snippet: `function normalize(user) {
  user.name = user.name.trim();
  user.tags.sort();
  return user;
}
`,
        answers: ["Mutating the argument surprises callers sharing that object. Return a new `{ ...user, name, tags }`."],
      },
      {
        id: "floating-promise",
        title: "Fire and forget",
        kind: "js-function",
        language: "javascript",
        snippet: `function onSave(draft) {
  save(draft);
  toast('Saved');
}
`,
        answers: [
          "`save` is likely async; errors are unhandled and the toast lies. `await save(draft)` (or `.then/.catch`) before success UI.",
        ],
      },
      {
        id: "sort-mutate",
        title: "Top scores",
        kind: "js-function",
        language: "javascript",
        snippet: `function topThree(scores) {
  return scores.sort((a, b) => b - a).slice(0, 3);
}
`,
        answers: ["`Array.sort` mutates in place. Copy first: `[...scores].sort(...)` so callers keep original order."],
      },
    ],
  },
  {
    slug: "react-lists-forms",
    title: "Lists, forms, and children",
    summary: "Keys, controlled inputs, and composition mistakes.",
    kind: "component",
    items: [
      {
        id: "no-key",
        title: "User chips",
        kind: "component",
        language: "javascript",
        snippet: `function Chips({ users }) {
  return users.map((user) => <Chip user={user} />);
}
`,
        answers: ["Missing `key`. React cannot reconcile list items; use a stable `user.id`."],
      },
      {
        id: "uncontrolled-flip",
        title: "Name field",
        kind: "component",
        language: "javascript",
        snippet: `function NameField({ initial }) {
  const [value, setValue] = useState();
  return (
    <input value={value ?? initial} onChange={(e) => setValue(e.target.value)} />
  );
}
`,
        answers: [
          "Starts uncontrolled (`value` undefined) then becomes controlled. Initialize `useState(initial)` and do not mix `?? initial` after typing.",
        ],
      },
      {
        id: "default-value-sync",
        title: "Reset input",
        kind: "component",
        language: "javascript",
        snippet: `function Note({ text }) {
  return <textarea defaultValue={text} />;
}
`,
        answers: [
          "`defaultValue` only applies on mount. When `text` changes later the textarea stays stale. Use a controlled `value` or a `key` to remount.",
        ],
      },
      {
        id: "spread-div",
        title: "Card wrapper",
        kind: "component",
        language: "javascript",
        snippet: `function Card(props) {
  return <div {...props} className="card" />;
}
`,
        answers: [
          "`className` after spread overwrites the caller’s class. Merge classes, and avoid spreading unknown props onto DOM nodes.",
        ],
      },
      {
        id: "children-map-clone",
        title: "Tabs",
        kind: "component",
        language: "javascript",
        snippet: `function Tabs({ children, active }) {
  return Children.map(children, (child, i) =>
    cloneElement(child, { isActive: i === active }),
  );
}
`,
        answers: [
          "`cloneElement` to inject props is brittle (wrong child types, nested fragments). Prefer composition: pass data via context or render props.",
        ],
      },
    ],
  },
  {
    slug: "perf-and-effects",
    title: "Perf and effects",
    summary: "Work that looks fine until it ships.",
    kind: "component",
    items: [
      {
        id: "inline-handler-memo",
        title: "Memo child",
        kind: "component",
        language: "javascript",
        snippet: `const Row = memo(function Row({ onSelect, item }) {
  return <button onClick={() => onSelect(item.id)}>{item.name}</button>;
});

function List({ items, onSelect }) {
  return items.map((item) => (
    <Row key={item.id} item={item} onSelect={() => onSelect(item.id)} />
  ));
}
`,
        answers: [
          "`memo` is wasted: a new `onSelect` function every render. Pass a stable handler and the `id`, or don’t wrap in `memo`.",
        ],
      },
      {
        id: "fetch-no-abort",
        title: "Profile load",
        kind: "component",
        language: "javascript",
        snippet: `function Profile({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/u/' + id).then((r) => r.json()).then(setUser);
  }, [id]);
  return <h1>{user?.name}</h1>;
}
`,
        answers: [
          "No abort/ignore flag: a slow previous request can overwrite a newer `id`. AbortController or an `ignore` boolean in cleanup.",
        ],
      },
      {
        id: "expensive-render",
        title: "Sorted table",
        kind: "component",
        language: "javascript",
        snippet: `function Table({ rows, query }) {
  const sorted = rows.sort((a, b) => a.name.localeCompare(b.name));
  const visible = sorted.filter((r) => r.name.includes(query));
  return visible.map((r) => <tr key={r.id}><td>{r.name}</td></tr>);
}
`,
        answers: [
          "`sort` mutates `rows` (often props) every render. Copy, then filter; memoize if the list is large.",
        ],
      },
      {
        id: "layout-read-write",
        title: "Measure box",
        kind: "component",
        language: "javascript",
        snippet: `function Box() {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  if (ref.current) setH(ref.current.offsetHeight);
  return <div ref={ref} style={{ minHeight: h }} />;
}
`,
        answers: [
          "Reading layout and `setState` during render causes extra work and loops. Measure in `useLayoutEffect` (or ResizeObserver).",
        ],
      },
      {
        id: "nested-ternary",
        title: "Status view",
        kind: "component",
        language: "javascript",
        snippet: `function Status({ loading, error, data }) {
  return loading ? <Spinner /> : error ? <Err e={error} /> : data ? <View d={data} /> : null;
}
`,
        answers: [
          "Nested ternaries hide the state machine. Early returns or a small `if` chain make empty/error/success obvious.",
        ],
      },
    ],
  },
];
