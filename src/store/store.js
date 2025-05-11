import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import foodReducer from "./admin/foodSlice.js";
import userReducer from "./user/userSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    user: userReducer,
  },
});
export default store;
