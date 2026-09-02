import { notFound, redirect } from "next/navigation";
import { getDailyChallenge, getQuizPackage, quizPackages } from "@prepquest/content";
import { getGameState } from "@/app/actions/game";
import { FinderSessionHero } from "@/components/practice/FinderSessionHero";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { QuizPlayer } from "@/components/practice/QuizPlayer";
import { getAppUser } from "@/lib/session";

interface QuizPackagePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ challenge?: string }>;
}

const difficultyLabel = {
  junior: "Junior",
  medior: "Medior",
  senior: "Senior",
  expert: "Expert",
} as const;

export default async function QuizPackagePage({ params, searchParams }: QuizPackagePageProps) {
  const { slug } = await params;
  const { challenge } = await searchParams;
  const pack = getQuizPackage(slug);
  if (!pack) notFound();
  const user = await getAppUser();
  if (!user) redirect("/login");
  const game = await getGameState();
  const daily = getDailyChallenge();
  const isDaily = challenge === "daily" && daily.href.includes(slug);
  const trackPacks = quizPackages.filter((entry) => entry.track === pack.track);
  const trackLabel =
    pack.track === "html"
      ? "HTML topic"
      : pack.track === "css"
        ? "CSS topic"
        : pack.track === "javascript"
          ? "JavaScript topic"
          : `${difficultyLabel[pack.difficulty]} package`;

  return (
    <PracticeShell user={user}>
      <FinderSessionHero
        crumbs={[
          { href: "/practice", label: "Practice" },
          { href: "/practice/quiz", label: "Quiz" },
        ]}
        current={pack.title}
        kicker={isDaily ? `Daily · ${difficultyLabel[pack.difficulty]}` : trackLabel}
        title={pack.title}
        summary={
          pack.track === "mixed"
            ? `${pack.summary} Topics: ${pack.topics.join(", ")}.`
            : pack.summary
        }
        stats={[
          { label: "Questions", value: String(pack.questions.length) },
          { label: "Level", value: difficultyLabel[pack.difficulty] },
          { label: "Format", value: "MCQ · T/F · output" },
        ]}
        steps={[
          "Read the prompt (and snippet, if any). Pick one option.",
          "Check to lock your answer. Correct and incorrect choices are marked.",
          "Read Why, then Next. After the last question, Review answers shows the full recap.",
        ]}
      />
      <QuizPlayer
        pack={pack}
        packs={trackPacks.map((entry) => ({ slug: entry.slug, title: entry.title }))}
        completedIds={game.completedIds}
        dailyKey={isDaily ? daily.key : undefined}
      />
    </PracticeShell>
  );
}
