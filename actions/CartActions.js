import Cookies from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from '../constants/CartConstants';

export const AddToCart = (product, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: { ...product, qty },
    });
    Cookies.set('cart', JSON.stringify(getState().cart));
};

export const RemoveFromCart = (item) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: item,
    });
    Cookies.set('cart', JSON.stringify(getState().cart));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    Cookies.set('cart', JSON.stringify(getState().cart));
};
export const savePaymentMethod = (data) => (dispatch, getState) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data,
    });
    Cookies.set('cart', JSON.stringify(getState().cart));
};
