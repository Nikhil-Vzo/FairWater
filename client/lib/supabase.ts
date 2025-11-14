import { createClient } from "@supabase/supabase-js";

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required in your .env file.");
}

// Create and export the client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);