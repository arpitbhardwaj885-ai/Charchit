import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));

// Public / Browser client
export const supabasePublic = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey)
  : null;

// Privileged Admin / Server-only client
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabasePublic;
