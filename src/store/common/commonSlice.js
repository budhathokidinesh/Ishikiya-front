const BASE_URL = import.meta.env.VITE_API_URL;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

//this is for getting the uploaded feature images
export const getFeatureImages = createAsyncThunk(
  "/search/getFeatureImages",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/common/feature/get`);
    return response.data;
  }
);
//this is for uploding images
export const addFeatureImages = createAsyncThunk(
  "/search/addFeatureImages",
  async (image) => {
    const response = await axios.post(`${BASE_URL}/api/common/feature/add`, {
      image,
    });
    return response.data;
  }
);
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export default commonSlice.reducer;
