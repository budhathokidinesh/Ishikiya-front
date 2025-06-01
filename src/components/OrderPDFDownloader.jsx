import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button"; // adjust path if needed

const OrderPDFDownloader = ({ orders, fileName = "order-history" }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Format date
    let dateSuffix = "no-date";
    let formattedDisplayDate = "No Date Available";
    if (orders.length > 0) {
      const date = new Date(orders[0].createdAt);
      dateSuffix = date.toISOString().split("T")[0]; // YYYY-MM-DD
      formattedDisplayDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Add title and date
    doc.text("Order History Report", 14, 15);
    doc.setFontSize(11);
    doc.text(`Date: ${formattedDisplayDate}`, 14, 22);

    // Table data
    const tableData = orders.map((order, index) => [
      index + 1,
      order._id.slice(-6),
      order.buyer?.name || "N/A",
      order.buyer?.phone || "N/A",
      `$ ${order.totalAmount.toFixed(2)}`,
      order.orderStatus,
      order.payment?.status || order.paymentStatus || "Paid",
      new Date(order.createdAt).toLocaleString(),
    ]);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "#",
          "Order ID",
          "Customer",
          "Phone",
          "Total",
          "Order Status",
          "Payment Status",
          "Date",
        ],
      ],
      body: tableData,
    });

    doc.save(`${fileName}-${dateSuffix}.pdf`);
  };

  return (
    <Button variant="outline" onClick={handleDownloadPDF}>
      Download PDF
    </Button>
  );
};

export default OrderPDFDownloader;
