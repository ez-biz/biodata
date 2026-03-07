import { createClient, SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "photos";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export async function uploadPhoto(
  path: string,
  file: Buffer | Blob,
  contentType: string
): Promise<string> {
  const { error } = await getSupabase().storage
    .from(BUCKET)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  return getPublicUrl(path);
}

export function getPublicUrl(path: string): string {
  const { data } = getSupabase().storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deletePhoto(path: string): Promise<void> {
  const { error } = await getSupabase().storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}

export function generatePhotoPath(
  userId: string,
  biodataId: string,
  type: "profile" | "additional" | "kundli",
  index: number = 0
): string {
  const timestamp = Date.now();
  return `${userId}/${biodataId}/${type}-${index}-${timestamp}.jpg`;
}
