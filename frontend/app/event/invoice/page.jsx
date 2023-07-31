'use client'
import React from 'react';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const InvoicePage = () => {
  const invoiceData = {
    barcode: '123456789',
    ticketId: 'TICKET001',
    price: 'GH₵50',
    date: 'June 30, 2023',
    purchaseBy: 'John Doe',
    seatNumber: 'A12',
    email: 'john.doe@example.com',
  };

  return (
    <div className="container mx-auto py-8 flex justify-center items-center flex-col space-y-4">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      <div className="max-w-md w-full bg-white p-8 md:rounded-md md:shadow-lg">
        <div className="mb-4">
          <strong>Barcode:</strong> {invoiceData.barcode}
        </div>
        <div className="mb-4">
          <strong>Ticket ID:</strong> {invoiceData.ticketId}
        </div>
        <div className="mb-4">
          <strong>Price:</strong> {invoiceData.price}
        </div>
        <div className="mb-4">
          <strong>Date:</strong> {invoiceData.date}
        </div>
        <div className="mb-4">
          <strong>Purchased By:</strong> {invoiceData.purchaseBy}
        </div>
        <div className="mb-4">
          <strong>Seat Number:</strong> {invoiceData.seatNumber}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {invoiceData.email}
        </div>
        <PDFDownloadLink document={<InvoicePDF invoiceData={invoiceData} />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : 'Download Invoice as PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoicePage;

// PDF Component
const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>Invoice</Text>
      <Text>
        <strong>Barcode:</strong> {invoiceData.barcode}
      </Text>
      <Text>
        <strong>Ticket ID:</strong> {invoiceData.ticketId}
      </Text>
      <Text>
        <strong>Price:</strong> {invoiceData.price}
      </Text>
      <Text>
        <strong>Date:</strong> {invoiceData.date}
      </Text>
      <Text>
        <strong>Purchased By:</strong> {invoiceData.purchaseBy}
      </Text>
      <Text>
        <strong>Seat Number:</strong> {invoiceData.seatNumber}
      </Text>
      <Text>
        <strong>Email:</strong> {invoiceData.email}
      </Text>
    </Page>
  </Document>
);

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
