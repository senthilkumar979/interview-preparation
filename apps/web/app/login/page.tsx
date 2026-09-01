import Link from "next/link";
import { isSupabaseConfigured } from "@prepquest/auth";
import { continueAsGuest, signIn, signUp } from "@/app/actions/auth";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader user={null} />
      <main className="mx-auto grid w-full max-w-md flex-1 content-center gap-6 px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {supabaseReady ? (
              <>
                <form action={signIn} className="grid gap-3">
                  <Field id="signin-email" name="email" label="Email" type="email" />
                  <Field id="signin-password" name="password" label="Password" type="password" />
                  <Button type="submit">Sign in</Button>
                </form>
                <form action={signUp} className="grid gap-3 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">Create an account</p>
                  <Field id="signup-name" name="displayName" label="Name" type="text" />
                  <Field id="signup-email" name="email" label="Email" type="email" />
                  <Field id="signup-password" name="password" label="Password" type="password" />
                  <Button type="submit" variant="secondary">
                    Sign up
                  </Button>
                </form>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Supabase env vars are not set. Continue as a local guest to try M1, or add
                NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
              </p>
            )}
            <form action={continueAsGuest}>
              <Button type="submit" variant="outline" className="w-full">
                Continue as guest
              </Button>
            </form>
            <Link href="/" className="text-center text-sm text-muted-foreground hover:text-foreground">
              Back home
            </Link>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}

const Field = ({
  id,
  name,
  label,
  type,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
}) => (
  <div className="grid gap-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={name} type={type} required />
  </div>
);
