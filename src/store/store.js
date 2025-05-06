import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import foodReducer from "./admin/foodSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
  },
});
export default store;
