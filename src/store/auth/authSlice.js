import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

//this is initial state
const initialState = {
  isLoading: false,
  user: null,
  error: null,
};
//this is register user asyncthunk
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      formData
    );
    return response.data;
  }
);

//this is for login user

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

//this is for logout user
export const LogoutUser = createAsyncThunk("/user/logoutUser", async () => {
  const response = await axios.post(`${BASE_URL}/api/v1/auth/logout`);
  return response.data;
});

//this is slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(LogoutUser.fulfilled, (state) => {
        (state.isLoading = false), (state.user = null);
      });
  },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
