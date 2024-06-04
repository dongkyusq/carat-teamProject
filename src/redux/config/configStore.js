import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slices/postSortSlice";

export const store = configureStore({
  reducer: { posts: postsReducer },
});

export default store;
