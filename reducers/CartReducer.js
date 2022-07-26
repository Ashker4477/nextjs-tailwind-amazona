import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, SAVE_SHIPPING_ADDRESS } from '../Constants/CartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
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
        case CART_RESET:
            return {
                ...state,
                cartItems: [],
                shippingAddress: {
                    ...state.shippingAddress,
                },
                paymentMethod: '',
            };
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                cartItems: [...state.cartItems],
                shippingAddress: {
                    ...state.shippingAddress,
                    ...action.payload,
                },
                paymentMethod: '',
            };
        default:
            return state;
    }
};
