import React, { useState } from "react";
import { setPosts } from "../redux/slices/postsSlice";

export default function LikeBtn() {
  const [liked, setLiked] = useState(likes);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeBtn = () => {
    setLiked(prevLiked => !prevLiked);
    setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <>
      <button onClick={handleLikeBtn}></button>
    </>
  );
}
