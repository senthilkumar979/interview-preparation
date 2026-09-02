import { notFound, redirect } from "next/navigation";
import { codingChallenges, getCodingChallenge, getWeeklyChallenge } from "@prepquest/content";
import { getGameState } from "@/app/actions/game";
import { FinderSessionHero } from "@/components/practice/FinderSessionHero";
import { PracticeCodingClient } from "@/components/practice/PracticeCodingClient";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { getAppUser } from "@/lib/session";

interface CodingPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ challenge?: string }>;
}

export default async function CodingPage({ params, searchParams }: CodingPageProps) {
  const { slug } = await params;
  const { challenge } = await searchParams;
  const item = getCodingChallenge(slug);
  if (!item) notFound();
  const user = await getAppUser();
  if (!user) redirect("/login");
  const game = await getGameState();
  const weekly = getWeeklyChallenge();
  const isWeekly = challenge === "weekly" && weekly.href.includes(slug);
  const weeklyKey = isWeekly ? weekly.key : undefined;
  const language = item.language === "typescript" ? "TypeScript" : "JavaScript";

  return (
    <PracticeShell user={user}>
      <FinderSessionHero
        crumbs={[
          { href: "/practice", label: "Practice" },
          { href: "/practice/coding", label: "Coding" },
        ]}
        current={item.title}
        kicker={isWeekly ? "Weekly coding challenge" : "Timed coding drill"}
        title={item.title}
        summary={item.summary}
        stats={[
          { label: "Timebox", value: `${item.minutes} min` },
          { label: "Language", value: language },
          { label: "Tests", value: `${item.tests.length} hidden` },
        ]}
        steps={[
          "Read the spec. Implement the exported function in the editor.",
          "Run hidden tests. Failures show a short error, not the solution.",
          "Show answer only if you want a reference to compare.",
        ]}
      />
      <PracticeCodingClient
        challenge={item}
        siblings={codingChallenges.map((entry) => ({ id: entry.id, title: entry.title }))}
        completedIds={game.completedIds}
        weeklyKey={weeklyKey}
      />
    </PracticeShell>
  );
}
