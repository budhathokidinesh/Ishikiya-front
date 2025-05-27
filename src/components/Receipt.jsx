// src/components/Receipt.js
import React from "react";

const Receipt = ({ order }) => {
  return (
    <div
      style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 500 }}
    >
      <h1>Receipt</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <p>
        <strong>Payment Method:</strong> {order.payment.method}
      </p>
      {order.payment.transitionId && (
        <p>
          <strong>Transaction ID:</strong> {order.payment.transitionId}
        </p>
      )}
      <p>
        <strong>Status:</strong> {order.payment.status}
      </p>

      <h3>Items:</h3>
      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
              Item
            </th>
            <th style={{ borderBottom: "1px solid #ddd" }}>Qty</th>
            <th style={{ borderBottom: "1px solid #ddd" }}>Price</th>
            <th style={{ borderBottom: "1px solid #ddd" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td style={{ padding: "8px 0" }}>
                {item.food?.title || "Unknown Item"}
              </td>
              <td style={{ textAlign: "center" }}>{item.quantity}</td>
              <td style={{ textAlign: "right" }}>${item.price.toFixed(2)}</td>
              <td style={{ textAlign: "right" }}>
                ${(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: 20 }}>
        Total: ${order.totalAmount.toFixed(2)}
      </h3>
    </div>
  );
};

export default Receipt;
