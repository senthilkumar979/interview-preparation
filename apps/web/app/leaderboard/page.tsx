import Link from "next/link";
import { redirect } from "next/navigation";
import { tables } from "@prepquest/database";
import { getGameState, setLeaderboardOptIn } from "@/app/actions/game";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { levelForXp } from "@/lib/game";
import { getAppUser } from "@/lib/session";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function LeaderboardPage() {
  const user = await getAppUser();
  if (!user) redirect("/login");
  const game = await getGameState();
  const { level } = levelForXp(game.xp);
  const rows = await loadRows(user.id, user.displayName, game.xp, game.leaderboardOptIn);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto grid w-full max-w-3xl flex-1 gap-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Opt in to share XP with other signed-in learners. Guests only see a local rank of one.
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await setLeaderboardOptIn(!game.leaderboardOptIn);
          }}
        >
          <Button type="submit" variant={game.leaderboardOptIn ? "outline" : "default"}>
            {game.leaderboardOptIn ? "Hide me from the board" : "Opt in to the leaderboard"}
          </Button>
        </form>
        <ol className="grid gap-2">
          {rows.map((row, index) => (
            <li
              key={row.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className="text-sm font-medium">
                {index + 1}. {row.name}
                {row.id === user.id ? " (you)" : ""}
              </span>
              <span className="text-sm tabular-nums text-muted-foreground">{row.xp} XP</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground">
          You are level {level} with {game.xp} XP and a {game.streak}-day streak.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

async function loadRows(
  userId: string,
  name: string,
  xp: number,
  optedIn: boolean,
): Promise<{ id: string; name: string; xp: number }[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return [{ id: userId, name, xp }];
  const { data, error } = await supabase
    .from(tables.leaderboardEntries)
    .select("id, display_name, xp_total")
    .order("xp_total", { ascending: false })
    .limit(20);
  if (error || !data) return [{ id: userId, name, xp }];
  const mapped = data.map((row) => ({
    id: row.id as string,
    name: (row.display_name as string | null) ?? "Learner",
    xp: (row.xp_total as number | null) ?? 0,
  }));
  if (!optedIn && !mapped.some((row) => row.id === userId)) {
    return [...mapped, { id: userId, name, xp }].sort((a, b) => b.xp - a.xp);
  }
  return mapped;
}
