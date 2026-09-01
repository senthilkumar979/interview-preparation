import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDailyChallenge, getPracticeSet, getTopic, getWeeklyChallenge } from "@prepquest/content";
import { getGameState } from "@/app/actions/game";
import { PracticePanel } from "@/components/practice/PracticePanel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAppUser } from "@/lib/session";

interface PracticeTopicPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ challenge?: string }>;
}

export default async function PracticeTopicPage({ params, searchParams }: PracticeTopicPageProps) {
  const { slug } = await params;
  const { challenge } = await searchParams;
  const set = getPracticeSet(slug);
  if (!set) notFound();
  const user = await getAppUser();
  if (!user) redirect("/login");
  const game = await getGameState();
  const topic = getTopic(slug);
  const daily = getDailyChallenge();
  const weekly = getWeeklyChallenge();
  const dailyKey = challenge === "daily" && daily.set.topicSlug === slug ? daily.key : undefined;
  const weeklyKey = challenge === "weekly" && weekly.set.topicSlug === slug ? weekly.key : undefined;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto grid w-full max-w-3xl flex-1 gap-6 px-4 py-10">
        <p className="text-sm">
          <Link href="/practice" className="text-muted-foreground hover:text-foreground">
            All practice
          </Link>
          {topic ? (
            <>
              {" · "}
              <Link href={`/learn/${slug}`} className="text-muted-foreground hover:text-foreground">
                Lesson
              </Link>
            </>
          ) : null}
        </p>
        <PracticePanel
          set={set}
          completedIds={game.completedIds}
          dailyKey={dailyKey}
          weeklyKey={weeklyKey}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
