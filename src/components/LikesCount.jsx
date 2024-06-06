import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import supabase from "../supabaseClient";
import styled from "styled-components";

export default function LikeBtn({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("User error:", userError);
          throw userError;
        }

        if (user) {
          setIsLoggedIn(true);
          setUserId(user.id);

          const { data: likes, error: likesError } = await supabase.from("likes").select("likes_user_id").eq("likes_post", postId);

          if (likesError) {
            throw likesError;
          }

          const isLiked = likes ? likes.some(like => like.likes_user_id === user.id) : false;
          setLiked(isLiked);

          const { data: post, error: postError } = await supabase.from("posts").select("likes").eq("id", postId);

          if (postError) {
            throw postError;
          }

          setLikeCount(post[0].likes || 0);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("에러 발생", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleLikeBtn = async () => {
    try {
      if (!userId) {
        alert("로그인 후 누를 수 있습니다.");
        return;
      }

      if (liked) {
        const { error } = await supabase.from("likes").delete().eq("likes_post", postId).eq("likes_user_id", userId);

        if (error) {
          throw error;
        }

        const { error: postError } = await supabase
          .from("posts")
          .update({ likes: likeCount - 1 })
          .eq("id", postId);

        if (postError) {
          throw postError;
        }

        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
      } else {
        const { error } = await supabase.from("likes").insert([{ likes_post: postId, likes_user_id: userId }]);

        if (error) {
          throw error;
        }

        const { error: postError } = await supabase
          .from("posts")
          .update({ likes: likeCount + 1 })
          .eq("id", postId);

        if (postError) {
          throw postError;
        }

        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error("좋아요 상태를 업데이트하는 중 오류 발생", error);
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
