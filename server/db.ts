import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase URL or Key. Please check your .env file."
  );
}

// Create and export the Supabase client
// We use the service_role key here for server-side operations
export const db = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});