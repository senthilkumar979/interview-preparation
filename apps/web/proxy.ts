import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicEnv } from "@prepquest/auth";
import { GUEST_COOKIE } from "@/lib/session-types";

const protectedPrefixes = ["/dashboard", "/learn", "/roadmap", "/onboarding", "/practice", "/leaderboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsAuth = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const env = getSupabasePublicEnv();

  if (env) {
    let response = NextResponse.next({ request });
    const supabase = createServerClient(env.url, env.anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (needsAuth && !user && !request.cookies.get(GUEST_COOKIE)) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return response;
  }

  if (needsAuth && !request.cookies.get(GUEST_COOKIE)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/learn/:path*",
    "/roadmap",
    "/roadmap/:path*",
    "/onboarding",
    "/onboarding/:path*",
    "/practice",
    "/practice/:path*",
    "/leaderboard",
    "/leaderboard/:path*",
  ],
};
