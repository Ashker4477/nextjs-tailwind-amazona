import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            let cartItem = action.payload;
            let existItem = state.cartItems.find((item) => item.slug == cartItem.slug);
            if (existItem) {
                return state;
            } else {
                return { ...state, cartItems: [...state.cartItems, cartItem] };
            }
        case CART_REMOVE_ITEM:
            const removed = state.cartItems.filter((item) => item.slug !== action.payload.slug);
            return { ...state, cartItems: [...removed] };
        default:
            return state;
    }
};
