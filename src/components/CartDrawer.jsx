// src/components/CartDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiMinus, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import {
  clearCart,
  removeFromCart,
  updateCartItem,
} from "@/store/cart/cartSlice";
import { placeOrder } from "@/store/order/orderSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  //this is for handling in checkout
  const handleOnCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!acceptedTerms) {
      alert("You must accept the Terms and Conditions before proceeding");
      return;
    }

    try {
      const orderData = {
        cart: cartItems.map((item) => ({
          foodId: item.food._id,
          quantity: item.quantity,
        })),
        paymentMethod: "Stripe",
      };

      // Dispatch the action
      const response = await dispatch(placeOrder(orderData)).unwrap();
      console.log("Stripe Response:", response);

      // Handle the response
      if (response?.url) {
        // Redirect to Stripe
        window.location.href = response.url;
      } else if (response?.order) {
        // Handle non-Stripe success case
        alert("Order placed successfully!");
        // Optionally clear loading state
        dispatch(clearCart());
        onClose();
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Payment processing failed");
    }
  };

  const drawerRef = useRef(null);
  //This is for closing cart drawer while clicking outside without any re-render the dom
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  //this is for handling increasing quantity
  const handleIncrease = (foodId, currentQty) => {
    dispatch(updateCartItem({ foodId, quantity: currentQty + 1 }));
  };

  //this is for decreasing the quantity
  const handleDecrease = (foodId, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateCartItem({ foodId, quantity: currentQty - 1 }));
    }
  };

  //this is for removing items
  const handleRemove = (foodId) => {
    dispatch(removeFromCart({ foodId }));
  };
  //this is for clearing the entire cart
  const handleClearCart = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      return;
    }
    dispatch(clearCart());
    setShowClearConfirm(false);
  };

  if (!isOpen) return null;
  console.log(cartItems, "Cart Items");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div
        ref={drawerRef}
        className="bg-white w-full sm:w-[500px] p-6 shadow-lg h-full flex flex-col"
      >
        {/*This is for  Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/*This is for Cart Items */}
        <div className="flex-grow overflow-y-auto py-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.food?._id}
                  className="flex gap-4 p-3 border rounded-lg hover:shadow-2xl transition-all"
                >
                  <img
                    src={item.food?.imageUrl}
                    alt={item.food?.title}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.food?.title}</h3>
                      <button
                        onClick={() => handleRemove(item.food?._id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mt-1">
                      ${item.food?.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            handleDecrease(item.food?._id, item.quantity)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleIncrease(item.food?._id, item.quantity)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      <p className="font-medium">
                        ${(item.food?.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Your cart is empty
                <br />
                <span className="text-sm">
                  Start adding some delicious items!
                </span>
              </p>
            </div>
          )}
        </div>

        {/* This is for Footer */}
        {cartItems.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Delivery Fee</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mb-4">
              <span>Total</span>
              <span>${totalPrice?.toFixed(2)}</span>
            </div>
            {/* This is for clear confirmation  */}
            {showClearConfirm && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start">
                  <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Clear your cart?</p>
                    <p className="text-sm text-gray-600">
                      This will remove all items permanently.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleClearCart}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer"
                      >
                        Confirm Clear
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={handleClearCart}
                className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
                  showClearConfirm
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <FiTrash2 />
                {showClearConfirm ? "Cancel" : "Clear Cart"}
              </button>
              {/* This is for terms and conditions  */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  I accept the{" "}
                  <a
                    href="/order-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {/* This is for process to checkout  */}
              <button
                onClick={handleOnCheckout}
                disabled={!acceptedTerms}
                className={`w-full py-3 rounded-lg font-medium transition cursor-pointer ${
                  acceptedTerms
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
