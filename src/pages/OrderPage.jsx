import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, fetchAllOrdersAdmin } from "@/store/order/orderSlice";
import { useLocation } from "react-router-dom";
import OrderPDFDownloader from "@/components/OrderPDFDownloader";
import {
  RefreshCw, AlertCircle, Loader2, ShoppingBag,
  Phone, Calendar, CreditCard,
} from "lucide-react";

/* ── Status config ───────────────────────────────────────────── */
const ORDER_STATUSES   = ["Order Placed", "Processing", "Ready", "Completed", "Cancelled"];
const PAYMENT_STATUSES = ["Paid", "Pending", "Processing", "Failed", "Refunded"];

const ORDER_BADGE = {
  "Order Placed": "bg-amber-100 text-amber-700",
  Processing:     "bg-blue-100 text-blue-700",
  Ready:          "bg-teal-100 text-teal-700",
  Completed:      "bg-green-100 text-green-700",
  Cancelled:      "bg-red-100 text-red-600",
};
const PAYMENT_BADGE = {
  Paid:       "bg-teal-100 text-teal-700",
  Pending:    "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Failed:     "bg-red-100 text-red-600",
  Refunded:   "bg-gray-100 text-gray-600",
};

const StatusSelect = ({ value, options, badge, disabled, onChange }) => (
  <select
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none ${badge[value] || "bg-gray-100 text-gray-600"} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
  >
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);

const formatDate = (date) => date.toISOString().split("T")[0];

/* ── Page ────────────────────────────────────────────────────── */
const AdminOrderPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);

  const filterParam      = searchParams.get("filter")    || "All";
  const startDateParam   = searchParams.get("startDate");
  const endDateParam     = searchParams.get("endDate");

  const [statusFilter, setStatusFilter] = useState(filterParam);
  const [dateFilter, setDateFilter] = useState({
    startDate: startDateParam
      ? new Date(startDateParam + "T00:00:00")
      : new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: endDateParam
      ? new Date(endDateParam + "T23:59:59")
      : new Date(new Date().setHours(23, 59, 59, 999)),
  });
  const [updatingOrders, setUpdatingOrders] = useState({});

  useEffect(() => { dispatch(fetchAllOrdersAdmin()); }, [dispatch]);

  useEffect(() => {
    if (filterParam) setStatusFilter(filterParam);
    if (startDateParam) setDateFilter((p) => ({ ...p, startDate: new Date(startDateParam + "T00:00:00") }));
    if (endDateParam)   setDateFilter((p) => ({ ...p, endDate:   new Date(endDateParam   + "T23:59:59") }));
  }, [filterParam, startDateParam, endDateParam]);

  const handleStatusChange = async (orderId, newStatus, statusType) => {
    setUpdatingOrders((p) => ({ ...p, [orderId]: { ...p[orderId], [statusType]: true } }));
    try {
      const updatedData = statusType === "order"
        ? { orderStatus: newStatus }
        : { paymentStatus: newStatus };
      await dispatch(changeOrderStatus({ orderId, updateData: updatedData })).unwrap();
      dispatch({ type: "orders/updateOrderStatus", payload: { orderId, updatedData } });
    } catch {
      dispatch(fetchAllOrdersAdmin());
    } finally {
      setUpdatingOrders((p) => ({ ...p, [orderId]: { ...p[orderId], [statusType]: false } }));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const d = new Date(order.createdAt);
    const inRange = d >= dateFilter.startDate && d <= dateFilter.endDate;
    const matchStatus = statusFilter === "All" || order.orderStatus === statusFilter;
    return inRange && matchStatus;
  });

  const STATUS_PILLS = ["All", ...ORDER_STATUSES];

  return (
    <div
      className="min-h-screen pt-[10vh] pb-20 px-4 md:px-6"
      style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-7">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Admin <span className="text-amber-500">Orders</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""} shown</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(fetchAllOrdersAdmin())}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-200 hover:bg-amber-50 text-amber-600 text-xs font-bold rounded-full shadow-sm transition"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <OrderPDFDownloader orders={filteredOrders} />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm px-5 py-4 mb-5">
          {/* Status pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {STATUS_PILLS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  statusFilter === s
                    ? "bg-amber-400 text-white shadow-sm"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Date range */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-500">From</span>
              <input
                type="date"
                value={formatDate(dateFilter.startDate)}
                max={formatDate(dateFilter.endDate)}
                onChange={(e) => setDateFilter((p) => ({ ...p, startDate: new Date(e.target.value + "T00:00:00") }))}
                className="text-xs bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">To</span>
              <input
                type="date"
                value={formatDate(dateFilter.endDate)}
                min={formatDate(dateFilter.startDate)}
                onChange={(e) => setDateFilter((p) => ({ ...p, endDate: new Date(e.target.value + "T23:59:59") }))}
                className="text-xs bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={36} className="animate-spin text-amber-400" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Orders table */}
        {!isLoading && !error && (
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="py-20 text-center">
                <span className="text-5xl block mb-3">🐟</span>
                <p className="font-bold text-gray-700 mb-1">No orders found</p>
                <p className="text-gray-400 text-sm">Try adjusting the filters above</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-amber-50">
                      {["Order", "Customer", "Items", "Total", "Order Status", "Payment", ""].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50">
                    {filteredOrders.map((order) => {
                      const name  = order.buyer?.name  || order.guestInfo?.name  || "Guest";
                      const phone = order.buyer?.phone || order.guestInfo?.phone;
                      const payStatus = order.payment?.status || order.paymentStatus || "Pending";
                      return (
                        <tr key={order._id} className="hover:bg-amber-50/40 transition">
                          {/* Order ID + date */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <p className="text-xs font-black text-gray-700 font-mono">#{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              {" · "}
                              {new Date(order.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </td>

                          {/* Customer */}
                          <td className="px-4 py-3.5">
                            <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">{name}</p>
                            {phone && (
                              <span className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                                <Phone size={10} /> {phone}
                              </span>
                            )}
                          </td>

                          {/* Items count */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <ShoppingBag size={12} className="text-amber-400" />
                              <span className="text-xs font-semibold text-gray-600">
                                {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </td>

                          {/* Total */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="text-sm font-extrabold text-amber-600">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </td>

                          {/* Order status select */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <StatusSelect
                              value={order.orderStatus}
                              options={ORDER_STATUSES}
                              badge={ORDER_BADGE}
                              disabled={!!updatingOrders[order._id]?.order}
                              onChange={(v) => handleStatusChange(order._id, v, "order")}
                            />
                            {updatingOrders[order._id]?.order && (
                              <Loader2 size={11} className="animate-spin text-amber-400 ml-1 inline" />
                            )}
                          </td>

                          {/* Payment status select */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <CreditCard size={11} className="text-gray-300 shrink-0" />
                              <StatusSelect
                                value={payStatus}
                                options={PAYMENT_STATUSES}
                                badge={PAYMENT_BADGE}
                                disabled={!!updatingOrders[order._id]?.payment}
                                onChange={(v) => handleStatusChange(order._id, v, "payment")}
                              />
                              {updatingOrders[order._id]?.payment && (
                                <Loader2 size={11} className="animate-spin text-amber-400" />
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <button
                              onClick={() => alert("Implement your delete logic")}
                              className="text-[11px] font-bold text-red-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-full transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderPage;
