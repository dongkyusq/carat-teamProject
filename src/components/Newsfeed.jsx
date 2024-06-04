import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

function Newsfeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select();

      if (error) {
        console.log("error =>", error);
      } else {
        console.log("data =>", data);
        setPosts(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <StWriteWrap>
        {posts.map(post => (
          <div key={post.id}>
            <p>이름 : {post.user_name}</p>
            <p>작성시간 : {post.created_at}</p>
            <p>이미지 : {post.img_content}</p>
            <p>내용 : {post.text_content}</p>
            <p>좋아요 수 : {post.likes}</p>
            <p>댓글 : {post.comments}</p>
          </div>
        ))}
      </StWriteWrap>
    </div>
  );
}

export default Newsfeed;

const StWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  height: 500px;
  margin: 0 auto;
`;
