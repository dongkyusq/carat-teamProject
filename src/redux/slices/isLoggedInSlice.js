import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      const loginState = action.payload;
      return loginState;
    },
  },
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
