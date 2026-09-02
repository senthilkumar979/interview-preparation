import type { QuizItem } from "@prepquest/content";
import { QuizChoices } from "@/components/practice/QuizChoices";
import { TopicCodeExample } from "@/components/TopicCodeExample";

const kindLabel = {
  mcq: "Multiple choice",
  tf: "True or false",
  output: "Output",
} as const;

interface QuizReviewCardProps {
  index: number;
  total: number;
  question: QuizItem;
  picked: string | null;
}

export const QuizReviewCard = ({ index, total, question, picked }: QuizReviewCardProps) => {
  const correct = question.choices.find((choice) => choice.isCorrect);
  const isCorrect = picked !== null && picked === correct?.id;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Question {index + 1} of {total} · {kindLabel[question.kind]}
        </p>
        <p
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            isCorrect ? "bg-primary/20" : "bg-destructive/10"
          }`}
        >
          {isCorrect ? "Correct" : "Not this time"}
        </p>
      </header>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
        <div className="grid content-start gap-4">
          <h2 className="text-lg font-semibold leading-snug">{question.prompt}</h2>
          {question.code ? (
            <TopicCodeExample
              example={{
                language: question.language ?? "javascript",
                code: question.code,
                caption: "Snippet",
              }}
            />
          ) : null}
          <QuizChoices choices={question.choices} picked={picked} revealed onPick={() => undefined} />
        </div>
        <aside className="grid content-start gap-3 rounded-xl border border-border bg-background/70 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Why</p>
          <p className="text-sm leading-6">{question.explanation}</p>
          {correct ? (
            <p className="text-sm leading-6 text-muted-foreground">
              Correct answer: <span className="font-medium text-foreground">{correct.label}</span>
            </p>
          ) : null}
        </aside>
      </div>
    </article>
  );
};
