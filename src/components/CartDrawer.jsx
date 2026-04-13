import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCart,
  removeFromCart,
  updateCartItem,
} from "@/store/cart/cartSlice";
import { placeOrder } from "@/store/order/orderSlice";
import { getOrCreateGuestId } from "@/utils/guestId";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  User,
  Mail,
  Phone,
  ChevronLeft,
  AlertTriangle,
  CreditCard,
  LogIn,
  Loader2,
} from "lucide-react";

const guestInputClass =
  "w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const drawerRef = useRef(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setShowClearConfirm(false);
      setIsGuestMode(false);
      setAcceptedTerms(false);
    }
  }, [isOpen]);

  const handleIncrease = (foodId, qty) =>
    dispatch(updateCartItem({ foodId, quantity: qty + 1 }));
  const handleDecrease = (foodId, qty) => {
    if (qty > 1) dispatch(updateCartItem({ foodId, quantity: qty - 1 }));
  };
  const handleRemove = (foodId) => dispatch(removeFromCart({ foodId }));

  const handleClearCart = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      return;
    }
    dispatch(resetCart());
    setShowClearConfirm(false);
  };

  const guestReady = guestInfo.name && guestInfo.email && guestInfo.phone;
  const canCheckout = user || (isGuestMode && guestReady);

  const handleOnCheckout = async () => {
    if (!cartItems.length) {
      return;
    }
    if (!acceptedTerms) {
      return;
    }
    if (!user && !guestReady) {
      return;
    }

    setCheckingOut(true);
    try {
      const orderData = {
        cart: cartItems.map((item) => ({
          foodId: item.food._id,
          quantity: item.quantity,
        })),
        paymentMethod: "Stripe",
      };
      if (!user) {
        orderData.guestId = getOrCreateGuestId();
        orderData.guestInfo = guestInfo;
      }

      const response = await dispatch(placeOrder(orderData)).unwrap();

      if (response?.url) {
        dispatch(resetCart());
        window.location.href = response.url;
      } else if (response?.order) {
        dispatch(resetCart());
        onClose();
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
    >
      <div
        ref={drawerRef}
        className="w-full sm:w-[420px] h-full bg-white flex flex-col shadow-2xl"
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="shrink-0 px-5 py-4 flex items-center justify-between border-b border-amber-100"
          style={{ background: "linear-gradient(135deg,#92400e,#d97706)" }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={20} className="text-amber-200" />
            <div>
              <h2 className="text-white font-extrabold text-base leading-tight">
                Your Cart
              </h2>
              <p className="text-amber-200 text-[11px]">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Items ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-amber-50/40">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-20">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl">
                🐟
              </div>
              <div>
                <p className="font-bold text-gray-700 text-base">
                  Your cart is empty
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Add some crispy goodness!
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold rounded-full shadow transition"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.food?._id}
                className="bg-white rounded-2xl border border-amber-100 shadow-sm p-3 flex gap-3"
              >
                {/* Image */}
                <div
                  className="w-18 h-18 shrink-0 rounded-xl overflow-hidden bg-amber-50"
                  style={{ width: 72, height: 72 }}
                >
                  <img
                    src={item.food?.imageUrl}
                    alt={item.food?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-1">
                      {item.food?.title}
                    </h3>
                    <button
                      onClick={() => handleRemove(item.food?._id)}
                      className="shrink-0 w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-400 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <p className="text-amber-500 font-bold text-sm mt-0.5">
                    ${item.food?.price?.toFixed(2)}
                    <span className="text-gray-400 font-normal text-xs">
                      {" "}
                      each
                    </span>
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty control */}
                    <div className="flex items-center border border-amber-200 rounded-full overflow-hidden bg-amber-50">
                      <button
                        onClick={() =>
                          handleDecrease(item.food?._id, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center text-amber-600 hover:bg-amber-100 disabled:opacity-30 transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2.5 text-sm font-bold text-gray-800 min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(item.food?._id, item.quantity)
                        }
                        className="w-7 h-7 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="font-extrabold text-gray-800 text-sm">
                      ${(item.food?.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t border-amber-100 bg-white px-5 py-4 space-y-4">
            {/* Order summary */}
            <div className="bg-amber-50 rounded-2xl px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className="text-teal-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-800 text-base border-t border-amber-200 pt-2 mt-1">
                <span>Total</span>
                <span className="text-amber-600">
                  ${totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Clear confirm */}
            {showClearConfirm && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-2.5">
                <AlertTriangle
                  size={16}
                  className="text-red-400 shrink-0 mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-700">
                    Clear entire cart?
                  </p>
                  <p className="text-xs text-red-500 mt-0.5">
                    This removes all items permanently.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleClearCart}
                      className="px-3 py-1.5 bg-red-400 hover:bg-red-500 text-white text-xs font-bold rounded-full transition"
                    >
                      Yes, clear it
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-full hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Guest form */}
            {!user && isGuestMode && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => setIsGuestMode(false)}
                    className="text-amber-500 hover:text-amber-600"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <p className="text-sm font-bold text-gray-700">
                    Guest details
                  </p>
                </div>
                {[
                  {
                    icon: User,
                    type: "text",
                    name: "name",
                    placeholder: "Full name",
                  },
                  {
                    icon: Mail,
                    type: "email",
                    name: "email",
                    placeholder: "Email address",
                  },
                  {
                    icon: Phone,
                    type: "tel",
                    name: "phone",
                    placeholder: "Phone number",
                  },
                ].map(({ icon: Icon, type, name, placeholder }) => (
                  <div key={name} className="relative">
                    <Icon
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
                    />
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={guestInfo[name]}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, [name]: e.target.value })
                      }
                      className={guestInputClass}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Auth / guest CTA */}
            {!user && !isGuestMode && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsGuestMode(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs font-bold rounded-full transition"
                >
                  <ShoppingCart size={14} /> Guest Checkout
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/login?redirect=cart";
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold rounded-full shadow transition"
                >
                  <LogIn size={14} /> Login & Pay
                </button>
              </div>
            )}

            {/* Terms */}
            {canCheckout && (
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition ${
                      acceptedTerms
                        ? "bg-amber-400 border-amber-400"
                        : "border-amber-300 bg-white"
                    }`}
                  >
                    {acceptedTerms && (
                      <span className="text-white text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="/order-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:underline font-semibold"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              {!showClearConfirm && (
                <button
                  onClick={handleClearCart}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-2 border-amber-200 text-amber-600 text-xs font-bold rounded-full hover:bg-amber-50 transition"
                >
                  <Trash2 size={13} /> Clear
                </button>
              )}

              {canCheckout && (
                <button
                  onClick={handleOnCheckout}
                  disabled={!acceptedTerms || checkingOut}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold shadow transition ${
                    acceptedTerms && !checkingOut
                      ? "bg-amber-400 hover:bg-amber-500 active:scale-95 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {checkingOut ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} /> Checkout · $
                      {totalPrice?.toFixed(2)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
