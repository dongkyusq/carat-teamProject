import { configureStore } from "@reduxjs/toolkit";
import postsSortSlice from "../slices/postSortSlice";
import isLoggedInSlice from "../slices/isLoggedInSlice";

export const store = configureStore({
  reducer: {
    posts: postsSortSlice,
    isLoggedIn: isLoggedInSlice,
  },
});

export default store;
