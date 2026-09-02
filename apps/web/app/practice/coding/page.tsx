import Link from "next/link";
import { redirect } from "next/navigation";
import { codingChallenges } from "@prepquest/content";
import { PracticeHowTo, codingSteps } from "@/components/practice/PracticeHowTo";
import { PracticeBack, PracticeShell } from "@/components/practice/PracticeShell";
import { getAppUser } from "@/lib/session";

export default async function CodingIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  return (
    <PracticeShell user={user}>
      <PracticeBack />
      <h1 className="text-3xl font-semibold tracking-tight">Coding drills</h1>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        Tiny requirements you should finish in about ten minutes: unique, flatten, sort, read form values,
        and similar.
      </p>
      <PracticeHowTo steps={codingSteps} />
      <ul className="grid gap-3 md:grid-cols-2">
        {codingChallenges.map((item) => (
          <li key={item.id}>
            <Link
              href={`/practice/coding/${item.id}`}
              className="block rounded-2xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.prompt}</p>
              <p className="mt-3 text-xs text-muted-foreground">{item.minutes} min · {item.language}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PracticeShell>
  );
}
