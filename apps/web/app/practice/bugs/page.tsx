import Link from "next/link";
import { redirect } from "next/navigation";
import { bugPackages } from "@prepquest/content";
import { PracticeBack, PracticeShell } from "@/components/practice/PracticeShell";
import { PracticeHowTo, bugFinderSteps } from "@/components/practice/PracticeHowTo";
import { getAppUser } from "@/lib/session";

const kindLabel = {
  "js-function": "JS function",
  "ts-function": "TS function",
  component: "Component",
} as const;

export default async function BugsIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  return (
    <PracticeShell user={user}>
      <PracticeBack />
      <h1 className="text-3xl font-semibold tracking-tight">Bug Finder</h1>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        Interview-style reading: a broken function or component, and you name every defect. Packs are JS
        functions, TS functions, or components.
      </p>
      <PracticeHowTo steps={bugFinderSteps} />
      <ul className="grid gap-3 md:grid-cols-3">
        {bugPackages.map((pack) => (
          <li key={pack.slug}>
            <Link
              href={`/practice/bugs/${pack.slug}`}
              className="block rounded-2xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {kindLabel[pack.kind]}
              </p>
              <p className="mt-2 font-semibold">{pack.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{pack.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">{pack.items.length} snippets</p>
            </Link>
          </li>
        ))}
      </ul>
    </PracticeShell>
  );
}
