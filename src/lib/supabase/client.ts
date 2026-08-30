import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components (the admin dashboard).
 * Reads/writes go straight to Supabase and are governed by Row Level
 * Security policies (see supabase/schema.sql) — only an authenticated
 * admin session can write, everyone can read published content.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
