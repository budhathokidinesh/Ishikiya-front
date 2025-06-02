import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCartItems } from "@/store/cart/cartSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const CartSync = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const syncCart = async () => {
      const guestId = localStorage.getItem("guestId");

      if (isAuthenticated && guestId) {
        console.log("Redux cart before sync:", cartItems);
        try {
          const res = await axios.post(
            `${BASE_URL}/api/v1/cart/sync`,
            { guestId }, // request body
            {
              headers: {
                Authorization: `Bearer ${token}`, // if your backend uses this (you said your middleware reads from cookie though)
              },
              withCredentials: true, // crucial to send cookies!
            }
          );
          // Only opdates the redux after merged
          if (res.data.cart?.items) {
            dispatch(setCartItems(res.data.cart.items));
          }
          localStorage.removeItem("guestId"); // Clear guest ID
        } catch (err) {
          console.error("Cart sync failed:", err.response?.data || err.message);
        }
      }
    };

    syncCart();
  }, [isAuthenticated]);

  return null;
};

export default CartSync;
