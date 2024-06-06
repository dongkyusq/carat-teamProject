import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";

export default function LikeBtn() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const [userId, setUserId] = useState(null); // 현재 사용자 ID 추가

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 로그인 상태 확인
        const { data: user } = await supabase.auth.getUser();

        // console.log(user);

        if (user) {
          setIsLoggedIn(true);
          setUserId(user.id); // 현재 사용자 ID 설정

          // 해당 게시물에 대한 좋아요 여부 확인
          let likes;
          if (id) {
            const { data, error } = await supabase.from("likes").select("likes_user_id").eq("likes_post", id);
            if (error) {
              throw error;
            }
            likes = data;
          }

          const isLiked = likes ? likes.some(like => like.likes_user_id === user.id) : false;
          setLiked(isLiked);

          // 해당 게시물의 좋아요 수 가져오기
          const { data: posts, error: postError } = await supabase.from("posts").select("likes").eq("id", id).single();
          if (postError) {
            throw postError;
          }
          setLikeCount(posts.likes);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("에러 발생", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLikeBtn = async () => {
    try {
      if (liked) {
        // 좋아요 제거
        await supabase.from("likes").delete().eq("likes_post", id).eq("likes_user_id", userId);
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
      } else {
        // 좋아요 추가
        await supabase.from("likes").insert([{ likes_post: id, likes_user_id: userId }]);
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error("좋아요 상태를 업데이트하는 중 오류 발생", error);
    }
  };

  return (
    <>
      <p key={id}>{likeCount}</p>
      <button onClick={handleLikeBtn}>{liked ? "좋아요 취소" : "좋아요"}</button>
    </>
  );
}
