const TIMEOUT_MS = 2500;

importScripts("/practice-runtime.js");

self.onmessage = async (event) => {
  const { code, tests } = event.data;
  const logs = [];
  const consoleLike = {
    log: (...args) => logs.push(args.map(String).join(" ")),
  };
  const pq = createPracticeRuntime();
  const prepared = String(code).replace(/\bexport\s+/g, "");
  const prelude = `const { useState, useMemo, useCallback, useRef, usePathname, useSearchParams, useRouter, memo, renderHook, navigate } = pq;`;
  const body = `${prelude}\n${prepared}\nawait (async () => { ${tests.join("\n")} })();`;

  try {
    const runner = new Function("console", "fetch", "pq", `return (async () => { ${body} })();`);
    await Promise.race([
      runner(consoleLike, fetch.bind(globalThis), pq),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timed out")), TIMEOUT_MS);
      }),
    ]);
    self.postMessage({ ok: true, logs });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    self.postMessage({ ok: false, error: message, logs });
  }
};
