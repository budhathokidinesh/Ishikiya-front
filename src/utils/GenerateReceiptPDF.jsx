import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Wrapper to detect when Receipt is rendered
const ReceiptWrapper = ({ order, ReceiptComponent, onRenderComplete }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      onRenderComplete(ref.current);
    }
  }, [ref, onRenderComplete]);

  return (
    <div ref={ref}>
      <ReceiptComponent order={order} />
    </div>
  );
};

const generateReceiptPDF = (order, ReceiptComponent) => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.zIndex = "9999";
    container.style.background = "#fff";
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ReceiptComponent order={order} />);

    // Wait for React to flush + next paint frame
    const waitForRender = () =>
      new Promise((res) => requestAnimationFrame(() => setTimeout(res, 100)));

    waitForRender().then(async () => {
      try {
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`receipt_${order._id.slice(-6)}.pdf`);

        root.unmount();
        document.body.removeChild(container);

        resolve();
      } catch (error) {
        root.unmount();
        document.body.removeChild(container);
        reject(error);
      }
    });
  });
};

export default generateReceiptPDF;
