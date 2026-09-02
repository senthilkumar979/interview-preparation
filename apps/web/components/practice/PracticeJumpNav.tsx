"use client";

import { useRouter } from "next/navigation";
import { PracticeJumpPicker } from "@/components/practice/PracticeJumpPicker";
import { Button } from "@/components/ui/button";

export interface JumpItem {
  id: string;
  label: string;
  href?: string;
}

interface PracticeJumpNavProps {
  noun: string;
  items: JumpItem[];
  currentId: string;
  onSelect?: (id: string) => void;
}

export const PracticeJumpNav = ({ noun, items, currentId, onSelect }: PracticeJumpNavProps) => {
  const router = useRouter();
  const index = Math.max(0, items.findIndex((item) => item.id === currentId));
  const prev = items[index - 1];
  const next = items[index + 1];

  const go = (item: JumpItem | undefined) => {
    if (!item) return;
    if (item.href) {
      router.push(item.href);
      return;
    }
    onSelect?.(item.id);
  };

  return (
    <nav className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center md:p-4">
      <PracticeJumpPicker noun={noun} items={items} index={index} onPick={go} />
      <div className="flex gap-2 sm:shrink-0">
        <Button size="sm" variant="outline" disabled={!prev} onClick={() => go(prev)}>
          Previous
        </Button>
        <Button size="sm" variant="outline" disabled={!next} onClick={() => go(next)}>
          Next
        </Button>
      </div>
    </nav>
  );
};
