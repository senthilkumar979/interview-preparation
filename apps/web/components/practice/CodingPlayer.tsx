"use client";

import { useState } from "react";
import type { CodingChallenge } from "@prepquest/content";
import { CodingCard } from "@/components/practice/CodingCard";
import { PracticeJumpNav } from "@/components/practice/PracticeJumpNav";
import { Button } from "@/components/ui/button";

interface Sibling {
  id: string;
  title: string;
}

interface CodingPlayerProps {
  challenge: CodingChallenge;
  siblings: Sibling[];
  onPassed: (id: string) => void;
  alreadyCorrect: boolean;
}

export const CodingPlayer = ({
  challenge,
  siblings,
  onPassed,
  alreadyCorrect,
}: CodingPlayerProps) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="grid gap-4">
      <PracticeJumpNav
        noun="Drill"
        currentId={challenge.id}
        items={siblings.map((item) => ({
          id: item.id,
          label: item.title,
          href: `/practice/coding/${item.id}`,
        }))}
      />
      <CodingCard
        key={challenge.id}
        exercise={challenge}
        minutes={challenge.minutes}
        alreadyCorrect={alreadyCorrect}
        onSolved={onPassed}
      />
      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Reference
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional. Compare after you have a working attempt — or if you are stuck.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setShowSolution((value) => !value)}>
            {showSolution ? "Hide answer" : "Show answer"}
          </Button>
        </div>
        {showSolution ? (
          <pre className="overflow-x-auto border-t border-border bg-[#111827] p-5 text-sm leading-6 text-white">
            <code>{challenge.solution}</code>
          </pre>
        ) : null}
      </section>
    </div>
  );
};
