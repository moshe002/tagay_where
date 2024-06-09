import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL: string = import.meta.env.VITE_PROJECT_URL_SUPABASE;
const SUPABASE_KEY:string = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);