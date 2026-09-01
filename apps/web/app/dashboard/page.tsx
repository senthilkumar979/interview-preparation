import Link from "next/link";
import { redirect } from "next/navigation";
import { getTopicsByTechnology, topics } from "@prepquest/content";
import { ProgressBar } from "@prepquest/ui";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { completedSet, getAppUser, getProgressMap } from "@/lib/session";

export default async function DashboardPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");
  if (!user.roleSlug || !user.technologySlug) redirect("/onboarding");

  const catalog = getTopicsByTechnology("javascript");
  const progress = await getProgressMap(user.id);
  const done = completedSet(progress);
  const percent = catalog.length === 0 ? 0 : Math.round((done.size / catalog.length) * 100);
  const nextTopic =
    catalog.find((topic) => progress[topic.slug] !== "completed") ?? catalog[0];

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto grid w-full max-w-5xl flex-1 gap-6 px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold">Good morning, {user.displayName}</h1>
          <p className="text-muted-foreground">Continue your Frontend preparation.</p>
        </div>
        <ProgressBar value={percent} label="JavaScript preparation" />
        {nextTopic ? (
          <Card>
            <CardHeader>
              <CardTitle>Continue learning</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{nextTopic.title}</p>
                <p className="text-sm text-muted-foreground">{nextTopic.summary}</p>
              </div>
              <Button asChild>
                <Link href={`/learn/${nextTopic.slug}`}>Continue</Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {done.size} of {topics.length} JavaScript topics complete.{" "}
          <Link href="/roadmap" className="text-foreground underline">
            Open roadmap
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
