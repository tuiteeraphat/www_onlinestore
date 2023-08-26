import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.data = action.payload
        },
        resetAuth: (state) => {
            state.data = null
        },
    },
})

export const { setAuth, resetAuth } = authSlice.actions

export default authSlice.reducer
