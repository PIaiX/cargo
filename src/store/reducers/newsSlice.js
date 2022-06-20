import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hasErrors: false,
  data: []
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getAllNews: (state, action) => {
      state.loading = true;
    },
    getAllNewsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    getAllNewsFailure: (state, action) => {
      state.loading = false
      state.hasErrors = true
    }
  },
});

export const { getAllNews, getAllNewsSuccess, getAllNewsFailure } = newsSlice.actions;
export default newsSlice.reducer;