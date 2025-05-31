import React from "react";

const OrderPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl mt-[10vh]">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Order Policy</h1>
      <p className="mb-4">
        Orders placed via our app are prepared fresh and processed immediately.
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Preparation Time:</strong> Approx. 15–25 minutes
        </li>
        <li>
          <strong>Delivery Time:</strong> Approx. 30–45 minutes (may vary during
          peak hours)
        </li>
        <li>
          <strong>Cancellation:</strong> Allowed within 5 minutes of placing the
          order
        </li>
        <li>
          <strong>Incorrect Orders:</strong> Contact us immediately for
          resolution
        </li>
        <li>
          <strong>Allergies:</strong> Mention clearly during checkout. We try
          our best but cannot guarantee zero cross-contamination
        </li>
      </ul>
      <p className="mb-4">
        For any issues, contact us at{" "}
        <a
          href="mailto:support@yourapp.com"
          className="text-blue-600 underline"
        >
          support@yourapp.com
        </a>{" "}
        or call{" "}
        <a href="tel:+61123456789" className="text-blue-600 underline">
          +61 123 456 789
        </a>
        .
      </p>
      <p className="text-sm text-gray-500">Thank you for ordering with us!</p>
    </div>
  );
};

export default OrderPolicy;
