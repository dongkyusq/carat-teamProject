import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);

// const supabaseUrl = "process.env.REACT_APP_Supabase_Url";
// const supabaseKey = "process.env.REACT_APP_Supabase_Key";
// const supabase = createClient(supabaseUrl, supabaseKey);
