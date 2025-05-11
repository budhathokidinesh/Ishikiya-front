const BASE_URL = import.meta.env.VITE_API_URL;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: null,
};

//this is for getting single user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/user/getUser`, {
        withCredentials: true,
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//this is for editing food
export const editUser = createAsyncThunk(
  "user/editUser",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/api/v1/user/updateUser`,
        formData,
        {
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//this is for deleting food
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${BASE_URL}/api/v1/user/deleteUser/${id}`,
        {
          withCredentials: true,
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.user = action.payload?.user || null);
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;
