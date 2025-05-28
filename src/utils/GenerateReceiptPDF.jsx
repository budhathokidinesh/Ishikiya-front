// src/utils/generateReceiptPDF.js
import ReceiptPDF from "@/components/Receipt";
import { pdf } from "@react-pdf/renderer";

const GenerateReceiptPDF = async (order) => {
  const blob = await pdf(<ReceiptPDF order={order} />).toBlob();

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `receipt_${order._id.slice(-6)}.pdf`;
  link.click();
};

export default GenerateReceiptPDF;
