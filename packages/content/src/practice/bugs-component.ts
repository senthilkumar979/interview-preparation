import type { FinderPackage } from "./types";

const gistComponent = `import React, { useState, useEffect } from 'react';

function BuggyComponent = (props) => {
  const cards = [{ name: "Credit Card", number: '1234567890123456' }];
  const [name, setName] = useState();
  const [age, setAge] = useState('25');
  const [users, setUsers] = useState([
    { id: 1, name: 'John', avatar: 'https://avatars.com/john' },
    { id: 2, name: 'Jane', avatar: 'https://avatars.com/jane' }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch('https://api.example.com/users')
      .then((r) => r.json())
      .catch((e) => console.error('Error:', e));
    setUsers(response);
    setLoading(false);
  };

  const handleInputNameChange = (e) => {
    name = e.target.value;
  };

  const handleInputChange = (e) => {
    age = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    e.stopPropagation();
    props.loggedInUser.personalDetails.name = 'New Name';
    cards.push({ name: 'Debit Card', number: '9876543210987654' });
    setAge('25');
    window.location = '/success-page';
  };

  const handleUserClick = (id) => {
    cards = { ...cards, ...props.users[id].newCards };
  };

  const handleAsyncOperation = async () => {
    try {
      const response = await fetch('https://api.example.com/data').then(data => setUsers(data));
      console.log(response.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const displayUsers = () => {
    return users.map((user, index) => (
      <div>{user.username}</div>
    ));
  };

  return (
    <div>
      <form>
        <input onChange={handleInputNameChange} />
        <input onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      {loading ? Loading... : {displayUsers}}
      <button onClick={handleAsyncOperation}>Fetch Extra Data</button>
    </div>
  );
};

export default BuggyComponent;
`;

export const bugComponentPack: FinderPackage = {
  slug: "react-components",
  title: "React components",
  summary: "One component at a time. Reveal bugs yourself — no hints on the prompt.",
  kind: "component",
  items: [
    {
      id: "gist-profile",
      title: "User profile editor",
      kind: "component",
      language: "javascript",
      snippet: gistComponent,
      answers: [
        "`function BuggyComponent = (props)` is invalid syntax (function declaration vs arrow assignment).",
        "`useState()` for `name` has no initial value; `age` is a string `'25'`, not a number.",
        "`useEffect(() => { fetchUsers(); })` has no dependency array, so it runs after every render and can loop.",
        "`fetch` JSON path does not check `ok`; `.catch` returns `undefined`, then `setUsers(undefined)`.",
        "`name =` / `age =` mutate bindings instead of `setName` / `setAge` (and will throw on `const` state).",
        "`e.preventDefault` is not invoked (`preventDefault` vs `preventDefault()`).",
        "Mutates `props.loggedInUser` in place; pushes onto `cards` then later reassigns `const cards`.",
        "`window.location =` should be `window.location.href`; full navigation is a side effect in submit.",
        "`handleAsyncOperation` passes the `Response` into `setUsers`, not JSON; `await` of `then(setUsers)` is `undefined`.",
        "`displayUsers` is not called (`{displayUsers}`); list uses `user.username` and index-less/`index` keys; `{Loading...}` is invalid JSX.",
      ],
    },
    {
      id: "effect-setstate",
      title: "Derived render",
      kind: "component",
      language: "javascript",
      snippet: `function Price({ cents }) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    setLabel((cents / 100).toFixed(2));
  }, [cents]);
  return <span>{label}</span>;
}
`,
      answers: [
        "You do not need state for a value derived from `cents` — compute `label` during render.",
        "The extra effect causes a second paint and can flicker an empty string.",
      ],
    },
    {
      id: "stale-search",
      title: "Live search",
      kind: "component",
      language: "javascript",
      snippet: `function Search({ onResults }) {
  const [q, setQ] = useState('');

  useEffect(() => {
    let ignore = false;
    fetch('/search?q=' + q)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) onResults(data);
      });
  }, [q]);

  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}
`,
      answers: [
        "`ignore` is set but never flipped to `true` on cleanup — out-of-order responses still call `onResults`.",
        "`onResults` is used in the effect but omitted from the dependency array (stale callback).",
        "Query is not encoded; empty `q` still fires a request on mount.",
      ],
    },
    {
      id: "list-index-key",
      title: "Todo list",
      kind: "component",
      language: "javascript",
      snippet: `function Todos({ items, onToggle }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggle(i)}
          />
          {item.title}
        </li>
      ))}
    </ul>
  );
}
`,
      answers: [
        "Index as `key` breaks identity when items are inserted/reordered; use `item.id`.",
        "`onToggle(i)` passes the index, not the id — same reorder bug.",
        "No `htmlFor`/label; checkbox + text is not a proper accessible control.",
      ],
    },
    {
      id: "hook-condition",
      title: "Maybe fetch",
      kind: "component",
      language: "javascript",
      snippet: `function Panel({ enabled, id }) {
  if (!enabled) return null;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/' + id)
      .then((r) => r.json())
      .then(setData);
  }, []);

  return <pre>{JSON.stringify(data)}</pre>;
}
`,
      answers: [
        "Hooks after a conditional return violate the rules of hooks when `enabled` flips.",
        "Effect deps are `[]` so `id` changes never refetch; no abort/`ok` check.",
      ],
    },
    {
      id: "form-uncontrolled",
      title: "Signup form",
      kind: "component",
      language: "javascript",
      snippet: `function Signup() {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!email.includes('@')) setError('Invalid');
    fetch('/signup', { method: 'POST', body: JSON.stringify({ email }) });
  }

  return (
    <form onSubmit={submit}>
      <input defaultValue={email} onChange={(e) => (email = e.target.value)} />
      {error && <p>{error}</p>}
      <button>Create</button>
    </form>
  );
}
`,
      answers: [
        "`useState()` leaves `email` `undefined`; `email.includes` throws.",
        "`email = e.target.value` mutates the binding; mixed `defaultValue` + assignment is neither controlled nor a proper uncontrolled ref.",
        "Submit does not `await`/check the response; `error` is never cleared on a valid retry.",
      ],
    },
    {
      id: "context-value",
      title: "Theme provider",
      kind: "component",
      language: "javascript",
      snippet: `const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return React.useContext(ThemeContext);
}
`,
      answers: [
        "`value={{ theme, setTheme }}` is a new object every render, so all consumers re-render.",
        "`createContext()` has no default; `useTheme` does not throw if used outside the provider (`undefined.theme`).",
      ],
    },
    {
      id: "ref-callback",
      title: "Auto focus",
      kind: "component",
      language: "javascript",
      snippet: `function Dialog({ open }) {
  const inputRef = useRef();

  if (open) inputRef.current.focus();

  return open ? <input ref={inputRef} /> : null;
}
`,
      answers: [
        "Focus runs during render (side effect) and `inputRef.current` is still `null` on the first open paint.",
        "When `open` is false the input unmounts; should focus in `useEffect`/`useLayoutEffect` depending on `open`.",
      ],
    },
  ],
};
