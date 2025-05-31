import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin } from "@/store/order/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardCard = ({ title, value }) => (
  <Card className="text-center shadow-sm">
    <CardContent>
      <h4 className="text-sm text-gray-500 mb-1">{title}</h4>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </CardContent>
  </Card>
);

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { orders, users } = useSelector((state) => state.order);

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
    (o) => o.payment.status === "Order Placed"
  ).length;
  const completedOrders = filteredOrders.filter(
    (o) => o.payment.status === "Completed"
  ).length;
  const revenue = filteredOrders
    .reduce((sum, o) => sum + o.totalAmount, 0)
    .toFixed(2);
  const avgOrderValue = totalOrders ? (revenue / totalOrders).toFixed(2) : 0;
  const totalUsers = users?.length ?? 0;

  return (
    <div className="pt-[18vh] px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <Button onClick={() => dispatch(fetchAllOrdersAdmin())}>
          Refresh Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Orders (Today)" value={totalOrders} />
        <DashboardCard title="Pending Orders" value={pendingOrders} />
        <DashboardCard title="Completed Orders" value={completedOrders} />
        <DashboardCard title="Revenue ($)" value={revenue} />
        <DashboardCard title="Avg. Order Value ($)" value={avgOrderValue} />
        <DashboardCard title="Total Users" value={totalUsers} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
