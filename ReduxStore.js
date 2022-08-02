import Cookies from 'js-cookie';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/CartReducer';

const initialState = {
    cart: Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart'))
        : {
              cartItems: [],
              shippingAddress: {},
              paymentMethod: '',
          },
};

const reducer = combineReducers({
    cart: cartReducer,
});
const middleware = [thunk];
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
