import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice'
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    }
});


