import type { QuizPackage } from "@prepquest/content";
import { QuizReviewCard } from "@/components/practice/QuizReviewCard";
import { Button } from "@/components/ui/button";

interface QuizSummaryProps {
  pack: QuizPackage;
  picks: Record<string, string>;
  score: number;
  onRetry: () => void;
}

export const QuizSummary = ({ pack, picks, score, onRetry }: QuizSummaryProps) => (
  <div className="grid gap-4">
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-primary/20 blur-3xl"
      />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Review</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{pack.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Read-only recap of every question, with the same markings as after Check. Score this run:{" "}
        <span className="font-semibold text-foreground">
          {score} of {pack.questions.length}
        </span>
        .
      </p>
      <Button className="mt-4" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </section>
    {pack.questions.map((question, index) => (
      <QuizReviewCard
        key={question.id}
        index={index}
        total={pack.questions.length}
        question={question}
        picked={picks[question.id] ?? null}
      />
    ))}
  </div>
);
