import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin } from "@/store/order/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardCard = ({ title, value, change }) => (
  <Card className="text-center shadow-sm">
    <CardContent>
      <h4 className="text-sm text-gray-500 mb-1">{title}</h4>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      {change && (
        <p
          className={`text-xs ${
            change > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change > 0 ? "↑" : "↓"} {Math.abs(change)}% from last period
        </p>
      )}
    </CardContent>
  </Card>
);

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { orders, users } = useSelector((state) => state.order);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
  });
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  // Filter orders based on selected date range and status
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const dateInRange =
      orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
    const statusMatch =
      statusFilter === "all" || order.payment.status === statusFilter;
    return dateInRange && statusMatch;
  });

  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(
    (o) => o.payment.status === "Pending"
  ).length;
  const completedOrders = filteredOrders.filter(
    (o) => o.payment.status === "Completed"
  ).length;
  const revenue = filteredOrders
    .reduce((sum, o) => sum + o.totalAmount, 0)
    .toFixed(2);
  const avgOrderValue = (revenue / totalOrders).toFixed(2);
  const totalUsers = users?.length;

  // Status distribution for pie chart
  const statusData = [
    { name: "Pending", value: pendingOrders },
    { name: "Completed", value: completedOrders },
    { name: "Other", value: totalOrders - pendingOrders - completedOrders },
  ];
  const STATUS_COLORS = ["#FBBF24", "#10B981", "#60A5FA"];

  // Recent orders for bar chart
  const recentOrdersData = filteredOrders.slice(0, 7).map((o) => ({
    name: `#${o._id.slice(-4)}`,
    amount: o.totalAmount,
    status: o.payment.status,
  }));

  // Monthly revenue data
  const monthlyRevenue = Array(12)
    .fill(0)
    .map((_, i) => {
      const monthOrders = orders.filter(
        (o) => new Date(o.createdAt).getMonth() === i
      );
      return monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    });
  const monthlyData = monthlyRevenue.map((amount, index) => ({
    name: new Date(0, index).toLocaleString("default", { month: "short" }),
    revenue: amount,
  }));

  return (
    <div className="pt-[18vh] px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex gap-2">
          <DateRangePicker onSelect={setDateRange} initialRange={dateRange} />
          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Orders"
          value={totalOrders}
          change={10} // Example change percentage
        />
        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          change={-5}
        />
        <DashboardCard title="Revenue ($)" value={revenue} change={15} />
        <DashboardCard title="Total Users" value={totalUsers} change={8} />
        <DashboardCard
          title="Avg. Order Value"
          value={`$${avgOrderValue}`}
          change={3}
        />
        <DashboardCard
          title="Completed Orders"
          value={completedOrders}
          change={12}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-sm">
          <CardContent className="h-80">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Revenue Trend
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="h-80">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Order Status Distribution
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Orders"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm mb-6">
        <CardContent className="h-80">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Orders
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recentOrdersData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="amount"
                name="Amount ($)"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="outline">Export Data</Button>
        <Button
          onClick={() => {
            dispatch(fetchAllOrdersAdmin());
            dispatch(fetchUsers());
          }}
        >
          Refresh Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
