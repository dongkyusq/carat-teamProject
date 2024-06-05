import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

const MBTI_TYPES = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async filter => {
  let postsQuery = supabase.from("posts").select();

  if (filter === "인기 게시물 순") {
    postsQuery = postsQuery.order("likes", { ascending: false, nullsLast: true });
  } else if (filter === "최신 게시물 순") {
    postsQuery = postsQuery.order("created_at", { ascending: false });
  } else if (filter === "오래된 게시물 순") {
    postsQuery = postsQuery.order("created_at", { ascending: true });
  } else if (MBTI_TYPES.includes(filter)) {
    postsQuery = postsQuery.eq("mbti", filter);
  }

  const [postData] = await Promise.all([postsQuery]);

  console.log("Posts data:", postData);

  return { posts: postData.data };
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    filter: "게시물 정렬",
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
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = postsSlice.actions;
export default postsSlice.reducer;
