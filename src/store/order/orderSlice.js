import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API
const BASE_URL = import.meta.env.VITE_API_URL;

// Async Thunks

//this is for placing order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/order/placeOrder`,
        orderData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to place order."
      );
    }
  }
);

//this is for fetching order history
export const fetchOrderHistory = createAsyncThunk(
  "orders/fetchOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/order/history`, {
        withCredentials: true,
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch order history."
      );
    }
  }
);
//this is for order history for admin
export const fetchAllOrdersAdmin = createAsyncThunk(
  "orders/fetchAllOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/order/admin/history`,
        {
          withCredentials: true,
        }
      );
      return response.data.orders || [];
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch all orders."
      );
    }
  }
);

//this is for status change
export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/order/orderStatus/${orderId}`,
        { status },
        { withCredentials: true }
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to change order status."
      );
    }
  }
);

// This is slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order._id === orderId);
      if (order) {
        order.payment.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.url) {
          state.orders.unshift(action.payload.order || action.payload);
        }
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload || [];
        state.error = null;
      })
      .addCase(fetchOrderHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        (state.isLoading = false), (state.error = null);
      });
  },
});

//actions

export default orderSlice.reducer;
