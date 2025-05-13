// src/components/CartDrawer.jsx
import React from "react";
import { useSelector } from "react-redux";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-80 p-4 shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-red-500 text-2xl font-bold">
            &times;
          </button>
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.food?._id}
                  className="flex items-center gap-4 p-2 bg-gray-100 rounded"
                >
                  <img
                    src={item.food?.imageUrl}
                    alt={item.food?.title}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="text-sm font-bold">{item.food?.title}</h3>
                    <p className="text-sm">
                      ${item.food?.price} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">
                Total: ${totalPrice?.toFixed(2)}
              </h3>
            </div>
            <button className="btn btn-primary w-full mt-4">Checkout</button>
          </>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
