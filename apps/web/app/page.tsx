import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { getAppUser } from "@/lib/session";

export default async function MarketingPage() {
  const user = await getAppUser();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-4 py-16">
        <p className="text-sm font-medium text-primary">Interview preparation, not memorization</p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Master the knowledge behind the questions.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          PrepQuest is a structured path: role, technology, level, then a generated roadmap of
          topics you actually learn—before you practice, debug, and sit a mock interview.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href={user ? "/dashboard" : "/login"}>Start preparing</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/roadmap">View the JS roadmap</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
