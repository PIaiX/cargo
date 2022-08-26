import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: {
        variant: null,
        isShow: false,
        message: ''
    }
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlertAction: (state, action) => {
            state.data = action.payload;
        },
        showNoAuthAlertAction: (state, action) => {
            state.data = action.payload
        },
        resetAlertAction: state => {
            state.data = initialState.data
        }
    },
});

export const {setAlertAction, showNoAuthAlertAction, resetAlertAction} = alertSlice.actions;
export default alertSlice.reducer;