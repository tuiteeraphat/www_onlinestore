import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.data = action.payload;
        },
        resetCart: (state) => {
            state.data = null;
        },
    },
});

export const { setCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
