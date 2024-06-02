import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY = "YOUT_SUPABASE_KEY";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;
