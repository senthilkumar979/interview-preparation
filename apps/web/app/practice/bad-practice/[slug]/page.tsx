import { notFound, redirect } from "next/navigation";
import { getBadPracticePackage } from "@prepquest/content";
import { FinderSessionHero } from "@/components/practice/FinderSessionHero";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { RevealPlayer } from "@/components/practice/RevealPlayer";
import { getAppUser } from "@/lib/session";

interface BadPracticePageProps {
  params: Promise<{ slug: string }>;
}

const kindCopy = {
  "js-function": "Language review pack",
  "ts-function": "TypeScript review pack",
  component: "React review pack",
} as const;

export default async function BadPracticePage({ params }: BadPracticePageProps) {
  const { slug } = await params;
  const pack = getBadPracticePackage(slug);
  if (!pack) notFound();
  const user = await getAppUser();
  if (!user) redirect("/login");

  const issues = pack.items.reduce((sum, item) => sum + item.answers.length, 0);
  const language =
    pack.kind === "component" ? "JSX" : pack.kind === "ts-function" ? "TypeScript" : "JavaScript";
  const summary =
    pack.kind === "component"
      ? `${pack.summary} The code often still runs — flag derived state, refs used as UI, leaked listeners, and index keys.`
      : pack.summary;

  return (
    <PracticeShell user={user}>
      <FinderSessionHero
        crumbs={[
          { href: "/practice", label: "Practice" },
          { href: "/practice/bad-practice", label: "Bad Practice Finder" },
        ]}
        current={pack.title}
        kicker={kindCopy[pack.kind]}
        title={pack.title}
        summary={summary}
        stats={[
          { label: "Snippets", value: String(pack.items.length) },
          { label: "Flags", value: String(issues) },
          { label: "Language", value: language },
        ]}
        steps={[
          "Read the file like a reviewer. Nothing is highlighted.",
          "Name the anti-pattern yourself. You do not submit.",
          "Reveal each bad practice when you want to check.",
        ]}
      />
      <RevealPlayer pack={pack} reveal="practice" />
    </PracticeShell>
  );
}
