import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        setFavorite: (state, action) => {
            state.data = action.payload;
        },
        resetFavorite: (state) => {
            state.data = null;
        },
    },
});

export const { setFavorite, resetFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
