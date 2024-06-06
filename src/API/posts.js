import supabase from "../supabaseClient";

export const createPost = async ({ text_content, img_content = null, user_name, user_id, mbti }) => {
  const { data: posts, error } = await supabase.from("posts").insert({ text_content, img_content, user_name, user_id, mbti }).select("*");
  console.log("posts in createPost:", posts);

  if (error) {
    console.log(error);
    return;
  }
  return posts;
};

export const updatePost = async ({ text_content, img_content = null, postId }) => {
  const { data: updatedPost, error } = await supabase.from("posts").update({ text_content, img_content }).eq("id", postId).select("*");

  console.log("post in updatePost :", updatedPost);

  if (error) {
    console.log(error);
    return;
  }
  return updatedPost;
};
