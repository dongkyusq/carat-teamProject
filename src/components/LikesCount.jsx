import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import supabase from "../supabaseClient";
import styled from "styled-components";

export default function LikeBtn({ postId }) {
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentLikes, setCurrentLikes] = useState(0);

  const fetchPostLikes = async () => {
    const { data: post, error: postError } = await supabase.from("posts").select("likes").eq("id", postId).single();

    if (postError) {
      console.error("Post error:", postError);
      return;
    }

    if (post) {
      setCurrentLikes(post.likes);
    }
  };

  const fetchUserLikes = async userId => {
    if (!userId) {
      setLiked(false);
      return;
    }

    const { data: likes, error: likesError } = await supabase.from("likes").select("likes_user_id").eq("likes_post", postId).eq("likes_user_id", userId);

    if (likesError) {
      console.error("Likes error:", likesError);
      return;
    }

    const isLiked = likes.length > 0;
    setLiked(isLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: userResponse, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);
        return;
      }

      const userId = userResponse?.user?.id || null;
      setUserId(userId);

      await fetchPostLikes();
      await fetchUserLikes(userId);
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    if (userId !== null) {
      fetchUserLikes(userId);
    }
  }, [userId, postId]);

  const handleLikeBtn = async () => {
    if (!userId) {
      alert("로그인 후 누를 수 있습니다.");
      return;
    }

    let updatedLikes = currentLikes;

    if (liked) {
      const { error: deleteError } = await supabase.from("likes").delete().eq("likes_post", postId).eq("likes_user_id", userId);

      if (deleteError) {
        console.error("Likes delete error:", deleteError);
        return;
      }

      updatedLikes -= 1;
    } else {
      const { error: insertError } = await supabase.from("likes").insert([{ likes_post: postId, likes_user_id: userId }]);

      if (insertError) {
        console.error("Likes insert error:", insertError);
        return;
      }

      updatedLikes += 1;
    }

    const { error: updateError } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", postId);

    if (updateError) {
      console.error("Post update error:", updateError);
      return;
    }

    setCurrentLikes(updatedLikes);
    setLiked(!liked);
  };

  return (
    <StyledButton onClick={handleLikeBtn}>
      {liked ? <FavoriteIcon sx={iconStyle} /> : <FavoriteBorderIcon sx={iconStyle} />}
      <LikesCount>{currentLikes}</LikesCount>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  &:hover {
    color: #f8cacc;
  }
`;

const iconStyle = {
  fontSize: "30px",
};

const LikesCount = styled.p`
  margin: 4px 0 0 2px;
  font-size: 20px;
  color: white;
`;
