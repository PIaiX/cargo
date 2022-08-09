import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    token: "",
    user: {},
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
      state.data = initialState.data;
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
