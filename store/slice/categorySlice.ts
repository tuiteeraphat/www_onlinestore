import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.data = action.payload;
        },
        resetCategory: (state) => {
            state.data = null;
        },
    },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
