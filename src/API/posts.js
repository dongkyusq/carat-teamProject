import supabase from "../supabaseClient";

export const createPost = async ({ text_content, img_content = null, user_name }) => {
  const { data: posts, error } = await supabase.from("posts").insert({ text_content, img_content, user_name }).select("*");
  console.log("posts in createPost:", posts);

  if (error) {
    console.log(error);
    return;
  }
  return posts;
};
