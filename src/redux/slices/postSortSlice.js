// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../slices/supabaseClient";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async filter => {
  let query = supabase.from("posts").select();
  if (filter === "인기 게시물 순") {
    query = query.order("likes", { ascending: false });
  } else if (filter === "최신 게시물 순") {
    query = query.order("created_at", { ascending: false });
  } else if (filter === "오래된 게시물 순") {
    query = query.order("created_at", { ascending: true });
  }
  const { data } = await query;
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    filter: "최신 게시물 순",
    status: "idle",
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = postsSlice.actions;

export default postsSlice.reducer;
