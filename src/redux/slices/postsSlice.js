import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = action.payload;
      state.push(newPost);
    },
    setPosts: (state, action) => {
      const newPosts = action.payload;
      return [...newPosts];
    },
    updatePostLikes: (state, action) => {
      const { postId, increment } = action.payload;
      const postToUpdate = state.find(post => post.id === postId);
      if (postToUpdate) {
        postToUpdate.likes += increment;
      }
    },
  },
});

export const { addPost, setPosts, updatePostLikes } = postsSlice.actions;
export default postsSlice.reducer;
