import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import categorySlice from './slice/categorySlice'
import favoriteSlice from './slice/favoriteSlice'
import cartSlice from './slice/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice,
        favorite: favoriteSlice,
        cart: cartSlice,
    },
})
