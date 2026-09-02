"use client";

import { useState, useTransition } from "react";
import type { QuizPackage } from "@prepquest/content";
import { recordPracticeWin } from "@/app/actions/game";
import { PracticeJumpNav } from "@/components/practice/PracticeJumpNav";
import { QuizChoices } from "@/components/practice/QuizChoices";
import { QuizResultPanel } from "@/components/practice/QuizResultPanel";
import { QuizSummary } from "@/components/practice/QuizSummary";
import { TopicCodeExample } from "@/components/TopicCodeExample";
import { Button } from "@/components/ui/button";

interface QuizPlayerProps {
  pack: QuizPackage;
  packs: { slug: string; title: string }[];
  completedIds: string[];
  dailyKey?: string;
}

const kindLabel = {
  mcq: "Multiple choice",
  tf: "True or false",
  output: "Output",
} as const;

export const QuizPlayer = ({ pack, packs, completedIds, dailyKey }: QuizPlayerProps) => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [awarded, setAwarded] = useState<string[]>([]);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [reviewing, setReviewing] = useState(false);
  const [, start] = useTransition();
  const question = pack.questions[index];
  if (!question) return null;

  const activityId = `quiz:${pack.slug}:q:${question.id}`;
  const isCorrect = picked !== null && question.choices.some((choice) => choice.id === picked && choice.isCorrect);
  const isLast = index >= pack.questions.length - 1;

  const check = () => {
    if (!picked) return;
    setPicks((current) => ({ ...current, [question.id]: picked }));
    setRevealed(true);
    const ok = question.choices.some((choice) => choice.id === picked && choice.isCorrect);
    if (ok && !awarded.includes(question.id)) {
      setAwarded((ids) => [...ids, question.id]);
      setScore((value) => value + 1);
      start(() => {
        void recordPracticeWin({ activityId, reason: "correctAnswer", dailyKey });
      });
    }
  };

  const next = () => {
    setPicked(null);
    setRevealed(false);
    setIndex((value) => value + 1);
  };

  const retry = () => {
    setIndex(0);
    setPicked(null);
    setRevealed(false);
    setScore(0);
    setAwarded([]);
    setPicks({});
    setReviewing(false);
  };

  if (reviewing) {
    return (
      <div className="grid gap-4">
        <PracticeJumpNav
          noun="Package"
          currentId={pack.slug}
          items={packs.map((item) => ({
            id: item.slug,
            label: item.title,
            href: `/practice/quiz/${item.slug}`,
          }))}
        />
        <QuizSummary pack={pack} picks={picks} score={score} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <PracticeJumpNav
        noun="Package"
        currentId={pack.slug}
        items={packs.map((item) => ({
          id: item.slug,
          label: item.title,
          href: `/practice/quiz/${item.slug}`,
        }))}
      />
      <article className="overflow-hidden rounded-2xl border border-border bg-card">
        <header className="grid gap-3 border-b border-border px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Question {index + 1} of {pack.questions.length} · {kindLabel[question.kind]}
            </p>
            <p className="text-xs tabular-nums text-muted-foreground">
              Score {score}/{pack.questions.length}
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${((index + (revealed ? 1 : 0)) / pack.questions.length) * 100}%` }}
            />
          </div>
          <h2 className="text-lg font-semibold leading-snug">{question.prompt}</h2>
        </header>
        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
          <div className="grid content-start gap-4">
            {question.code ? (
              <TopicCodeExample
                example={{
                  language: question.language ?? "javascript",
                  code: question.code,
                  caption: "Snippet",
                }}
              />
            ) : null}
            <QuizChoices
              choices={question.choices}
              picked={picked}
              revealed={revealed}
              onPick={setPicked}
            />
          </div>
          <aside className="grid content-start gap-4">
            {!revealed ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6">
                <p className="text-sm font-medium">Lock in an answer</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Choose one option, then Check. The correct choice and the why stay hidden until then.
                </p>
                <Button className="mt-4" disabled={!picked} onClick={check}>
                  Check
                </Button>
              </div>
            ) : (
              <QuizResultPanel
                isCorrect={isCorrect}
                explanation={question.explanation}
                alreadyXp={completedIds.includes(activityId)}
                isLast={isLast}
                score={score}
                total={pack.questions.length}
                onNext={next}
                onReview={() => setReviewing(true)}
              />
            )}
          </aside>
        </div>
      </article>
    </div>
  );
};
