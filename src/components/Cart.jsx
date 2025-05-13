import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalQuantity, totalPrice, isLoading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  // Handle quantity change
  const handleQuantityChange = (item, quantity) => {
    dispatch(updateCartItem({ productId: item.product._id, quantity }));
  };

  // Remove item from cart
  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.product._id));
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {isLoading ? (
        <p>Loading cart...</p>
      ) : cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between p-4 bg-white shadow rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600">${item.product.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item, Number(e.target.value))
                    }
                    className="w-12 border rounded px-2"
                  />
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button className="btn btn-primary mt-4" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
