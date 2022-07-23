import Cookies from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/CartConstants';

export const AddToCart = (product, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: { ...product, qty },
    });
    Cookies.set('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const RemoveFromCart = (item) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: item,
    });
    Cookies.set('cartItems', JSON.stringify(getState().cart.cartItems));
};
