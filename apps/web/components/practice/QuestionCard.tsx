"use client";

import { useMemo, useState } from "react";
import type { PracticeQuestion } from "@prepquest/content";
import { Button } from "@/components/ui/button";
import { selectedMatches } from "@/lib/runPractice";

interface QuestionCardProps {
  question: PracticeQuestion;
  disabled?: boolean;
  alreadyCorrect?: boolean;
  onSolved: (questionId: string) => void;
}

export const QuestionCard = ({ question, disabled, alreadyCorrect, onSolved }: QuestionCardProps) => {
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(alreadyCorrect ?? false);
  const correctIds = useMemo(
    () => new Set(question.options.filter((option) => option.isCorrect).map((option) => option.id)),
    [question],
  );

  const submit = () => {
    if (!picked || disabled) return;
    const ok = selectedMatches(question.options, new Set([picked]));
    setRevealed(true);
    if (ok) onSolved(question.id);
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <p className="text-sm font-medium leading-6">{question.prompt}</p>
      <ul className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const isPicked = picked === option.id;
          const show = revealed && correctIds.has(option.id);
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={disabled || revealed}
                onClick={() => setPicked(option.id)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                  isPicked ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                } ${show ? "border-primary" : ""}`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
      {!revealed ? (
        <Button className="mt-3" size="sm" disabled={!picked || disabled} onClick={submit}>
          Check
        </Button>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{question.explanation}</p>
      )}
    </article>
  );
};
