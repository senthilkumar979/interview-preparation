import { redirect } from "next/navigation";
import {
  badPracticePackages,
  bugPackages,
  codingChallenges,
  getDailyChallenge,
  getWeeklyChallenge,
  quizPackages,
} from "@prepquest/content";
import { PracticeHub } from "@/components/practice/PracticeHub";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { getAppUser } from "@/lib/session";

function countItems(packs: { items: unknown[] }[]): number {
  return packs.reduce((sum, pack) => sum + pack.items.length, 0);
}

export default async function PracticeIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  const quizQuestions = quizPackages.reduce((sum, pack) => sum + pack.questions.length, 0);

  return (
    <PracticeShell user={user}>
      <PracticeHub
        daily={getDailyChallenge()}
        weekly={getWeeklyChallenge()}
        quizMeta={`${quizPackages.length} packages · ${quizQuestions} questions`}
        bugsMeta={`${bugPackages.length} packs · ${countItems(bugPackages)} snippets`}
        badMeta={`${badPracticePackages.length} packs · ${countItems(badPracticePackages)} snippets`}
        codingMeta={`${codingChallenges.length} drills · about 10 min each`}
      />
    </PracticeShell>
  );
}
