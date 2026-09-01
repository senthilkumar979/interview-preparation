"use client";

import { useCallback, useState, useTransition } from "react";
import type { PracticeSet, XpReason } from "@prepquest/content";
import { recordPracticeWin } from "@/app/actions/game";
import { CodingCard } from "@/components/practice/CodingCard";
import { FinderCard } from "@/components/practice/FinderCard";
import { HtmlPreview } from "@/components/practice/HtmlPreview";
import { PracticeTimer } from "@/components/practice/PracticeTimer";
import { QuestionCard } from "@/components/practice/QuestionCard";

interface PracticePanelProps {
  set: PracticeSet;
  completedIds: string[];
  dailyKey?: string;
  weeklyKey?: string;
}

export const PracticePanel = ({ set, completedIds, dailyKey, weeklyKey }: PracticePanelProps) => {
  const [expired, setExpired] = useState(false);
  const [done, setDone] = useState(completedIds);
  const [, startTransition] = useTransition();
  const expire = useCallback(() => setExpired(true), []);

  const win = (activityId: string, reason: XpReason) => {
    setDone((ids) => (ids.includes(activityId) ? ids : [...ids, activityId]));
    startTransition(() => {
      void recordPracticeWin({ activityId, reason, dailyKey, weeklyKey });
    });
  };

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Practice</p>
          <h2 className="text-xl font-semibold">{set.title}</h2>
          <p className="text-sm text-muted-foreground">{set.summary}</p>
        </div>
        <PracticeTimer seconds={set.timedSeconds} onExpire={expire} />
      </div>
      {expired ? (
        <p className="rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm">
          Time is up for the question set. You can still run code and finders.
        </p>
      ) : null}
      {set.questions.map((question) => {
        const id = `${set.topicSlug}:q:${question.id}`;
        return (
          <QuestionCard
            key={question.id}
            question={question}
            disabled={expired}
            alreadyCorrect={done.includes(id)}
            onSolved={() => win(id, "correctAnswer")}
          />
        );
      })}
      {set.coding ? (
        <CodingCard
          exercise={set.coding}
          alreadyCorrect={done.includes(`${set.topicSlug}:code:${set.coding.id}`)}
          onSolved={(codingId) => win(`${set.topicSlug}:code:${codingId}`, "coding")}
        />
      ) : null}
      {set.preview ? <HtmlPreview exercise={set.preview} /> : null}
      {set.bugFinder ? (
        <FinderCard
          exercise={set.bugFinder}
          alreadyCorrect={done.includes(`${set.topicSlug}:bug:${set.bugFinder.id}`)}
          onSolved={(finderId) => win(`${set.topicSlug}:bug:${finderId}`, "bug")}
        />
      ) : null}
      {set.badPractice ? (
        <FinderCard
          exercise={set.badPractice}
          alreadyCorrect={done.includes(`${set.topicSlug}:bad:${set.badPractice.id}`)}
          onSolved={(finderId) => win(`${set.topicSlug}:bad:${finderId}`, "badPractice")}
        />
      ) : null}
    </section>
  );
};
