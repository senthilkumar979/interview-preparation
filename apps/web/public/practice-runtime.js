function createPracticeRuntime() {
  let hookIndex = 0;
  let cells = [];
  let rerun = null;
  let location = { pathname: "/", search: "" };

  function depsEqual(prev, next) {
    if (prev === next) return true;
    if (!prev || !next || prev.length !== next.length) return false;
    for (let i = 0; i < prev.length; i++) if (!Object.is(prev[i], next[i])) return false;
    return true;
  }

  function shallowEqual(prev, next) {
    if (Object.is(prev, next)) return true;
    if (typeof prev !== "object" || typeof next !== "object" || !prev || !next) return false;
    const keys = Object.keys(prev);
    if (keys.length !== Object.keys(next).length) return false;
    return keys.every((key) => Object.is(prev[key], next[key]));
  }

  function parseHref(href) {
    const url = new URL(String(href), "https://practice.local");
    return { pathname: url.pathname || "/", search: url.search.startsWith("?") ? url.search.slice(1) : url.search };
  }

  function scheduleRender() {
    if (rerun) rerun();
  }

  function useState(initial) {
    const index = hookIndex++;
    if (!Object.hasOwn(cells, index)) cells[index] = typeof initial === "function" ? initial() : initial;
    return [
      cells[index],
      (next) => {
        const prev = cells[index];
        const value = typeof next === "function" ? next(prev) : next;
        if (Object.is(prev, value)) return;
        cells[index] = value;
        scheduleRender();
      },
    ];
  }

  function useMemo(factory, deps) {
    const index = hookIndex++;
    const cell = cells[index];
    if (!cell || !depsEqual(cell.deps, deps)) cells[index] = { deps, value: factory() };
    return cells[index].value;
  }

  function useCallback(fn, deps) {
    return useMemo(() => fn, deps);
  }

  function useRef(initial) {
    const index = hookIndex++;
    if (!Object.hasOwn(cells, index)) cells[index] = { current: initial };
    return cells[index];
  }

  function usePathname() {
    return location.pathname;
  }

  function useSearchParams() {
    return new URLSearchParams(location.search);
  }

  function useRouter() {
    const push = useCallback((href) => {
      location = parseHref(href);
      scheduleRender();
    }, []);
    const replace = useCallback((href) => {
      location = parseHref(href);
      scheduleRender();
    }, []);
    return useMemo(
      () => ({ push, replace, pathname: location.pathname, search: location.search }),
      [push, replace, location.pathname, location.search],
    );
  }

  function navigate(href) {
    location = parseHref(href);
    scheduleRender();
  }

  function memo(Component) {
    let prevProps;
    let hasPrev = false;
    let prevOut;
    function Memoized(props) {
      if (hasPrev && shallowEqual(prevProps, props)) return prevOut;
      hasPrev = true;
      prevProps = props;
      prevOut = Component(props);
      return prevOut;
    }
    return Memoized;
  }

  function renderHook(hook) {
    cells = [];
    let result;
    rerun = () => {
      hookIndex = 0;
      result = hook();
    };
    rerun();
    return {
      get result() {
        return result;
      },
      rerender() {
        rerun();
        return result;
      },
    };
  }

  return {
    useState,
    useMemo,
    useCallback,
    useRef,
    usePathname,
    useSearchParams,
    useRouter,
    memo,
    renderHook,
    navigate,
  };
}