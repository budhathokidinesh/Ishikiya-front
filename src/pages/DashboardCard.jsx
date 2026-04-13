import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin } from "@/store/order/orderSlice";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag, Clock, CheckCircle, DollarSign,
  TrendingUp, Users, RefreshCw, ArrowRight,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, sub, color, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 text-left hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group w-full"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <ArrowRight size={14} className="text-gray-300 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
    </div>
    <p className="text-2xl font-black text-gray-800 leading-none mb-1">{value}</p>
    <p className="text-xs font-semibold text-gray-500">{label}</p>
    {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
  </button>
);

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchAllOrdersAdmin()); }, [dispatch]);

  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const todayEnd   = new Date(new Date().setHours(23, 59, 59, 999));

  const todayOrders = orders.filter((o) => {
    const d = new Date(o.createdAt);
    return d >= todayStart && d <= todayEnd;
  });

  const totalOrders     = todayOrders.length;
  const pendingOrders   = todayOrders.filter((o) => o.orderStatus === "Order Placed").length;
  const completedOrders = todayOrders.filter((o) => o.orderStatus === "Completed").length;
  const revenue         = todayOrders.reduce((s, o) => s + o.totalAmount, 0);
  const avgOrderValue   = totalOrders ? (revenue / totalOrders).toFixed(2) : "0.00";
  const totalUsers      = new Set(todayOrders.map((o) => o.buyer?._id)).size;

  const todayDate = new Date().toISOString().slice(0, 10);
  const go = (filter) =>
    navigate(`/admin-order?filter=${encodeURIComponent(filter)}&startDate=${todayDate}&endDate=${todayDate}`);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const STATUS_STYLE = {
    "Order Placed": "bg-amber-100 text-amber-700",
    Confirmed:      "bg-blue-100 text-blue-700",
    Preparing:      "bg-orange-100 text-orange-700",
    Completed:      "bg-teal-100 text-teal-700",
    Cancelled:      "bg-red-100 text-red-600",
  };

  return (
    <div
      className="min-h-screen pt-[10vh] pb-20 px-4 md:px-6"
      style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
    >
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between py-7">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Admin <span className="text-amber-500">Dashboard</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Today · {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <button
            onClick={() => dispatch(fetchAllOrdersAdmin())}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-200 hover:bg-amber-50 text-amber-600 text-xs font-bold rounded-full shadow-sm transition"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <StatCard
            icon={ShoppingBag}
            label="Total Orders Today"
            value={totalOrders}
            color="bg-amber-400"
            onClick={() => go("All")}
          />
          <StatCard
            icon={Clock}
            label="Pending Orders"
            value={pendingOrders}
            color="bg-orange-400"
            onClick={() => go("Order Placed")}
          />
          <StatCard
            icon={CheckCircle}
            label="Completed Orders"
            value={completedOrders}
            color="bg-teal-500"
            onClick={() => go("Completed")}
          />
          <StatCard
            icon={DollarSign}
            label="Revenue Today"
            value={`$${revenue.toFixed(2)}`}
            color="bg-green-500"
            onClick={() => go("All")}
          />
          <StatCard
            icon={TrendingUp}
            label="Avg. Order Value"
            value={`$${avgOrderValue}`}
            color="bg-blue-500"
            onClick={() => go("All")}
          />
          <StatCard
            icon={Users}
            label="Unique Customers"
            value={totalUsers}
            color="bg-purple-500"
            onClick={() => go("All")}
          />
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-amber-50">
            <h2 className="text-sm font-extrabold text-gray-800">Recent Orders</h2>
            <button
              onClick={() => navigate("/admin-order")}
              className="text-xs text-amber-500 hover:text-amber-600 font-semibold flex items-center gap-1 transition"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-14 text-center">
              <span className="text-4xl">🐟</span>
              <p className="text-gray-400 text-sm mt-3">No orders yet today</p>
            </div>
          ) : (
            <div className="divide-y divide-amber-50">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => navigate("/admin-order")}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-amber-50/50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <ShoppingBag size={13} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {order.buyer?.name || "Guest"} ·{" "}
                        {new Date(order.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.orderStatus] || "bg-gray-100 text-gray-500"}`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-sm font-extrabold text-amber-600 whitespace-nowrap">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
