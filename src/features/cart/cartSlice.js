import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: false,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name,thunkAPI) => {
    try {
        const res = await axios(url);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('error');
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state,action) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload);
            cartItem.amount += 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload);
            cartItem.amount -= 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled,(state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload;
        }).addCase(getCartItems.rejected,(state, action) => {
            state.isLoading = false;
        })
    }

});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;