import { resetCart } from "@/store/cart/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag, UtensilsCrossed, Clock } from "lucide-react";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetCart());
    localStorage.removeItem("cartItems");
  }, [dispatch, sessionId]);

  const handleGoBack = () => navigate(isAuthenticated ? "/orders" : "/menu");

  const steps = [
    { icon: CheckCircle, label: "Order confirmed",   done: true  },
    { icon: UtensilsCrossed, label: "Being prepared", done: true  },
    { icon: Clock,       label: "On its way",         done: false },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-[10vh] pb-16"
      style={{ background: "linear-gradient(160deg,#fffbeb 0%,#fde68a 50%,#bfdbfe 100%)" }}
    >
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-amber-100 px-8 py-10 text-center">

          {/* Animated tick */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-30" />
            <div className="relative w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center shadow-lg">
              <CheckCircle size={44} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-2xl font-black text-gray-800 mb-1">Order Placed!</h1>
          <p className="text-gray-500 text-sm mb-2">
            Your payment was successful. Time to get excited — crispy goodness is on its way! 🐟
          </p>

          {sessionId && (
            <p className="text-[11px] text-gray-400 font-mono bg-amber-50 rounded-lg px-3 py-1.5 inline-block mt-1 mb-6">
              Ref: {sessionId.slice(0, 24)}…
            </p>
          )}

          {/* Progress steps */}
          <div className="flex items-center justify-between mb-8 mt-4 px-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition ${
                    step.done ? "bg-teal-500 text-white" : "bg-amber-100 text-amber-400"
                  }`}>
                    <step.icon size={18} />
                  </div>
                  <span className={`text-[10px] font-semibold ${step.done ? "text-teal-600" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full ${step.done ? "bg-teal-400" : "bg-amber-100"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Info strip */}
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={14} className="text-amber-500 shrink-0" />
              <span>Estimated delivery: <strong className="text-gray-800">30–45 minutes</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <UtensilsCrossed size={14} className="text-amber-500 shrink-0" />
              <span>Freshly prepared — no reheated food, ever.</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-white font-bold py-3 rounded-full shadow-md transition"
            >
              <ShoppingBag size={17} />
              {isAuthenticated ? "View My Orders" : "Back to Menu"}
            </button>

            <Link
              to="/menu"
              className="w-full text-center py-2.5 rounded-full border-2 border-amber-200 text-amber-600 text-sm font-semibold hover:bg-amber-50 transition"
            >
              Order Again 🍟
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          🐟 Thank you for choosing The Chippy — we appreciate every order!
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
