"use client";

import { useState } from "react";
import type { FinderExercise } from "@prepquest/content";
import { TopicCodeExample } from "@/components/TopicCodeExample";
import { Button } from "@/components/ui/button";
import { selectedMatches } from "@/lib/runPractice";

interface FinderCardProps {
  exercise: FinderExercise;
  alreadyCorrect?: boolean;
  onSolved: (id: string) => void;
}

export const FinderCard = ({ exercise, alreadyCorrect, onSolved }: FinderCardProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(alreadyCorrect ?? false);

  const toggle = (id: string) => {
    if (revealed) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = () => {
    const ok = selectedMatches(exercise.options, selected);
    setRevealed(true);
    if (ok) onSolved(exercise.id);
  };

  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{exercise.title}</p>
        <p className="mt-1 text-sm">{exercise.prompt}</p>
      </div>
      <TopicCodeExample
        example={{ language: exercise.language === "javascript" ? "javascript" : exercise.language, code: exercise.snippet }}
      />
      <ul className="grid gap-2">
        {exercise.options.map((option) => (
          <li key={option.id}>
            <label className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={selected.has(option.id)}
                disabled={revealed}
                onChange={() => toggle(option.id)}
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {!revealed ? (
        <Button size="sm" onClick={submit}>
          Submit findings
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
      )}
    </article>
  );
};
