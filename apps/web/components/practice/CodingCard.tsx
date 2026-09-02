"use client";

import { useState } from "react";
import type { CodingChallenge } from "@prepquest/content";
import { PracticeEditor } from "@/components/practice/PracticeEditorLazy";
import { Button } from "@/components/ui/button";
import { runJsTests } from "@/lib/runPractice";

interface CodingCardProps {
  exercise: Pick<CodingChallenge, "id" | "title" | "prompt" | "language" | "starter" | "tests">;
  minutes: number;
  alreadyCorrect?: boolean;
  onSolved: (id: string) => void;
}

type RunStatus = "idle" | "busy" | "pass" | "fail";

export const CodingCard = ({ exercise, minutes, alreadyCorrect, onSolved }: CodingCardProps) => {
  const [code, setCode] = useState(exercise.starter);
  const [status, setStatus] = useState<RunStatus>(alreadyCorrect ? "pass" : "idle");
  const [message, setMessage] = useState(alreadyCorrect ? "Already passed on this account." : "");
  const ext = exercise.language === "typescript" ? "ts" : "js";

  const run = async () => {
    setStatus("busy");
    const result = await runJsTests(code, exercise.tests);
    if (result.ok) {
      setStatus("pass");
      setMessage("All hidden tests passed.");
      onSolved(exercise.id);
      return;
    }
    setStatus("fail");
    setMessage(result.error ?? "A hidden test failed.");
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Workspace
          </p>
          <h2 className="mt-1 text-lg font-semibold">{exercise.title}</h2>
        </div>
        <StatusBadge status={status} />
      </header>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <div className="border-b border-border bg-[#111827] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#f87171]" />
              <span className="size-2.5 rounded-full bg-[#fbbf24]" />
              <span className="size-2.5 rounded-full bg-[#34d399]" />
            </div>
            <p className="text-xs font-bold text-white/70">
              {exercise.id}.{ext}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-white/40">{exercise.language}</p>
          </div>
          <PracticeEditor value={code} language={exercise.language} onChange={setCode} height="360px" />
        </div>
        <aside className="grid content-start gap-4 p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Spec
            </p>
            <p className="mt-2 text-sm leading-6">{exercise.prompt}</p>
          </div>
          <ul className="grid gap-2 text-sm">
            <Meta label="Timebox" value={`${minutes} min`} />
            <Meta label="Hidden tests" value={`${exercise.tests.length} cases`} />
            <Meta label="Contract" value="Export the named function. Prefer a new array." />
          </ul>
          <div className="grid gap-3">
            <Button disabled={status === "busy"} onClick={() => void run()}>
              {status === "busy" ? "Running…" : "Run tests"}
            </Button>
            {message ? (
              <p
                className={`rounded-xl border px-3 py-2.5 text-sm leading-6 ${
                  status === "pass"
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : status === "fail"
                      ? "border-destructive/30 bg-destructive/10 text-foreground"
                      : "border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                {message}
              </p>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Tests stay hidden. Failures show a short error, not the expected source.
              </p>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
};

const Meta = ({ label, value }: { label: string; value: string }) => (
  <li className="flex justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2">
    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
    <span className="text-right text-sm font-medium">{value}</span>
  </li>
);

const StatusBadge = ({ status }: { status: RunStatus }) => {
  const label = status === "busy" ? "Running" : status === "pass" ? "Passed" : status === "fail" ? "Failed" : "Not run";
  return (
    <p className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-bold uppercase tracking-wide">
      {label}
    </p>
  );
};
