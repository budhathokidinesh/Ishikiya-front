import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin, changeOrderStatus } from "../redux/orderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(changeOrderStatus({ orderId, status }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
                {orders.map((order) => (
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
