import Menu from './Menu'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataFromApi, fetchDataToApi } from '@/utils/customHook'
import { setAuth } from '@/store/slice/authSlice'
import { pathApi } from '@/utils/constants'
import { setCategory } from '@/store/slice/categorySlice'
import { setFavorite } from '@/store/slice/favoriteSlice'
import { setCart } from '@/store/slice/cartSlice'

export default function Navbar() {
    const dispatch = useDispatch()

    // useEffect(() => {
    //   const loadAuth = async () => {
    //     try {
    //       const response = await fetchDataToApi(pathApi.getCustomerByToken, {});
    //       dispatch(setAuth(response.data));
    //       getFavorite(response.data.customer_id);
    //       getCart(response.data.customer_id);
    //     } catch (error) { }
    //   };

    //   const getCategory = async () => {
    //     try {
    //       const response = await fetchDataFromApi(pathApi.getAllCategory);
    //       dispatch(setCategory(response.data));
    //     } catch (error) { }
    //   };

    //   const getFavorite = async (customerId: string) => {
    //     try {
    //       const allFavorite = await fetchDataFromApi(
    //         `${pathApi.getFavoriteByCustomerId}/${customerId}}`
    //       );
    //       dispatch(setFavorite(allFavorite.data));
    //     } catch (error) { }
    //   };

    //   const getCart = async (customerId: string) => {
    //     try {
    //       const getCart = await fetchDataFromApi(
    //         `${pathApi.getCartByCustomerId}/${customerId}}`
    //       );
    //       dispatch(setCart(getCart.data));
    //     } catch (error) { }
    //   };

    //   loadAuth();
    //   getCategory();
    // }, []);

    return (
        <nav className="mb-5">
            <Menu />
        </nav>
    )
}
