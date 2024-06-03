import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = process.env.REACT_APP_SUPABASE_PROJECT_URL;

const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);
export default supabase;
