import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jwyfdpnxmxjqwmmqfjsf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eWZkcG54bXhqcXdtbXFmanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczMDA3NTcsImV4cCI6MjAzMjg3Njc1N30.uJzr29MiKBedWgtUVbM5zEj6U_wxYKEDE09o6DPw1ig";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
