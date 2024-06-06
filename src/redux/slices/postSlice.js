import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "post",
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
  },
});

export const { addPost, setPost } = postSlice.actions;
export default postSlice.reducer;
