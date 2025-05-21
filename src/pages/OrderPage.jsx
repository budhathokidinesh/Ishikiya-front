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

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  //this is for updating the order status
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrders((prev) => ({ ...prev, [orderId]: true }));
    try {
      // Dispatch an action to update Redux state
      dispatch({
        type: "orders/updateOrderStatus",
        payload: { orderId, status: newStatus },
      });

      // Make the API call
      await dispatch(
        changeOrderStatus({ orderId, status: newStatus })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert the optimistic update if needed
      dispatch(fetchAllOrdersAdmin());
    } finally {
      setUpdatingOrders((prev) => ({ ...prev, [orderId]: false }));
    }
  };
  console.log("ADMIN FETCHED ORDERS:", orders?.length);
  return (
    <div className="pt-[18vh] max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Orders</h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Card className="shadow-lg">
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.buyer?.name || "N/A"}</td>
                    <td className="px-4 py-2">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{order.payment.status}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.payment.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border p-1 rounded"
                        disabled={updatingOrders[order._id]}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminOrderPage;
