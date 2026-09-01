export function runJsTests(code: string, tests: string[]): Promise<{ ok: boolean; error?: string; logs: string[] }> {
  return new Promise((resolve) => {
    const worker = new Worker("/practice-worker.js");
    const timer = window.setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, error: "Timed out", logs: [] });
    }, 4000);

    worker.onmessage = (event: MessageEvent<{ ok: boolean; error?: string; logs?: string[] }>) => {
      window.clearTimeout(timer);
      worker.terminate();
      resolve({
        ok: event.data.ok,
        error: event.data.error,
        logs: event.data.logs ?? [],
      });
    };
    worker.onerror = () => {
      window.clearTimeout(timer);
      worker.terminate();
      resolve({ ok: false, error: "Worker failed", logs: [] });
    };
    worker.postMessage({ code, tests });
  });
}

export function selectedMatches(options: { id: string; isCorrect: boolean }[], selected: Set<string>): boolean {
  const correct = new Set(options.filter((option) => option.isCorrect).map((option) => option.id));
  if (correct.size !== selected.size) return false;
  for (const id of correct) if (!selected.has(id)) return false;
  return true;
}
