const BASE_URL = import.meta.env.VITE_API_URL;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  foodList: [],
};
//this is for adding food
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
//this is for fetching all foods
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
//this is for getting single food
export const getFood = createAsyncThunk(
  "food/getFood",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/food/getFood/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//this is for editing food
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
//this is for deleting food
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
  name: "adminFood",
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
        state.foodList = action.payload.foods;
      })
      .addCase(fetchAllFoods.rejected, (state) => {
        (state.isLoading = false), (state.foodList = []);
      });
  },
});

export default AdminProductsSlice.reducer;
