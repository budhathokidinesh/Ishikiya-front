import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin } from "@/store/order/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const DashboardCard = ({ title, value, onClick }) => (
  <Card className="text-center shadow-sm" onClick={onClick}>
    <CardContent>
      <h4 className="text-sm font-bold text-gray-800 mb-1">{title}</h4>
      <p className="text-2xl font-semibold text-yellow-500">{value}</p>
    </CardContent>
  </Card>
);

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const [today, setToday] = useState({
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  });

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= today.startDate && orderDate <= today.endDate;
  });

  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(
    (o) => o.orderStatus === "Order Placed"
  ).length;
  const completedOrders = filteredOrders.filter(
    (o) => o.orderStatus === "Completed"
  ).length;
  const revenue = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = totalOrders
    ? (revenue / totalOrders).toFixed(2)
    : "0.00";
  const revenueDisplay = revenue.toFixed(2);
  const uniqueUserIds = new Set(
    filteredOrders.map((order) => order.buyer?._id)
  );
  const totalUsers = uniqueUserIds.size;

  const handleCardClick = (filter) => {
    let url = "/admin-order";

    // Use today's date string in YYYY-MM-DD format
    const todayDate = new Date().toISOString().slice(0, 10);

    const startDate = todayDate;
    const endDate = todayDate;
    switch (filter) {
      case "today":
        url += `?filter=All&startDate=${startDate}&endDate=${endDate}`;
        break;
      case "pending":
        url += `?filter=Order Placed&startDate=${startDate}&endDate=${endDate}`;
        break;
      case "completed":
        url += `?filter=Completed&startDate=${startDate}&endDate=${endDate}`;
        break;
      // For revenue, avgOrder, users, just navigate without filters or your logic
      default:
        url += `?filter=All&startDate=${startDate}&endDate=${endDate}`;
    }

    navigate(url);
  };

  return (
    <div className="pt-[18vh] px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <Button onClick={() => dispatch(fetchAllOrdersAdmin())}>
          Refresh Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Orders (Today)"
          value={totalOrders}
          onClick={() => handleCardClick("today")}
        />

        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          onClick={() => handleCardClick("pending")}
        />
        <DashboardCard
          title="Completed Orders"
          value={completedOrders}
          onClick={() => handleCardClick("completed")}
        />

        <DashboardCard
          title="Revenue ($)"
          value={revenueDisplay}
          onClick={() => handleCardClick("revenue")}
        />
        <DashboardCard
          title="Avg. Order Value ($)"
          value={avgOrderValue}
          onClick={() => handleCardClick("avgOrder")}
        />
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          onClick={() => handleCardClick("users")}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
