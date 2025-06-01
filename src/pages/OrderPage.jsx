import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  changeOrderStatus,
  fetchAllOrdersAdmin,
} from "@/store/order/orderSlice";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const [updatingOrders, setUpdatingOrders] = useState({});
  const { orders, isLoading, error } = useSelector((state) => state.order);

  // FILTER STATES
  const [statusFilter, setStatusFilter] = useState("All");

  // Default to today's date range
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  });

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  // Update order status handler (your existing code)
  const handleStatusChange = async (orderId, newStatus, statusType) => {
    setUpdatingOrders((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [statusType]: true },
    }));
    try {
      const updatedData = {};
      if (statusType === "order") {
        updatedData.orderStatus = newStatus;
      } else {
        updatedData.paymentStatus = newStatus;
      }

      await dispatch(
        changeOrderStatus({ orderId, updateData: updatedData })
      ).unwrap();

      dispatch({
        type: "orders/updateOrderStatus",
        payload: { orderId, updatedData },
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      dispatch(fetchAllOrdersAdmin());
    } finally {
      setUpdatingOrders((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], [statusType]: false },
      }));
    }
  };

  // Filter orders by date and status
  const filteredOrders = orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    const isWithinDateRange =
      createdAt >= dateFilter.startDate && createdAt <= dateFilter.endDate;

    const matchesStatus =
      statusFilter === "All" ? true : order.orderStatus === statusFilter;

    return isWithinDateRange && matchesStatus;
  });

  // Helper function to format date to YYYY-MM-DD for input value
  const formatDate = (date) => date.toISOString().split("T")[0];
  //this is for changing color
  const getStatusColor = (status, type = "order") => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return "bg-green-100 text-green-800";
        case "Processing":
          return "bg-blue-100 text-blue-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Failed":
          return "bg-red-100 text-red-800";
        case "Refunded":
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-green-100 text-green-800";
      }
    } else {
      switch (status) {
        case "Completed":
          return "bg-green-100 text-green-800";
        case "Ready":
          return "bg-blue-100 text-blue-800";
        case "Processing":
          return "bg-yellow-100 text-yellow-800";
        case "Order Placed":
          return "bg-orange-100 text-orange-800";
        case "Cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };
  return (
    <div className="pt-[18vh] px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Admin Orders</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => dispatch(fetchAllOrdersAdmin())}
          >
            Refresh Orders
          </Button>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex space-x-4 mb-6 items-center">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Order Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Processing">Processing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={formatDate(dateFilter.startDate)}
            max={formatDate(dateFilter.endDate)}
            onChange={(e) =>
              setDateFilter((prev) => ({
                ...prev,
                startDate: new Date(e.target.value + "T00:00:00"),
              }))
            }
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={formatDate(dateFilter.endDate)}
            min={formatDate(dateFilter.startDate)}
            onChange={(e) =>
              setDateFilter((prev) => ({
                ...prev,
                endDate: new Date(e.target.value + "T23:59:59"),
              }))
            }
            className="border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Render filtered orders */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* Error icon */}
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="shadow-lg border-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-gray-500 font-medium"
                      >
                        No orders found for selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                          {order._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.buyer?.name || "N/A"}
                          {order.buyer?.phone && (
                            <div className="text-xs text-gray-400">
                              {order.buyer.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          $ {order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <select
                            className={`border rounded p-1 ${getStatusColor(
                              order.orderStatus,
                              "order"
                            )}`}
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value,
                                "order"
                              )
                            }
                            disabled={updatingOrders[order._id]?.order}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Ready">Ready</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <select
                            className={`border rounded p-1 ${getStatusColor(
                              order.payment?.status || order.paymentStatus,
                              "payment"
                            )}`}
                            value={
                              order.payment?.status ||
                              order.paymentStatus ||
                              "Completed"
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value,
                                "payment"
                              )
                            }
                            disabled={updatingOrders[order._id]?.payment}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {/* Your existing action buttons */}
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => alert("Implement your delete logic")}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminOrderPage;
