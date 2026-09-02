interface PracticeHowToProps {
  title?: string;
  steps: string[];
}

export const PracticeHowTo = ({ title = "What to do", steps }: PracticeHowToProps) => (
  <aside className="rounded-2xl border border-border bg-muted/40 px-4 py-4 md:px-5">
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
    <ol className="mt-3 grid gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-3 text-sm leading-6 text-foreground/90">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/20 text-[11px] font-bold text-foreground">
            {index + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  </aside>
);

export const bugFinderSteps = [
  "Open a pack: JS function, TS function, or React component.",
  "Read the whole snippet. Nothing is highlighted and there are no clues in the prompt.",
  "List the bugs yourself. You do not submit findings.",
  "Click Show the bug, then Show next bug, to reveal answers one at a time and compare.",
  "Use Previous, Next, or Jump to when you want another file.",
];

export const badPracticeSteps = [
  "Open a pack of small functions, hooks, or components.",
  "Read the file. Decide what the anti-pattern is (needless state, index as key, missing cleanup, and so on).",
  "You do not submit an answer. No hints are shown until you reveal.",
  "Click Show the bad practice, then Show next bad practice, to check yourself one point at a time.",
  "Use Previous, Next, or Jump to when you want another file.",
];

export const codingSteps = [
  "Pick a drill. Each one is meant to take about 10 minutes or less.",
  "Read the requirement, then write your solution in the editor. React-style drills already have useState, useMemo, useCallback, memo, and a tiny router in scope — do not import them.",
  "Click Run tests. Hidden tests pass or fail; they do not show the expected source.",
  "If you are stuck or done, Show answer to compare with a reference solution.",
  "Use Previous, Next, or Jump to for another drill. The list stays one row even with dozens of prompts.",
];
