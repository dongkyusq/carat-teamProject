import { configureStore } from "@reduxjs/toolkit";
import postsSortSlice from "../slices/postSortSlice";
import isLoggedInSlice from "../slices/isLoggedInSlice";
import postSlice from "../slices/postSlice";

export const store = configureStore({
  reducer: {
    posts: postsSortSlice,
    post: postSlice,
    isLoggedIn: isLoggedInSlice,
  },
});

export default store;
