import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    token: "",
    rememberMe: false,
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    resetCurrentUser: (state, action) => {
      state.data = initialState;
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
