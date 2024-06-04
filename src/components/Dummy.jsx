// src/components/Dummy.jsx
import React from "react";
import { useSelector } from "react-redux";

const Dummy = () => {
  const { posts } = useSelector(state => state.posts);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.created_at}</h2>
          <p>{post.text_content}</p>
          <p>{post.likes}</p>
        </li>
      ))}
    </ul>
  );
};

export default Dummy;
