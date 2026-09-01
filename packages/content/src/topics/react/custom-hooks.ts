import { reactTopic } from "./factory";

export const reactCustomHookTopic = reactTopic({
  slug: "react-custom-hooks",
  title: "Custom Hooks",
  order: 29,
  summary: "Extract stateful logic into a function named `useX`. Same Rules of Hooks, reusable across components.",
  prerequisites: ["react-hooks-rules", "react-useeffect", "react-usestate"],
  related: ["react-usedebugvalue", "react-usereducer"],
  isHighYield: true,
  oneLiner:
    "A custom Hook is a function whose name starts with `use` that may call other Hooks. It shares *logic*, not UI. Return what the component needs (values + setters), keep side effects inside the Hook, and treat it as part of the same hook list as the caller.",
  beats: [
    "Name must start with `use` so eslint and React can see Hook calls.",
    "Each component that calls `useCart()` gets its own state — Hooks are not a singleton.",
    "Pass arguments instead of reading globals. Return a tuple or a named object; be consistent.",
  ],
  intro: "The composition model after mixins and HOCs.",
  why: "Interviews: extract `useFetch`, `useMediaQuery`, `useDebouncedValue`.",
  concept: "Not a special React API — a convention plus the Rules of Hooks.",
  how: "`function useOnline() { ... return online; }` then `const online = useOnline();`",
  usage: "Data, subscriptions, form fields, feature flags.",
  extras: [
    {
      key: "vs-hocs",
      title: "Vs HOCs and render props",
      body: "HOCs (`withAuth(Page)`) wrap the tree and confuse types/refs. Render props nest. Custom Hooks keep the component the owner of JSX and compose like functions. Prefer Hooks unless you must inject a component wrapper (error boundaries are still classes).",
    },
  ],
  practices: "One Hook, one job. Test the Hook with `renderHook`. Don’t hide a dozen unrelated `useState`s.",
  mistakes: "Shared module-level `let` instead of state. Conditional `useX()`. Returning JSX from a Hook that should be a component.",
  code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle] as const;
}
`,
  examples: [
    {
      id: "fetch",
      title: "useFetch with abort",
      about: "Logic lives in the Hook; UI stays in the component.",
      language: "typescript",
      code: `function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    loadUser(id, { signal: ac.signal }).then(setUser);
    return () => ac.abort();
  }, [id]);
  return user;
}
`,
    },
  ],
});
