const BASE_URL = import.meta.env.VITE_API_URL;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewFood = createAsyncThunk(
  "food/addNewFood",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/v1/food/addFood`,
        formData,
        { withCredentials: true }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchAllFoods = createAsyncThunk(
  "food/fetchAllFoods",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/food/getAllFoods`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const editFood = createAsyncThunk(
  "food/editFood",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/api/v1/food/updateFood/${id}`,
        formData
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${BASE_URL}/api/v1/food/deleteFood/${id}`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFoods.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default AdminProductsSlice.reducer;
