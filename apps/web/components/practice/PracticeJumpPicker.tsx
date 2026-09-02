"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Popover } from "radix-ui";
import type { JumpItem } from "@/components/practice/PracticeJumpNav";
import { cn } from "@/lib/utils";

interface PracticeJumpPickerProps {
  noun: string;
  items: JumpItem[];
  index: number;
  onPick: (item: JumpItem) => void;
}

export const PracticeJumpPicker = ({ noun, items, index, onPick }: PracticeJumpPickerProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const current = items[index];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items.map((item, i) => ({ item, i }));
    return items
      .map((item, i) => ({ item, i }))
      .filter(({ item, i }) => `${i + 1} ${item.label}`.toLowerCase().includes(needle));
  }, [items, query]);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setQuery("");
      }}
    >
      <Popover.Trigger
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition hover:border-primary/50 data-[state=open]:border-primary data-[state=open]:shadow-[0_0_0_3px_rgba(237,174,73,0.18)]"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/20 text-xs font-bold tabular-nums">
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{current?.label ?? noun}</span>
          <span className="block text-[11px] font-medium text-muted-foreground">
            {noun} · {index + 1} of {items.length}
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-28px_rgba(31,41,55,0.45)]"
        >
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${items.length} ${noun.toLowerCase()}s`}
              className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">No matches</li>
            ) : (
              filtered.map(({ item, i }) => {
                const active = i === index;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onPick(item);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition",
                        active ? "bg-primary/15" : "hover:bg-muted/80",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-md text-[11px] font-bold tabular-nums",
                          active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.label}</span>
                      {active ? <Check className="size-4 shrink-0 text-primary" /> : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
