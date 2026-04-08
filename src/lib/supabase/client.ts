import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

// ✅ Upload
export async function uploadAudio({
  buffer,
  key,
  contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> {
  const { error } = await supabase.storage
    .from(env.SUPABASE_BUCKET)
    .upload(key, buffer, {
      contentType,
      upsert: true,
    });

  if (error) throw error;
}

// ✅ Delete
export async function deleteAudio(key: string): Promise<void> {
  const { error } = await supabase.storage
    .from(env.SUPABASE_BUCKET)
    .remove([key]);

  if (error) throw error;
}

// ✅ Signed URL (1 hour)
export async function getSignedAudioUrl(key: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(env.SUPABASE_BUCKET)
    .createSignedUrl(key, 3600);

  if (error) throw error;

  return data.signedUrl;
}