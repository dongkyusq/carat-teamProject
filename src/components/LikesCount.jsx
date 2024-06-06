import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import supabase from "../supabaseClient";
import styled from "styled-components";

export default function LikeBtn({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);
        return;
      }

      if (user) {
        setUserId(user.id);

        const { data: likes, error: likesError } = await supabase.from("likes").select("likes_user_id").eq("likes_post", postId);

        if (likesError) {
          console.error("Likes error:", likesError);
          return;
        }

        const isLiked = likes ? likes.some(like => like.likes_user_id === user.id) : false;
        setLiked(isLiked);

        const { data: post, error: postError } = await supabase.from("posts").select("likes").eq("id", postId);

        if (postError) {
          console.error("Post error:", postError);
          return;
        }

        setLikeCount(post.likes || 0);
      }
    };

    fetchData();
  }, [postId]);

  const handleLikeBtn = async () => {
    if (!userId) {
      alert("로그인 후 누를 수 있습니다.");
      return;
    }

    if (liked) {
      const { error: deleteError } = await supabase.from("likes").delete().eq("likes_post", postId).eq("likes_user_id", userId);

      if (deleteError) {
        console.error("Likes delete error:", deleteError);
        return;
      }

      const { error: postError } = await supabase
        .from("posts")
        .update({ likes: likeCount - 1 })
        .eq("id", postId);

      if (postError) {
        console.error("Post update error:", postError);
        return;
      }

      setLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } else {
      const { error: insertError } = await supabase.from("likes").insert([{ likes_post: postId, likes_user_id: userId }]);

      if (insertError) {
        console.error("Likes insert error:", insertError);
        return;
      }

      const { error: postError } = await supabase
        .from("posts")
        .update({ likes: likeCount + 1 })
        .eq("id", postId);

      if (postError) {
        console.error("Post update error:", postError);
        return;
      }

      setLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    }
  };

  return (
    <StyledButton onClick={handleLikeBtn}>
      {liked ? <FavoriteIcon sx={iconStyle} /> : <FavoriteBorderIcon sx={iconStyle} />}
      <LikesCount>{likeCount}</LikesCount>
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
