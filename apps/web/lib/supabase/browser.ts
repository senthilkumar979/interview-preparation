import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@prepquest/auth";

export function createBrowserSupabase() {
  const env = getSupabasePublicEnv();
  if (!env) return null;
  return createBrowserClient(env.url, env.anonKey);
}
