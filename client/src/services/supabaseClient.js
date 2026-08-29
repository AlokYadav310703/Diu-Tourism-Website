import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY — check your .env file.');
}

// Anon key only — safe to expose in frontend code. This client handles
// login/signup/Google OAuth directly; app data still goes through the
// Express API (see services/api.js), not straight to Supabase from here.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
