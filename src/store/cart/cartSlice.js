import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

//initial state
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

//Fetcing user cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/cart/getCart`, {
        withCredentials: true,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);

//add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ foodId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/cart/addCart`,
        { foodId, quantity },
        {
          withCredentials: true,
        }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

//update the cart
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ foodId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/cart/updateCart`,
        { foodId, quantity },
        {
          withCredentials: true,
        }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);
//remove from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ foodId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/cart/deleteCartItem`,
        {
          data: { foodId },
          withCredentials: true,
        }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);
//clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/cart/clearCart`, {
        withCredentials: true,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);
//cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //load cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items;
        state.totalQuantity = state.cartItems?.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.cartItems?.reduce(
          (total, item) => total + item.total,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        //this is for add to cart
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.cartItems?.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = action.cartItems?.reduce(
          (total, item) => total + item.total,
          0
        );

        //this is for updating the cart items
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.cartItems?.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = action.cartItems?.reduce(
          (total, item) => total + item.total,
          0
        );
        //this is for removing from the cart
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.cartItems?.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = action.cartItems?.reduce(
          (total, item) => total + item.total,
          0
        );
        //this is for clear the cart
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});
//actions
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
