import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1pt solid #ccc",
    paddingBottom: 10,
  },
  businessInfo: {
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #333",
    fontWeight: "bold",
    paddingBottom: 4,
    marginTop: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: "0.5pt solid #ddd",
  },
  tableCol: {
    flex: 1,
    paddingHorizontal: 4,
  },
  tableColRight: {
    flex: 1,
    paddingHorizontal: 4,
    textAlign: "right",
  },
  totalRow: {
    marginTop: 12,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    borderTop: "1pt solid #ccc",
    paddingTop: 10,
  },
});

const ReceiptPDF = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.businessInfo}>Alkimos Fish and Chips</Text>
        <Text>17 Turnstone St, Alkimos WA 6038</Text>
        <Text>sam@gmail.com</Text>
      </View>

      {/* Order Info */}
      <View style={styles.section}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Receipt:</Text> #
          {order._id.slice(-6)}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Payment Method:</Text>{" "}
          {order.payment.method}
        </Text>
        {order.payment.transitionId && (
          <Text>
            <Text style={{ fontWeight: "bold" }}>Transaction ID:</Text>{" "}
            {order.payment.transitionId}
          </Text>
        )}
        <Text>
          <Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
          {order.payment.status}
        </Text>
      </View>

      {/* Items Table */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol}>Item</Text>
          <Text style={styles.tableColRight}>Qty</Text>
          <Text style={styles.tableColRight}>Price</Text>
          <Text style={styles.tableColRight}>Total</Text>
        </View>

        {order.items.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCol}>
              {item.food?.title || "Unknown Item"}
            </Text>
            <Text style={styles.tableColRight}>{item.quantity}</Text>
            <Text style={styles.tableColRight}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableColRight}>
              ${(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <Text style={styles.totalRow}>
        Total: ${order.totalAmount.toFixed(2)}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for choosing us.</Text>
        <Text>Generated on {new Date().toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
