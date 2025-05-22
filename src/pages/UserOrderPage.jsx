import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "@/store/order/orderSlice";
import { Link } from "react-router-dom";

const UserOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    //this is for initial fetch
    dispatch(fetchOrderHistory());

    const interval = setInterval(() => {
      dispatch(fetchOrderHistory());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
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
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-[18vh]">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Order History
          </h2>
        </div>

        {orders?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders.{" "}
              <Link to="/menu" className="text-blue-600 hover:text-blue-500">
                Browse our menu
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <div key={order._id} className="px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.payment.status
                        )}`}
                      >
                        {order.payment.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Items:
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        {item.food?.imageUrl && (
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={item.food.imageUrl}
                            alt={item.food.title}
                          />
                        )}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {item.food?.title || "Unknown Item"}
                            </p>
                            <p className="text-sm text-gray-500 ml-2">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="mt-4 flex justify-end">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View order details →
                  </Link>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderPage;
