"use client";

import { useState } from "react";
import type { FinderPackage } from "@prepquest/content";
import { PracticeJumpNav } from "@/components/practice/PracticeJumpNav";
import { RevealFindings } from "@/components/practice/RevealFindings";
import { TopicCodeExample } from "@/components/TopicCodeExample";
import { Button } from "@/components/ui/button";

interface RevealPlayerProps {
  pack: FinderPackage;
  reveal: "bug" | "practice";
}

export const RevealPlayer = ({ pack, reveal }: RevealPlayerProps) => {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const item = pack.items[index];
  if (!item) return null;

  const language = item.language === "typescript" ? "typescript" : "javascript";
  const noun = reveal === "bug" ? "bug" : "bad practice";
  const showLabel = shown === 0 ? `Show the ${noun}` : `Show next ${noun}`;
  const revealed = item.answers.slice(0, shown);
  const latest = revealed[revealed.length - 1];
  const earlier = revealed.slice(0, -1);
  const ext =
    item.kind === "component"
      ? language === "typescript"
        ? "tsx"
        : "jsx"
      : language === "typescript"
        ? "ts"
        : "js";

  const go = (next: number) => {
    setIndex(next);
    setShown(0);
  };

  return (
    <article className="grid gap-4">
      <PracticeJumpNav
        noun="Snippet"
        currentId={item.id}
        items={pack.items.map((entry) => ({ id: entry.id, label: entry.title }))}
        onSelect={(id) => {
          const nextIndex = pack.items.findIndex((entry) => entry.id === id);
          if (nextIndex >= 0) go(nextIndex);
        }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Snippet {index + 1} of {pack.items.length}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
          </div>
          <p className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {item.answers.length} {noun}
            {item.answers.length === 1 ? "" : "s"}
          </p>
        </header>
        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-stretch md:p-5">
          <TopicCodeExample
            example={{ language, code: item.snippet, caption: `${item.id}.${ext}` }}
          />
          <RevealFindings
            noun={noun}
            shown={shown}
            total={item.answers.length}
            earlier={earlier}
            latest={latest}
          />
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
          <Button
            size="sm"
            disabled={shown >= item.answers.length}
            onClick={() => setShown((value) => value + 1)}
          >
            {shown >= item.answers.length ? `All ${noun}s shown` : showLabel}
          </Button>
          <p className="text-xs text-muted-foreground">Use Previous / Next or the list to change snippet.</p>
        </footer>
      </div>
    </article>
  );
};
