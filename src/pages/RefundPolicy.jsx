import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl mt-[10vh]">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Refund Policy</h1>
      <p className="mb-4">
        At <strong>Alkimos Fish and Chips</strong>, customer satisfaction is our
        priority. If you're unhappy with your order due to:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Incorrect item received</li>
        <li>Food was spoiled or unsafe to consume</li>
        <li>Order not delivered</li>
      </ul>
      <p className="mb-4">
        We offer a <strong>full refund</strong>, <strong>replacement</strong>,
        or
        <strong> store credit</strong>.
      </p>
      <p className="mb-4">
        Refund requests must be made <strong>within 2 hours</strong> of
        receiving your order. Contact us at{" "}
        <a href="mailto:alikimsupport.com" className="text-blue-600 underline">
          alikimosupport.gmailcom
        </a>{" "}
        with your order number.
      </p>
      <p className="mb-4 font-semibold">Refunds are not available for:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Change of mind</li>
        <li>Partially eaten food</li>
        <li>Delivery delays caused by incorrect address input</li>
      </ul>
      <p className="text-sm text-gray-500">
        We reserve the right to deny refunds if conditions are not met.
      </p>
    </div>
  );
};

export default RefundPolicy;
