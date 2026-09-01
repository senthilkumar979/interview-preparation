import Link from "next/link";
import { redirect } from "next/navigation";
import { getDailyChallenge, getWeeklyChallenge, listPracticeSets } from "@prepquest/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppUser } from "@/lib/session";

export default async function PracticeIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");
  const daily = getDailyChallenge();
  const weekly = getWeeklyChallenge();
  const sets = listPracticeSets();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Practice</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Questions, runner, and finders</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Timed MCQs, Web Worker tests, HTML/CSS sandbox, Bug Finder, and Bad Practice Finder. First
            daily/weekly win grants bonus XP.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Daily · {daily.key}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3 pt-4">
              <div>
                <p className="font-medium">{daily.set.title}</p>
                <p className="text-sm text-muted-foreground">{daily.set.summary}</p>
              </div>
              <Button asChild>
                <Link href={`/practice/${daily.set.topicSlug}?challenge=daily`}>Start</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Weekly · {weekly.key}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3 pt-4">
              <div>
                <p className="font-medium">{weekly.set.title}</p>
                <p className="text-sm text-muted-foreground">{weekly.set.summary}</p>
              </div>
              <Button asChild>
                <Link href={`/practice/${weekly.set.topicSlug}?challenge=weekly`}>Start</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sets.map((set) => (
            <li key={set.topicSlug}>
              <Link
                href={`/practice/${set.topicSlug}`}
                className="block rounded-2xl border border-border bg-card p-4 hover:border-primary/40"
              >
                <p className="font-semibold">{set.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{set.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
