import Link from "next/link";
import { redirect } from "next/navigation";
import { quizPackages, type QuizTrack } from "@prepquest/content";
import { PracticeBack, PracticeShell } from "@/components/practice/PracticeShell";
import { getAppUser } from "@/lib/session";

const labels = { junior: "Junior", medior: "Medior", senior: "Senior", expert: "Expert" } as const;

const groups: { track: QuizTrack; title: string; body: string }[] = [
  { track: "mixed", title: "Mixed paths", body: "Ten mixed questions across HTML, CSS, JS, and React." },
  { track: "html", title: "HTML", body: "One package per HTML lesson." },
  { track: "css", title: "CSS", body: "One package per CSS lesson." },
  { track: "javascript", title: "JavaScript", body: "One package per JavaScript lesson." },
];

export default async function QuizIndexPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");

  return (
    <PracticeShell user={user}>
      <PracticeBack />
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Quiz packages</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Mixed paths stay ten questions across the stack. Every HTML, CSS, and JavaScript lesson also has its
          own ten-question pack.
        </p>
      </div>
      {groups.map((group) => {
        const packs = quizPackages.filter((pack) => pack.track === group.track);
        return (
          <section key={group.track} className="grid gap-3">
            <div>
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <p className="text-sm text-muted-foreground">
                {group.body} · {packs.length} packages
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {packs.map((pack) => (
                <li key={pack.slug}>
                  <Link
                    href={`/practice/quiz/${pack.slug}`}
                    className="block h-full rounded-2xl border border-border bg-card p-5 hover:border-primary/40"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">
                      {group.track === "mixed" ? labels[pack.difficulty] : group.title}
                    </p>
                    <p className="mt-2 font-semibold">{pack.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{pack.summary}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{pack.questions.length} questions</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </PracticeShell>
  );
}
