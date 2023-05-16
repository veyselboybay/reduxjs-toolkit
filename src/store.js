import cartReducer from './features/cart/cartSlice';
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});


