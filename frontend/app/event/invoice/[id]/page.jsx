'use client'
import React from 'react';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { TicketDetail } from '@/Utils/ClientServer/event_server';
import Image from 'next/image';

const InvoicePage = ({params}) => {
  const [invoiceData, setData] = React.useState({
    ticket_id: '',
    user: {fullname: '', email: ''},
    event: {title: ''},
    total: 0,
    quantity: 0,
    qr_code: '',
    seat: '',
    created_at: '',
  });

  React.useEffect(() => {
    TicketDetail(params.id).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="container mx-auto py-8 flex justify-center items-center flex-col space-y-4">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      <div className="max-w-md w-full bg-white p-8 md:rounded-md md:shadow-lg">
        <div className="mb-4">
          <strong>Barcode:</strong> <Image src={invoiceData.qr_code} width={100} height={100} alt='Ticket ID'/>
        </div>
        <div className="mb-4">
          <strong>Ticket ID:</strong> {invoiceData.ticket_id}
        </div>
        <div className="mb-4">
          <strong>Price:</strong> {invoiceData.total}
        </div>
        <div className="mb-4">
          <strong>Date:</strong> {invoiceData.created_at}
        </div>
        <div className="mb-4">
          <strong>Purchased By:</strong> {invoiceData.user.fullname}
        </div>
        <div className="mb-4">
          <strong>Seat Number:</strong> {invoiceData.seat}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {invoiceData.user.email}
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
      <strong>Barcode:</strong> <img src={invoiceData.qr_code} width={100} height={100} alt='Ticket ID'/>
      </Text>
      <Text>
        <strong>Ticket ID:</strong> {invoiceData.ticket_id}
      </Text>
      <Text>
        <strong>Price:</strong> {invoiceData.total}
      </Text>
      <Text>
        <strong>Date:</strong> {invoiceData.created_at}
      </Text>
      <Text>
        <strong>Purchased By:</strong> {invoiceData.user.fullname}
      </Text>
      <Text>
        <strong>Seat Number:</strong> {invoiceData.seat}
      </Text>
      <Text>
        <strong>Email:</strong> {invoiceData.user.email}
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
