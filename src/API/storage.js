import supabase from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async file => {
  const { data: imgData, error } = await supabase.storage.from("img_content").upload(`public/${uuidv4()}.png`, file);

  if (error) {
    console.log(error);
    return;
  }

  const { data } = supabase.storage.from("img_content").getPublicUrl(imgData.path);

  return data.publicUrl;
};
