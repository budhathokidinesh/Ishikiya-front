import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "@/store/order/orderSlice";
import { Link } from "react-router-dom";
import ReviewForm from "@/components/ReviewForm";
import GenerateReceiptPDF from "@/utils/GenerateReceiptPDF";
import Receipt from "@/components/Receipt";
import {
  RefreshCw, ShoppingBag, Download, ChevronDown,
  ChevronUp, Loader2, AlertCircle, CreditCard, Hash,
} from "lucide-react";

const PAYMENT_STATUS = {
  Paid:       { cls: "bg-teal-100 text-teal-700",    dot: "bg-teal-500"   },
  Pending:    { cls: "bg-amber-100 text-amber-700",  dot: "bg-amber-400"  },
  Processing: { cls: "bg-blue-100 text-blue-700",    dot: "bg-blue-500"   },
  Failed:     { cls: "bg-red-100 text-red-600",      dot: "bg-red-500"    },
  Refunded:   { cls: "bg-gray-100 text-gray-600",    dot: "bg-gray-400"   },
};

const ORDER_STATUS = {
  Pending:    { cls: "bg-amber-50 text-amber-600 border border-amber-200"   },
  Confirmed:  { cls: "bg-blue-50 text-blue-600 border border-blue-200"     },
  Preparing:  { cls: "bg-orange-50 text-orange-600 border border-orange-200"},
  Delivered:  { cls: "bg-teal-50 text-teal-600 border border-teal-200"     },
  Cancelled:  { cls: "bg-red-50 text-red-500 border border-red-200"        },
};

const StatusBadge = ({ label, map, fallback = "bg-gray-100 text-gray-600" }) => {
  const cfg = map[label] || { cls: fallback, dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${cfg.cls}`}>
      {cfg.dot && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
      {label}
    </span>
  );
};

const UserOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const [expanded, setExpanded] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { dispatch(fetchOrderHistory()); }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchOrderHistory()).finally(() => setRefreshing(false));
  };

  const handleDownloadReceipt = (order) => {
    GenerateReceiptPDF(order, Receipt).catch((err) => console.error(err));
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const sorted = [...(orders ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  /* ── Loading ──────────────────────────────────────── */
  if (isLoading && !orders?.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-amber-400" />
          <p className="text-gray-400 text-sm">Loading your orders…</p>
        </div>
      </div>
    );
  }

  /* ── Error ────────────────────────────────────────── */
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
      >
        <div className="bg-white rounded-2xl border border-red-100 shadow p-6 max-w-sm w-full text-center">
          <AlertCircle size={36} className="text-red-400 mx-auto mb-3" />
          <p className="text-gray-700 font-semibold mb-1">Something went wrong</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button onClick={handleRefresh}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold rounded-full transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-[12vh] pb-20 px-4 md:px-6"
      style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
    >
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between py-7">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              My <span className="text-amber-500">Orders</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {sorted.length} order{sorted.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-200 hover:bg-amber-50 text-amber-600 text-xs font-bold rounded-full shadow-sm transition"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Empty */}
        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm py-20 text-center">
            <span className="text-6xl block mb-4">🐟</span>
            <p className="font-bold text-gray-700 text-lg mb-1">No orders yet</p>
            <p className="text-gray-400 text-sm mb-6">
              You haven&apos;t placed any orders — time to fix that!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow transition"
            >
              <ShoppingBag size={15} /> Browse Menu
            </Link>
          </div>
        )}

        {/* Order cards */}
        <div className="space-y-4">
          {sorted.map((order) => {
            const isOpen = expanded[order._id];
            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden"
              >
                {/* Card header — always visible */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-amber-50/50 transition"
                  onClick={() => toggleExpand(order._id)}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <StatusBadge label={order.payment.status} map={PAYMENT_STATUS} />
                    <StatusBadge
                      label={order.orderStatus}
                      map={ORDER_STATUS}
                      fallback="bg-gray-50 text-gray-600 border border-gray-200"
                    />
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                      <p className="text-xs font-mono text-gray-500">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                    <span className="text-amber-600 font-extrabold text-base whitespace-nowrap">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    {isOpen
                      ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                      : <ChevronDown size={16} className="text-gray-400 shrink-0" />
                    }
                  </div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-amber-50 px-5 py-4 space-y-4">

                    {/* Payment info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CreditCard size={12} className="text-amber-400" />
                        {order.payment.method}
                      </span>
                      {order.payment.transitionId && (
                        <span className="flex items-center gap-1.5 font-mono">
                          <Hash size={12} className="text-amber-400" />
                          {order.payment.transitionId}
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-amber-50 border border-amber-100">
                            {item.food?.imageUrl ? (
                              <img
                                src={item.food.imageUrl}
                                alt={item.food.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-amber-300 text-xl">🐟</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-gray-800 leading-snug">
                                {item.food?.title || "Unknown Item"}
                              </p>
                              <span className="text-sm font-bold text-amber-600 shrink-0">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Qty: {item.quantity} ·{" "}
                              ${(item.price * item.quantity).toFixed(2)} total
                            </p>
                            <ReviewForm foodId={item.food?._id} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                      <div className="text-sm text-gray-600">
                        <span className="text-gray-400">Total paid: </span>
                        <span className="font-extrabold text-amber-600 text-base">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownloadReceipt(order)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-white text-xs font-bold rounded-full shadow transition"
                      >
                        <Download size={13} /> Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserOrderPage;
