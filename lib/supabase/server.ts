import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the server
export const supabaseServer = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")
