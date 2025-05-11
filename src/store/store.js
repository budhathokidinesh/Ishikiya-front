import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import foodReducer from "./admin/foodSlice.js";
import userReducer from "./user/userSlice.js";
import cartReducer from "./cart/cartSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
export default store;
