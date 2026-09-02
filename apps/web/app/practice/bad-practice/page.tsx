import Link from "next/link";
import { redirect } from "next/navigation";
import { badPracticePackages } from "@prepquest/content";
import { PracticeHowTo, badPracticeSteps } from "@/components/practice/PracticeHowTo";
import { PracticeBack, PracticeShell } from "@/components/practice/PracticeShell";
import { getAppUser } from "@/lib/session";

export default async function BadPracticeIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  return (
    <PracticeShell user={user}>
      <PracticeBack />
      <h1 className="text-3xl font-semibold tracking-tight">Bad Practice Finder</h1>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        The code often runs, but it is the kind of thing a senior would flag in review: extra state, index
        keys, leaked listeners, shallow copies, jQuery in React, and similar.
      </p>
      <PracticeHowTo steps={badPracticeSteps} />
      <ul className="grid gap-3 md:grid-cols-2">
        {badPracticePackages.map((pack) => (
          <li key={pack.slug}>
            <Link
              href={`/practice/bad-practice/${pack.slug}`}
              className="block rounded-2xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <p className="font-semibold">{pack.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{pack.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">{pack.items.length} snippets</p>
            </Link>
          </li>
        ))}
      </ul>
    </PracticeShell>
  );
}
