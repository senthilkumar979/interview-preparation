"use client";

import { useTransition } from "react";
import type { CodingChallenge } from "@prepquest/content";
import { recordPracticeWin } from "@/app/actions/game";
import { CodingPlayer } from "@/components/practice/CodingPlayer";

interface PracticeCodingClientProps {
  challenge: CodingChallenge;
  siblings: { id: string; title: string }[];
  completedIds: string[];
  weeklyKey?: string;
}

export const PracticeCodingClient = ({
  challenge,
  siblings,
  completedIds,
  weeklyKey,
}: PracticeCodingClientProps) => {
  const [, start] = useTransition();
  const activityId = `code:${challenge.id}`;

  return (
    <CodingPlayer
      challenge={challenge}
      siblings={siblings}
      alreadyCorrect={completedIds.includes(activityId)}
      onPassed={() => {
        start(() => {
          void recordPracticeWin({ activityId, reason: "coding", weeklyKey });
        });
      }}
    />
  );
};
