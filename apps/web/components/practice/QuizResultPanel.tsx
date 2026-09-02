import { Button } from "@/components/ui/button";

interface QuizResultPanelProps {
  isCorrect: boolean;
  explanation: string;
  alreadyXp: boolean;
  isLast: boolean;
  score: number;
  total: number;
  onNext: () => void;
  onReview: () => void;
}

export const QuizResultPanel = ({
  isCorrect,
  explanation,
  alreadyXp,
  isLast,
  score,
  total,
  onNext,
  onReview,
}: QuizResultPanelProps) => (
  <div className="grid gap-3 rounded-xl border border-border bg-background/70 p-4">
    <p
      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
        isCorrect ? "bg-primary/15 text-foreground" : "bg-destructive/10 text-foreground"
      }`}
    >
      {isCorrect ? "Correct" : "Not this time"}
    </p>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Why</p>
      <p className="mt-2 text-sm leading-6">{explanation}</p>
    </div>
    {alreadyXp ? <p className="text-xs text-muted-foreground">Already counted for XP.</p> : null}
    {isLast ? (
      <div className="grid gap-3">
        <p className="text-sm font-medium">
          {score} of {total} correct this run.
        </p>
        <Button onClick={onReview}>Review answers</Button>
      </div>
    ) : (
      <Button onClick={onNext}>Next question</Button>
    )}
  </div>
);
