import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            let newitem = action.payload;
            let existItem = state.cartItems.find((item) => item.slug == newitem.slug);
            const cartItem = existItem ? state.cartItems.map((item) => (item.slug === existItem.slug ? newitem : item)) : [...state.cartItems, newitem];
            if (existItem) {
                return { ...state, cartItems: [...cartItem] };
            } else {
                return { ...state, cartItems: [...state.cartItems, newitem] };
            }
        case CART_REMOVE_ITEM:
            const removed = state.cartItems.filter((item) => item.slug !== action.payload.slug);
            return { ...state, cartItems: [...removed] };
        default:
            return state;
    }
};
