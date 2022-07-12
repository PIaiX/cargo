import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    hasErrors: false,
    city: null
}

const selectedCitySlice = createSlice({
    name: "selectedCity",
    initialState,
    reducers: {
        defineCity: (state, action) => {
            state.loading = true;
        },
        defineCitySuccess: (state, action) => {
            state.loading = false
            state.city = action.payload
        },
        defineCityFailure: (state, action) => {
            state.loading = false
            state.hasErrors = true
        }
    },
});

export const { defineCity, defineCitySuccess, defineCityFailure } = selectedCitySlice.actions;
export default selectedCitySlice.reducer;