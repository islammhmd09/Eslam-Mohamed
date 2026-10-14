import 'server-only'; // build fails if this file is ever imported from client code
import { createClient } from '@supabase/supabase-js';
import { need } from '../env';
let client;
export const db = () => (client ??= createClient(need('SUPABASE_URL'), need('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } }));
