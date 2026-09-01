"use client";

import { useState } from "react";
import type { CodingExercise } from "@prepquest/content";
import { PracticeEditor } from "@/components/practice/PracticeEditorLazy";
import { Button } from "@/components/ui/button";
import { runJsTests } from "@/lib/runPractice";

interface CodingCardProps {
  exercise: CodingExercise;
  alreadyCorrect?: boolean;
  onSolved: (id: string) => void;
}

export const CodingCard = ({ exercise, alreadyCorrect, onSolved }: CodingCardProps) => {
  const [code, setCode] = useState(exercise.starter);
  const [message, setMessage] = useState(alreadyCorrect ? "Already passed." : "");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    const result = await runJsTests(code, exercise.tests);
    setBusy(false);
    if (result.ok) {
      setMessage("All hidden tests passed.");
      onSolved(exercise.id);
      return;
    }
    setMessage(result.error ?? "Failed");
  };

  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{exercise.title}</p>
        <p className="mt-1 text-sm">{exercise.prompt}</p>
      </div>
      <PracticeEditor
        value={code}
        language={exercise.language}
        onChange={setCode}
        height="240px"
      />
      <div className="flex items-center gap-3">
        <Button size="sm" disabled={busy} onClick={() => void run()}>
          {busy ? "Running…" : "Run tests"}
        </Button>
        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      </div>
    </article>
  );
};
