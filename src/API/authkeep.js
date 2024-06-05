import supabase from "../supabaseClient";

export const getId = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log("getid Error:", error);
    return null;
  }
  return data?.session?.user?.id || null;
};
