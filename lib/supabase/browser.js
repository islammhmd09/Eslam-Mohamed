import { createClient } from '@supabase/supabase-js';
let client; // anon key only: it can't read the tables (RLS), it just carries signed uploads
export const browserSupabase = () => (client ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
