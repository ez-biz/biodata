import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

// Client-side Supabase instance (uses anon key, safe for browser)
export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase client not configured.");
    }
    _client = createClient(url, key);
  }
  return _client;
}
