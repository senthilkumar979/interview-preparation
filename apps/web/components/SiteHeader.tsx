import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import type { AppUser } from "@/lib/session-types";

interface SiteHeaderProps {
  user: AppUser | null;
}

export const SiteHeader = ({ user }: SiteHeaderProps) => (
  <header className="border-b border-border bg-surface">
    <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
      <Link href={user ? "/dashboard" : "/"} className="font-semibold tracking-tight">
        PrepQuest
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        {user ? (
          <>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/practice" className="text-muted-foreground hover:text-foreground">
              Practice
            </Link>
            <Link href="/roadmap" className="text-muted-foreground hover:text-foreground">
              Roadmap
            </Link>
            <form action={signOut}>
              <Button variant="ghost" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <Button asChild size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </nav>
    </div>
  </header>
);
